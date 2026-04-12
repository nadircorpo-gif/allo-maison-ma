import { scrapeM3allem } from "./sources/m3allem";
import { scrapeBricool } from "./sources/bricool";
import { scrapeAllopro } from "./sources/allopro";
import { passesHardFilters } from "./filters";
import { mapCity, mapServices } from "./mapping";
import { calculateScore } from "./scoring";
import { findMatch } from "./dedup";
import { pushBatch } from "./convex-push";
import type { RawPro, NormalizedPro, SourceEntry } from "./types";

function normalize(raw: RawPro): NormalizedPro | null {
  const city = mapCity(raw.city ?? "");
  if (!city) return null;

  const services = mapServices(raw.services, raw.platform);
  if (services.length === 0) return null;

  const source: SourceEntry = {
    platform: raw.platform,
    externalId: raw.externalId,
    scrapedAt: new Date().toISOString(),
  };

  const { scoreMaison, scoreDetails } = calculateScore(raw, false);
  const status = scoreMaison < 1.5 ? "rejected" : "scraped";

  return {
    firstName: raw.firstName ?? "",
    lastName: raw.lastName ?? "",
    phone: raw.phone,
    photo: raw.photo,
    gender: raw.gender,
    services,
    city,
    quartier: raw.quartier,
    lat: raw.lat,
    lng: raw.lng,
    experience: raw.experience,
    mediaCount: raw.mediaCount,
    description: raw.description,
    verified: raw.verified,
    showPhone: raw.showPhone,
    sources: [source],
    scoreMaison,
    scoreDetails,
    status,
  };
}

function mergeInto(existing: NormalizedPro, raw: RawPro): void {
  existing.sources.push({
    platform: raw.platform,
    externalId: raw.externalId,
    scrapedAt: new Date().toISOString(),
  });

  if (!existing.photo && raw.photo) existing.photo = raw.photo;
  if (!existing.description && raw.description) existing.description = raw.description;
  if (!existing.lat && raw.lat) existing.lat = raw.lat;
  if (!existing.lng && raw.lng) existing.lng = raw.lng;
  if (!existing.experience && raw.experience) existing.experience = raw.experience;
  if (!existing.mediaCount && raw.mediaCount) existing.mediaCount = raw.mediaCount;
  if (!existing.phone && raw.phone) existing.phone = raw.phone;

  const newServices = mapServices(raw.services, raw.platform);
  for (const s of newServices) {
    if (!existing.services.includes(s)) existing.services.push(s);
  }

  const fakeRaw: RawPro = {
    platform: existing.sources[0].platform as RawPro["platform"],
    externalId: existing.sources[0].externalId,
    firstName: existing.firstName,
    lastName: existing.lastName,
    phone: existing.phone,
    photo: existing.photo,
    gender: existing.gender,
    services: existing.services,
    city: existing.city,
    quartier: existing.quartier,
    lat: existing.lat,
    lng: existing.lng,
    experience: existing.experience,
    mediaCount: existing.mediaCount,
    description: existing.description,
    verified: existing.verified,
    showPhone: existing.showPhone,
  };
  const { scoreMaison, scoreDetails } = calculateScore(fakeRaw, true);
  existing.scoreMaison = scoreMaison;
  existing.scoreDetails = scoreDetails;
  existing.status = scoreMaison < 1.5 ? "rejected" : "scraped";
}

async function run() {
  const args = process.argv.slice(2);
  const sourceFlag = args.find((a) => a.startsWith("--source="))?.split("=")[1];
  const dryRun = args.includes("--dry-run");

  const allNormalized: NormalizedPro[] = [];
  const filterStats = { total: 0, passed: 0, rejected: 0 };

  function processRawPros(rawPros: RawPro[]): void {
    for (const raw of rawPros) {
      filterStats.total++;
      const filterResult = passesHardFilters(raw);
      if (!filterResult.passes) {
        filterStats.rejected++;
        continue;
      }
      filterStats.passed++;

      const match = findMatch(
        raw.firstName ?? "",
        raw.lastName ?? "",
        mapCity(raw.city ?? "") ?? "",
        allNormalized
      );

      if (match) {
        mergeInto(match, raw);
      } else {
        const normalized = normalize(raw);
        if (normalized) allNormalized.push(normalized);
      }
    }
  }

  if (!sourceFlag || sourceFlag === "m3allem") {
    console.log("\n=== Phase 1: M3allem ===");
    const m3allemPros = await scrapeM3allem();
    processRawPros(m3allemPros);
    console.log(`  After M3allem: ${allNormalized.length} normalized pros`);
  }

  if (!sourceFlag || sourceFlag === "bricool") {
    console.log("\n=== Phase 2: BriCool ===");
    const bricoolPros = await scrapeBricool({ enrichDetails: true });
    processRawPros(bricoolPros);
    console.log(`  After BriCool: ${allNormalized.length} normalized pros`);
  }

  if (!sourceFlag || sourceFlag === "allopro") {
    console.log("\n=== Phase 3: AlloPro ===");
    const alloProPros = await scrapeAllopro();
    processRawPros(alloProPros);
    console.log(`  After AlloPro: ${allNormalized.length} normalized pros`);
  }

  console.log("\n=== Pipeline Summary ===");
  console.log(`  Raw pros processed: ${filterStats.total}`);
  console.log(`  Passed hard filters: ${filterStats.passed}`);
  console.log(`  Rejected by filters: ${filterStats.rejected}`);
  console.log(`  Final normalized (deduplicated): ${allNormalized.length}`);

  const withPhone = allNormalized.filter((p) => p.phone).length;
  const multiPlatform = allNormalized.filter((p) => p.sources.length > 1).length;
  const byStatus = {
    scraped: allNormalized.filter((p) => p.status === "scraped").length,
    rejected: allNormalized.filter((p) => p.status === "rejected").length,
  };
  const avgScore = allNormalized.length > 0
    ? allNormalized.reduce((sum, p) => sum + p.scoreMaison, 0) / allNormalized.length
    : 0;

  console.log(`  With phone: ${withPhone}`);
  console.log(`  Multi-platform: ${multiPlatform}`);
  console.log(`  Status — scraped: ${byStatus.scraped}, rejected: ${byStatus.rejected}`);
  console.log(`  Average Score Maison: ${avgScore.toFixed(2)}/5`);

  console.log("\n  By city:");
  const cities = ["casablanca", "rabat", "marrakech", "tanger", "fes", "agadir"];
  for (const city of cities) {
    const count = allNormalized.filter((p) => p.city === city && p.status === "scraped").length;
    console.log(`    ${city}: ${count}`);
  }

  if (!dryRun) {
    console.log("\n=== Pushing to Convex ===");
    const activePros = allNormalized.filter((p) => p.status === "scraped");
    const { pushed, errors } = await pushBatch(activePros);
    console.log(`  Pushed: ${pushed}, Errors: ${errors}`);
  } else {
    console.log("\n  [DRY RUN] Skipping Convex push");
  }

  console.log("\nPipeline complete!");
}

run().catch(console.error);

import { scrapeAvito } from "./sources/avito";
import { enrichWithGooglePlaces } from "./enrichers/google-places";
import { verifyWhatsApp } from "./verifiers/whatsapp";
import { pingWhatsApp } from "./verifiers/wa-ping";
import { calculateScoreV2 } from "./scoring-v2";
import { supabase, getAllPros, updatePro, upsertPro } from "./supabase-push";
import { mapCity, mapServices, classifyByKeywords } from "./mapping";
import { formatPhone, isMobile } from "./verifiers/phone-check";
import type { RawPro, SupabasePro } from "./types";

async function phase4Avito(maxPages?: number) {
  console.log("\n=== Phase 4: Avito Scraping ===");
  const rawPros = await scrapeAvito({ maxPagesPerCategory: maxPages });
  console.log(`  Raw: ${rawPros.length} unique pros`);

  let pushed = 0;
  let skipped = 0;

  for (const raw of rawPros) {
    const city = mapCity(raw.city ?? "");
    if (!city) { skipped++; continue; }

    let services = mapServices(raw.services, "avito");
    if (services.length === 0 && raw.description) {
      services = classifyByKeywords(raw.description);
    }
    if (services.length === 0) { skipped++; continue; }

    const phone = formatPhone(raw.phone ?? "");
    if (!phone || !isMobile(raw.phone ?? "")) { skipped++; continue; }

    const pro: Record<string, any> & { phone: string } = {
      first_name: raw.firstName ?? "",
      last_name: raw.lastName ?? "",
      phone: raw.phone!,
      photo: raw.photo,
      services,
      city,
      quartier: raw.quartier,
      description: raw.description,
      sources: [{ platform: "avito", externalId: raw.externalId, scrapedAt: new Date().toISOString() }],
      status: "scraped",
      verified: false,
      score_maison: 0,
      score_completude: 0,
      score_joignabilite: 0,
      score_multi_plateforme: 0,
      score_experience: 0,
      score_google: 0,
      score_wa: 0,
      score_recency: 0,
      avito_ad_date: raw.adDate,
      avito_photos_count: raw.photosCount,
      media_count: raw.photosCount,
    };

    const id = await upsertPro(pro);
    if (id) pushed++;
  }

  console.log(`  Pushed: ${pushed}, Skipped: ${skipped}`);
}

async function phase5Google() {
  console.log("\n=== Phase 5: Google Places Enrichment ===");
  const result = await enrichWithGooglePlaces();
  console.log(`  Enriched: ${result.enriched}, Skipped: ${result.skipped}`);
}

async function phase6WhatsApp() {
  console.log("\n=== Phase 6: WhatsApp Verification ===");
  const result = await verifyWhatsApp();
  console.log(`  Verified: ${result.verified}, Not on WA: ${result.notOnWA}, Errors: ${result.errors}`);
}

async function phase7Rescore() {
  console.log("\n=== Phase 7: Score Maison v2 Recalculation ===");
  const pros = await getAllPros();
  console.log(`  ${pros.length} pros to rescore`);

  let rescored = 0;
  let rejected = 0;

  for (const pro of pros) {
    const { score, details } = calculateScoreV2(pro as SupabasePro);
    const status = score < 1.5 ? "rejected" : "scraped";

    await updatePro(pro.id!, {
      score_maison: score,
      score_google: details.google,
      score_wa: details.whatsapp,
      score_multi_plateforme: details.multiPlateforme,
      score_completude: details.completude,
      score_recency: details.recency,
      status,
    });

    if (status === "rejected") rejected++;
    rescored++;
  }

  console.log(`  Rescored: ${rescored}, Rejected: ${rejected}`);
}

async function printSummary() {
  console.log("\n=== Final Summary ===");
  const { data } = await supabase
    .from("professionals")
    .select("city, status, phone, google_rating, wa_exists, wa_business");
  if (!data) return;

  const total = data.length;
  const scraped = data.filter((p) => p.status === "scraped").length;
  const withPhone = data.filter((p) => p.phone).length;
  const googleVerified = data.filter((p) => p.google_rating).length;
  const waVerified = data.filter((p) => p.wa_exists).length;
  const waBusiness = data.filter((p) => p.wa_business).length;

  console.log(`  Total: ${total}`);
  console.log(`  Active (scraped): ${scraped}`);
  console.log(`  With phone: ${withPhone}`);
  console.log(`  Google verified: ${googleVerified}`);
  console.log(`  WhatsApp exists: ${waVerified}`);
  console.log(`  WhatsApp Business: ${waBusiness}`);

  console.log("\n  By city:");
  const cities = ["casablanca", "rabat", "marrakech", "tanger", "fes", "agadir"];
  for (const city of cities) {
    const count = data.filter((p: any) => p.city === city && p.status === "scraped").length;
    console.log(`    ${city}: ${count}`);
  }
}

async function run() {
  const args = process.argv.slice(2);
  const phase = args.find((a) => a.startsWith("--phase="))?.split("=")[1];
  const maxPages = args.find((a) => a.startsWith("--max-pages="))?.split("=")[1];

  if (!phase || phase === "avito") await phase4Avito(maxPages ? parseInt(maxPages) : undefined);
  if (!phase || phase === "google") await phase5Google();
  if (!phase || phase === "whatsapp") await phase6WhatsApp();
  if (phase === "wa-ping") {
    console.log("\n=== Phase 6b: WhatsApp Ping Check ===");
    const result = await pingWhatsApp();
    console.log(`  Valid: ${result.valid}, Invalid: ${result.invalid}, Errors: ${result.errors}`);
  }
  if (!phase || phase === "rescore") await phase7Rescore();

  await printSummary();
  console.log("\nPipeline v2 complete!");
}

run().catch(console.error);

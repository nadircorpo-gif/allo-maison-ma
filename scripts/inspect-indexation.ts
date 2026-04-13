/**
 * URL Inspection API — audit indexation status for all allo-maison.ma URLs
 * Usage: npx tsx scripts/inspect-indexation.ts [--limit=N] [--only-errors]
 */

import { GoogleAuth } from "google-auth-library";
import { writeFileSync } from "fs";

const SITE_URL = "sc-domain:allo-maison.ma";
const BASE = "https://allo-maison.ma";
const CONCURRENCY = 5;
const OUTPUT_FILE = "./indexation-report.json";

const SERVICES = [
  "plombier", "electricien", "femme-de-menage", "peintre", "climatisation", "serrurier",
  "bricoleur", "renovation", "jardinier", "technicien-informatique", "demenagement",
  "carreleur", "menuisier", "etancheite", "desinsectisation", "vitrier",
  "cuisiniere", "concierge", "nounou",
];
const CITIES = ["casablanca", "rabat", "marrakech", "tanger", "fes", "agadir"];
const URGENCE = ["plombier", "electricien", "serrurier"];

function getAllUrls(): string[] {
  const urls: string[] = [
    BASE,
    `${BASE}/services`,
    `${BASE}/tarifs`,
    `${BASE}/contact`,
    `${BASE}/comment-ca-marche`,
    `${BASE}/garantie`,
    `${BASE}/a-propos`,
    `${BASE}/blog`,
    `${BASE}/confidentialite`,
  ];
  for (const s of SERVICES) {
    for (const c of CITIES) urls.push(`${BASE}/${s}-${c}`);
  }
  for (const s of URGENCE) {
    for (const c of CITIES) urls.push(`${BASE}/urgence/${s}/${c}`);
  }
  return urls;
}

type InspectionResult = {
  url: string;
  verdict?: string;
  coverageState?: string;
  indexingState?: string;
  robotsTxtState?: string;
  pageFetchState?: string;
  crawledAs?: string;
  lastCrawlTime?: string;
  googleCanonical?: string;
  userCanonical?: string;
  referringUrls?: string[];
  sitemap?: string[];
  error?: string;
};

async function inspectUrl(url: string, token: string): Promise<InspectionResult> {
  try {
    const res = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE_URL }),
    });

    if (!res.ok) {
      const text = await res.text();
      return { url, error: `${res.status}: ${text.slice(0, 200)}` };
    }

    const data = await res.json();
    const r = data.inspectionResult?.indexStatusResult;
    const rich = data.inspectionResult?.richResultsResult;

    return {
      url,
      verdict: r?.verdict,
      coverageState: r?.coverageState,
      indexingState: r?.indexingState,
      robotsTxtState: r?.robotsTxtState,
      pageFetchState: r?.pageFetchState,
      crawledAs: r?.crawledAs,
      lastCrawlTime: r?.lastCrawlTime,
      googleCanonical: r?.googleCanonical,
      userCanonical: r?.userCanonical,
      referringUrls: r?.referringUrls,
      sitemap: r?.sitemap,
    };
  } catch (e) {
    return { url, error: String(e) };
  }
}

async function main() {
  const args = process.argv.slice(2);
  const limitMatch = args.find(a => a.startsWith("--limit="));
  const limit = limitMatch ? parseInt(limitMatch.split("=")[1]) : Infinity;
  const onlyErrors = args.includes("--only-errors");

  const auth = new GoogleAuth({
    keyFile: "./sa-key.json",
    scopes: ["https://www.googleapis.com/auth/webmasters"],
  });
  const client = await auth.getClient();
  const token = (await client.getAccessToken()).token!;

  const allUrls = getAllUrls().slice(0, limit);
  console.log(`Inspecting ${allUrls.length} URLs...`);

  const results: InspectionResult[] = [];
  let indexed = 0, notIndexed = 0, errors = 0;

  for (let i = 0; i < allUrls.length; i += CONCURRENCY) {
    const batch = allUrls.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map(url => inspectUrl(url, token)));

    for (const r of batchResults) {
      results.push(r);
      if (r.error) {
        errors++;
        console.log(`  ERROR  ${r.url} — ${r.error.slice(0, 80)}`);
      } else if (r.verdict === "PASS") {
        indexed++;
        if (!onlyErrors) console.log(`  PASS   ${r.url} — ${r.coverageState} (crawled: ${r.lastCrawlTime?.slice(0, 10) || "never"})`);
      } else {
        notIndexed++;
        console.log(`  FAIL   ${r.url} — ${r.coverageState} | ${r.indexingState} | fetch: ${r.pageFetchState}`);
      }
    }

    // Progress
    const done = Math.min(i + CONCURRENCY, allUrls.length);
    if (done % 20 === 0 || done === allUrls.length) {
      console.log(`\n--- Progress: ${done}/${allUrls.length} (${indexed} indexed, ${notIndexed} not indexed, ${errors} errors) ---\n`);
    }
  }

  // Summary
  console.log("\n========== INDEXATION SUMMARY ==========");
  console.log(`Total:       ${results.length}`);
  console.log(`Indexed:     ${indexed} (${((indexed / results.length) * 100).toFixed(1)}%)`);
  console.log(`Not indexed: ${notIndexed}`);
  console.log(`Errors:      ${errors}`);

  // Coverage breakdown
  const coverageMap: Record<string, number> = {};
  for (const r of results) {
    const key = r.coverageState || r.error || "unknown";
    coverageMap[key] = (coverageMap[key] || 0) + 1;
  }
  console.log("\nCoverage breakdown:");
  for (const [state, count] of Object.entries(coverageMap).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${state}: ${count}`);
  }

  // Save report
  writeFileSync(OUTPUT_FILE, JSON.stringify({
    generatedAt: new Date().toISOString(),
    summary: { total: results.length, indexed, notIndexed, errors, coverageMap },
    results
  }, null, 2));
  console.log(`\nReport saved to ${OUTPUT_FILE}`);
}

main().catch(console.error);

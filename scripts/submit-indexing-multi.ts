/**
 * Multi-project Indexing API submission for allo-maison.ma
 * 8 GCP projects × 195 URLs = 1560 URLs/day
 * Usage: npx tsx scripts/submit-indexing-multi.ts [--dry-run] [--skip-first]
 */

import { GoogleAuth } from "google-auth-library";
import { readFileSync, writeFileSync, existsSync } from "fs";

const BASE_URL = "https://allo-maison.ma";
const URLS_PER_PROJECT = 195;
const CONCURRENCY = 5;
const TRACKING_FILE = "./submitted-urls.json";

const SA_KEYS = [
  { project: "allo-maison-ma", keyFile: "./sa-key.json" },
  { project: "allo-maison-idx-2", keyFile: "./sa-key-allo-maison-idx-2.json" },
  { project: "allo-maison-idx-3", keyFile: "./sa-key-allo-maison-idx-3.json" },
  { project: "allo-maison-idx-4", keyFile: "./sa-key-allo-maison-idx-4.json" },
  { project: "allo-maison-idx-5", keyFile: "./sa-key-allo-maison-idx-5.json" },
  { project: "allo-maison-idx-6", keyFile: "./sa-key-allo-maison-idx-6.json" },
  { project: "allo-maison-idx-7", keyFile: "./sa-key-allo-maison-idx-7.json" },
  { project: "allo-maison-idx-8", keyFile: "./sa-key-allo-maison-idx-8.json" },
];

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
    BASE_URL,
    `${BASE_URL}/services`,
    `${BASE_URL}/tarifs`,
    `${BASE_URL}/contact`,
    `${BASE_URL}/comment-ca-marche`,
    `${BASE_URL}/garantie`,
    `${BASE_URL}/a-propos`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/confidentialite`,
  ];

  for (const s of SERVICES) {
    for (const c of CITIES) {
      urls.push(`${BASE_URL}/${s}-${c}`);
    }
  }

  for (const s of URGENCE) {
    for (const c of CITIES) {
      urls.push(`${BASE_URL}/urgence/${s}/${c}`);
    }
  }

  return urls;
}

function loadTracking(): Set<string> {
  if (!existsSync(TRACKING_FILE)) return new Set();
  const data = JSON.parse(readFileSync(TRACKING_FILE, "utf-8"));
  return new Set(data.submitted || []);
}

function saveTracking(submitted: Set<string>) {
  writeFileSync(TRACKING_FILE, JSON.stringify({
    submitted: [...submitted],
    lastRun: new Date().toISOString(),
  }, null, 2));
}

async function getToken(keyFile: string): Promise<string> {
  const auth = new GoogleAuth({
    keyFile,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });
  const client = await auth.getClient();
  const token = (await client.getAccessToken()).token;
  if (!token) throw new Error(`Failed to get token for ${keyFile}`);
  return token;
}

async function submitUrl(url: string, token: string): Promise<{ url: string; ok: boolean; error?: string }> {
  try {
    const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ url, type: "URL_UPDATED" }),
    });

    if (res.status === 429) return { url, ok: false, error: "QUOTA_EXCEEDED" };
    if (!res.ok) {
      const body = await res.text();
      return { url, ok: false, error: `${res.status}: ${body.slice(0, 100)}` };
    }
    return { url, ok: true };
  } catch (e) {
    return { url, ok: false, error: String(e) };
  }
}

async function submitBatch(urls: string[], token: string): Promise<{ ok: number; failed: number; quotaHit: boolean }> {
  let ok = 0, failed = 0, quotaHit = false;

  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    const batch = urls.slice(i, i + CONCURRENCY);
    const results = await Promise.all(batch.map((url) => submitUrl(url, token)));

    for (const r of results) {
      if (r.ok) {
        ok++;
      } else if (r.error === "QUOTA_EXCEEDED") {
        quotaHit = true;
        return { ok, failed, quotaHit };
      } else {
        failed++;
        console.error(`  FAIL: ${r.url}, ${r.error}`);
      }
    }
  }

  return { ok, failed, quotaHit };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const skipFirst = args.includes("--skip-first");

  const allUrls = getAllUrls();
  const submitted = loadTracking();
  const pending = allUrls.filter((url) => !submitted.has(url));

  console.log(`Total URLs: ${allUrls.length}`);
  console.log(`Already submitted: ${submitted.size}`);
  console.log(`Pending: ${pending.length}`);

  if (pending.length === 0) {
    console.log("All URLs already submitted! Delete submitted-urls.json to re-submit.");
    return;
  }

  if (dryRun) {
    console.log("\n[DRY RUN] Would submit:");
    pending.slice(0, 20).forEach((u) => console.log(`  ${u}`));
    if (pending.length > 20) console.log(`  ... and ${pending.length - 20} more`);
    return;
  }

  const keys = skipFirst ? SA_KEYS.slice(1) : SA_KEYS;
  let remaining = [...pending];
  let totalOk = 0, totalFailed = 0;

  for (const sa of keys) {
    if (remaining.length === 0) break;

    const chunk = remaining.slice(0, URLS_PER_PROJECT);
    remaining = remaining.slice(URLS_PER_PROJECT);

    console.log(`\n--- Project: ${sa.project} (${chunk.length} URLs) ---`);

    try {
      const token = await getToken(sa.keyFile);
      const { ok, failed, quotaHit } = await submitBatch(chunk, token);

      totalOk += ok;
      totalFailed += failed;

      // Track successful submissions
      chunk.slice(0, ok).forEach((url) => submitted.add(url));
      saveTracking(submitted);

      console.log(`  OK: ${ok} | Failed: ${failed}${quotaHit ? " | QUOTA HIT, next project" : ""}`);

      if (quotaHit) {
        // Put unsubmitted back
        remaining = [...chunk.slice(ok + failed), ...remaining];
      }
    } catch (e) {
      console.error(`  ERROR: ${e}`);
      remaining = [...chunk, ...remaining];
    }
  }

  console.log(`\n=== DONE: ${totalOk} submitted, ${totalFailed} failed, ${remaining.length} remaining ===`);
  if (remaining.length > 0) {
    console.log("Re-run tomorrow for remaining URLs (quota resets midnight Pacific / 9h Maroc)");
  }
}

main().catch(console.error);

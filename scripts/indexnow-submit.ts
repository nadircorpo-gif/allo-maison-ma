/**
 * IndexNow submission for allo-maison.ma.
 * Pings Bing, Yandex, Naver, Seznam (and others) instantly and for free.
 *
 * Usage:
 *   npx tsx scripts/indexnow-submit.ts                 # use static URL list
 *   npx tsx scripts/indexnow-submit.ts --from-sitemap  # fetch live sitemap.xml
 *   npx tsx scripts/indexnow-submit.ts --dry-run       # print URLs only
 */

import { BASE_URL, HOST, getAllUrls, getUrlsFromSitemap } from "./lib/urls";

export const INDEXNOW_KEY = "9cb21f54642d40fcf38019881969581a";
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const MAX_URLS_PER_REQUEST = 10000; // Bing / IndexNow spec

export async function submitToIndexNow(urls: string[]): Promise<{
  status: number;
  body: string;
  count: number;
}> {
  if (urls.length === 0) {
    return { status: 0, body: "no urls", count: 0 };
  }
  if (urls.length > MAX_URLS_PER_REQUEST) {
    throw new Error(
      `Too many URLs (${urls.length}). IndexNow limit is ${MAX_URLS_PER_REQUEST} per request.`,
    );
  }

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const body = await res.text();
  return { status: res.status, body, count: urls.length };
}

function interpretStatus(status: number): string {
  switch (status) {
    case 200:
      return "OK: URLs submitted and validated";
    case 202:
      return "ACCEPTED: key validation pending, URLs queued";
    case 400:
      return "BAD REQUEST: invalid format or key";
    case 403:
      return "FORBIDDEN: key not found at keyLocation (check /public file)";
    case 422:
      return "UNPROCESSABLE: URLs not belonging to host, or keyLocation mismatch";
    case 429:
      return "TOO MANY REQUESTS: rate limited";
    default:
      return `Unknown status ${status}`;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const fromSitemap = args.includes("--from-sitemap");
  const dryRun = args.includes("--dry-run");

  const urls = fromSitemap ? await getUrlsFromSitemap() : getAllUrls();

  console.log(`IndexNow submission`);
  console.log(`  Host:         ${HOST}`);
  console.log(`  Key:          ${INDEXNOW_KEY}`);
  console.log(`  Key location: ${KEY_LOCATION}`);
  console.log(`  Source:       ${fromSitemap ? "live sitemap.xml" : "static url list"}`);
  console.log(`  URLs:         ${urls.length}`);

  if (dryRun) {
    console.log("\n[DRY RUN] Sample URLs:");
    urls.slice(0, 10).forEach((u) => console.log(`  ${u}`));
    if (urls.length > 10) console.log(`  ... and ${urls.length - 10} more`);
    return;
  }

  const { status, body } = await submitToIndexNow(urls);
  console.log(`\nResponse: ${status} — ${interpretStatus(status)}`);
  if (body) {
    console.log(`Body: ${body.slice(0, 500)}`);
  }

  if (status !== 200 && status !== 202) {
    process.exitCode = 1;
  }
}

// Run when executed directly (tsx + node).
const invoked = process.argv[1] ?? "";
if (invoked.endsWith("indexnow-submit.ts") || invoked.endsWith("indexnow-submit.js")) {
  main().catch((err) => {
    console.error("IndexNow submission failed:", err);
    process.exit(1);
  });
}

/**
 * GSC Search Analytics deep-dive for allo-maison.ma.
 * Pulls clicks/impressions/CTR/position across multiple dimensions + coverage summary.
 * Usage: npx tsx scripts/gsc-analytics.ts
 */

import { GoogleAuth } from "google-auth-library";
import { writeFileSync } from "fs";

const SITE_URL = "sc-domain:allo-maison.ma";
const KEY_FILE = "./sa-key.json";

function isoDaysAgo(n: number) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

async function getToken(): Promise<string> {
  const auth = new GoogleAuth({
    keyFile: KEY_FILE,
    scopes: [
      "https://www.googleapis.com/auth/webmasters.readonly",
      "https://www.googleapis.com/auth/webmasters",
    ],
  });
  const client = await auth.getClient();
  const { token } = await client.getAccessToken();
  if (!token) throw new Error("no token");
  return token;
}

async function query(token: string, body: Record<string, unknown>) {
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
  return res.json();
}

async function sitemaps(token: string) {
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/sitemaps`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) return { error: `${res.status}` };
  return res.json();
}

async function main() {
  const token = await getToken();
  const startDate = isoDaysAgo(28);
  const endDate = isoDaysAgo(1);
  const startShort = isoDaysAgo(7);

  console.log(`Window: ${startDate} -> ${endDate}`);

  const [totals, topQueries, topPages, byCountry, byDevice, byDate, last7Queries, last7Pages, sm] =
    await Promise.all([
      query(token, { startDate, endDate, rowLimit: 1 }),
      query(token, { startDate, endDate, dimensions: ["query"], rowLimit: 100 }),
      query(token, { startDate, endDate, dimensions: ["page"], rowLimit: 200 }),
      query(token, { startDate, endDate, dimensions: ["country"], rowLimit: 20 }),
      query(token, { startDate, endDate, dimensions: ["device"] }),
      query(token, { startDate, endDate, dimensions: ["date"] }),
      query(token, { startDate: startShort, endDate, dimensions: ["query"], rowLimit: 50 }),
      query(token, { startDate: startShort, endDate, dimensions: ["page"], rowLimit: 100 }),
      sitemaps(token),
    ]);

  const out = {
    generatedAt: new Date().toISOString(),
    window: { startDate, endDate },
    last7: { startDate: startShort, endDate },
    totals: totals.rows?.[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 },
    topQueries: topQueries.rows ?? [],
    topPages: topPages.rows ?? [],
    byCountry: byCountry.rows ?? [],
    byDevice: byDevice.rows ?? [],
    byDate: byDate.rows ?? [],
    last7Queries: last7Queries.rows ?? [],
    last7Pages: last7Pages.rows ?? [],
    sitemaps: sm,
  };

  writeFileSync("./gsc-analytics.json", JSON.stringify(out, null, 2));
  console.log("Wrote ./gsc-analytics.json");
  console.log(`Totals 28d:`, out.totals);
  console.log(`Top 5 queries:`);
  for (const q of out.topQueries.slice(0, 5)) console.log(`  [${q.keys[0]}]`, q);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

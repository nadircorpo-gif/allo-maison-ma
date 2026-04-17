/**
 * Submit new sitemap + remove stale sitemaps in GSC.
 * Usage: npx tsx scripts/gsc-submit-sitemap.ts
 */

import { GoogleAuth } from "google-auth-library";

const SITE_URL = "sc-domain:allo-maison.ma";
const KEY_FILE = "./sa-key.json";

async function getToken(): Promise<string> {
  const auth = new GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ["https://www.googleapis.com/auth/webmasters"],
  });
  const client = await auth.getClient();
  const { token } = await client.getAccessToken();
  if (!token) throw new Error("no token");
  return token;
}

async function listSitemaps(token: string) {
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/sitemaps`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
  return res.json();
}

async function submitSitemap(token: string, feedpath: string) {
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/sitemaps/${encodeURIComponent(feedpath)}`,
    { method: "PUT", headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
  return true;
}

async function deleteSitemap(token: string, feedpath: string) {
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/sitemaps/${encodeURIComponent(feedpath)}`,
    { method: "DELETE", headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) return { ok: false, status: res.status, body: await res.text() };
  return { ok: true };
}

async function main() {
  const token = await getToken();

  console.log("--- BEFORE ---");
  const before = await listSitemaps(token);
  for (const s of before.sitemap ?? []) {
    console.log(`  ${s.path}  submitted=${s.lastSubmitted}  errors=${s.errors} warnings=${s.warnings}`);
  }

  console.log("\n--- Submitting new sitemap ---");
  await submitSitemap(token, "https://allo-maison.ma/sitemap.xml");
  console.log("OK: https://allo-maison.ma/sitemap.xml");

  const stale = [
    "https://www.allo-maison.ma/sitemap_index.xml",
    "https://www.allo-maison.ma/sitemap.xml",
    "http://www.allo-maison.ma/page-sitemap.xml",
  ];
  console.log("\n--- Removing stale sitemaps ---");
  for (const p of stale) {
    const r = await deleteSitemap(token, p);
    console.log(`${r.ok ? "OK  " : "FAIL"}: ${p}${r.ok ? "" : "  " + JSON.stringify(r)}`);
  }

  console.log("\n--- AFTER ---");
  const after = await listSitemaps(token);
  for (const s of after.sitemap ?? []) {
    console.log(`  ${s.path}  submitted=${s.lastSubmitted}  errors=${s.errors} warnings=${s.warnings}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

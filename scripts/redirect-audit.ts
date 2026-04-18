/**
 * Redirect chain audit for allo-maison.ma.
 * Tests a set of critical URLs (http, www, old WP paths, trailing slash)
 * and reports the number of hops before the final 200.
 *
 * Usage: npx tsx scripts/redirect-audit.ts
 */

const TEST_URLS = [
  // http + www
  "http://www.allo-maison.ma/",
  "http://www.allo-maison.ma/femme-de-menage/",
  "http://allo-maison.ma/",
  "https://www.allo-maison.ma/",
  "https://www.allo-maison.ma/femme-de-menage",
  // Old WordPress URLs with trailing slash
  "https://allo-maison.ma/femme-de-menage/",
  "https://allo-maison.ma/nos-processus/",
  "https://allo-maison.ma/concierge/",
  "https://allo-maison.ma/cuisiniere/",
  "https://allo-maison.ma/agent-de-securite/",
  // Canonical trailing slash normalization
  "https://allo-maison.ma/services/",
  "https://allo-maison.ma/tarifs/",
  // Known canonical (baseline)
  "https://allo-maison.ma/femme-de-menage-casablanca",
];

const MAX_HOPS = 10;
const TIMEOUT_MS = 15000;

interface Hop {
  url: string;
  status: number;
  location?: string;
}

async function follow(startUrl: string): Promise<Hop[]> {
  const hops: Hop[] = [];
  let currentUrl = startUrl;

  for (let i = 0; i < MAX_HOPS; i++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    let res: Response;
    try {
      res = await fetch(currentUrl, {
        method: "HEAD",
        redirect: "manual",
        signal: controller.signal,
        headers: { "User-Agent": "allo-maison-redirect-audit/1.0" },
      });
    } catch (err) {
      clearTimeout(timer);
      hops.push({ url: currentUrl, status: -1, location: `ERROR: ${String(err)}` });
      return hops;
    }
    clearTimeout(timer);

    const status = res.status;
    const location = res.headers.get("location") || undefined;
    hops.push({ url: currentUrl, status, location });

    if (status < 300 || status >= 400) {
      return hops;
    }
    if (!location) {
      return hops;
    }

    currentUrl = new URL(location, currentUrl).toString();
  }

  return hops;
}

function countRedirectHops(hops: Hop[]): number {
  return hops.filter((h) => h.status >= 300 && h.status < 400).length;
}

async function main() {
  console.log(`Redirect chain audit — ${TEST_URLS.length} URLs\n`);

  const results: { url: string; hops: Hop[]; count: number }[] = [];
  for (const url of TEST_URLS) {
    const hops = await follow(url);
    const count = countRedirectHops(hops);
    results.push({ url, hops, count });

    const finalStatus = hops[hops.length - 1]?.status ?? "?";
    const marker = count > 1 ? " WARNING" : "";
    console.log(`${count} hop(s) → ${finalStatus}  ${url}${marker}`);
    hops.forEach((h, i) => {
      const arrow = i === 0 ? "  ->" : "    ->";
      const tgt = h.location ? ` => ${h.location}` : "";
      console.log(`${arrow} [${h.status}] ${h.url}${tgt}`);
    });
    console.log();
  }

  const offenders = results.filter((r) => r.count > 1);
  console.log("\n=== SUMMARY ===");
  console.log(`Total tested: ${results.length}`);
  console.log(`Clean (<=1 hop): ${results.length - offenders.length}`);
  console.log(`Chains (>1 hop): ${offenders.length}`);
  if (offenders.length > 0) {
    console.log("\nURLs with multi-hop chains:");
    offenders.forEach((o) => console.log(`  ${o.count} hops — ${o.url}`));
  }
}

main().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});

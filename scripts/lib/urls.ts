/**
 * Shared canonical URL list for allo-maison.ma.
 * Single source of truth consumed by indexing, IndexNow and audit scripts.
 * Must stay in sync with app/sitemap.ts.
 */

export const BASE_URL = "https://allo-maison.ma";
export const HOST = "allo-maison.ma";

export const SERVICES = [
  "plombier",
  "electricien",
  "femme-de-menage",
  "peintre",
  "climatisation",
  "serrurier",
  "bricoleur",
  "renovation",
  "jardinier",
  "technicien-informatique",
  "demenagement",
  "carreleur",
  "menuisier",
  "etancheite",
  "desinsectisation",
  "vitrier",
  "cuisiniere",
  "concierge",
  "nounou",
];

export const CITIES = ["casablanca", "rabat", "marrakech", "tanger", "fes", "agadir"];

export const URGENCE_SLUGS = ["plombier", "electricien", "serrurier"];

export const STATIC_PAGES = [
  "",
  "/services",
  "/tarifs",
  "/contact",
  "/comment-ca-marche",
  "/garantie",
  "/a-propos",
  "/blog",
  "/confidentialite",
  "/mentions-legales",
  "/urgence",
  "/villes",
];

export function getAllUrls(): string[] {
  const urls: string[] = [];

  for (const p of STATIC_PAGES) {
    urls.push(`${BASE_URL}${p}`);
  }

  for (const s of SERVICES) {
    for (const c of CITIES) {
      urls.push(`${BASE_URL}/${s}-${c}`);
    }
  }

  for (const s of URGENCE_SLUGS) {
    urls.push(`${BASE_URL}/urgence/${s}`);
    for (const c of CITIES) {
      urls.push(`${BASE_URL}/urgence/${s}/${c}`);
    }
  }

  for (const c of CITIES) {
    urls.push(`${BASE_URL}/villes/${c}`);
  }

  return urls;
}

/**
 * Fetch the live sitemap and extract <loc> entries.
 * More resilient than the static list because it mirrors production reality.
 */
export async function getUrlsFromSitemap(
  sitemapUrl = `${BASE_URL}/sitemap.xml`,
): Promise<string[]> {
  const res = await fetch(sitemapUrl, { headers: { "User-Agent": "allo-maison-indexnow/1.0" } });
  if (!res.ok) {
    throw new Error(`Sitemap fetch failed: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();
  const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1].trim());
  return locs.filter(Boolean);
}

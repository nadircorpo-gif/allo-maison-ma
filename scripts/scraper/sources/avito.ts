import type { RawPro } from "../types";
import { classifyByKeywords } from "../mapping";
import { isMobile, isValidMoroccanPhone } from "../verifiers/phone-check";

const DELAY_MS = 1000;
const CITIES = ["casablanca", "rabat", "marrakech", "tanger", "fes", "agadir"];
const CATEGORIES = [
  "plombier", "electricien", "peintre", "menuisier", "climatisation",
  "serrurier", "jardinage", "déménagement",
  "femmes_de_ménages__nounous_et_chauffeurs",
  "services_à_domicile",
];

const EXCLUDE_PATTERNS = /cherche|recherche|besoin de|agence|société de|nous proposons|notre équipe/i;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getListingUrls(city: string, category: string, maxPages?: number): Promise<string[]> {
  const urls: string[] = [];
  let page = 1;

  while (true) {
    const url = `https://www.avito.ma/fr/${city}/${category}?o=${page}`;
    const res = await fetch(url);
    if (!res.ok) break;

    const html = await res.text();
    const adLinks = [...new Set(
      (html.match(/href="(https:\/\/www\.avito\.ma\/fr\/[^"]*\.htm)"/g) || [])
        .map((m) => m.match(/href="([^"]+)"/)?.[1])
        .filter(Boolean) as string[]
    )];

    if (adLinks.length === 0) break;
    urls.push(...adLinks);

    if (!html.includes(`?o=${page + 1}`)) break;
    if (maxPages && page >= maxPages) break;

    page++;
    await sleep(DELAY_MS);
  }

  return urls;
}

async function scrapeAd(url: string, category: string): Promise<RawPro | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const html = await res.text();

    const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const title = titleMatch?.[1]?.trim() ?? "";
    if (!title) return null;

    if (EXCLUDE_PATTERNS.test(title)) return null;

    const phoneMatches = html.match(/0[567]\d{8}/g) || [];
    const validPhones = [...new Set(phoneMatches)].filter(isValidMoroccanPhone);
    const mobilePhones = validPhones.filter(isMobile);
    if (mobilePhones.length === 0) return null;

    const urlParts = url.split("/fr/")[1]?.split("/") || [];
    const city = urlParts[0] || "";

    const quartier = urlParts.length > 2 ? urlParts[0] : null;

    const idMatch = url.match(/(\d+)\.htm$/);
    const adId = idMatch?.[1] ?? url;

    const dateMatch = html.match(/dateTime="(\d{4}-\d{2}-\d{2}T[^"]+)"/);
    const adDate = dateMatch?.[1] ?? null;

    if (adDate) {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      if (new Date(adDate) < sixMonthsAgo) return null;
    }

    const descMatch = html.match(/class="[^"]*description[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    const description = descMatch
      ? descMatch[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
      : "";

    if (EXCLUDE_PATTERNS.test(description)) return null;

    const photosCount = (html.match(/<img[^>]*data-src[^>]*>/g) || []).length;

    let services: string[] = [];
    if (category && category !== "services_à_domicile") {
      services = [category];
    }
    const keywordServices = classifyByKeywords(title + " " + description);
    if (keywordServices.length > 0) {
      services = [...new Set([...services, ...keywordServices])];
    }

    const firstName = title.length > 50 ? title.substring(0, 50) : title;

    return {
      platform: "avito",
      externalId: adId,
      firstName,
      lastName: "",
      phone: mobilePhones[0],
      photo: null,
      gender: null,
      services,
      city,
      quartier,
      lat: null,
      lng: null,
      experience: null,
      mediaCount: photosCount,
      description: description || null,
      verified: false,
      showPhone: true,
      adDate,
      photosCount,
    };
  } catch {
    return null;
  }
}

export async function scrapeAvito(options?: { maxPagesPerCategory?: number }): Promise<RawPro[]> {
  const maxPages = options?.maxPagesPerCategory;
  console.log("Starting Avito scraper...");
  const allPros: RawPro[] = [];
  const seenPhones = new Set<string>();

  for (const city of CITIES) {
    for (const category of CATEGORIES) {
      console.log(`  ${city}/${category}...`);
      const urls = await getListingUrls(city, category, maxPages);
      console.log(`    Found ${urls.length} ads`);

      for (const url of urls) {
        const pro = await scrapeAd(url, category);
        if (pro && pro.phone && !seenPhones.has(pro.phone)) {
          seenPhones.add(pro.phone);
          allPros.push(pro);
        }
        await sleep(DELAY_MS);
      }
    }
  }

  console.log(`Avito: ${allPros.length} unique pros scraped`);
  return allPros;
}

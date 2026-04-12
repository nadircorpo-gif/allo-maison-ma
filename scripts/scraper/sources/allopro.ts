import { chromium } from "playwright";
import type { RawPro } from "../types";

const SITEMAP_URL = "https://www.allopro.ma/rz_listing-sitemap.xml";
const DELAY_MS = 2000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchSitemapUrls(): Promise<string[]> {
  const res = await fetch(SITEMAP_URL);
  const xml = await res.text();
  const urls: string[] = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    const url = match[1];
    if (url !== "https://www.allopro.ma/listing/") {
      urls.push(url);
    }
  }
  return urls;
}

export async function scrapeAllopro(): Promise<RawPro[]> {
  console.log("Starting AlloPro scraper...");
  const urls = await fetchSitemapUrls();
  console.log(`  Found ${urls.length} listings in sitemap`);

  const browser = await chromium.launch();
  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });
  const allPros: RawPro[] = [];

  try {
    for (let i = 0; i < urls.length; i++) {
      try {
        await page.goto(urls[i], { waitUntil: "domcontentloaded", timeout: 20000 });
        await sleep(DELAY_MS);

        const html = await page.content();

        // Extract title from h1
        const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
        const title = titleMatch?.[1]?.trim() ?? "";
        if (!title) continue;

        // Extract categories
        const categories: string[] = [];
        const catRegex = /class="[^"]*rz--category[^"]*"[^>]*>([^<]+)</g;
        let catMatch;
        while ((catMatch = catRegex.exec(html)) !== null) {
          const text = catMatch[1].trim();
          if (text) categories.push(text);
        }

        // Extract location
        const locMatch = html.match(/class="[^"]*rz--location[^"]*"[^>]*>([^<]+)</);
        const location = locMatch?.[1]?.trim() ?? "";

        // Extract description
        const descMatch = html.match(/class="[^"]*rz--description[^"]*"[^>]*>([\s\S]*?)<\//);
        const description = descMatch?.[1]?.trim() ?? "";

        // Count images
        const imageMatches = html.match(/class="[^"]*rz-gallery[^"]*"[\s\S]*?<\/div>/);
        const imageCount = imageMatches ? (imageMatches[0].match(/<img/g) || []).length : 0;

        const cityMatch = location.match(/^([^,]+)/);
        const city = cityMatch?.[1]?.trim() ?? null;

        allPros.push({
          platform: "allopro",
          externalId: urls[i].split("/listing/")[1]?.replace(/\/$/, "") ?? urls[i],
          firstName: title,
          lastName: "",
          phone: null,
          photo: null,
          gender: null,
          services: categories,
          city,
          quartier: null,
          lat: null,
          lng: null,
          experience: null,
          mediaCount: imageCount,
          description: description || null,
          verified: false,
          showPhone: false,
        });

        if ((i + 1) % 20 === 0) {
          console.log(`  Scraped ${i + 1}/${urls.length} listings`);
        }
      } catch (err) {
        console.error(`  Error scraping ${urls[i]}:`, err);
      }
    }
  } finally {
    await browser.close();
  }

  console.log(`AlloPro: ${allPros.length} pros scraped`);
  return allPros;
}

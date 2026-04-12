import { chromium, type Page } from "playwright";
import type { RawPro } from "../types";

const BASE_URL = "https://www.m3allem.ma";
const SERVICE_IDS = Array.from({ length: 29 }, (_, i) => i + 1);
const DELAY_MS = 1000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getProIdsFromServicePage(
  page: Page,
  serviceId: number,
  pageNum: number
): Promise<string[]> {
  const url = `${BASE_URL}/service.php?specialite=${serviceId}&PageNum=${pageNum}`;

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
  await sleep(DELAY_MS);

  const html = await page.content();
  const ids = new Set<string>();
  const regex = /\/fichem3allem\/[^/]+\/(\d+)\.html/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    ids.add(match[1]);
  }
  return [...ids];
}

async function getMaxPage(page: Page, serviceId: number): Promise<number> {
  const url = `${BASE_URL}/service.php?specialite=${serviceId}&PageNum=1`;
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
  await sleep(DELAY_MS);

  const html = await page.content();
  let max = 1;
  const regex = /PageNum=(\d+)/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const num = parseInt(match[1], 10);
    if (num > max) max = num;
  }
  return max;
}

async function scrapeProProfile(page: Page, proId: string): Promise<RawPro | null> {
  const url = `${BASE_URL}/fichem3allem/m3allem/${proId}.html`;

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
    await sleep(DELAY_MS);
  } catch {
    console.error(`Failed to load profile ${proId}`);
    return null;
  }

  const html = await page.content();

  // Extract name from title
  const titleMatch = html.match(/Fiche du m3allem\s*:\s*([^<]+)/);
  const fullName = titleMatch?.[1]?.trim() ?? "";
  if (!fullName) return null;

  // Extract fields from <th>Label</th><td>Value</td> pattern
  function getField(label: string): string {
    const regex = new RegExp(
      `<th>${label}</th>\\s*<td[^>]*>([^<]+)</td>`,
      "s"
    );
    const match = html.match(regex);
    return match?.[1]?.trim() ?? "";
  }

  const phone = getField("Téléphone");
  const ville = getField("Ville");
  const quartier = getField("Quartier");

  // Extract services from speciality images
  const services: string[] = [];
  const specRegex = /specialites\/(.+?)\.png/g;
  let specMatch;
  while ((specMatch = specRegex.exec(html)) !== null) {
    const name = specMatch[1].charAt(0).toUpperCase() + specMatch[1].slice(1);
    if (!services.includes(name)) services.push(name);
  }

  // Parse "LASTNAME Firstname" format
  const nameParts = fullName.split(/\s+/);
  let lastName = "";
  let firstName = "";

  if (nameParts.length >= 2) {
    const firstUpperIdx = nameParts.findIndex(
      (p, i) => i > 0 && p !== p.toUpperCase()
    );
    if (firstUpperIdx > 0) {
      lastName = nameParts.slice(0, firstUpperIdx).join(" ");
      firstName = nameParts.slice(firstUpperIdx).join(" ");
    } else {
      lastName = nameParts[0];
      firstName = nameParts.slice(1).join(" ");
    }
  } else {
    firstName = fullName;
  }

  return {
    platform: "m3allem",
    externalId: proId,
    firstName,
    lastName,
    phone: phone || null,
    photo: null,
    gender: null,
    services,
    city: ville || null,
    quartier: quartier || null,
    lat: null,
    lng: null,
    experience: null,
    mediaCount: null,
    description: null,
    verified: false,
    showPhone: !!phone,
  };
}

export async function scrapeM3allem(): Promise<RawPro[]> {
  console.log("Starting M3allem scraper...");
  const browser = await chromium.launch({
    args: ["--ignore-certificate-errors"],
  });
  const page = await browser.newPage();
  const allPros: RawPro[] = [];
  const seenIds = new Set<string>();

  try {
    for (const serviceId of SERVICE_IDS) {
      const maxPage = await getMaxPage(page, serviceId);
      console.log(`  Service ${serviceId}: ${maxPage} pages`);

      for (let p = 1; p <= maxPage; p++) {
        const ids = await getProIdsFromServicePage(page, serviceId, p);
        for (const id of ids) {
          if (seenIds.has(id)) continue;
          seenIds.add(id);
        }
      }
    }

    console.log(`  Found ${seenIds.size} unique pro IDs. Scraping profiles...`);

    let count = 0;
    for (const id of seenIds) {
      const pro = await scrapeProProfile(page, id);
      if (pro) {
        allPros.push(pro);
        count++;
        if (count % 50 === 0) {
          console.log(`  Scraped ${count}/${seenIds.size} profiles`);
        }
      }
    }
  } finally {
    await browser.close();
  }

  console.log(`M3allem: ${allPros.length} pros scraped`);
  return allPros;
}

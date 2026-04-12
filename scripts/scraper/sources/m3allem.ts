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
  const url =
    pageNum === 1
      ? `${BASE_URL}/service.php?specialite=${serviceId}&PageNum=1`
      : `${BASE_URL}/service.php?specialite=${serviceId}&PageNum=${pageNum}`;

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
  await sleep(DELAY_MS);

  const ids = await page.evaluate(() => {
    const links = document.querySelectorAll('a[href*="/fichem3allem/"]');
    const idSet = new Set<string>();
    links.forEach((link) => {
      const match = link.getAttribute("href")?.match(/\/fichem3allem\/[^/]+\/(\d+)\.html/);
      if (match) idSet.add(match[1]);
    });
    return [...idSet];
  });

  return ids;
}

async function getMaxPage(page: Page, serviceId: number): Promise<number> {
  const url = `${BASE_URL}/service.php?specialite=${serviceId}&PageNum=1`;
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
  await sleep(DELAY_MS);

  const maxPage = await page.evaluate(() => {
    const links = document.querySelectorAll('a[href*="PageNum="]');
    let max = 1;
    links.forEach((link) => {
      const match = link.getAttribute("href")?.match(/PageNum=(\d+)/);
      if (match) max = Math.max(max, parseInt(match[1], 10));
    });
    return max;
  });

  return maxPage;
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

  const data = await page.evaluate(() => {
    const getText = (th: string): string => {
      const rows = document.querySelectorAll("tr");
      for (const row of rows) {
        const header = row.querySelector("th");
        if (header && header.textContent?.trim() === th) {
          const td = row.querySelector("td");
          return td?.textContent?.trim() ?? "";
        }
      }
      return "";
    };

    const titleMatch = document.title.match(/Fiche du m3allem\s*:\s*(.+)/);
    const fullName = titleMatch?.[1]?.trim() ?? "";

    const services: string[] = [];
    const specImages = document.querySelectorAll('img[src*="/specialites/"]');
    specImages.forEach((img) => {
      const src = img.getAttribute("src") ?? "";
      const match = src.match(/specialites\/(.+?)\.png/);
      if (match) {
        const name = match[1].charAt(0).toUpperCase() + match[1].slice(1);
        services.push(name);
      }
    });

    return {
      fullName,
      phone: getText("Téléphone"),
      ville: getText("Ville"),
      quartier: getText("Quartier"),
      services,
    };
  });

  if (!data.fullName) return null;

  const nameParts = data.fullName.split(/\s+/);
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
    firstName = data.fullName;
  }

  return {
    platform: "m3allem",
    externalId: proId,
    firstName,
    lastName,
    phone: data.phone || null,
    photo: null,
    gender: null,
    services: data.services,
    city: data.ville || null,
    quartier: data.quartier || null,
    lat: null,
    lng: null,
    experience: null,
    mediaCount: null,
    description: null,
    verified: false,
    showPhone: !!data.phone,
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

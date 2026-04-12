import type { RawPro } from "../types";

const BASE_URL = "https://bricool.ma/api/v1";
const PAGE_SIZE = 20;
const DELAY_MS = 200;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface BriCoolWorker {
  uid: string;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  picture: string | null;
  showPhone: boolean;
  activities: Array<{
    frName: string;
    arName: string;
    enName: string;
  }>;
  address: {
    locality: string | null;
    location?: {
      latitude: number;
      longitude: number;
    };
  } | null;
  reviewsAverage: number;
  verification: {
    profileVerified: boolean;
    idCardVerified: boolean;
    workerCardVerified: boolean;
    emailVerified: boolean;
    phoneVerified: boolean;
  };
  mediaCount: number;
}

interface BriCoolDetailWorker extends BriCoolWorker {
  description: string | null;
  experience: number | null;
  medias: string[];
}

function toRawPro(worker: BriCoolWorker | BriCoolDetailWorker): RawPro {
  const detail = worker as BriCoolDetailWorker;
  return {
    platform: "bricool",
    externalId: worker.uid,
    firstName: worker.firstName ?? null,
    lastName: worker.lastName ?? null,
    phone: null,
    photo: worker.picture ? `https://bricool.ma/uploads/${worker.picture}` : null,
    gender: worker.gender ?? null,
    services: (worker.activities ?? []).map((a) => a.frName),
    city: worker.address?.locality ?? null,
    quartier: null,
    lat: worker.address?.location?.latitude ?? null,
    lng: worker.address?.location?.longitude ?? null,
    experience: detail.experience ?? null,
    mediaCount: worker.mediaCount ?? null,
    description: detail.description ?? null,
    verified: worker.verification?.profileVerified ?? false,
    showPhone: worker.showPhone ?? false,
  };
}

async function fetchPage(page: number): Promise<{ workers: BriCoolWorker[]; totalPages: number }> {
  const url = `${BASE_URL}/search/workers?page=${page}&size=${PAGE_SIZE}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`BriCool API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return {
    workers: data.page.content,
    totalPages: data.page.totalPages,
  };
}

async function fetchDetail(uid: string): Promise<BriCoolDetailWorker | null> {
  try {
    const res = await fetch(`${BASE_URL}/workers/${uid}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function scrapeBricool(options?: {
  maxPages?: number;
  enrichDetails?: boolean;
}): Promise<RawPro[]> {
  const maxPages = options?.maxPages;
  const enrichDetails = options?.enrichDetails ?? false;

  console.log("Starting BriCool scraper...");
  const allPros: RawPro[] = [];

  const first = await fetchPage(0);
  const totalPages = maxPages ? Math.min(maxPages, first.totalPages) : first.totalPages;
  console.log(`  Total pages: ${totalPages} (${totalPages * PAGE_SIZE} workers)`);

  for (const w of first.workers) {
    allPros.push(toRawPro(w));
  }

  for (let page = 1; page < totalPages; page++) {
    try {
      const { workers } = await fetchPage(page);
      for (const w of workers) {
        allPros.push(toRawPro(w));
      }

      if (page % 100 === 0) {
        console.log(`  Page ${page}/${totalPages} (${allPros.length} workers)`);
      }
    } catch (err) {
      console.error(`  Error on page ${page}:`, err);
    }

    await sleep(DELAY_MS);
  }

  if (enrichDetails) {
    console.log(`  Enriching ${allPros.length} workers with detail endpoint...`);
    for (let i = 0; i < allPros.length; i++) {
      const detail = await fetchDetail(allPros[i].externalId);
      if (detail) {
        allPros[i] = toRawPro(detail);
      }
      if (i % 200 === 0 && i > 0) {
        console.log(`  Enriched ${i}/${allPros.length}`);
      }
      await sleep(DELAY_MS);
    }
  }

  console.log(`BriCool: ${allPros.length} pros scraped`);
  return allPros;
}

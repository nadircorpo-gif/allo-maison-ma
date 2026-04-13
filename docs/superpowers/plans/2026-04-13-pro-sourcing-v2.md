# Pro Sourcing v2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Avito.ma scraping, Google Places enrichment, WhatsApp verification, and Score Maison v2 to the existing pro sourcing pipeline, pushing results to Supabase.

**Architecture:** Extends `scripts/scraper/` with new source (avito.ts), enrichers (google-places.ts), verifiers (whatsapp.ts, phone-check.ts), scoring-v2.ts, and supabase-push.ts. Each module reads/writes to Supabase independently — no in-memory pipeline coupling.

**Tech Stack:** TypeScript, tsx, native fetch (Avito + Google), @whiskeysockets/baileys (WhatsApp), @supabase/supabase-js, Vitest

---

## File Structure

```
scripts/scraper/
├── types.ts                    # MODIFIED — add Platform "avito", add v2 fields
├── mapping.ts                  # MODIFIED — add Avito service map + keyword classifier
├── filters.ts                  # MODIFIED — add Avito-specific filters
├── supabase-push.ts            # NEW — push/update pros to Supabase
├── sources/
│   └── avito.ts                # NEW — HTTP scraper for all Avito categories
├── enrichers/
│   └── google-places.ts        # NEW — Google Places API search + details
├── verifiers/
│   ├── phone-check.ts          # NEW — format validation, mobile/fixe, dedup
│   └── whatsapp.ts             # NEW — Baileys WA Business check
├── scoring-v2.ts               # NEW — Score Maison v2 with 7 criteria
├── __tests__/
│   ├── mapping.test.ts         # MODIFIED — add Avito tests
│   ├── filters.test.ts         # MODIFIED — add Avito filter tests
│   ├── phone-check.test.ts     # NEW
│   └── scoring-v2.test.ts      # NEW
└── index-v2.ts                 # NEW — v2 orchestrator (phases 4-7)
```

---

### Task 1: Update types and install dependencies

**Files:**
- Modify: `scripts/scraper/types.ts`
- Modify: `package.json`

- [ ] **Step 1: Install new dependencies**

```bash
npm install @whiskeysockets/baileys @supabase/supabase-js
```

- [ ] **Step 2: Update Platform type and add v2 fields to types.ts**

Add `"avito"` to Platform. Add new interfaces for v2 data:

```typescript
export type Platform = "m3allem" | "bricool" | "allopro" | "avito";

// Add to RawPro:
export interface RawPro {
  // ... existing fields ...
  adDate: string | null;       // ISO date of ad publication (Avito)
  photosCount: number | null;  // number of photos in ad (Avito)
}

// Add new interface for Supabase pro (extends NormalizedPro with v2 fields)
export interface SupabasePro {
  id?: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  photo: string | null;
  gender: string | null;
  services: string[];
  city: string;
  quartier: string | null;
  lat: number | null;
  lng: number | null;
  score_maison: number;
  score_completude: number;
  score_joignabilite: number;
  score_multi_plateforme: number;
  score_experience: number;
  score_google: number;
  score_wa: number;
  score_recency: number;
  sources: SourceEntry[];
  experience: number | null;
  media_count: number | null;
  description: string | null;
  verified: boolean;
  status: string;
  // Google Places
  google_rating: number | null;
  google_reviews_count: number | null;
  google_place_id: string | null;
  google_photos: string[] | null;
  // WhatsApp
  wa_exists: boolean | null;
  wa_business: boolean | null;
  wa_name: string | null;
  wa_description: string | null;
  wa_photo: string | null;
  // Avito
  avito_ad_date: string | null;
  avito_photos_count: number | null;
}

export interface ScoreDetailsV2 {
  google: number;          // 0-2 (rating 1.5 + reviews 0.5)
  whatsapp: number;        // 0-0.75
  multiPlateforme: number; // 0-0.75
  completude: number;      // 0-0.75
  recency: number;         // 0-0.5
  phoneVerified: number;   // 0-0.25
}
```

- [ ] **Step 3: Commit**

```bash
git add scripts/scraper/types.ts package.json package-lock.json
git commit -m "feat(scraper): add v2 types — Platform avito, SupabasePro, ScoreDetailsV2"
```

---

### Task 2: Supabase push module + schema migration

**Files:**
- Create: `scripts/scraper/supabase-push.ts`

- [ ] **Step 1: Run schema migration on Supabase**

```bash
curl -s -X POST "https://api.supabase.com/v1/projects/ejqrxoeykfrcxutjdmvr/database/query" \
  -H "Authorization: Bearer sbp_195cb624a28c1cfdcd0eb97d810f63919de7f44c" \
  -H "Content-Type: application/json" \
  -d '{"query": "ALTER TABLE professionals ADD COLUMN IF NOT EXISTS google_rating NUMERIC(2,1); ALTER TABLE professionals ADD COLUMN IF NOT EXISTS google_reviews_count INTEGER; ALTER TABLE professionals ADD COLUMN IF NOT EXISTS google_place_id TEXT; ALTER TABLE professionals ADD COLUMN IF NOT EXISTS google_photos TEXT[]; ALTER TABLE professionals ADD COLUMN IF NOT EXISTS wa_exists BOOLEAN; ALTER TABLE professionals ADD COLUMN IF NOT EXISTS wa_business BOOLEAN; ALTER TABLE professionals ADD COLUMN IF NOT EXISTS wa_name TEXT; ALTER TABLE professionals ADD COLUMN IF NOT EXISTS wa_description TEXT; ALTER TABLE professionals ADD COLUMN IF NOT EXISTS wa_photo TEXT; ALTER TABLE professionals ADD COLUMN IF NOT EXISTS avito_ad_date TIMESTAMPTZ; ALTER TABLE professionals ADD COLUMN IF NOT EXISTS avito_photos_count INTEGER; ALTER TABLE professionals ADD COLUMN IF NOT EXISTS score_google NUMERIC(3,2) DEFAULT 0; ALTER TABLE professionals ADD COLUMN IF NOT EXISTS score_wa NUMERIC(3,2) DEFAULT 0; ALTER TABLE professionals ADD COLUMN IF NOT EXISTS score_recency NUMERIC(3,2) DEFAULT 0;"}'
```

- [ ] **Step 2: Write supabase-push.ts**

```typescript
import { createClient } from "@supabase/supabase-js";
import type { SupabasePro } from "./types";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://ejqrxoeykfrcxutjdmvr.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcXJ4b2V5a2ZyY3h1dGpkbXZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjA3MjQyNCwiZXhwIjoyMDkxNjQ4NDI0fQ.2Pi6p1b1TKyLWtBQiTvv8f9kg0YYUxVDLIXEVWo5q98";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function upsertPro(pro: Partial<SupabasePro> & { phone: string }): Promise<string | null> {
  // Try to find existing by phone
  const { data: existing } = await supabase
    .from("professionals")
    .select("id, sources")
    .eq("phone", pro.phone)
    .limit(1)
    .single();

  if (existing) {
    // Merge sources if new platform
    const mergedSources = existing.sources || [];
    if (pro.sources) {
      for (const s of pro.sources) {
        if (!mergedSources.some((e: any) => e.platform === s.platform && e.externalId === s.externalId)) {
          mergedSources.push(s);
        }
      }
    }
    const { error } = await supabase
      .from("professionals")
      .update({ ...pro, sources: mergedSources })
      .eq("id", existing.id);
    if (error) console.error("Update error:", error.message);
    return existing.id;
  } else {
    const { data, error } = await supabase
      .from("professionals")
      .insert(pro)
      .select("id")
      .single();
    if (error) console.error("Insert error:", error.message);
    return data?.id ?? null;
  }
}

export async function upsertBatch(pros: Array<Partial<SupabasePro> & { phone: string }>): Promise<{ pushed: number; errors: number }> {
  let pushed = 0;
  let errors = 0;
  for (const pro of pros) {
    const id = await upsertPro(pro);
    if (id) pushed++;
    else errors++;
  }
  return { pushed, errors };
}

export async function updatePro(id: string, fields: Partial<SupabasePro>): Promise<boolean> {
  const { error } = await supabase
    .from("professionals")
    .update(fields)
    .eq("id", id);
  if (error) {
    console.error("Update error:", error.message);
    return false;
  }
  return true;
}

export async function getAllPros(filters?: { withPhone?: boolean; status?: string }): Promise<SupabasePro[]> {
  let query = supabase.from("professionals").select("*");
  if (filters?.withPhone) query = query.not("phone", "is", null);
  if (filters?.status) query = query.eq("status", filters.status);
  const { data, error } = await query;
  if (error) {
    console.error("Query error:", error.message);
    return [];
  }
  return data as SupabasePro[];
}
```

- [ ] **Step 3: Commit**

```bash
git add scripts/scraper/supabase-push.ts
git commit -m "feat(scraper): add Supabase push module with upsert, update, and query helpers"
```

---

### Task 3: Update mapping with Avito categories + keyword classifier

**Files:**
- Modify: `scripts/scraper/mapping.ts`
- Modify: `scripts/scraper/__tests__/mapping.test.ts`

- [ ] **Step 1: Add Avito service map and keyword classifier to mapping.ts**

Add after existing code in mapping.ts:

```typescript
const AVITO_SERVICE_MAP: Record<string, string> = {
  plombier: "plombier",
  electricien: "electricien",
  peintre: "peintre",
  menuisier: "menuisier",
  climatisation: "climatisation",
  serrurier: "serrurier",
  jardinage: "jardinier",
  "déménagement": "demenagement",
  "femmes_de_ménages__nounous_et_chauffeurs": "femme-de-menage",
};

// Update SERVICE_MAPS to include avito
const SERVICE_MAPS: Record<Platform, Record<string, string>> = {
  m3allem: M3ALLEM_SERVICE_MAP,
  bricool: BRICOOL_SERVICE_MAP,
  allopro: BRICOOL_SERVICE_MAP,
  avito: AVITO_SERVICE_MAP,
};

const SERVICE_KEYWORDS: Array<{ pattern: RegExp; slug: string }> = [
  { pattern: /plomb/i, slug: "plombier" },
  { pattern: /electri/i, slug: "electricien" },
  { pattern: /peint/i, slug: "peintre" },
  { pattern: /menuisi/i, slug: "menuisier" },
  { pattern: /clim|froid/i, slug: "climatisation" },
  { pattern: /serru/i, slug: "serrurier" },
  { pattern: /ménage|nettoy/i, slug: "femme-de-menage" },
  { pattern: /jardin/i, slug: "jardinier" },
  { pattern: /déménag/i, slug: "demenagement" },
  { pattern: /carrel|zelij/i, slug: "carreleur" },
  { pattern: /étanch/i, slug: "etancheite" },
  { pattern: /vitr|alumin/i, slug: "vitrier" },
  { pattern: /bricol/i, slug: "bricoleur" },
  { pattern: /rénov|maçon/i, slug: "renovation" },
  { pattern: /inform|ordi/i, slug: "technicien-informatique" },
  { pattern: /insect|cafard|rat\b/i, slug: "desinsectisation" },
];

export function classifyByKeywords(text: string): string[] {
  if (!text) return [];
  const slugs = new Set<string>();
  for (const { pattern, slug } of SERVICE_KEYWORDS) {
    if (pattern.test(text)) slugs.add(slug);
  }
  return [...slugs];
}
```

- [ ] **Step 2: Add tests for Avito mapping and keyword classifier**

Add to mapping.test.ts:

```typescript
import { classifyByKeywords } from "../mapping";

describe("mapService avito", () => {
  it("maps Avito category names", () => {
    expect(mapService("plombier", "avito")).toEqual(["plombier"]);
    expect(mapService("climatisation", "avito")).toEqual(["climatisation"]);
    expect(mapService("jardinage", "avito")).toEqual(["jardinier"]);
  });
});

describe("classifyByKeywords", () => {
  it("classifies by keywords in text", () => {
    expect(classifyByKeywords("plombier professionnel")).toContain("plombier");
    expect(classifyByKeywords("installation climatisation")).toContain("climatisation");
    expect(classifyByKeywords("femme de ménage expérimentée")).toContain("femme-de-menage");
    expect(classifyByKeywords("rénovation et maçonnerie")).toEqual(expect.arrayContaining(["renovation"]));
  });

  it("returns empty for unrelated text", () => {
    expect(classifyByKeywords("bonjour le monde")).toEqual([]);
  });

  it("finds multiple services in one text", () => {
    const result = classifyByKeywords("plombier et electricien disponible");
    expect(result).toContain("plombier");
    expect(result).toContain("electricien");
  });
});
```

- [ ] **Step 3: Run tests**

```bash
npx vitest run scripts/scraper/__tests__/mapping.test.ts
```

- [ ] **Step 4: Commit**

```bash
git add scripts/scraper/mapping.ts scripts/scraper/__tests__/mapping.test.ts
git commit -m "feat(scraper): add Avito service map and keyword classifier"
```

---

### Task 4: Phone check module

**Files:**
- Create: `scripts/scraper/verifiers/phone-check.ts`
- Create: `scripts/scraper/__tests__/phone-check.test.ts`

- [ ] **Step 1: Write tests**

```typescript
import { describe, it, expect } from "vitest";
import { formatPhone, isMobile, isValidMoroccanPhone, detectDuplicatePhones } from "../verifiers/phone-check";

describe("formatPhone", () => {
  it("formats 06 numbers to 212", () => {
    expect(formatPhone("0661409190")).toBe("212661409190");
    expect(formatPhone("06 61 40 91 90")).toBe("212661409190");
  });
  it("handles +212 prefix", () => {
    expect(formatPhone("+212661409190")).toBe("212661409190");
  });
  it("returns null for invalid", () => {
    expect(formatPhone("12345")).toBeNull();
    expect(formatPhone("")).toBeNull();
  });
});

describe("isMobile", () => {
  it("identifies mobile numbers", () => {
    expect(isMobile("0661409190")).toBe(true);
    expect(isMobile("0712345678")).toBe(true);
  });
  it("identifies fixe numbers", () => {
    expect(isMobile("0522334455")).toBe(false);
  });
});

describe("isValidMoroccanPhone", () => {
  it("validates correct phones", () => {
    expect(isValidMoroccanPhone("0661409190")).toBe(true);
  });
  it("rejects invalid phones", () => {
    expect(isValidMoroccanPhone("123")).toBe(false);
    expect(isValidMoroccanPhone("0861409190")).toBe(false);
  });
});

describe("detectDuplicatePhones", () => {
  it("finds duplicates", () => {
    const phones = ["0661409190", "0712345678", "0661409190"];
    expect(detectDuplicatePhones(phones)).toEqual(["0661409190"]);
  });
});
```

- [ ] **Step 2: Write implementation**

```typescript
export function formatPhone(raw: string): string | null {
  if (!raw) return null;
  const cleaned = raw.replace(/[\s.\-+]/g, "");
  if (cleaned.startsWith("212") && cleaned.length === 12) return cleaned;
  if (cleaned.startsWith("0") && cleaned.length === 10) return "212" + cleaned.slice(1);
  return null;
}

export function isMobile(phone: string): boolean {
  const cleaned = phone.replace(/[\s.\-+]/g, "");
  const local = cleaned.startsWith("212") ? "0" + cleaned.slice(3) : cleaned;
  return /^0[67]\d{8}$/.test(local);
}

export function isValidMoroccanPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s.\-+]/g, "");
  const local = cleaned.startsWith("212") ? "0" + cleaned.slice(3) : cleaned;
  return /^0[5-7]\d{8}$/.test(local);
}

export function detectDuplicatePhones(phones: string[]): string[] {
  const counts = new Map<string, number>();
  for (const p of phones) {
    const formatted = formatPhone(p);
    if (formatted) counts.set(formatted, (counts.get(formatted) || 0) + 1);
  }
  return [...counts.entries()].filter(([, c]) => c > 1).map(([p]) => p);
}
```

- [ ] **Step 3: Run tests, commit**

```bash
npx vitest run scripts/scraper/__tests__/phone-check.test.ts
git add scripts/scraper/verifiers/ scripts/scraper/__tests__/phone-check.test.ts
git commit -m "feat(scraper): add phone validation — format, mobile check, dedup"
```

---

### Task 5: Avito scraper

**Files:**
- Create: `scripts/scraper/sources/avito.ts`

- [ ] **Step 1: Write Avito scraper**

```typescript
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

    // Check if there's a next page
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

    // Title
    const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const title = titleMatch?.[1]?.trim() ?? "";
    if (!title) return null;

    // Check exclusions
    if (EXCLUDE_PATTERNS.test(title)) return null;

    // Phone numbers
    const phoneMatches = html.match(/0[567]\d{8}/g) || [];
    const validPhones = [...new Set(phoneMatches)].filter(isValidMoroccanPhone);
    const mobilePhones = validPhones.filter(isMobile);
    if (mobilePhones.length === 0) return null;

    // City from URL
    const urlParts = url.split("/fr/")[1]?.split("/") || [];
    const city = urlParts[0] || "";

    // Quartier from URL
    const quartier = city !== urlParts[0] ? urlParts[0] : null;

    // Ad ID
    const idMatch = url.match(/(\d+)\.htm$/);
    const adId = idMatch?.[1] ?? url;

    // Date
    const dateMatch = html.match(/dateTime="(\d{4}-\d{2}-\d{2}T[^"]+)"/);
    const adDate = dateMatch?.[1] ?? null;

    // Check date filter (< 6 months)
    if (adDate) {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      if (new Date(adDate) < sixMonthsAgo) return null;
    }

    // Description
    const descMatch = html.match(/class="[^"]*description[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    const description = descMatch
      ? descMatch[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
      : "";

    // Check exclusions in description too
    if (EXCLUDE_PATTERNS.test(description)) return null;

    // Photos count
    const photosCount = (html.match(/<img[^>]*data-src[^>]*>/g) || []).length;

    // Classify service
    let services: string[] = [];
    // First try category mapping
    if (category && category !== "services_à_domicile") {
      services = [category];
    }
    // Then try keyword classification from title + description
    const keywordServices = classifyByKeywords(title + " " + description);
    if (keywordServices.length > 0) {
      services = [...new Set([...services, ...keywordServices])];
    }

    // Parse name from title (best effort)
    // Avito titles are like "Plombier professionnel à Casablanca" — not real names
    // We use the title as firstName and leave lastName empty
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
```

- [ ] **Step 2: Commit**

```bash
mkdir -p scripts/scraper/sources
git add scripts/scraper/sources/avito.ts
git commit -m "feat(scraper): add Avito HTTP scraper — all categories, 6 cities, phone dedup"
```

---

### Task 6: Google Places enrichment

**Files:**
- Create: `scripts/scraper/enrichers/google-places.ts`

- [ ] **Step 1: Write Google Places enricher**

Note: Requires `GOOGLE_PLACES_API_KEY` env var. Get one at https://console.cloud.google.com/apis/credentials (enable Places API New).

```typescript
import { supabase, getAllPros, updatePro } from "../supabase-push";
import { formatPhone } from "../verifiers/phone-check";
import { normalizeName, levenshtein } from "../dedup";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const DELAY_MS = 200; // 5 req/sec

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface PlaceResult {
  rating?: number;
  userRatingCount?: number;
  id?: string;
  photos?: Array<{ name: string }>;
  nationalPhoneNumber?: string;
  displayName?: { text: string };
}

async function searchPlace(query: string): Promise<PlaceResult | null> {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY!,
      "X-Goog-FieldMask": "places.id,places.rating,places.userRatingCount,places.photos,places.nationalPhoneNumber,places.displayName",
    },
    body: JSON.stringify({
      textQuery: query,
      locationBias: {
        rectangle: {
          low: { latitude: 27.6, longitude: -13.2 },  // Morocco SW
          high: { latitude: 35.9, longitude: -1.0 },   // Morocco NE
        },
      },
      maxResultCount: 3,
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.places?.[0] ?? null;
}

function matchesPhone(place: PlaceResult, phone: string): boolean {
  if (!place.nationalPhoneNumber) return false;
  const placeFormatted = formatPhone(place.nationalPhoneNumber);
  const proFormatted = formatPhone(phone);
  return placeFormatted === proFormatted;
}

function matchesName(place: PlaceResult, firstName: string, lastName: string): boolean {
  if (!place.displayName?.text) return false;
  const placeName = normalizeName(place.displayName.text);
  const proName = normalizeName(firstName + " " + lastName);
  return levenshtein(placeName, proName) <= 3;
}

export async function enrichWithGooglePlaces(): Promise<{ enriched: number; skipped: number }> {
  if (!API_KEY) {
    console.error("GOOGLE_PLACES_API_KEY not set. Skipping Google Places enrichment.");
    return { enriched: 0, skipped: 0 };
  }

  console.log("Starting Google Places enrichment...");
  const pros = await getAllPros({ withPhone: true, status: "scraped" });
  console.log(`  ${pros.length} pros to enrich`);

  let enriched = 0;
  let skipped = 0;

  for (let i = 0; i < pros.length; i++) {
    const pro = pros[i];
    if (pro.google_place_id) { skipped++; continue; } // Already enriched

    // Strategy 1: Search by phone
    let place = await searchPlace(pro.phone!);
    await sleep(DELAY_MS);

    let matched = false;
    if (place && matchesPhone(place, pro.phone!)) {
      matched = true;
    }

    // Strategy 2: Search by name + service + city
    if (!matched) {
      const service = pro.services?.[0] ?? "";
      const query = `${service} ${pro.first_name} ${pro.last_name} ${pro.city}`;
      place = await searchPlace(query);
      await sleep(DELAY_MS);

      if (place && (matchesPhone(place, pro.phone!) || matchesName(place, pro.first_name, pro.last_name))) {
        matched = true;
      }
    }

    if (matched && place) {
      await updatePro(pro.id!, {
        google_rating: place.rating ?? null,
        google_reviews_count: place.userRatingCount ?? null,
        google_place_id: place.id ?? null,
        google_photos: place.photos?.map((p) => p.name) ?? null,
      });
      enriched++;
    } else {
      skipped++;
    }

    if ((i + 1) % 100 === 0) {
      console.log(`  Progress: ${i + 1}/${pros.length} (enriched: ${enriched})`);
    }
  }

  console.log(`Google Places: ${enriched} enriched, ${skipped} skipped`);
  return { enriched, skipped };
}
```

- [ ] **Step 2: Commit**

```bash
mkdir -p scripts/scraper/enrichers
git add scripts/scraper/enrichers/google-places.ts
git commit -m "feat(scraper): add Google Places enrichment — search by phone then name+city"
```

---

### Task 7: WhatsApp verification

**Files:**
- Create: `scripts/scraper/verifiers/whatsapp.ts`

- [ ] **Step 1: Write WhatsApp verifier**

```typescript
import makeWASocket, { DisconnectReason, useMultiFileAuthState } from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import * as path from "path";
import { getAllPros, updatePro } from "../supabase-push";
import { formatPhone } from "./phone-check";

const AUTH_DIR = path.join(process.cwd(), ".wa-auth");
const DELAY_MS = 1000; // 1 check/sec to avoid ban

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function createSocket() {
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("creds.update", saveCreds);

  // Wait for connection
  await new Promise<void>((resolve, reject) => {
    sock.ev.on("connection.update", (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === "close") {
        const shouldReconnect =
          (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
        if (shouldReconnect) {
          reject(new Error("Connection closed, reconnecting..."));
        } else {
          reject(new Error("Logged out. Delete .wa-auth and scan QR again."));
        }
      } else if (connection === "open") {
        console.log("  WhatsApp connected!");
        resolve();
      }
    });
  });

  return sock;
}

export async function verifyWhatsApp(): Promise<{ verified: number; notOnWA: number; errors: number }> {
  console.log("Starting WhatsApp verification...");
  console.log("  If this is the first run, scan the QR code with your WhatsApp.");

  const sock = await createSocket();
  const pros = await getAllPros({ withPhone: true, status: "scraped" });
  console.log(`  ${pros.length} pros to verify`);

  let verified = 0;
  let notOnWA = 0;
  let errors = 0;

  for (let i = 0; i < pros.length; i++) {
    const pro = pros[i];
    if (pro.wa_exists !== null) continue; // Already checked

    const formatted = formatPhone(pro.phone!);
    if (!formatted) { errors++; continue; }

    const jid = formatted + "@s.whatsapp.net";

    try {
      // Check if number is on WhatsApp
      const [result] = await sock.onWhatsApp(jid);

      if (result?.exists) {
        // Get business profile
        let waBusiness = false;
        let waDescription: string | null = null;

        try {
          const bizProfile = await sock.getBusinessProfile(result.jid);
          if (bizProfile) {
            waBusiness = true;
            waDescription = bizProfile.description || null;
          }
        } catch {
          // Not a business account, that's OK
        }

        // Get profile picture
        let waPhoto: string | null = null;
        try {
          waPhoto = await sock.profilePictureUrl(result.jid, "image");
        } catch {
          // No profile pic
        }

        // Get display name
        let waName: string | null = null;
        try {
          const status = await sock.fetchStatus(result.jid);
          waName = typeof status === "object" && status ? (status as any).status : null;
        } catch {}

        await updatePro(pro.id!, {
          wa_exists: true,
          wa_business: waBusiness,
          wa_name: waName,
          wa_description: waDescription,
          wa_photo: waPhoto,
        });
        verified++;
      } else {
        await updatePro(pro.id!, { wa_exists: false, wa_business: false });
        notOnWA++;
      }
    } catch (err) {
      console.error(`  Error checking ${pro.phone}:`, err);
      errors++;
    }

    if ((i + 1) % 100 === 0) {
      console.log(`  Progress: ${i + 1}/${pros.length} (WA: ${verified}, not: ${notOnWA})`);
    }

    await sleep(DELAY_MS);
  }

  await sock.end(undefined);
  console.log(`WhatsApp: ${verified} verified, ${notOnWA} not on WA, ${errors} errors`);
  return { verified, notOnWA, errors };
}
```

- [ ] **Step 2: Add .wa-auth to .gitignore**

```bash
echo ".wa-auth/" >> .gitignore
```

- [ ] **Step 3: Commit**

```bash
git add scripts/scraper/verifiers/whatsapp.ts .gitignore
git commit -m "feat(scraper): add WhatsApp Business verification via Baileys"
```

---

### Task 8: Score Maison v2

**Files:**
- Create: `scripts/scraper/scoring-v2.ts`
- Create: `scripts/scraper/__tests__/scoring-v2.test.ts`

- [ ] **Step 1: Write tests**

```typescript
import { describe, it, expect } from "vitest";
import { calculateScoreV2 } from "../scoring-v2";
import type { SupabasePro } from "../types";

const basePro: Partial<SupabasePro> = {
  first_name: "Mohammed",
  last_name: "Bouziane",
  phone: "0661409190",
  services: ["plombier"],
  city: "casablanca",
  sources: [{ platform: "m3allem", externalId: "12", scrapedAt: "2026-04-13" }],
  status: "scraped",
};

describe("calculateScoreV2", () => {
  it("scores basic pro with no Google/WA", () => {
    const { score, details } = calculateScoreV2(basePro as SupabasePro);
    expect(details.google).toBe(0);
    expect(details.whatsapp).toBe(0);
    expect(details.completude).toBeGreaterThan(0);
    expect(score).toBeLessThan(2);
  });

  it("scores pro with Google 4.5 stars + 30 reviews", () => {
    const pro = { ...basePro, google_rating: 4.5, google_reviews_count: 30 };
    const { details } = calculateScoreV2(pro as SupabasePro);
    expect(details.google).toBeCloseTo(1.85, 1); // (4.5/5)*1.5 + 0.5
  });

  it("scores pro with WA Business + description", () => {
    const pro = { ...basePro, wa_exists: true, wa_business: true, wa_description: "Plombier pro" };
    const { details } = calculateScoreV2(pro as SupabasePro);
    expect(details.whatsapp).toBeCloseTo(0.75, 1);
  });

  it("gives multi-platform bonus", () => {
    const pro = {
      ...basePro,
      sources: [
        { platform: "m3allem", externalId: "12", scrapedAt: "2026-04-13" },
        { platform: "avito", externalId: "999", scrapedAt: "2026-04-13" },
        { platform: "bricool", externalId: "abc", scrapedAt: "2026-04-13" },
      ],
    };
    const { details } = calculateScoreV2(pro as SupabasePro);
    expect(details.multiPlateforme).toBeCloseTo(0.75, 1);
  });

  it("caps at 5", () => {
    const maxPro = {
      ...basePro,
      google_rating: 5.0,
      google_reviews_count: 50,
      wa_exists: true,
      wa_business: true,
      wa_description: "Pro",
      wa_name: "Mohammed",
      photo: "photo.jpg",
      description: "Expert",
      quartier: "Maarif",
      sources: [
        { platform: "m3allem", externalId: "1", scrapedAt: "2026-04-13" },
        { platform: "avito", externalId: "2", scrapedAt: "2026-04-13" },
      ],
      avito_ad_date: new Date().toISOString(),
    };
    const { score } = calculateScoreV2(maxPro as SupabasePro);
    expect(score).toBeLessThanOrEqual(5);
  });
});
```

- [ ] **Step 2: Write implementation**

```typescript
import type { SupabasePro, ScoreDetailsV2 } from "./types";

function calcGoogle(pro: SupabasePro): number {
  let score = 0;
  if (pro.google_rating) {
    score += (pro.google_rating / 5) * 1.5;
  }
  const reviews = pro.google_reviews_count ?? 0;
  if (reviews >= 20) score += 0.5;
  else if (reviews >= 6) score += 0.3;
  else if (reviews >= 1) score += 0.15;
  return Math.min(score, 2);
}

function calcWhatsApp(pro: SupabasePro): number {
  if (!pro.wa_exists) return 0;
  if (pro.wa_business && pro.wa_description) return 0.75;
  if (pro.wa_business) return 0.5;
  return 0.25;
}

function calcMultiPlateforme(pro: SupabasePro): number {
  const count = pro.sources?.length ?? 1;
  if (count >= 3) return 0.75;
  if (count >= 2) return 0.4;
  return 0;
}

function calcCompletude(pro: SupabasePro): number {
  let score = 0;
  if (pro.first_name && pro.last_name) score += 0.1;
  if (pro.phone) score += 0.15;
  if (pro.photo || pro.wa_photo || (pro.google_photos && pro.google_photos.length > 0)) score += 0.15;
  if (pro.description || pro.wa_description) score += 0.15;
  if (pro.quartier) score += 0.1;
  if ((pro.media_count ?? 0) > 0 || (pro.avito_photos_count ?? 0) > 0) score += 0.1;
  return Math.min(score, 0.75);
}

function calcRecency(pro: SupabasePro): number {
  const adDate = pro.avito_ad_date ? new Date(pro.avito_ad_date) : null;
  if (adDate) {
    const monthsAgo = (Date.now() - adDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
    if (monthsAgo <= 1) return 0.5;
    if (monthsAgo <= 3) return 0.35;
    if (monthsAgo <= 6) return 0.2;
  }
  if ((pro.experience ?? 0) >= 10) return 0.5;
  if ((pro.experience ?? 0) >= 6) return 0.35;
  return 0;
}

function calcPhoneVerified(pro: SupabasePro): number {
  if (!pro.wa_exists) return 0;
  // WA exists + name somewhat matches
  if (pro.wa_name && pro.first_name) {
    const waLower = pro.wa_name.toLowerCase();
    const firstLower = pro.first_name.toLowerCase();
    if (waLower.includes(firstLower) || firstLower.includes(waLower)) return 0.25;
  }
  return 0.1; // WA exists but name doesn't match
}

export function calculateScoreV2(pro: SupabasePro): { score: number; details: ScoreDetailsV2 } {
  const details: ScoreDetailsV2 = {
    google: calcGoogle(pro),
    whatsapp: calcWhatsApp(pro),
    multiPlateforme: calcMultiPlateforme(pro),
    completude: calcCompletude(pro),
    recency: calcRecency(pro),
    phoneVerified: calcPhoneVerified(pro),
  };

  const score = Math.min(
    5,
    details.google + details.whatsapp + details.multiPlateforme +
    details.completude + details.recency + details.phoneVerified
  );

  return { score, details };
}
```

- [ ] **Step 3: Run tests, commit**

```bash
npx vitest run scripts/scraper/__tests__/scoring-v2.test.ts
git add scripts/scraper/scoring-v2.ts scripts/scraper/__tests__/scoring-v2.test.ts
git commit -m "feat(scraper): add Score Maison v2 with Google/WA/multi-platform/recency criteria"
```

---

### Task 9: v2 orchestrator

**Files:**
- Create: `scripts/scraper/index-v2.ts`
- Modify: `package.json` (add npm scripts)

- [ ] **Step 1: Write v2 orchestrator**

```typescript
import { scrapeAvito } from "./sources/avito";
import { enrichWithGooglePlaces } from "./enrichers/google-places";
import { verifyWhatsApp } from "./verifiers/whatsapp";
import { calculateScoreV2 } from "./scoring-v2";
import { supabase, getAllPros, updatePro, upsertPro } from "./supabase-push";
import { mapCity, mapServices, classifyByKeywords } from "./mapping";
import { passesHardFilters, isFrenchName } from "./filters";
import { formatPhone, isMobile } from "./verifiers/phone-check";
import type { RawPro, SupabasePro } from "./types";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function phase4Avito(maxPages?: number) {
  console.log("\n=== Phase 4: Avito Scraping ===");
  const rawPros = await scrapeAvito({ maxPagesPerCategory: maxPages });
  console.log(`  Raw: ${rawPros.length} unique pros`);

  let pushed = 0;
  let skipped = 0;

  for (const raw of rawPros) {
    // Map city
    const city = mapCity(raw.city ?? "");
    if (!city) { skipped++; continue; }

    // Map services
    let services = mapServices(raw.services, "avito");
    if (services.length === 0 && raw.description) {
      services = classifyByKeywords(raw.description);
    }
    if (services.length === 0) { skipped++; continue; }

    // Format phone
    const phone = formatPhone(raw.phone ?? "");
    if (!phone || !isMobile(raw.phone ?? "")) { skipped++; continue; }

    const pro: Partial<SupabasePro> & { phone: string } = {
      first_name: raw.firstName ?? "",
      last_name: raw.lastName ?? "",
      phone: raw.phone!,
      photo: raw.photo,
      services,
      city,
      quartier: raw.quartier,
      description: raw.description,
      sources: [{ platform: "avito", externalId: raw.externalId, scrapedAt: new Date().toISOString() }],
      status: "scraped",
      verified: false,
      score_maison: 0,
      score_completude: 0,
      score_joignabilite: 0,
      score_multi_plateforme: 0,
      score_experience: 0,
      score_google: 0,
      score_wa: 0,
      score_recency: 0,
      avito_ad_date: raw.adDate,
      avito_photos_count: raw.photosCount,
      media_count: raw.photosCount,
    };

    const id = await upsertPro(pro);
    if (id) pushed++;
  }

  console.log(`  Pushed: ${pushed}, Skipped: ${skipped}`);
}

async function phase5Google() {
  console.log("\n=== Phase 5: Google Places Enrichment ===");
  const result = await enrichWithGooglePlaces();
  console.log(`  Enriched: ${result.enriched}, Skipped: ${result.skipped}`);
}

async function phase6WhatsApp() {
  console.log("\n=== Phase 6: WhatsApp Verification ===");
  const result = await verifyWhatsApp();
  console.log(`  Verified: ${result.verified}, Not on WA: ${result.notOnWA}, Errors: ${result.errors}`);
}

async function phase7Rescore() {
  console.log("\n=== Phase 7: Score Maison v2 Recalculation ===");
  const pros = await getAllPros();
  console.log(`  ${pros.length} pros to rescore`);

  let rescored = 0;
  let rejected = 0;

  for (const pro of pros) {
    const { score, details } = calculateScoreV2(pro);
    const status = score < 1.5 ? "rejected" : "scraped";

    await updatePro(pro.id!, {
      score_maison: score,
      score_google: details.google,
      score_wa: details.whatsapp,
      score_multi_plateforme: details.multiPlateforme,
      score_completude: details.completude,
      score_recency: details.recency,
      status,
    });

    if (status === "rejected") rejected++;
    rescored++;
  }

  console.log(`  Rescored: ${rescored}, Rejected: ${rejected}`);
}

async function printSummary() {
  console.log("\n=== Final Summary ===");
  const { data } = await supabase
    .from("professionals")
    .select("city, status, phone, google_rating, wa_exists, wa_business")
  ;
  if (!data) return;

  const total = data.length;
  const scraped = data.filter((p) => p.status === "scraped").length;
  const withPhone = data.filter((p) => p.phone).length;
  const googleVerified = data.filter((p) => p.google_rating).length;
  const waVerified = data.filter((p) => p.wa_exists).length;
  const waBusiness = data.filter((p) => p.wa_business).length;

  console.log(`  Total: ${total}`);
  console.log(`  Active (scraped): ${scraped}`);
  console.log(`  With phone: ${withPhone}`);
  console.log(`  Google verified: ${googleVerified}`);
  console.log(`  WhatsApp exists: ${waVerified}`);
  console.log(`  WhatsApp Business: ${waBusiness}`);

  console.log("\n  By city:");
  const cities = ["casablanca", "rabat", "marrakech", "tanger", "fes", "agadir"];
  for (const city of cities) {
    const count = data.filter((p) => p.city === city && p.status === "scraped").length;
    console.log(`    ${city}: ${count}`);
  }
}

async function run() {
  const args = process.argv.slice(2);
  const phase = args.find((a) => a.startsWith("--phase="))?.split("=")[1];
  const maxPages = args.find((a) => a.startsWith("--max-pages="))?.split("=")[1];

  if (!phase || phase === "avito") await phase4Avito(maxPages ? parseInt(maxPages) : undefined);
  if (!phase || phase === "google") await phase5Google();
  if (!phase || phase === "whatsapp") await phase6WhatsApp();
  if (!phase || phase === "rescore") await phase7Rescore();

  await printSummary();
  console.log("\nPipeline v2 complete!");
}

run().catch(console.error);
```

- [ ] **Step 2: Add npm scripts to package.json**

Add to `"scripts"`:
```json
"scrape:v2": "tsx scripts/scraper/index-v2.ts",
"scrape:avito": "tsx scripts/scraper/index-v2.ts --phase=avito",
"scrape:google-enrich": "tsx scripts/scraper/index-v2.ts --phase=google",
"scrape:wa-verify": "tsx scripts/scraper/index-v2.ts --phase=whatsapp",
"scrape:rescore": "tsx scripts/scraper/index-v2.ts --phase=rescore"
```

- [ ] **Step 3: Commit**

```bash
git add scripts/scraper/index-v2.ts package.json
git commit -m "feat(scraper): add v2 orchestrator — Avito + Google + WA + rescore phases"
```

---

### Task 10: Smoke test + run Avito phase

- [ ] **Step 1: Run all unit tests**

```bash
npx vitest run scripts/scraper/__tests__/
```

- [ ] **Step 2: Run Avito scraper with small sample**

```bash
npm run scrape:avito -- --max-pages=2
```

- [ ] **Step 3: Verify data in Supabase**

```bash
curl -s -X POST "https://api.supabase.com/v1/projects/ejqrxoeykfrcxutjdmvr/database/query" \
  -H "Authorization: Bearer sbp_195cb624a28c1cfdcd0eb97d810f63919de7f44c" \
  -H "Content-Type: application/json" \
  -d '{"query": "SELECT city, count(*), count(phone) as with_phone FROM professionals WHERE sources::text LIKE '"'"'%avito%'"'"' GROUP BY city ORDER BY count DESC;"}'
```

- [ ] **Step 4: Commit any fixes**

```bash
git add -A scripts/scraper/
git commit -m "fix(scraper): adjustments from v2 smoke testing"
```

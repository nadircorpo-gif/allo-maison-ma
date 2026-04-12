# Pro Sourcing Scraper — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scrape professionals from M3allem.ma, BriCool.ma, and AlloPro.ma, score them, deduplicate cross-platform, and store in Convex DB.

**Architecture:** Three-phase pipeline — M3allem first (has phone numbers), BriCool second (volume + enrichment via open API), AlloPro third (bonus). Each source produces `RawPro[]`, which gets normalized, filtered, scored, deduped, and pushed to Convex. Scripts live in `scripts/scraper/` and run via `tsx`.

**Tech Stack:** TypeScript, tsx (runner), Playwright (HTML scraping), native fetch (BriCool API), Convex (database), Vitest (tests)

---

## File Structure

```
scripts/scraper/
├── types.ts              # RawPro, NormalizedPro, ScoreDetails types
├── mapping.ts            # City + service slug mapping tables & lookup functions
├── filters.ts            # Hard filters (FR name, required fields, mappable city/service)
├── scoring.ts            # Score Maison calculation (completude, joignabilite, multiPlateforme, experience)
├── dedup.ts              # Name normalization, Levenshtein distance, cross-platform matching
├── sources/
│   ├── m3allem.ts        # Playwright HTML scraper for m3allem.ma
│   ├── bricool.ts        # REST API client for bricool.ma
│   └── allopro.ts        # Sitemap + Playwright scraper for allopro.ma
├── convex-push.ts        # Batch upsert to Convex professionals table
└── index.ts              # CLI orchestrator — runs phases sequentially

convex/
├── schema.ts             # professionals table definition
└── mutations/
    └── professionals.ts  # upsertProfessional, upsertBatch mutations

scripts/scraper/__tests__/
├── mapping.test.ts
├── filters.test.ts
├── scoring.test.ts
└── dedup.test.ts
```

---

### Task 1: Project setup — install dependencies and configure tsx runner

**Files:**
- Modify: `package.json`
- Create: `scripts/scraper/tsconfig.json`

- [ ] **Step 1: Install scraper dependencies**

```bash
npm install --save-dev tsx vitest playwright
npm install convex
```

- [ ] **Step 2: Add scraper scripts to package.json**

Add to the `"scripts"` section in `package.json`:

```json
"scrape": "tsx scripts/scraper/index.ts",
"scrape:m3allem": "tsx scripts/scraper/index.ts --source m3allem",
"scrape:bricool": "tsx scripts/scraper/index.ts --source bricool",
"scrape:allopro": "tsx scripts/scraper/index.ts --source allopro",
"test:scraper": "vitest run scripts/scraper/__tests__/"
```

- [ ] **Step 3: Create scraper tsconfig**

Create `scripts/scraper/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "outDir": "./dist",
    "rootDir": ".",
    "paths": {
      "@/*": ["../../*"]
    }
  },
  "include": ["./**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 4: Install Playwright browsers**

```bash
npx playwright install chromium
```

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json scripts/scraper/tsconfig.json
git commit -m "chore: add scraper dependencies and tsx runner config"
```

---

### Task 2: Types — define shared data types

**Files:**
- Create: `scripts/scraper/types.ts`

- [ ] **Step 1: Write types file**

Create `scripts/scraper/types.ts`:

```typescript
export type Platform = "m3allem" | "bricool" | "allopro";

export interface RawPro {
  platform: Platform;
  externalId: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  photo: string | null;
  gender: string | null;
  services: string[];          // raw service names from source platform
  city: string | null;         // raw city name from source platform
  quartier: string | null;
  lat: number | null;
  lng: number | null;
  experience: number | null;   // years
  mediaCount: number | null;
  description: string | null;
  verified: boolean;
  showPhone: boolean;
}

export interface NormalizedPro {
  firstName: string;
  lastName: string;
  phone: string | null;
  photo: string | null;
  gender: string | null;
  services: string[];          // our slugs: ["plombier", "peintre"]
  city: string;                // our slug: "casablanca"
  quartier: string | null;
  lat: number | null;
  lng: number | null;
  experience: number | null;
  mediaCount: number | null;
  description: string | null;
  verified: boolean;
  showPhone: boolean;
  sources: SourceEntry[];
  scoreMaison: number;
  scoreDetails: ScoreDetails;
  status: "scraped" | "contacted" | "onboarded" | "rejected";
}

export interface SourceEntry {
  platform: Platform;
  externalId: string;
  scrapedAt: string;           // ISO date
}

export interface ScoreDetails {
  completude: number;          // 0-2
  joignabilite: number;        // 0-1.5
  multiPlateforme: number;     // 0-1
  experience: number;          // 0-0.5
}
```

- [ ] **Step 2: Commit**

```bash
git add scripts/scraper/types.ts
git commit -m "feat(scraper): add shared types for RawPro, NormalizedPro, ScoreDetails"
```

---

### Task 3: Mapping — city and service slug lookup

**Files:**
- Create: `scripts/scraper/mapping.ts`
- Create: `scripts/scraper/__tests__/mapping.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `scripts/scraper/__tests__/mapping.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { mapCity, mapService } from "../mapping";

describe("mapCity", () => {
  it("maps French city names to slugs", () => {
    expect(mapCity("Casablanca")).toBe("casablanca");
    expect(mapCity("Rabat")).toBe("rabat");
    expect(mapCity("Marrakech")).toBe("marrakech");
    expect(mapCity("Tanger")).toBe("tanger");
    expect(mapCity("Fès")).toBe("fes");
    expect(mapCity("Agadir")).toBe("agadir");
  });

  it("maps Arabic city names to slugs", () => {
    expect(mapCity("الدار البيضاء")).toBe("casablanca");
    expect(mapCity("الرباط")).toBe("rabat");
    expect(mapCity("مراكش")).toBe("marrakech");
    expect(mapCity("طنجة")).toBe("tanger");
    expect(mapCity("فاس")).toBe("fes");
    expect(mapCity("أكادير")).toBe("agadir");
  });

  it("handles case variations", () => {
    expect(mapCity("casablanca")).toBe("casablanca");
    expect(mapCity("RABAT")).toBe("rabat");
    expect(mapCity("Fes")).toBe("fes");
  });

  it("returns null for unmapped cities", () => {
    expect(mapCity("Kenitra")).toBeNull();
    expect(mapCity("Oujda")).toBeNull();
    expect(mapCity("")).toBeNull();
  });
});

describe("mapService", () => {
  it("maps M3allem service names to our slugs", () => {
    expect(mapService("Plomberie", "m3allem")).toEqual(["plombier"]);
    expect(mapService("Electricité", "m3allem")).toEqual(["electricien"]);
    expect(mapService("Clim et froid", "m3allem")).toEqual(["climatisation"]);
    expect(mapService("Maçonnerie", "m3allem")).toEqual(["renovation"]);
    expect(mapService("Vitrerie - Aluminium", "m3allem")).toEqual(["vitrier"]);
  });

  it("maps BriCool service names to our slugs", () => {
    expect(mapService("Plomberie-Installation sanitaire", "bricool")).toEqual(["plombier"]);
    expect(mapService("Électricité doméstique", "bricool")).toEqual(["electricien"]);
    expect(mapService("Femme de ménage", "bricool")).toEqual(["femme-de-menage"]);
    expect(mapService("Bricolage-Petits travaux", "bricool")).toEqual(["bricoleur"]);
    expect(mapService("Déménagement", "bricool")).toEqual(["demenagement"]);
  });

  it("returns empty array for unmapped services", () => {
    expect(mapService("Parabole", "m3allem")).toEqual([]);
    expect(mapService("Unknown Service", "bricool")).toEqual([]);
    expect(mapService("", "m3allem")).toEqual([]);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run scripts/scraper/__tests__/mapping.test.ts
```

Expected: FAIL — `Cannot find module '../mapping'`

- [ ] **Step 3: Write the mapping implementation**

Create `scripts/scraper/mapping.ts`:

```typescript
import type { Platform } from "./types";

const CITY_MAP: Record<string, string> = {
  // French
  casablanca: "casablanca",
  rabat: "rabat",
  marrakech: "marrakech",
  tanger: "tanger",
  fès: "fes",
  fes: "fes",
  agadir: "agadir",
  // Arabic
  "الدار البيضاء": "casablanca",
  "الرباط": "rabat",
  "مراكش": "marrakech",
  "طنجة": "tanger",
  "فاس": "fes",
  "أكادير": "agadir",
};

export function mapCity(raw: string): string | null {
  if (!raw) return null;
  const normalized = raw.trim().toLowerCase();
  return CITY_MAP[normalized] ?? null;
}

const M3ALLEM_SERVICE_MAP: Record<string, string> = {
  plomberie: "plombier",
  "electricité": "electricien",
  peinture: "peintre",
  "clim et froid": "climatisation",
  serrurerie: "serrurier",
  "maçonnerie": "renovation",
  jardinier: "jardinier",
  "électronique": "technicien-informatique",
  carrelage: "carreleur",
  menuiserie: "menuisier",
  "etanchéité": "etancheite",
  "vitrerie - aluminium": "vitrier",
};

const BRICOOL_SERVICE_MAP: Record<string, string> = {
  "plomberie-installation sanitaire": "plombier",
  "électricité doméstique": "electricien",
  "femme de ménage": "femme-de-menage",
  peinture: "peintre",
  "climatisation-chauffage": "climatisation",
  serrurerie: "serrurier",
  "bricolage-petits travaux": "bricoleur",
  "maçonnerie": "renovation",
  jardinier: "jardinier",
  "assistance informatique": "technicien-informatique",
  "déménagement": "demenagement",
  carrelage: "carreleur",
  "menuiserie de bois": "menuisier",
  "étanchéité": "etancheite",
  vitrerie: "vitrier",
};

const SERVICE_MAPS: Record<Platform, Record<string, string>> = {
  m3allem: M3ALLEM_SERVICE_MAP,
  bricool: BRICOOL_SERVICE_MAP,
  allopro: BRICOOL_SERVICE_MAP, // AlloPro uses similar French names
};

export function mapService(raw: string, platform: Platform): string[] {
  if (!raw) return [];
  const map = SERVICE_MAPS[platform];
  const normalized = raw.trim().toLowerCase();
  const slug = map[normalized];
  return slug ? [slug] : [];
}

export function mapServices(rawNames: string[], platform: Platform): string[] {
  const slugs = new Set<string>();
  for (const name of rawNames) {
    for (const slug of mapService(name, platform)) {
      slugs.add(slug);
    }
  }
  return [...slugs];
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run scripts/scraper/__tests__/mapping.test.ts
```

Expected: All 5 test groups PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/scraper/mapping.ts scripts/scraper/__tests__/mapping.test.ts
git commit -m "feat(scraper): add city and service slug mapping with tests"
```

---

### Task 4: Filters — hard filter logic

**Files:**
- Create: `scripts/scraper/filters.ts`
- Create: `scripts/scraper/__tests__/filters.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `scripts/scraper/__tests__/filters.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { passesHardFilters, isFrenchName } from "../filters";
import type { RawPro } from "../types";

const basePro: RawPro = {
  platform: "m3allem",
  externalId: "12",
  firstName: "Mohammed",
  lastName: "BOUZIANE",
  phone: "06 69 09 65 09",
  photo: null,
  gender: null,
  services: ["Plomberie"],
  city: "Casablanca",
  quartier: "Maarif",
  lat: null,
  lng: null,
  experience: null,
  mediaCount: null,
  description: null,
  verified: false,
  showPhone: true,
};

describe("isFrenchName", () => {
  it("accepts French names", () => {
    expect(isFrenchName("Mohammed", "BOUZIANE")).toBe(true);
    expect(isFrenchName("Jean-Pierre", "Dupont")).toBe(true);
  });

  it("rejects Arabic names", () => {
    expect(isFrenchName("سي محمد", "بن علي")).toBe(false);
    expect(isFrenchName("Mohammed", "بن علي")).toBe(false);
  });

  it("rejects empty names", () => {
    expect(isFrenchName("", "")).toBe(false);
    expect(isFrenchName(null as unknown as string, null as unknown as string)).toBe(false);
  });
});

describe("passesHardFilters", () => {
  it("accepts a complete M3allem pro", () => {
    expect(passesHardFilters(basePro).passes).toBe(true);
  });

  it("rejects pro with Arabic name", () => {
    const pro = { ...basePro, firstName: "سي محمد", lastName: "بن علي" };
    expect(passesHardFilters(pro).passes).toBe(false);
  });

  it("rejects pro with unmappable city", () => {
    const pro = { ...basePro, city: "Kenitra" };
    expect(passesHardFilters(pro).passes).toBe(false);
  });

  it("rejects pro with unmappable service", () => {
    const pro = { ...basePro, services: ["Parabole"] };
    expect(passesHardFilters(pro).passes).toBe(false);
  });

  it("accepts BriCool pro with complete profile but no phone", () => {
    const pro: RawPro = {
      ...basePro,
      platform: "bricool",
      phone: null,
      photo: "some-photo.jpg",
      showPhone: false,
    };
    expect(passesHardFilters(pro).passes).toBe(true);
  });

  it("rejects BriCool pro with no phone and no photo", () => {
    const pro: RawPro = {
      ...basePro,
      platform: "bricool",
      phone: null,
      photo: null,
      showPhone: false,
    };
    expect(passesHardFilters(pro).passes).toBe(false);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run scripts/scraper/__tests__/filters.test.ts
```

Expected: FAIL — `Cannot find module '../filters'`

- [ ] **Step 3: Write the filters implementation**

Create `scripts/scraper/filters.ts`:

```typescript
import type { RawPro } from "./types";
import { mapCity, mapService } from "./mapping";

const ARABIC_CHARS = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

export function isFrenchName(firstName: string | null, lastName: string | null): boolean {
  if (!firstName && !lastName) return false;
  const full = `${firstName ?? ""} ${lastName ?? ""}`.trim();
  if (full.length < 2) return false;
  return !ARABIC_CHARS.test(full);
}

interface FilterResult {
  passes: boolean;
  reason?: string;
}

export function passesHardFilters(pro: RawPro): FilterResult {
  // 1. Name in French
  if (!isFrenchName(pro.firstName, pro.lastName)) {
    return { passes: false, reason: "arabic_name" };
  }

  // 2. City mappable
  if (!pro.city || !mapCity(pro.city)) {
    return { passes: false, reason: "unmappable_city" };
  }

  // 3. At least one mappable service
  const mappedServices = pro.services.flatMap((s) => mapService(s, pro.platform));
  if (mappedServices.length === 0) {
    return { passes: false, reason: "unmappable_service" };
  }

  // 4. Phone OR complete profile (BriCool)
  const hasPhone = !!pro.phone;
  const hasCompleteProfile = !!pro.photo && pro.services.length > 0 && !!pro.city;
  if (!hasPhone && !hasCompleteProfile) {
    return { passes: false, reason: "no_phone_no_profile" };
  }

  return { passes: true };
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run scripts/scraper/__tests__/filters.test.ts
```

Expected: All 7 tests PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/scraper/filters.ts scripts/scraper/__tests__/filters.test.ts
git commit -m "feat(scraper): add hard filter logic with FR name check and city/service validation"
```

---

### Task 5: Scoring — Score Maison calculation

**Files:**
- Create: `scripts/scraper/scoring.ts`
- Create: `scripts/scraper/__tests__/scoring.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `scripts/scraper/__tests__/scoring.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { calculateScore } from "../scoring";
import type { RawPro } from "../types";

const m3allemPro: RawPro = {
  platform: "m3allem",
  externalId: "12",
  firstName: "Mohammed",
  lastName: "BOUZIANE",
  phone: "06 69 09 65 09",
  photo: null,
  gender: null,
  services: ["Plomberie"],
  city: "Casablanca",
  quartier: "Maarif",
  lat: null,
  lng: null,
  experience: null,
  mediaCount: null,
  description: null,
  verified: false,
  showPhone: true,
};

describe("calculateScore", () => {
  it("scores M3allem pro with phone + name + quartier", () => {
    const { scoreMaison, scoreDetails } = calculateScore(m3allemPro, false);
    // completude: name(0.3) + quartier(0.3) = 0.6
    expect(scoreDetails.completude).toBeCloseTo(0.6, 1);
    // joignabilite: phone visible = 1.5
    expect(scoreDetails.joignabilite).toBeCloseTo(1.5, 1);
    // multiPlateforme: single platform = 0
    expect(scoreDetails.multiPlateforme).toBe(0);
    // experience: none = 0
    expect(scoreDetails.experience).toBe(0);
    // total = 0.6 + 1.5 + 0 + 0 = 2.1
    expect(scoreMaison).toBeCloseTo(2.1, 1);
  });

  it("gives multi-platform bonus", () => {
    const { scoreDetails } = calculateScore(m3allemPro, true);
    expect(scoreDetails.multiPlateforme).toBe(1);
  });

  it("scores BriCool pro with photo + description + media + experience", () => {
    const bricoolPro: RawPro = {
      ...m3allemPro,
      platform: "bricool",
      phone: null,
      photo: "photo.jpg",
      description: "Expert plombier depuis 10 ans",
      mediaCount: 5,
      experience: 12,
      quartier: null,
      showPhone: true,
    };
    const { scoreMaison, scoreDetails } = calculateScore(bricoolPro, false);
    // completude: name(0.3) + photo(0.4) + description(0.4) + media4+(0.3) = 1.4
    expect(scoreDetails.completude).toBeCloseTo(1.4, 1);
    // joignabilite: showPhone flag only = 0.5
    expect(scoreDetails.joignabilite).toBeCloseTo(0.5, 1);
    // experience: 12yr = 10+ = 0.5
    expect(scoreDetails.experience).toBeCloseTo(0.5, 1);
    // total = 1.4 + 0.5 + 0 + 0.5 = 2.4
    expect(scoreMaison).toBeCloseTo(2.4, 1);
  });

  it("caps score at 5", () => {
    const maxPro: RawPro = {
      ...m3allemPro,
      photo: "photo.jpg",
      description: "Full description",
      mediaCount: 10,
      services: ["Plomberie", "Electricité"],
      experience: 20,
    };
    const { scoreMaison } = calculateScore(maxPro, true);
    expect(scoreMaison).toBeLessThanOrEqual(5);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run scripts/scraper/__tests__/scoring.test.ts
```

Expected: FAIL — `Cannot find module '../scoring'`

- [ ] **Step 3: Write the scoring implementation**

Create `scripts/scraper/scoring.ts`:

```typescript
import type { RawPro, ScoreDetails } from "./types";

function calcCompletude(pro: RawPro): number {
  let score = 0;
  // name present
  if (pro.firstName && pro.lastName) score += 0.3;
  // photo
  if (pro.photo) score += 0.4;
  // description
  if (pro.description) score += 0.4;
  // quartier
  if (pro.quartier) score += 0.3;
  // multiple services
  if (pro.services.length >= 2) score += 0.3;
  // media
  const media = pro.mediaCount ?? 0;
  if (media >= 1 && media <= 3) score += 0.15;
  if (media >= 4) score += 0.3;
  return Math.min(score, 2);
}

function calcJoignabilite(pro: RawPro): number {
  if (pro.phone) return 1.5;
  if (pro.showPhone) return 0.5;
  return 0;
}

function calcExperience(pro: RawPro): number {
  const years = pro.experience ?? 0;
  if (years >= 10) return 0.5;
  if (years >= 6) return 0.35;
  if (years >= 3) return 0.2;
  if (years >= 1) return 0.1;
  return 0;
}

export function calculateScore(
  pro: RawPro,
  isMultiPlatform: boolean
): { scoreMaison: number; scoreDetails: ScoreDetails } {
  const scoreDetails: ScoreDetails = {
    completude: calcCompletude(pro),
    joignabilite: calcJoignabilite(pro),
    multiPlateforme: isMultiPlatform ? 1 : 0,
    experience: calcExperience(pro),
  };

  const scoreMaison = Math.min(
    5,
    scoreDetails.completude +
      scoreDetails.joignabilite +
      scoreDetails.multiPlateforme +
      scoreDetails.experience
  );

  return { scoreMaison, scoreDetails };
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run scripts/scraper/__tests__/scoring.test.ts
```

Expected: All 4 tests PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/scraper/scoring.ts scripts/scraper/__tests__/scoring.test.ts
git commit -m "feat(scraper): add Score Maison calculation with 4 weighted criteria"
```

---

### Task 6: Dedup — name normalization and cross-platform matching

**Files:**
- Create: `scripts/scraper/dedup.ts`
- Create: `scripts/scraper/__tests__/dedup.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `scripts/scraper/__tests__/dedup.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { normalizeName, levenshtein, findMatch } from "../dedup";
import type { NormalizedPro } from "../types";

describe("normalizeName", () => {
  it("lowercases and trims", () => {
    expect(normalizeName("  Mohammed  ")).toBe("mohammed");
  });

  it("removes diacritics", () => {
    expect(normalizeName("Réné")).toBe("rene");
    expect(normalizeName("Fès")).toBe("fes");
  });

  it("handles empty/null", () => {
    expect(normalizeName("")).toBe("");
    expect(normalizeName(null as unknown as string)).toBe("");
  });
});

describe("levenshtein", () => {
  it("returns 0 for identical strings", () => {
    expect(levenshtein("mohammed", "mohammed")).toBe(0);
  });

  it("returns correct distance for similar names", () => {
    expect(levenshtein("mohammed", "mohamed")).toBe(1);
    expect(levenshtein("bouziane", "bouzian")).toBe(1);
  });

  it("returns correct distance for different strings", () => {
    expect(levenshtein("ahmed", "khalid")).toBe(5);
  });
});

describe("findMatch", () => {
  const existing: NormalizedPro[] = [
    {
      firstName: "Mohammed",
      lastName: "Bouziane",
      phone: "0669096509",
      photo: null,
      gender: null,
      services: ["plombier"],
      city: "casablanca",
      quartier: "Maarif",
      lat: null,
      lng: null,
      experience: null,
      mediaCount: null,
      description: null,
      verified: false,
      showPhone: true,
      sources: [{ platform: "m3allem", externalId: "12", scrapedAt: "2026-04-12" }],
      scoreMaison: 2.1,
      scoreDetails: { completude: 0.6, joignabilite: 1.5, multiPlateforme: 0, experience: 0 },
      status: "scraped",
    },
  ];

  it("finds exact match by name + city", () => {
    const result = findMatch("Mohammed", "Bouziane", "casablanca", existing);
    expect(result).not.toBeNull();
    expect(result!.firstName).toBe("Mohammed");
  });

  it("finds fuzzy match (Mohamed vs Mohammed)", () => {
    const result = findMatch("Mohamed", "Bouziane", "casablanca", existing);
    expect(result).not.toBeNull();
  });

  it("returns null for different city", () => {
    const result = findMatch("Mohammed", "Bouziane", "rabat", existing);
    expect(result).toBeNull();
  });

  it("returns null for different name", () => {
    const result = findMatch("Ahmed", "Khalid", "casablanca", existing);
    expect(result).toBeNull();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run scripts/scraper/__tests__/dedup.test.ts
```

Expected: FAIL — `Cannot find module '../dedup'`

- [ ] **Step 3: Write the dedup implementation**

Create `scripts/scraper/dedup.ts`:

```typescript
import type { NormalizedPro } from "./types";

export function normalizeName(name: string | null | undefined): string {
  if (!name) return "";
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }

  return dp[m][n];
}

const MAX_DISTANCE = 2;

export function findMatch(
  firstName: string,
  lastName: string,
  city: string,
  existing: NormalizedPro[]
): NormalizedPro | null {
  const normFirst = normalizeName(firstName);
  const normLast = normalizeName(lastName);
  const normFull = `${normFirst} ${normLast}`;

  for (const pro of existing) {
    if (pro.city !== city) continue;

    const existingFull = `${normalizeName(pro.firstName)} ${normalizeName(pro.lastName)}`;
    const dist = levenshtein(normFull, existingFull);

    if (dist <= MAX_DISTANCE) {
      return pro;
    }
  }

  return null;
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run scripts/scraper/__tests__/dedup.test.ts
```

Expected: All 8 tests PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/scraper/dedup.ts scripts/scraper/__tests__/dedup.test.ts
git commit -m "feat(scraper): add name normalization, Levenshtein distance, and cross-platform matching"
```

---

### Task 7: Convex setup — schema and mutations

**Files:**
- Create: `convex/schema.ts`
- Create: `convex/mutations/professionals.ts`

- [ ] **Step 1: Initialize Convex in the project**

```bash
npx convex init
```

Follow the prompts to link to your Convex project. This creates `convex/` directory with `_generated/` types.

- [ ] **Step 2: Write the schema**

Create `convex/schema.ts`:

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  professionals: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    phone: v.optional(v.string()),
    photo: v.optional(v.string()),
    gender: v.optional(v.string()),

    services: v.array(v.string()),
    city: v.string(),
    quartier: v.optional(v.string()),
    lat: v.optional(v.number()),
    lng: v.optional(v.number()),

    scoreMaison: v.number(),
    scoreDetails: v.object({
      completude: v.number(),
      joignabilite: v.number(),
      multiPlateforme: v.number(),
      experience: v.number(),
    }),

    sources: v.array(
      v.object({
        platform: v.string(),
        externalId: v.string(),
        scrapedAt: v.string(),
      })
    ),

    experience: v.optional(v.number()),
    mediaCount: v.optional(v.number()),
    description: v.optional(v.string()),
    verified: v.optional(v.boolean()),
    status: v.string(),
  })
    .index("by_city", ["city"])
    .index("by_score", ["scoreMaison"])
    .index("by_status", ["status"])
    .index("by_city_status", ["city", "status"]),
});
```

- [ ] **Step 3: Push schema to Convex**

```bash
npx convex dev --once
```

Expected: Schema pushed, `professionals` table created.

- [ ] **Step 4: Write the upsert mutation**

Create `convex/mutations/professionals.ts`:

```typescript
import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const upsert = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    phone: v.optional(v.string()),
    photo: v.optional(v.string()),
    gender: v.optional(v.string()),
    services: v.array(v.string()),
    city: v.string(),
    quartier: v.optional(v.string()),
    lat: v.optional(v.number()),
    lng: v.optional(v.number()),
    scoreMaison: v.number(),
    scoreDetails: v.object({
      completude: v.number(),
      joignabilite: v.number(),
      multiPlateforme: v.number(),
      experience: v.number(),
    }),
    sources: v.array(
      v.object({
        platform: v.string(),
        externalId: v.string(),
        scrapedAt: v.string(),
      })
    ),
    experience: v.optional(v.number()),
    mediaCount: v.optional(v.number()),
    description: v.optional(v.string()),
    verified: v.optional(v.boolean()),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if pro already exists by matching source platform+externalId
    for (const source of args.sources) {
      const existing = await ctx.db
        .query("professionals")
        .filter((q) =>
          q.eq(q.field("firstName"), args.firstName)
        )
        .collect();

      const match = existing.find((p) =>
        p.sources.some(
          (s) =>
            s.platform === source.platform &&
            s.externalId === source.externalId
        )
      );

      if (match) {
        await ctx.db.patch(match._id, args);
        return match._id;
      }
    }

    return await ctx.db.insert("professionals", args);
  },
});
```

- [ ] **Step 5: Push mutations to Convex**

```bash
npx convex dev --once
```

Expected: Functions deployed successfully.

- [ ] **Step 6: Commit**

```bash
git add convex/
git commit -m "feat(convex): add professionals schema with upsert mutation"
```

---

### Task 8: Convex push helper — batch push from scraper to Convex

**Files:**
- Create: `scripts/scraper/convex-push.ts`

- [ ] **Step 1: Write the Convex push module**

Create `scripts/scraper/convex-push.ts`:

```typescript
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import type { NormalizedPro } from "./types";

const CONVEX_URL = process.env.CONVEX_URL;

if (!CONVEX_URL) {
  throw new Error("CONVEX_URL environment variable is required. Run: npx convex dev --once");
}

const client = new ConvexHttpClient(CONVEX_URL);

export async function pushPro(pro: NormalizedPro): Promise<string> {
  const id = await client.mutation(api.mutations.professionals.upsert, {
    firstName: pro.firstName,
    lastName: pro.lastName,
    phone: pro.phone ?? undefined,
    photo: pro.photo ?? undefined,
    gender: pro.gender ?? undefined,
    services: pro.services,
    city: pro.city,
    quartier: pro.quartier ?? undefined,
    lat: pro.lat ?? undefined,
    lng: pro.lng ?? undefined,
    scoreMaison: pro.scoreMaison,
    scoreDetails: pro.scoreDetails,
    sources: pro.sources,
    experience: pro.experience ?? undefined,
    mediaCount: pro.mediaCount ?? undefined,
    description: pro.description ?? undefined,
    verified: pro.verified || undefined,
    status: pro.status,
  });
  return id;
}

export async function pushBatch(pros: NormalizedPro[]): Promise<{ pushed: number; errors: number }> {
  let pushed = 0;
  let errors = 0;

  for (const pro of pros) {
    try {
      await pushPro(pro);
      pushed++;
    } catch (err) {
      errors++;
      console.error(`Failed to push ${pro.firstName} ${pro.lastName}:`, err);
    }
  }

  return { pushed, errors };
}
```

- [ ] **Step 2: Commit**

```bash
git add scripts/scraper/convex-push.ts
git commit -m "feat(scraper): add Convex batch push helper"
```

---

### Task 9: M3allem scraper — Playwright HTML scraper

**Files:**
- Create: `scripts/scraper/sources/m3allem.ts`

- [ ] **Step 1: Write the M3allem scraper**

Create `scripts/scraper/sources/m3allem.ts`:

```typescript
import { chromium, type Page } from "playwright";
import type { RawPro } from "../types";

const BASE_URL = "https://www.m3allem.ma";
const SERVICE_IDS = Array.from({ length: 29 }, (_, i) => i + 1);
const DELAY_MS = 1000; // 1 req/sec politeness

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

    // Name from title
    const titleMatch = document.title.match(/Fiche du m3allem\s*:\s*(.+)/);
    const fullName = titleMatch?.[1]?.trim() ?? "";

    // Service names from images alt or nearby text
    const specSection = document.querySelector('th[class*="spec"], th');
    const services: string[] = [];
    const specImages = document.querySelectorAll('img[src*="/specialites/"]');
    specImages.forEach((img) => {
      const src = img.getAttribute("src") ?? "";
      const match = src.match(/specialites\/(.+?)\.png/);
      if (match) {
        // Convert filename to service name: "plomberie" -> "Plomberie"
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

  // Parse "LASTNAME Firstname" format
  const nameParts = data.fullName.split(/\s+/);
  let lastName = "";
  let firstName = "";

  if (nameParts.length >= 2) {
    // M3allem format: "BOUZIANE Mohammed" (last name first, uppercase)
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
  console.log("🔍 Starting M3allem scraper...");
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

  console.log(`✅ M3allem: ${allPros.length} pros scraped`);
  return allPros;
}
```

- [ ] **Step 2: Commit**

```bash
git add scripts/scraper/sources/m3allem.ts
git commit -m "feat(scraper): add M3allem HTML scraper via Playwright"
```

---

### Task 10: BriCool scraper — REST API client

**Files:**
- Create: `scripts/scraper/sources/bricool.ts`

- [ ] **Step 1: Write the BriCool API scraper**

Create `scripts/scraper/sources/bricool.ts`:

```typescript
import type { RawPro } from "../types";

const BASE_URL = "https://bricool.ma/api/v1";
const PAGE_SIZE = 20;
const DELAY_MS = 200; // 5 req/sec

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
    phone: null, // BriCool does not expose phone numbers
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

  console.log("🔍 Starting BriCool scraper...");
  const allPros: RawPro[] = [];

  // Get first page to know total
  const first = await fetchPage(0);
  const totalPages = maxPages ? Math.min(maxPages, first.totalPages) : first.totalPages;
  console.log(`  Total pages: ${totalPages} (${totalPages * PAGE_SIZE} workers)`);

  // Process first page
  for (const w of first.workers) {
    allPros.push(toRawPro(w));
  }

  // Process remaining pages
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

  // Optionally enrich with detail endpoint (description, experience, medias)
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

  console.log(`✅ BriCool: ${allPros.length} pros scraped`);
  return allPros;
}
```

- [ ] **Step 2: Commit**

```bash
git add scripts/scraper/sources/bricool.ts
git commit -m "feat(scraper): add BriCool REST API scraper with pagination and optional detail enrichment"
```

---

### Task 11: AlloPro scraper — sitemap + HTML

**Files:**
- Create: `scripts/scraper/sources/allopro.ts`

- [ ] **Step 1: Write the AlloPro scraper**

Create `scripts/scraper/sources/allopro.ts`:

```typescript
import { chromium } from "playwright";
import type { RawPro } from "../types";

const SITEMAP_URL = "https://www.allopro.ma/rz_listing-sitemap.xml";
const DELAY_MS = 2000; // 1 req/2sec — Wordfence WAF

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
    // Skip the listing index page
    if (url !== "https://www.allopro.ma/listing/") {
      urls.push(url);
    }
  }
  return urls;
}

export async function scrapeAllopro(): Promise<RawPro[]> {
  console.log("🔍 Starting AlloPro scraper...");
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

        const data = await page.evaluate(() => {
          const title = document.querySelector("h1")?.textContent?.trim() ?? "";

          // Look for category/service info
          const categories: string[] = [];
          document.querySelectorAll(".rz--category, .rz-listing-category").forEach((el) => {
            const text = el.textContent?.trim();
            if (text) categories.push(text);
          });

          // Look for location
          const location =
            document.querySelector(".rz--location, .rz-listing-location")?.textContent?.trim() ?? "";

          // Look for description
          const description =
            document.querySelector(".rz--description, .rz-listing-description")?.textContent?.trim() ?? "";

          // Look for rating
          const ratingEl = document.querySelector(".rz-overall .rz--score, .rz--review span");
          const rating = ratingEl ? parseFloat(ratingEl.textContent ?? "0") : 0;

          // Look for images
          const images: string[] = [];
          document.querySelectorAll(".rz-gallery img, .rz--media img").forEach((img) => {
            const src = img.getAttribute("src");
            if (src) images.push(src);
          });

          return { title, categories, location, description, rating, imageCount: images.length };
        });

        if (!data.title) continue;

        // Parse city from location string (often "City, Morocco" format)
        const cityMatch = data.location.match(/^([^,]+)/);
        const city = cityMatch?.[1]?.trim() ?? null;

        allPros.push({
          platform: "allopro",
          externalId: urls[i].split("/listing/")[1]?.replace(/\/$/, "") ?? urls[i],
          firstName: data.title,
          lastName: "",
          phone: null,
          photo: null,
          gender: null,
          services: data.categories,
          city,
          quartier: null,
          lat: null,
          lng: null,
          experience: null,
          mediaCount: data.imageCount,
          description: data.description || null,
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

  console.log(`✅ AlloPro: ${allPros.length} pros scraped`);
  return allPros;
}
```

- [ ] **Step 2: Commit**

```bash
git add scripts/scraper/sources/allopro.ts
git commit -m "feat(scraper): add AlloPro sitemap + Playwright scraper"
```

---

### Task 12: Orchestrator — CLI entry point that runs the full pipeline

**Files:**
- Create: `scripts/scraper/index.ts`

- [ ] **Step 1: Write the orchestrator**

Create `scripts/scraper/index.ts`:

```typescript
import { scrapeM3allem } from "./sources/m3allem";
import { scrapeBricool } from "./sources/bricool";
import { scrapeAllopro } from "./sources/allopro";
import { passesHardFilters } from "./filters";
import { mapCity, mapServices } from "./mapping";
import { calculateScore } from "./scoring";
import { findMatch } from "./dedup";
import { pushBatch } from "./convex-push";
import type { RawPro, NormalizedPro, SourceEntry } from "./types";

function normalize(raw: RawPro): NormalizedPro | null {
  const city = mapCity(raw.city ?? "");
  if (!city) return null;

  const services = mapServices(raw.services, raw.platform);
  if (services.length === 0) return null;

  const source: SourceEntry = {
    platform: raw.platform,
    externalId: raw.externalId,
    scrapedAt: new Date().toISOString(),
  };

  const { scoreMaison, scoreDetails } = calculateScore(raw, false);
  const status = scoreMaison < 1.5 ? "rejected" : "scraped";

  return {
    firstName: raw.firstName ?? "",
    lastName: raw.lastName ?? "",
    phone: raw.phone,
    photo: raw.photo,
    gender: raw.gender,
    services,
    city,
    quartier: raw.quartier,
    lat: raw.lat,
    lng: raw.lng,
    experience: raw.experience,
    mediaCount: raw.mediaCount,
    description: raw.description,
    verified: raw.verified,
    showPhone: raw.showPhone,
    sources: [source],
    scoreMaison,
    scoreDetails,
    status,
  };
}

function mergeInto(existing: NormalizedPro, raw: RawPro): void {
  // Add source
  existing.sources.push({
    platform: raw.platform,
    externalId: raw.externalId,
    scrapedAt: new Date().toISOString(),
  });

  // Enrich missing fields
  if (!existing.photo && raw.photo) existing.photo = raw.photo;
  if (!existing.description && raw.description) existing.description = raw.description;
  if (!existing.lat && raw.lat) existing.lat = raw.lat;
  if (!existing.lng && raw.lng) existing.lng = raw.lng;
  if (!existing.experience && raw.experience) existing.experience = raw.experience;
  if (!existing.mediaCount && raw.mediaCount) existing.mediaCount = raw.mediaCount;
  if (!existing.phone && raw.phone) existing.phone = raw.phone;

  // Add new services
  const newServices = mapServices(raw.services, raw.platform);
  for (const s of newServices) {
    if (!existing.services.includes(s)) existing.services.push(s);
  }

  // Recalculate score with multi-platform bonus
  const fakeRaw: RawPro = {
    platform: existing.sources[0].platform as RawPro["platform"],
    externalId: existing.sources[0].externalId,
    firstName: existing.firstName,
    lastName: existing.lastName,
    phone: existing.phone,
    photo: existing.photo,
    gender: existing.gender,
    services: existing.services,
    city: existing.city,
    quartier: existing.quartier,
    lat: existing.lat,
    lng: existing.lng,
    experience: existing.experience,
    mediaCount: existing.mediaCount,
    description: existing.description,
    verified: existing.verified,
    showPhone: existing.showPhone,
  };
  const { scoreMaison, scoreDetails } = calculateScore(fakeRaw, true);
  existing.scoreMaison = scoreMaison;
  existing.scoreDetails = scoreDetails;
  existing.status = scoreMaison < 1.5 ? "rejected" : "scraped";
}

async function run() {
  const args = process.argv.slice(2);
  const sourceFlag = args.find((a) => a.startsWith("--source="))?.split("=")[1];
  const dryRun = args.includes("--dry-run");

  const allNormalized: NormalizedPro[] = [];
  let filterStats = { total: 0, passed: 0, rejected: 0 };

  function processRawPros(rawPros: RawPro[]): void {
    for (const raw of rawPros) {
      filterStats.total++;
      const filterResult = passesHardFilters(raw);
      if (!filterResult.passes) {
        filterStats.rejected++;
        continue;
      }
      filterStats.passed++;

      // Try to match with existing normalized pros
      const match = findMatch(
        raw.firstName ?? "",
        raw.lastName ?? "",
        mapCity(raw.city ?? "") ?? "",
        allNormalized
      );

      if (match) {
        mergeInto(match, raw);
      } else {
        const normalized = normalize(raw);
        if (normalized) allNormalized.push(normalized);
      }
    }
  }

  // Phase 1: M3allem
  if (!sourceFlag || sourceFlag === "m3allem") {
    console.log("\n═══ Phase 1: M3allem ═══");
    const m3allemPros = await scrapeM3allem();
    processRawPros(m3allemPros);
    console.log(`  After M3allem: ${allNormalized.length} normalized pros`);
  }

  // Phase 2: BriCool
  if (!sourceFlag || sourceFlag === "bricool") {
    console.log("\n═══ Phase 2: BriCool ═══");
    const bricoolPros = await scrapeBricool({ enrichDetails: true });
    processRawPros(bricoolPros);
    console.log(`  After BriCool: ${allNormalized.length} normalized pros`);
  }

  // Phase 3: AlloPro
  if (!sourceFlag || sourceFlag === "allopro") {
    console.log("\n═══ Phase 3: AlloPro ═══");
    const alloProPros = await scrapeAllopro();
    processRawPros(alloProPros);
    console.log(`  After AlloPro: ${allNormalized.length} normalized pros`);
  }

  // Stats
  console.log("\n═══ Pipeline Summary ═══");
  console.log(`  Raw pros processed: ${filterStats.total}`);
  console.log(`  Passed hard filters: ${filterStats.passed}`);
  console.log(`  Rejected by filters: ${filterStats.rejected}`);
  console.log(`  Final normalized (deduplicated): ${allNormalized.length}`);

  const withPhone = allNormalized.filter((p) => p.phone).length;
  const multiPlatform = allNormalized.filter((p) => p.sources.length > 1).length;
  const byStatus = {
    scraped: allNormalized.filter((p) => p.status === "scraped").length,
    rejected: allNormalized.filter((p) => p.status === "rejected").length,
  };
  const avgScore = allNormalized.reduce((sum, p) => sum + p.scoreMaison, 0) / allNormalized.length;

  console.log(`  With phone: ${withPhone}`);
  console.log(`  Multi-platform: ${multiPlatform}`);
  console.log(`  Status — scraped: ${byStatus.scraped}, rejected: ${byStatus.rejected}`);
  console.log(`  Average Score Maison: ${avgScore.toFixed(2)}/5`);

  // By city
  console.log("\n  By city:");
  const cities = ["casablanca", "rabat", "marrakech", "tanger", "fes", "agadir"];
  for (const city of cities) {
    const count = allNormalized.filter((p) => p.city === city && p.status === "scraped").length;
    console.log(`    ${city}: ${count}`);
  }

  // Push to Convex
  if (!dryRun) {
    console.log("\n═══ Pushing to Convex ═══");
    const activePros = allNormalized.filter((p) => p.status === "scraped");
    const { pushed, errors } = await pushBatch(activePros);
    console.log(`  Pushed: ${pushed}, Errors: ${errors}`);
  } else {
    console.log("\n  [DRY RUN] Skipping Convex push");
  }

  console.log("\n✅ Pipeline complete!");
}

run().catch(console.error);
```

- [ ] **Step 2: Verify the orchestrator compiles**

```bash
npx tsx --no-warnings scripts/scraper/index.ts --dry-run --source=bricool 2>&1 | head -5
```

Expected: Should start running (or fail on Convex URL env var in dry-run mode — which is OK, the `--dry-run` flag skips Convex push).

- [ ] **Step 3: Commit**

```bash
git add scripts/scraper/index.ts
git commit -m "feat(scraper): add CLI orchestrator with 3-phase pipeline, dedup, and dry-run mode"
```

---

### Task 13: End-to-end smoke test with dry run

**Files:** None new — this is a verification task.

- [ ] **Step 1: Run all unit tests**

```bash
npx vitest run scripts/scraper/__tests__/
```

Expected: All tests in mapping, filters, scoring, and dedup PASS.

- [ ] **Step 2: Run BriCool scraper in dry-run mode (small sample)**

To test without scraping all 6,478 workers, temporarily run with a small page limit:

```bash
CONVEX_URL=placeholder npx tsx scripts/scraper/index.ts --source=bricool --dry-run 2>&1 | tail -20
```

Expected: Should output pipeline summary stats and "[DRY RUN] Skipping Convex push". If the BriCool API is too slow for full run, edit `scrapeBricool` call in `index.ts` temporarily to add `maxPages: 5` for testing.

- [ ] **Step 3: Verify M3allem scraper can connect (quick test)**

```bash
npx tsx -e "
import { chromium } from 'playwright';
(async () => {
  const browser = await chromium.launch({ args: ['--ignore-certificate-errors'] });
  const page = await browser.newPage();
  await page.goto('https://www.m3allem.ma/fichem3allem/m3allem/12.html', { waitUntil: 'domcontentloaded' });
  const title = await page.title();
  console.log('Title:', title);
  await browser.close();
})();
"
```

Expected: `Title: m3allem.ma - Fiche du m3allem : Mohammed BOUZIANE`

- [ ] **Step 4: Commit any fixes from smoke testing**

```bash
git add -A scripts/scraper/
git commit -m "fix(scraper): adjustments from smoke testing"
```

Only commit if changes were needed. Skip if everything worked first try.

---

### Task 14: Connect to real Convex and run full pipeline

**Files:** None new — this is the production run.

- [ ] **Step 1: Ensure Convex is running and schema is deployed**

```bash
npx convex dev --once
```

Expected: Schema and functions deployed. Note the `CONVEX_URL` from `.env.local`.

- [ ] **Step 2: Run the full pipeline**

```bash
source .env.local && npx tsx scripts/scraper/index.ts
```

This runs all 3 phases sequentially. Expected runtime: ~20-30 minutes (M3allem ~10min, BriCool ~15min, AlloPro ~5min).

Expected output:
```
═══ Pipeline Summary ═══
  Final normalized (deduplicated): ~2,500-2,800
  With phone: ~350-400
  Multi-platform: ~50-100
  Average Score Maison: ~1.8-2.5/5
```

- [ ] **Step 3: Verify data in Convex dashboard**

Open the Convex dashboard and check:
- `professionals` table has records
- Records have correct `services` slugs, `city` slugs
- `sources` array shows platform origin
- `scoreMaison` values are between 0-5
- `status` is "scraped" or "rejected"

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat(scraper): complete pro sourcing pipeline — M3allem + BriCool + AlloPro → Convex"
```

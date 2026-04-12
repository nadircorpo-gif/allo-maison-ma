# Pro Sourcing Scraper — Design Spec

**Date:** 2026-04-12
**Status:** Validated

## Objective

Source professionals from existing Moroccan platforms (M3allem.ma, BriCool.ma, AlloPro.ma) to seed allo-maison.ma's database with verified, filterable pro profiles. Store in Convex. No outreach — data collection only.

## Sources

### M3allem.ma (Priority 1 — phones)
- **Tech:** Static PHP, server-rendered HTML
- **Method:** HTML scraping via Playwright (SSL cert issues require handling)
- **Data:** Full name (FR), phone (plain text in HTML), ville, quartier, spécialité(s)
- **Volume:** ~705 pros across 29 service categories
- **Coverage:** 12/16 of our services. Missing: femme de ménage, bricolage, déménagement
- **URL patterns:**
  - Service listing: `/service.php?specialite={id}&PageNum={page}`
  - Pro profile: `/fichem3allem/{name}/{id}.html`
- **Pagination:** 8 pros/page, up to ~21 pages per service

### BriCool.ma (Priority 2 — volume + enrichment)
- **Tech:** Angular SPA + Spring Boot backend
- **Method:** Open REST API, no auth required
- **Endpoints:**
  - `GET /api/v1/search/workers?page={0..3239}&size=20` — paginated search (6,478 total)
  - `GET /api/v1/workers/{uid}` — individual profile
  - `GET /api/v1/categories` — all service categories
- **Data:** uid, firstName, lastName, photo, activities (multilingual FR/AR/EN), address (locality + lat/lng), reviewsAverage, verification flags, mediaCount, experience, description
- **Limitations:**
  - Phone numbers NOT exposed in API (showPhone is just a flag)
  - 0 reviews across entire database
  - Verification = mostly profileVerified only (0% idCard, 0% phone verified)
- **Coverage:** 15/16 of our services. Missing: désinsectisation

### AlloPro.ma (Priority 3 — bonus enrichment)
- **Tech:** WordPress + Routiz/Brikk directory theme + WooCommerce + Wordfence WAF
- **Method:** Crawl sitemap (`/rz_listing-sitemap.xml`) + parse HTML. Listing data embedded as inline JSON.
- **Volume:** 215 listings
- **Limitations:** No phone numbers (contact via platform), minimal reviews (max 2 per listing)
- **Risk:** Wordfence WAF may rate-limit

### Platform comparison

| | M3allem | BriCool | AlloPro |
|---|---|---|---|
| Total pros | ~705 | 6,478 | 215 |
| Phone | Yes (plain text) | No | No |
| Reviews | No | No | ~3/215 have 2 reviews |
| Photo | No | Yes | Yes |
| GPS coords | No | Yes | No |
| Verification | No | profileVerified only | No |
| Experience | No | Yes (years) | No |

## Architecture

```
scripts/scraper/
├── index.ts              # Orchestrator — runs phases sequentially
├── sources/
│   ├── m3allem.ts        # HTML scraper (Playwright)
│   ├── bricool.ts        # REST API client (fetch)
│   └── allopro.ts        # Sitemap + HTML scraper (Playwright)
├── scoring.ts            # Score Maison calculation
├── filters.ts            # Hard + soft filters
├── mapping.ts            # Service & city slug mapping
├── dedup.ts              # Cross-platform matching & merging
├── convex-push.ts        # Batch insert/update to Convex
└── types.ts              # Shared types (RawPro, NormalizedPro, etc.)
```

## Filters

### Hard filters (eliminatory — applied before Convex push)

1. **Name in French** — no Arabic characters in firstName + lastName
2. **All required fields present** — name, at least 1 service, city
3. **City mappable** to one of our 6 cities (see mapping below)
4. **Service mappable** to at least one of our 16 slugs
5. **Phone available** (M3allem) OR **complete profile** (BriCool: photo + activities + address)

### Soft filters (score-based)

- Score Maison < 1.5/5 → status set to "rejected" (kept in DB but not surfaced)

## City Mapping

```
M3allem / BriCool (FR or AR)     →  Our slug
────────────────────────────────────────────
Casablanca, الدار البيضاء        →  casablanca
Rabat, الرباط                    →  rabat
Marrakech, مراكش                 →  marrakech
Tanger, طنجة                     →  tanger
Fès, Fes, فاس                    →  fes
Agadir, أكادير                   →  agadir
Everything else                  →  SKIP
```

## Service Mapping

| Our slug | M3allem | BriCool |
|---|---|---|
| plombier | Plomberie | Plomberie-Installation sanitaire |
| electricien | Electricité | Électricité domestique |
| femme-de-menage | — | Femme de ménage |
| peintre | Peinture | Peinture |
| climatisation | Clim et froid | Climatisation-Chauffage |
| serrurier | Serrurerie | Serrurerie |
| bricoleur | — | Bricolage-Petits travaux |
| renovation | Maçonnerie | Maçonnerie |
| jardinier | Jardinier | Jardinier |
| technicien-informatique | Électronique | Assistance informatique |
| demenagement | — | Déménagement |
| carreleur | Carrelage | Carrelage |
| menuisier | Menuiserie | Menuiserie de bois |
| etancheite | Etanchéité | Étanchéité |
| desinsectisation | — | — |
| vitrier | Vitrerie - Aluminium | Vitrerie |

**Coverage:** 12/16 both sources, 3/16 BriCool only, 1/16 (désinsectisation) uncovered.

## Score Maison (/5)

| Criteria | Weight | Calculation |
|---|---|---|
| **Profile completeness** | 2/5 | Each field adds points: name (0.3), photo (0.4), description (0.4), quartier (0.3), multiple services (0.3), media 1-3 (0.15), media 4+ (0.15) |
| **Reachability** | 1.5/5 | Phone visible = 1.5, showPhone flag only = 0.5, nothing = 0 |
| **Multi-platform presence** | 1/5 | Found on 2+ platforms with matching name+city = 1.0 |
| **Experience / seniority** | 0.5/5 | BriCool experience field: 0-2yr = 0.1, 3-5yr = 0.2, 6-10yr = 0.35, 10+ = 0.5 |

Score is designed to evolve — when allo-maison.ma collects its own reviews, the weights will shift toward review-based scoring.

## Convex Schema

```typescript
// convex/schema.ts
professionals: defineTable({
  // Identity
  firstName: v.string(),
  lastName: v.string(),
  phone: v.optional(v.string()),
  photo: v.optional(v.string()),
  gender: v.optional(v.string()),

  // Service & location
  services: v.array(v.string()),        // our slugs: ["plombier", "peintre"]
  city: v.string(),                      // our slug: "casablanca"
  quartier: v.optional(v.string()),
  lat: v.optional(v.number()),
  lng: v.optional(v.number()),

  // Scoring
  scoreMaison: v.number(),              // 0-5
  scoreDetails: v.object({
    completude: v.number(),             // 0-2
    joignabilite: v.number(),           // 0-1.5
    multiPlateforme: v.number(),        // 0-1
    experience: v.number(),             // 0-0.5
  }),

  // Sourcing
  sources: v.array(v.object({
    platform: v.string(),               // "bricool" | "m3allem" | "allopro"
    externalId: v.string(),             // uid or ID on source platform
    scrapedAt: v.string(),              // ISO date
  })),

  // Metadata
  experience: v.optional(v.number()),   // years
  mediaCount: v.optional(v.number()),
  description: v.optional(v.string()),
  verified: v.optional(v.boolean()),    // profileVerified on BriCool
  status: v.string(),                   // "scraped" | "contacted" | "onboarded" | "rejected"
})
  .index("by_city", ["city"])
  .index("by_service", ["services"])
  .index("by_score", ["scoreMaison"])
  .index("by_status", ["status"])
```

## Pipeline Orchestration

### Phase 1 — M3allem (priority: phones)
1. Crawl all 29 services × all pages via Playwright
2. Parse each pro profile page (name, phone, ville, quartier, spécialités)
3. Apply hard filters (FR name, mappable city, mappable service)
4. Calculate score Maison
5. Push to Convex with `status: "scraped"`

### Phase 2 — BriCool (priority: volume + enrichment)
1. Paginate API `/search/workers?page=0..3239&size=20`
2. Apply hard filters (FR name, complete profile, mappable city/service)
3. For each pro, attempt cross-match with existing M3allem pros (same normalized name + same city)
   - **Match found** → merge: add BriCool source, enrich with photo/GPS/media/experience, bonus score +1
   - **No match** → create new doc (no phone, but has photo/GPS)
4. Push to Convex

### Phase 3 — AlloPro (bonus enrichment)
1. Crawl 215 listings from sitemap XML
2. Parse HTML (inline JSON data in page source)
3. Match with existing pros, enrich if found
4. Push new unmatched pros to Convex

### Deduplication strategy
Cross-platform matching uses normalized comparison:
- Normalize names: lowercase, remove diacritics, trim
- Match: `normalized(firstName + lastName)` + `city slug`
- Fuzzy threshold for names: Levenshtein distance ≤ 2 (handles typos like "Mohammed" vs "Mohamed")

## Volume Estimates

| Source | Total | After filters (our 6 cities) | With phone |
|---|---|---|---|
| M3allem | ~705 | ~350 | **~350** |
| BriCool | 6,478 | ~2,460 | 0 (enriches M3allem) |
| AlloPro | 215 | ~100 | 0 |
| **Final (deduplicated)** | — | **~2,500-2,800** | **~350-400** |

## Rate Limiting & Politeness

- **M3allem:** 1 request/second (old PHP server, be gentle)
- **BriCool API:** 5 requests/second (robust Spring Boot backend)
- **AlloPro:** 1 request/2 seconds (Wordfence WAF, risk of block)
- All scrapers include retry logic with exponential backoff
- User-Agent set to a standard browser string

## Tech Stack

- **Runtime:** Node.js (ts-node or tsx)
- **HTTP:** Native fetch for BriCool API
- **HTML scraping:** Playwright for M3allem + AlloPro
- **Convex:** @convex/client for direct push
- **Dedup:** Custom string normalization + Levenshtein distance

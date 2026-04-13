# Pro Sourcing v2 — Design Spec

**Date:** 2026-04-13
**Status:** Validated

## Objective

Extend the pro sourcing pipeline with Avito.ma scraping (~15-20K ads, phones in HTML), Google Places API enrichment (ratings + reviews), and WhatsApp Business verification via Baileys. Upgrade Score Maison to v2 with real quality signals. Push everything to Supabase.

## Context

v1 pipeline delivered 1,017 pros in Supabase (147 with phone from M3allem, 870 without phone from BriCool). This v2 adds:
- **Avito.ma** as primary new source (~3,000-5,000 pros with phones after filters)
- **Google Places** cross-referencing for real ratings
- **WhatsApp** verification for every phone number
- **Score Maison v2** based on verified quality signals

## Source: Avito.ma

### Overview
- **Method:** HTTP scraping (server-rendered HTML, no Playwright needed)
- **Volume:** ~15,000-20,000 ads brut, ~3,000-5,000 after filters
- **Data:** Title, phone(s), city, quartier, description, photos count, date, ad ID
- **Rate limiting:** 1 req/sec

### Categories to scrape

All under Avito services categories, for each of our 6 cities:

| Avito category | Maps to our slugs |
|---|---|
| plombier | plombier |
| electricien | electricien |
| peintre | peintre |
| menuisier | menuisier |
| climatisation | climatisation |
| serrurier | serrurier |
| femmes_de_ménages__nounous_et_chauffeurs | femme-de-menage |
| jardinage | jardinier |
| déménagement | demenagement |
| services_à_domicile | multiple (keyword-based) |
| autres_services | multiple (keyword-based) |

For generic categories (services_à_domicile, autres_services), classify by keywords in title/description:
- "plomb" → plombier
- "electri" → electricien
- "peint" → peintre
- "menuisi" → menuisier
- "clim" / "froid" → climatisation
- "serru" → serrurier
- "ménage" / "nettoy" → femme-de-menage
- "jardin" → jardinier
- "déménag" → demenagement
- "carrel" / "zelij" → carreleur
- "étanch" → etancheite
- "vitr" / "alumin" → vitrier
- "bricol" → bricoleur
- "rénov" / "maçon" → renovation
- "inform" / "ordi" → technicien-informatique
- "insect" / "cafard" / "rat" → desinsectisation

### URL patterns
- Listing page: `https://www.avito.ma/fr/{city}/{category}?o={page}`
- Ad detail: `https://www.avito.ma/fr/{quartier}/{category}/{title}_{id}.htm`
- Pagination: ~35 ads/page, param `?o=1` to `?o=N`

### Cities mapping
| Avito | Our slug |
|---|---|
| casablanca | casablanca |
| rabat | rabat |
| marrakech | marrakech |
| tanger | tanger |
| fes | fes |
| agadir | agadir |

### Hard filters (Avito-specific)
1. **Date:** Ad published < 6 months ago
2. **Phone:** At least 1 mobile number (06xx or 07xx, not fixe 05xx)
3. **Intent:** Title/description indicates offering service (not seeking one). Exclude: "cherche", "recherche", "besoin de"
4. **Not agency:** Exclude ads with: "agence", "société de", "nous proposons", "notre équipe"
5. **City:** Must match one of our 6 cities
6. **Service:** Must be classifiable to at least one of our 16 slugs

### Data extraction per ad
```
- ad_id: from URL ({id}.htm)
- title: from <h1>
- phones: regex 0[567]\d{8} in full page HTML (deduplicated)
- city: from URL path segment
- quartier: from URL path segment
- description: ad body text
- photos_count: count of ad images
- date_published: from datetime attribute
- price: if mentioned (DH/MAD)
```

## Enrichment: Google Places API

### Overview
- **API:** Google Places API (New) — Text Search + Place Details
- **Cost:** Free tier 28,000 requests/month
- **Purpose:** Get real Google ratings and reviews for each pro

### Flow
```
For each pro with phone:
  1. Text Search: "{phone number}" → best match
  2. If no match: Text Search: "{service} {name} {city}" → best match
  3. If match found:
     - Verify: phone or name matches before associating
     - Fetch Place Details: rating, reviews_count, photos, hours, place_id
  4. Save to Supabase
```

### Matching confidence
- Phone match → confidence 100% (auto-associate)
- Name + city + service match → confidence 80% (auto-associate if Levenshtein ≤ 2)
- Only city + service match → skip (too ambiguous)

### Data retrieved per match
- `google_rating`: 0.0-5.0
- `google_reviews_count`: integer
- `google_place_id`: string (for direct Maps link)
- `google_photos`: array of photo URLs

### Rate limiting
- 5 requests/second max
- ~5,000 pros × 2 requests (search + details) = ~10,000 requests = within free tier

## Verification: WhatsApp Business check

### Overview
- **Library:** Baileys (open-source WhatsApp Web protocol)
- **Setup:** Scan QR code once with user's WhatsApp, session persists
- **Rate limiting:** 1 check/second (WhatsApp ban risk if faster), ~5,000 numbers = ~1h30

### Flow
```
For each pro with phone:
  1. Format number: 0XXXXXXXXX → 212XXXXXXXXX
  2. onWhatsApp(number) → exists?
  3. If exists → getBusinessProfile(number) → Business?
  4. If Business → get description, category, photo
  5. Save to Supabase
```

### Data retrieved per number
- `wa_exists`: boolean — number registered on WhatsApp
- `wa_business`: boolean — WhatsApp Business account
- `wa_name`: string — WhatsApp display name
- `wa_description`: string — Business description (if WA Business)
- `wa_photo`: string — profile photo URL

### Phone verification extras
- **Format check:** Must be valid Moroccan mobile (06/07 + 8 digits)
- **Duplicate detection:** Same phone across multiple ads = flag, keep highest-scored ad
- **Mobile vs fixe:** 06/07 = mobile (artisan), 05 = fixe (company/agency)

## Score Maison v2 (/5)

Replaces v1 scoring. Based on verified quality signals.

| Criteria | Weight | Source | Calculation |
|---|---|---|---|
| **Google rating** | 1.5/5 | Google Places | No fiche=0. (rating/5) × 1.5. Ex: 4.2★ → 1.26 |
| **Google reviews count** | 0.5/5 | Google Places | 0=0, 1-5=0.15, 6-20=0.3, 20+=0.5 |
| **WhatsApp Business** | 0.75/5 | Baileys | No WA=0, WA normal=0.25, WA Business=0.5, WA Business+description=0.75 |
| **Multi-platform** | 0.75/5 | Cross-match | 1 source=0, 2 sources=0.4, 3+=0.75 |
| **Profile completeness** | 0.75/5 | All sources | name(0.1)+phone(0.15)+photo(0.15)+description(0.15)+quartier(0.1)+media(0.1) |
| **Recency / activity** | 0.5/5 | Avito + BriCool | Ad <1mo=0.5, <3mo=0.35, <6mo=0.2, experience 10yr+=0.5 |
| **Phone verified** | 0.25/5 | WA check | WA exists + name matches scraped name = 0.25 |

**Rejection threshold:** Score < 1.5 → `status: "rejected"`

### Score examples
| Profile | Score |
|---|---|
| M3allem only, no Google, WA normal | ~1.5/5 |
| Avito + Google 4.5★ 30 reviews + WA Business | ~4.2/5 |
| BriCool + M3allem + Google 3.8★ 5 reviews + WA Business | ~3.5/5 |
| Avito, recent ad, no Google, no WA | ~1.0/5 → rejected |

## Database Schema Update

New columns added to existing `professionals` table in Supabase:

```sql
-- Google Places enrichment
ALTER TABLE professionals ADD COLUMN google_rating NUMERIC(2,1);
ALTER TABLE professionals ADD COLUMN google_reviews_count INTEGER;
ALTER TABLE professionals ADD COLUMN google_place_id TEXT;
ALTER TABLE professionals ADD COLUMN google_photos TEXT[];

-- WhatsApp verification
ALTER TABLE professionals ADD COLUMN wa_exists BOOLEAN;
ALTER TABLE professionals ADD COLUMN wa_business BOOLEAN;
ALTER TABLE professionals ADD COLUMN wa_name TEXT;
ALTER TABLE professionals ADD COLUMN wa_description TEXT;
ALTER TABLE professionals ADD COLUMN wa_photo TEXT;

-- Avito-specific
ALTER TABLE professionals ADD COLUMN avito_ad_date TIMESTAMPTZ;
ALTER TABLE professionals ADD COLUMN avito_photos_count INTEGER;

-- Score v2 (replace existing score columns)
-- score_maison, score_completude etc. already exist, reused with new calculation
ALTER TABLE professionals ADD COLUMN score_google NUMERIC(3,2) DEFAULT 0;
ALTER TABLE professionals ADD COLUMN score_wa NUMERIC(3,2) DEFAULT 0;
ALTER TABLE professionals ADD COLUMN score_recency NUMERIC(3,2) DEFAULT 0;
```

## Architecture

```
scripts/scraper/
├── sources/
│   ├── m3allem.ts              # (existing)
│   ├── bricool.ts              # (existing)
│   ├── allopro.ts              # (existing)
│   └── avito.ts                # NEW — HTTP scraper, all categories, 6 cities
├── enrichers/
│   └── google-places.ts        # NEW — Places API search + details
├── verifiers/
│   ├── whatsapp.ts             # NEW — Baileys WA Business check
│   └── phone-check.ts          # NEW — format validation, mobile/fixe, dedup
├── scoring-v2.ts               # NEW — Score Maison v2
├── mapping.ts                  # UPDATED — add Avito categories + keyword classifier
├── filters.ts                  # UPDATED — add Avito-specific filters
├── dedup.ts                    # (existing, reused)
├── types.ts                    # UPDATED — add new fields
├── supabase-push.ts            # NEW — replace convex-push.ts, push to Supabase
└── index.ts                    # UPDATED — add phases 4-6
```

## Pipeline Orchestration

```
Phase 1-3: (already done, data in Supabase)

Phase 4: Avito scraping
  ├── For each city × each category: paginate listing pages
  ├── For each ad: extract data (title, phones, description, date, photos)
  ├── Apply Avito-specific hard filters
  ├── Classify service from title/description keywords
  ├── Dedup against existing Supabase pros (phone match or name+city)
  │   ├── Match → merge sources, enrich missing fields
  │   └── No match → new pro
  └── Push to Supabase

Phase 5: Google Places enrichment
  ├── Query all pros with phone from Supabase
  ├── For each: Text Search by phone, fallback by name+service+city
  ├── Verify match (phone or name similarity)
  ├── Fetch Place Details (rating, reviews, photos, place_id)
  └── Update Supabase rows

Phase 6: WhatsApp verification
  ├── Connect Baileys (QR code scan on first run, session persisted after)
  ├── Query all pros with phone from Supabase
  ├── For each: check WA existence, Business status, profile data
  └── Update Supabase rows

Phase 7: Score Maison v2 recalculation
  ├── Query all pros from Supabase
  ├── Recalculate score with all signals (Google + WA + multi-platform + completude + recency)
  ├── Set status = "rejected" if score < 1.5
  └── Update Supabase rows
```

## CLI Commands

```bash
npm run scrape:avito              # Phase 4 only
npm run scrape:google-enrich      # Phase 5 only
npm run scrape:wa-verify          # Phase 6 only (requires QR scan)
npm run scrape:rescore            # Phase 7 only
npm run scrape:v2                 # Phases 4-7 sequentially
```

## Rate Limiting

| Source | Rate | Est. time |
|---|---|---|
| Avito | 1 req/sec | ~5-6 hours (20K pages) |
| Google Places | 5 req/sec | ~30 min (10K requests) |
| WhatsApp | 1 check/sec | ~1.5 hours (5K numbers) |
| Supabase writes | 50/batch | ~5 min |

## Volume Estimates

| | Existing (v1) | Avito (new) | After dedup | After filters |
|---|---|---|---|---|
| Pros total | 1,017 | ~15,000-20,000 ads | — | — |
| With phone | 147 | ~3,000-5,000 | ~3,500-5,500 | ~3,000-5,000 |
| Google verified | 0 | — | — | ~500-1,500 |
| WA verified | 0 | — | — | ~2,000-4,000 |
| Score > 3/5 | 0 | — | — | ~300-800 |

## Dependencies

- `@whiskeysockets/baileys` — WhatsApp Web protocol (Baileys)
- `@supabase/supabase-js` — already installed
- Google Places API key — needs to be created in Google Cloud Console (free tier)

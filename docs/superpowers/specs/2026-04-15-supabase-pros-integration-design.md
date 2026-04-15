# Supabase Pros Integration — Design Spec

**Date:** 2026-04-15
**Status:** Validated

## Objective

Replace the 10 hardcoded artisans with 892 real professionals from Supabase on the allo-maison.ma website. Hybrid SSG + client-side approach: pages are statically generated with top 8 pros for SEO, with a "Voir plus" button that fetches remaining pros dynamically.

## Architecture

### Hybrid SSG + Client Fetch

1. **Build time (SSG):** `generateStaticParams` creates 96 pages (16 services × 6 villes). Each page fetches top 8 pros from Supabase sorted by `score_maison DESC`. ISR revalidation every 1 hour.
2. **Client-side:** "Voir plus" button calls `/api/pros` API route to load remaining pros with pagination.

### Data Flow

```
Build time:
  generateStaticParams → 96 slug combos
  Each page → fetchTopPros(service, city, limit=8) → Supabase
  → Pre-rendered HTML with 8 artisan cards

Runtime (client):
  User clicks "Voir plus"
  → fetch /api/pros?service=plombier&city=casablanca&offset=8
  → Supabase query
  → Append artisan cards to list
```

## Files

### New files
- `lib/supabase.ts` — Supabase client (server-side with service_role key)
- `app/api/pros/route.ts` — API route for client-side pagination
- `components/shared/artisan-card-v2.tsx` — New artisan card component

### Modified files
- `app/[slug]/page.tsx` — Replace hardcoded artisans with Supabase fetch + ArtisanList component
- `app/urgence/[service]/[ville]/page.tsx` — Same: replace hardcoded artisans

### Deleted files
- `lib/data/artisans.ts` — Remove hardcoded artisan data

## Supabase Client (`lib/supabase.ts`)

Server-side only client using service_role key for build-time and API route queries.

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchTopPros(service: string, city: string, limit = 8) {
  const { data } = await supabase
    .from("professionals")
    .select("*")
    .eq("status", "scraped")
    .eq("city", city)
    .contains("services", [service])
    .order("score_maison", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function fetchPros(service: string, city: string, offset = 0, limit = 20) {
  const { data, count } = await supabase
    .from("professionals")
    .select("*", { count: "exact" })
    .eq("status", "scraped")
    .eq("city", city)
    .contains("services", [service])
    .order("score_maison", { ascending: false })
    .range(offset, offset + limit - 1);
  return { pros: data ?? [], total: count ?? 0 };
}
```

## API Route (`app/api/pros/route.ts`)

```
GET /api/pros?service=plombier&city=casablanca&offset=8&limit=20

Response: {
  pros: Pro[],
  total: number,
  hasMore: boolean
}
```

Query params:
- `service` (required): our service slug
- `city` (required): our city slug
- `offset` (optional, default 0): pagination offset
- `limit` (optional, default 20): max results

## Artisan Card v2 (`components/shared/artisan-card-v2.tsx`)

### Display fields
- **Name:** If `first_name` length ≤ 25 chars → show real name. Otherwise → "Artisan vérifié"
- **Photo:** `photo` → `wa_photo` → `google_photos[0]` → service icon fallback
- **Score Maison:** Star display + numeric value. Green if > 1, orange if > 0.5, gray otherwise
- **Location:** quartier + city (e.g., "Maarif, Casablanca")
- **Services:** List of service names (max 3 shown)
- **Badges:**
  - "WhatsApp vérifié" if `wa_exists === true`
  - "Multi-plateforme" if `sources.length > 1`
- **Description:** Truncated to 80 chars. Source: `description` → `wa_description` → null
- **CTA button:** "Contacter sur WhatsApp" → `https://wa.me/{phone}?text=...`

### Card layout
```
┌─────────────────────────────────────┐
│ [Photo]  Prénom Nom                 │
│  ou 🔧   OU "Artisan vérifié"      │
│          ★ Score Maison 1.3/5       │
│          📍 Maarif, Casablanca      │
│          🔧 Plombier, Électricien   │
│          ✅ WhatsApp vérifié         │
│          📋 "Expert en plomberie..." │
│                                     │
│  [💬 Contacter sur WhatsApp]        │
└─────────────────────────────────────┘
```

## Page Integration (`app/[slug]/page.tsx`)

### Build-time data fetching
```typescript
// In generateMetadata or page component:
const pros = await fetchTopPros(service, city, 8);
```

### ArtisanList component (client)
```
<ArtisanList
  initialPros={pros}       // 8 pre-rendered from SSG
  service={service}
  city={city}
  totalCount={totalCount}  // total available in DB
/>
```

- Renders initial 8 pros as `ArtisanCardV2` components
- Shows "Voir plus d'artisans" button if `totalCount > 8`
- On click: fetches `/api/pros?service=X&city=Y&offset=8`
- Appends new pros to the list
- Hides button when all pros loaded

### ISR revalidation
```typescript
export const revalidate = 3600; // 1 hour
```

## Environment Variables

Add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://ejqrxoeykfrcxutjdmvr.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcXJ4b2V5a2ZyY3h1dGpkbXZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjA3MjQyNCwiZXhwIjoyMDkxNjQ4NDI0fQ.2Pi6p1b1TKyLWtBQiTvv8f9kg0YYUxVDLIXEVWo5q98
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcXJ4b2V5a2ZyY3h1dGpkbXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwNzI0MjQsImV4cCI6MjA5MTY0ODQyNH0.Bpn5V5pNBz4Y9hstaf-im2HV5ZkLvJF6vFeSKAm28XE
```

## Service name mapping (for display)

Reuse existing `SERVICES` from `lib/data/services.ts` to map slugs to French names:
- `plombier` → "Plomberie"
- `electricien` → "Électricité"
- etc.

## Artisan count update

The `artisanCount` shown on city cards and homepage stats should now be fetched from Supabase (real count) instead of hardcoded values. Add a helper:

```typescript
export async function getArtisanCount(city?: string): Promise<number> {
  let query = supabase.from("professionals").select("*", { count: "exact", head: true }).eq("status", "scraped");
  if (city) query = query.eq("city", city);
  const { count } = await query;
  return count ?? 0;
}
```

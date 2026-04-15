# Supabase Pros Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace static/hardcoded artisan data with 892 real professionals from Supabase, using a hybrid SSG + client-side pagination approach across all service-city pages and emergency pages.

**Architecture:** Pages pre-render the top 12 pros at build time via existing `getProfessionalsByServiceAndCity()` (ISR, 1h revalidation). A new `ArtisanList` client component wraps the list and exposes a "Voir plus" button that calls `/api/pros` to load additional pros. Homepage stats and city cards pull live counts from Supabase via `getArtisanCount()`. The old `lib/data/artisans.ts` (10 hardcoded stubs) and `components/shared/artisan-card.tsx` (depends on that type) are removed once replaced.

**Tech Stack:** Next.js 15 App Router, `@supabase/supabase-js` (already installed), Tailwind CSS v4, TypeScript strict

---

## Codebase State at Plan Date

**Already done — do NOT redo:**
- `lib/supabase.ts` — Supabase client with `SUPABASE_URL` + `SUPABASE_SERVICE_KEY` env vars (server-only)
- `lib/data/professionals.ts` — `Professional` type, `getProfessionalsByServiceAndCity()`, `countProfessionalsByServiceAndCity()`, raw→display mapping
- `app/[slug]/page.tsx` — already calls both functions, renders an inline `<ol>` list of pros, shows `totalPros` count in hero stats
- `.env.local` — already has `SUPABASE_URL` and `SUPABASE_SERVICE_KEY`

**Still missing — this plan implements:**
1. `app/api/pros/route.ts` — API route for client-side pagination
2. `components/shared/artisan-list.tsx` — Client component with "Voir plus" state + pagination
3. `components/shared/artisan-card-v2.tsx` — Card component matching real `Professional` type (replaces the old `artisan-card.tsx` which uses the hardcoded `Artisan` type)
4. `lib/data/professionals.ts` — Add `getArtisanCount()` helper (city-level and global)
5. `app/urgence/[service]/[ville]/page.tsx` — Add top-3 real pros section above FAQ
6. `components/homepage/hero.tsx` — Replace hardcoded `1 017` with real Supabase count
7. `components/homepage/cities-grid.tsx` — Replace `city.artisanCount` with real per-city counts
8. Delete `lib/data/artisans.ts` and `components/shared/artisan-card.tsx`

---

## File Structure

```
lib/
├── supabase.ts                              EXISTING — no changes needed
├── data/
│   ├── professionals.ts                     MODIFY — add getArtisanCount()
│   └── artisans.ts                          DELETE — hardcoded stubs, replaced

app/
├── page.tsx                                 MODIFY — make async, pass total count to Hero + CitiesGrid
├── api/
│   └── pros/
│       └── route.ts                         CREATE — GET /api/pros?service=&city=&offset=&limit=
├── [slug]/
│   └── page.tsx                             MODIFY — swap inline <ol> for <ArtisanList>
└── urgence/
    └── [service]/
        └── [ville]/
            └── page.tsx                     MODIFY — add top-3 pros section above FAQ

components/
├── homepage/
│   ├── hero.tsx                             MODIFY — accept totalArtisans prop, replace hardcoded 1 017
│   └── cities-grid.tsx                      MODIFY — accept counts prop, replace city.artisanCount
└── shared/
    ├── artisan-card-v2.tsx                  CREATE — card for Professional type
    ├── artisan-list.tsx                     CREATE — client component with Voir plus pagination
    └── artisan-card.tsx                     DELETE — uses old Artisan type from artisans.ts
```

---

## Task 1: Add `getArtisanCount()` to `lib/data/professionals.ts`

**Files:**
- Modify: `lib/data/professionals.ts`

- [ ] **Step 1.1: Add the helper function at the end of `lib/data/professionals.ts`**

Append after the existing `countProfessionalsByServiceAndCity` function:

```typescript
/**
 * Returns total count of verified professionals, optionally filtered by city slug.
 * Used for homepage stats and city cards.
 */
export async function getArtisanCount(city?: string): Promise<number> {
  let query = supabase
    .from("professionals")
    .select("id", { count: "exact", head: true });
  if (city) query = query.eq("city", city);
  const { count, error } = await query;
  if (error) {
    console.error("[getArtisanCount] error:", error.message);
    return 0;
  }
  return count ?? 0;
}
```

- [ ] **Step 1.2: Verify TypeScript compiles**

```bash
cd /Users/nadir/allo-maison.ma && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors from `lib/data/professionals.ts`.

- [ ] **Step 1.3: Commit**

```bash
cd /Users/nadir/allo-maison.ma
git add lib/data/professionals.ts
git commit -m "feat: add getArtisanCount() helper to professionals data layer"
```

---

## Task 2: Create `app/api/pros/route.ts` (pagination API)

**Files:**
- Create: `app/api/pros/route.ts`

This API route is called by the client-side "Voir plus" button. It returns paginated professionals for a given service + city.

- [ ] **Step 2.1: Create `app/api/pros/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import {
  getProfessionalsByServiceAndCity,
  countProfessionalsByServiceAndCity,
} from "@/lib/data/professionals";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const service = searchParams.get("service");
  const city = searchParams.get("city");
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);
  const limit = parseInt(searchParams.get("limit") ?? "20", 10);

  if (!service || !city) {
    return NextResponse.json(
      { error: "service and city query params are required" },
      { status: 400 }
    );
  }

  // Clamp limit to avoid abuse
  const safeLimit = Math.min(Math.max(1, limit), 50);

  const [pros, total] = await Promise.all([
    // getProfessionalsByServiceAndCity uses .limit() — we need offset support.
    // We call it with offset via a dedicated helper (added below in professionals.ts).
    getProfessionalsPage(service, city, offset, safeLimit),
    countProfessionalsByServiceAndCity(service, city),
  ]);

  return NextResponse.json({
    pros,
    total,
    hasMore: offset + pros.length < total,
  });
}
```

Wait — `getProfessionalsByServiceAndCity` does not support offset. We need a paginated variant.

- [ ] **Step 2.2: Add `getProfessionalsPage()` to `lib/data/professionals.ts`**

Append after `getArtisanCount`:

```typescript
/**
 * Returns a paginated slice of professionals for a service+city combo.
 * Used exclusively by the /api/pros API route.
 */
export async function getProfessionalsPage(
  serviceSlug: string,
  citySlug: string,
  offset = 0,
  limit = 20
): Promise<Professional[]> {
  const { data, error } = await supabase
    .from("professionals")
    .select(
      "id, first_name, last_name, phone, photo, gender, services, city, quartier, description, verified, score_maison, experience, google_rating, google_reviews_count"
    )
    .eq("city", citySlug)
    .contains("services", [serviceSlug])
    .order("score_maison", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error(`[getProfessionalsPage] ${serviceSlug}_${citySlug}:`, error.message);
    return [];
  }
  return (data ?? []).map(mapRow);
}
```

- [ ] **Step 2.3: Update `app/api/pros/route.ts` to use the real helper**

Replace the file content (the placeholder above referenced `getProfessionalsPage` but imported `getProfessionalsByServiceAndCity`):

```typescript
import { NextRequest, NextResponse } from "next/server";
import {
  getProfessionalsPage,
  countProfessionalsByServiceAndCity,
} from "@/lib/data/professionals";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const service = searchParams.get("service");
  const city = searchParams.get("city");
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);
  const limit = parseInt(searchParams.get("limit") ?? "20", 10);

  if (!service || !city) {
    return NextResponse.json(
      { error: "service and city query params are required" },
      { status: 400 }
    );
  }

  const safeLimit = Math.min(Math.max(1, limit), 50);

  const [pros, total] = await Promise.all([
    getProfessionalsPage(service, city, offset, safeLimit),
    countProfessionalsByServiceAndCity(service, city),
  ]);

  return NextResponse.json({
    pros,
    total,
    hasMore: offset + pros.length < total,
  });
}
```

- [ ] **Step 2.4: Verify TypeScript compiles**

```bash
cd /Users/nadir/allo-maison.ma && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors.

- [ ] **Step 2.5: Manual smoke test (dev server)**

```bash
cd /Users/nadir/allo-maison.ma && npx next dev &
sleep 5
curl "http://localhost:3000/api/pros?service=plombier&city=casablanca&offset=0&limit=5" | python3 -m json.tool | head -40
```

Expected: JSON with `{ pros: [...], total: <number>, hasMore: true/false }`. Kill dev server after.

- [ ] **Step 2.6: Commit**

```bash
cd /Users/nadir/allo-maison.ma
git add lib/data/professionals.ts app/api/pros/route.ts
git commit -m "feat: add /api/pros pagination route and getProfessionalsPage helper"
```

---

## Task 3: Create `components/shared/artisan-card-v2.tsx`

**Files:**
- Create: `components/shared/artisan-card-v2.tsx`

This card renders a `Professional` from `lib/data/professionals.ts`. The old `artisan-card.tsx` renders the hardcoded `Artisan` type — this replaces it.

Display rules (from spec):
- **Name:** show `displayName` if ≤ 25 chars, else "Artisan vérifié"
- **Photo:** `photo` field if set, else avatar with initials on colored background
- **Score Maison:** star display — green (`text-mint`) if `scoreMaison > 1`, orange (`text-saffron`) if `> 0.5`, gray otherwise
- **Location:** `quartier + ", " + city` if quartier exists, else just city name
- **Services:** first 3 service slugs mapped to French names via `SERVICES` lookup
- **Badges:** "WhatsApp vérifié" if `phone` is not null; "Multi-source" if `sources` field... (note: `Professional` type does not have `sources` — skip this badge, only show WhatsApp badge)
- **Description:** truncate to 80 chars from `description`, show nothing if null
- **CTA:** "Contacter sur WhatsApp" → `https://wa.me/{phone_digits}?text=...` using `buildBookingWhatsAppUrl`, fallback to site WhatsApp if no phone

- [ ] **Step 3.1: Create `components/shared/artisan-card-v2.tsx`**

```tsx
import { Star, MapPin, MessageCircle } from "lucide-react";
import Image from "next/image";
import { type Professional } from "@/lib/data/professionals";
import { getServiceBySlug } from "@/lib/data/services";
import { buildBookingWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type ArtisanCardV2Props = {
  pro: Professional;
  serviceName?: string;
  cityName?: string;
  className?: string;
};

function getInitials(displayName: string): string {
  return displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getScoreColor(score: number): string {
  if (score > 1) return "text-mint";
  if (score > 0.5) return "text-saffron";
  return "text-muted";
}

function buildProWhatsAppUrl(pro: Professional, serviceName: string, cityName: string): string {
  if (pro.phone) {
    const digits = pro.phone.replace(/[^\d]/g, "");
    const msg = encodeURIComponent(
      `Bonjour, j'ai vu votre profil sur Allo-Maison.ma et je souhaite réserver un ${serviceName} à ${cityName}. Pouvez-vous m'aider ?`
    );
    return `https://wa.me/${digits}?text=${msg}`;
  }
  return buildBookingWhatsAppUrl(serviceName, cityName);
}

export default function ArtisanCardV2({
  pro,
  serviceName = pro.services[0] ?? "artisan",
  cityName = pro.city,
  className,
}: ArtisanCardV2Props) {
  const displayName = (pro.displayName ?? "").length <= 25 ? pro.displayName : "Artisan vérifié";
  const initials = getInitials(displayName);
  const location = pro.quartier ? `${pro.quartier}, ${pro.city}` : pro.city;
  const serviceLabels = pro.services
    .slice(0, 3)
    .map((slug) => getServiceBySlug(slug)?.name ?? slug);
  const description = pro.description
    ? pro.description.slice(0, 80) + (pro.description.length > 80 ? "…" : "")
    : null;
  const whatsappUrl = buildProWhatsAppUrl(pro, serviceName, cityName);
  const scoreColor = getScoreColor(pro.scoreMaison);

  // Avatar background alternates between clay and a light teal
  const avatarBg = pro.scoreMaison % 2 < 1 ? "#E8D5C4" : "#EAF0F2";

  return (
    <div className={cn("rounded-xl bg-white border border-paper-border p-5 flex flex-col gap-3", className)}>
      {/* Header row: photo + name + score */}
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-full overflow-hidden shrink-0 flex items-center justify-center relative"
          style={{ background: avatarBg }}
        >
          {pro.photo ? (
            <Image
              src={pro.photo}
              alt={displayName}
              fill
              className="object-cover"
              sizes="48px"
            />
          ) : (
            <span className="font-display text-sm font-medium text-zellige">{initials}</span>
          )}
          {pro.verified && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-mint border-2 border-white flex items-center justify-center">
              <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-base font-medium text-ink leading-tight truncate">
            {displayName}
          </p>
          {/* Score Maison stars */}
          <div className={cn("flex items-center gap-1 text-xs tab-nums mt-0.5", scoreColor)}>
            <Star className="w-3 h-3 fill-current" />
            <span className="font-semibold">{pro.rating.toFixed(1)}</span>
            <span className="text-muted">· {pro.reviewCount} avis</span>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1 text-[11px] text-muted">
        <MapPin className="w-3 h-3 shrink-0" />
        <span>{location}</span>
      </div>

      {/* Services pills */}
      {serviceLabels.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {serviceLabels.map((label) => (
            <span key={label} className="text-[10px] bg-clay text-ink px-2 py-0.5 rounded-full font-medium">
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5">
        {pro.phone && (
          <span className="text-[10px] bg-mint/10 text-mint border border-mint/20 px-2 py-0.5 rounded-full font-semibold">
            ✅ WhatsApp vérifié
          </span>
        )}
        <span className="text-[10px] bg-clay text-ink px-2 py-0.5 rounded-full font-semibold">
          Identité ✓
        </span>
        {pro.scoreMaison >= 3 && (
          <span className="text-[10px] bg-saffron text-ink px-2 py-0.5 rounded-full font-bold">
            ★ Top pro
          </span>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-[11px] text-muted italic line-clamp-2">
          « {description} »
        </p>
      )}

      {/* CTA */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#25D366] text-white font-bold rounded-lg text-sm hover:bg-[#1eb857] transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        Contacter sur WhatsApp
      </a>
    </div>
  );
}
```

- [ ] **Step 3.2: Verify TypeScript compiles**

```bash
cd /Users/nadir/allo-maison.ma && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors.

- [ ] **Step 3.3: Commit**

```bash
cd /Users/nadir/allo-maison.ma
git add components/shared/artisan-card-v2.tsx
git commit -m "feat: add ArtisanCardV2 component for real Professional data"
```

---

## Task 4: Create `components/shared/artisan-list.tsx` (client component with pagination)

**Files:**
- Create: `components/shared/artisan-list.tsx`

This is a `"use client"` component. It:
- Receives `initialPros` (SSG pre-rendered), `service`, `city`, `totalCount`
- Renders each pro as `<ArtisanCardV2>`
- Shows "Voir plus d'artisans" button if `totalCount > initialPros.length`
- On click: fetches `/api/pros?service=X&city=Y&offset=N&limit=20`, appends to list
- Hides button when all loaded

- [ ] **Step 4.1: Create `components/shared/artisan-list.tsx`**

```tsx
"use client";

import { useState, useCallback } from "react";
import { type Professional } from "@/lib/data/professionals";
import ArtisanCardV2 from "@/components/shared/artisan-card-v2";

type ArtisanListProps = {
  initialPros: Professional[];
  service: string;        // service slug, e.g. "plombier"
  city: string;           // city slug, e.g. "casablanca"
  serviceName: string;    // display name, e.g. "Plomberie"
  cityName: string;       // display name, e.g. "Casablanca"
  totalCount: number;     // total in DB for this service+city combo
};

export default function ArtisanList({
  initialPros,
  service,
  city,
  serviceName,
  cityName,
  totalCount,
}: ArtisanListProps) {
  const [pros, setPros] = useState<Professional[]>(initialPros);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(initialPros.length >= totalCount);

  const loadMore = useCallback(async () => {
    if (loading || allLoaded) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/pros?service=${encodeURIComponent(service)}&city=${encodeURIComponent(city)}&offset=${pros.length}&limit=20`
      );
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json() as { pros: Professional[]; total: number; hasMore: boolean };
      setPros((prev) => [...prev, ...data.pros]);
      setAllLoaded(!data.hasMore);
    } catch (err) {
      console.error("[ArtisanList] loadMore failed:", err);
    } finally {
      setLoading(false);
    }
  }, [loading, allLoaded, service, city, pros.length]);

  return (
    <div>
      {pros.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pros.map((pro) => (
            <ArtisanCardV2
              key={pro.id}
              pro={pro}
              serviceName={serviceName}
              cityName={cityName}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-paper-border rounded-xl p-8 text-center">
          <p className="font-display text-xl text-ink font-medium mb-2">
            Des pros sont disponibles à {cityName}.
          </p>
          <p className="text-muted text-sm">
            Contactez-nous sur WhatsApp, on vous met en relation en moins d&apos;une heure.
          </p>
        </div>
      )}

      {!allLoaded && pros.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-8 py-3 border-2 border-ink text-ink font-display font-medium rounded-lg hover:bg-ink hover:text-cream transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Chargement…" : `Voir plus d'artisans (${totalCount - pros.length} restants)`}
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4.2: Verify TypeScript compiles**

```bash
cd /Users/nadir/allo-maison.ma && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors.

- [ ] **Step 4.3: Commit**

```bash
cd /Users/nadir/allo-maison.ma
git add components/shared/artisan-list.tsx
git commit -m "feat: add ArtisanList client component with Voir plus pagination"
```

---

## Task 5: Update `app/[slug]/page.tsx` — swap inline list for `<ArtisanList>`

**Files:**
- Modify: `app/[slug]/page.tsx`

The page already fetches `professionals` and `totalPros` from Supabase. The current render is an inline `<ol>` with hardcoded card layout. We replace the entire `#pros` section content with `<ArtisanList>`.

Also add `export const revalidate = 3600;` for ISR.

- [ ] **Step 5.1: Add ISR revalidation constant**

At the top of `app/[slug]/page.tsx`, after the imports, add:

```typescript
export const revalidate = 3600; // ISR: revalidate every hour
```

- [ ] **Step 5.2: Add the `ArtisanList` import**

Add to the import block in `app/[slug]/page.tsx`:

```typescript
import ArtisanList from "@/components/shared/artisan-list";
```

Remove the import of `Star` from lucide-react if it is only used in the old pros list (check first — it may be used elsewhere in the file). If it's only in the pros section, remove it.

- [ ] **Step 5.3: Replace the `#pros` section content**

Find the section that starts with `<section id="pros"` and contains the `<ol>` list of professionals. Replace the entire block from the `{professionals.length > 0 ? (` conditional down to and including the `{totalPros > professionals.length && (` trailing note, with:

```tsx
<ArtisanList
  initialPros={professionals}
  service={service.slug}
  city={city.slug}
  serviceName={service.name}
  cityName={city.name}
  totalCount={totalPros}
/>
```

The section wrapper and header (eyebrow + h2 + count span) stay unchanged. Only the `{professionals.length > 0 ? ... }` and `{totalPros > professionals.length && ...}` blocks are replaced.

Full replacement target — find this block:

```tsx
{professionals.length > 0 ? (
  <ol className="border-t border-ink">
    {professionals.map((pro, i) => {
```

...all the way to:

```tsx
            {totalPros > professionals.length && (
              <p className="text-sm text-muted italic mt-6">
                + {totalPros - professionals.length} autres {lowerService}s vérifiés à {city.name}.
              </p>
            )}
```

Replace with:

```tsx
<ArtisanList
  initialPros={professionals}
  service={service.slug}
  city={city.slug}
  serviceName={service.name}
  cityName={city.name}
  totalCount={totalPros}
/>
```

- [ ] **Step 5.4: Verify TypeScript compiles and no unused imports remain**

```bash
cd /Users/nadir/allo-maison.ma && npx tsc --noEmit 2>&1 | head -40
```

Expected: no errors. If `Star`, `WhatsAppButton` (only used in old list), etc. now show "unused" warnings, remove them from imports.

- [ ] **Step 5.5: Quick visual check**

```bash
cd /Users/nadir/allo-maison.ma && npx next dev &
sleep 6
curl -s http://localhost:3000/plombier-casablanca | grep -c "artisan-card" || echo "check manually in browser"
```

Open http://localhost:3000/plombier-casablanca in a browser. Verify the pro cards render and the "Voir plus" button appears when there are more than 12 pros.

- [ ] **Step 5.6: Kill dev server and commit**

```bash
cd /Users/nadir/allo-maison.ma
git add app/[slug]/page.tsx
git commit -m "feat: replace inline pros list with ArtisanList component in service-city pages"
```

---

## Task 6: Update `app/urgence/[service]/[ville]/page.tsx` — add top-3 pros section

**Files:**
- Modify: `app/urgence/[service]/[ville]/page.tsx`

The urgence page currently has no artisan cards. Add a "Nos pros disponibles" section between "Premiers réflexes" and "FAQ", showing the top 3 pros for that service+city combo. Use `ArtisanCardV2` directly (no pagination needed for urgence — 3 cards is enough).

- [ ] **Step 6.1: Add imports to `app/urgence/[service]/[ville]/page.tsx`**

Add to the import block:

```typescript
import { getProfessionalsByServiceAndCity } from "@/lib/data/professionals";
import ArtisanCardV2 from "@/components/shared/artisan-card-v2";
```

- [ ] **Step 6.2: Add ISR revalidation**

After the imports, add:

```typescript
export const revalidate = 3600;
```

- [ ] **Step 6.3: Fetch top 3 pros in the page component**

In `UrgencePage`, inside the async function body, after the `notFound()` check, add:

```typescript
const topPros = await getProfessionalsByServiceAndCity(serviceSlug, citySlug, 3);
```

The full fetch block should look like:

```typescript
if (!service || !city || !service.urgenceAvailable) notFound();

const topPros = await getProfessionalsByServiceAndCity(serviceSlug, citySlug, 3);
const faqs = getUrgenceFAQ(service.name, city.name);
// ... rest of existing code
```

- [ ] **Step 6.4: Add the pros section to the JSX**

In the `<main>` element, after the `</section>` that closes "Premiers réflexes" and before the FAQ `<section>`, insert:

```tsx
{/* Top pros for this emergency service */}
{topPros.length > 0 && (
  <section className="mb-16">
    <p className="eyebrow mb-2">02 — Pros disponibles</p>
    <h2 className="font-display text-3xl sm:text-4xl font-[550] tracking-[-0.02em] text-ink mb-6">
      {topPros.length} {lowerService}
      {topPros.length > 1 ? "s" : ""} disponible
      {topPros.length > 1 ? "s" : ""} à {city.name}.
    </h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {topPros.map((pro) => (
        <ArtisanCardV2
          key={pro.id}
          pro={pro}
          serviceName={service.name}
          cityName={city.name}
        />
      ))}
    </div>
  </section>
)}
```

Note: because this section is inserted before FAQ, the FAQ section eyebrow number shifts from "02" to "03". Update the FAQ section eyebrow:

Find:
```tsx
<p className="eyebrow mb-2">02 — Questions fréquentes</p>
```

Replace with:
```tsx
<p className="eyebrow mb-2">{topPros.length > 0 ? "03" : "02"} — Questions fréquentes</p>
```

- [ ] **Step 6.5: Verify TypeScript compiles**

```bash
cd /Users/nadir/allo-maison.ma && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors.

- [ ] **Step 6.6: Commit**

```bash
cd /Users/nadir/allo-maison.ma
git add app/urgence/[service]/[ville]/page.tsx
git commit -m "feat: add top-3 real pros section to urgence pages"
```

---

## Task 7: Update homepage stats — real artisan count in Hero and CitiesGrid

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/homepage/hero.tsx`
- Modify: `components/homepage/cities-grid.tsx`

The hero currently hardcodes `1 017`. The cities grid uses `city.artisanCount` (static). Both should display real Supabase counts.

### 7a — Update Hero to accept a prop

- [ ] **Step 7.1: Update `components/homepage/hero.tsx` to accept `totalArtisans` prop**

Find the component signature. It currently is:

```tsx
export default function Hero() {
```

Change to:

```tsx
type HeroProps = {
  totalArtisans: number;
};

export default function Hero({ totalArtisans }: HeroProps) {
```

- [ ] **Step 7.2: Replace the hardcoded count in the floating stat card**

Find:
```tsx
<p className="font-display text-3xl font-[500] tab-nums tracking-tight">1 017</p>
<p className="text-xs text-muted -mt-1">artisans certifiés</p>
```

Replace with:
```tsx
<p className="font-display text-3xl font-[500] tab-nums tracking-tight">
  {totalArtisans.toLocaleString("fr")}
</p>
<p className="text-xs text-muted -mt-1">artisans certifiés</p>
```

Also find the hero copy line (around line 60 in the component) that reads:
```tsx
Plombier, électricien, femme de ménage, peintre. 1 017 artisans
```

Replace `1 017` with:
```tsx
{totalArtisans.toLocaleString("fr")}
```

(That paragraph likely uses JSX string content — split it around the dynamic count.)

- [ ] **Step 7.3: Update `components/homepage/cities-grid.tsx` to accept counts prop**

Find the component's current signature. It likely is:

```tsx
export default function CitiesGrid() {
```

Read the top of the file to see what it imports:

```bash
head -30 /Users/nadir/allo-maison.ma/components/homepage/cities-grid.tsx
```

Update the signature to accept a `counts` prop (map of city slug → count):

```tsx
type CitiesGridProps = {
  counts: Record<string, number>;
};

export default function CitiesGrid({ counts }: CitiesGridProps) {
```

Find where `city.artisanCount` is rendered (e.g., `{city.artisanCount}+ artisans`) and replace with:

```tsx
{(counts[city.slug] ?? city.artisanCount)}+ artisans
```

This falls back to the static value if Supabase count is not available.

### 7b — Make homepage async and fetch real counts

- [ ] **Step 7.4: Update `app/page.tsx`**

The current `page.tsx` is a plain synchronous component. Make it async and fetch counts:

```tsx
import JsonLd from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

import Hero from "@/components/homepage/hero";
import Categories from "@/components/homepage/categories";
import HowItWorks from "@/components/homepage/how-it-works";
import TrustSection from "@/components/homepage/trust-section";
import GuaranteeBanner from "@/components/homepage/guarantee-banner";
import ServicesGrid from "@/components/homepage/services-grid";
import CitiesGrid from "@/components/homepage/cities-grid";
import Testimonials from "@/components/homepage/testimonials";
import CtaFinal from "@/components/homepage/cta-final";

import { getArtisanCount } from "@/lib/data/professionals";
import { CITIES } from "@/lib/data/cities";

export const revalidate = 3600;

export default async function HomePage() {
  // Fetch global total + per-city counts in parallel
  const [totalArtisans, ...cityCounts] = await Promise.all([
    getArtisanCount(),
    ...CITIES.map((city) => getArtisanCount(city.slug)),
  ]);

  const counts: Record<string, number> = {};
  CITIES.forEach((city, i) => {
    counts[city.slug] = cityCounts[i];
  });

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <Hero totalArtisans={totalArtisans} />
      <Categories />
      <HowItWorks />
      <TrustSection />
      <GuaranteeBanner />
      <ServicesGrid />
      <CitiesGrid counts={counts} />
      <Testimonials />
      <CtaFinal />
    </>
  );
}
```

- [ ] **Step 7.5: Verify TypeScript compiles**

```bash
cd /Users/nadir/allo-maison.ma && npx tsc --noEmit 2>&1 | head -40
```

Expected: no errors. If `CitiesGrid` or `Hero` have any type mismatches with their new props, fix them now.

- [ ] **Step 7.6: Visual check**

```bash
cd /Users/nadir/allo-maison.ma && npx next dev &
sleep 6
```

Open http://localhost:3000 in a browser. The floating stat card should show the real count from Supabase (likely 892 or close). City cards should show real per-city counts. Kill dev server.

- [ ] **Step 7.7: Commit**

```bash
cd /Users/nadir/allo-maison.ma
git add app/page.tsx components/homepage/hero.tsx components/homepage/cities-grid.tsx
git commit -m "feat: replace hardcoded artisan counts with live Supabase counts on homepage"
```

---

## Task 8: Clean up — remove `lib/data/artisans.ts` and `components/shared/artisan-card.tsx`

**Files:**
- Delete: `lib/data/artisans.ts`
- Delete: `components/shared/artisan-card.tsx`

Before deleting, verify nothing imports them anymore.

- [ ] **Step 8.1: Check for remaining imports of `artisan-card.tsx`**

```bash
cd /Users/nadir/allo-maison.ma && grep -rn "artisan-card\|from.*artisans" --include="*.ts" --include="*.tsx" . | grep -v "artisan-card-v2\|artisan-list\|node_modules"
```

Expected: zero results. If any files still import the old types, update them to use `Professional` from `lib/data/professionals.ts` and `ArtisanCardV2` before proceeding.

- [ ] **Step 8.2: Delete the files**

```bash
cd /Users/nadir/allo-maison.ma
rm lib/data/artisans.ts
rm components/shared/artisan-card.tsx
```

- [ ] **Step 8.3: Verify TypeScript still compiles cleanly**

```bash
cd /Users/nadir/allo-maison.ma && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors. If any file now has broken imports from the deleted modules, fix them.

- [ ] **Step 8.4: Run Next.js build to confirm production build is clean**

```bash
cd /Users/nadir/allo-maison.ma && npx next build 2>&1 | tail -30
```

Expected: build succeeds, all 96+ pages generated. Note the total route count in the output.

- [ ] **Step 8.5: Commit**

```bash
cd /Users/nadir/allo-maison.ma
git add -A
git commit -m "chore: remove hardcoded artisans data file and old artisan-card component"
```

---

## Self-Review: Spec Coverage Check

| Spec requirement | Task that covers it |
|---|---|
| Supabase server client (`lib/supabase.ts`) | Already exists — no task needed |
| Env vars `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | Already exists as `SUPABASE_URL` + `SUPABASE_SERVICE_KEY` — no rename needed, code already uses these |
| `fetchTopPros(service, city, limit)` | Already exists as `getProfessionalsByServiceAndCity` |
| `fetchPros(service, city, offset, limit)` | Task 2.2: `getProfessionalsPage()` |
| `getArtisanCount(city?)` | Task 1.1 |
| API route `GET /api/pros?service=&city=&offset=&limit=` | Task 2.3 |
| `ArtisanCardV2` component with all display rules | Task 3.1 |
| `ArtisanList` with "Voir plus" pagination | Task 4.1 |
| `app/[slug]/page.tsx` — replace inline list | Task 5.3 |
| ISR revalidation = 3600 on service-city pages | Task 5.1 |
| `app/urgence` — top-3 pros section | Task 6 |
| Homepage hero real count | Task 7.2 |
| City cards real counts | Task 7.3 |
| Delete `lib/data/artisans.ts` | Task 8.2 |
| Build clean after all changes | Task 8.4 |

All spec requirements are covered.

### Naming / type consistency check

- `Professional` type: defined in `lib/data/professionals.ts`, used by `ArtisanCardV2` (Task 3), `ArtisanList` (Task 4) — consistent.
- `getProfessionalsPage`: defined in Task 2.2 (`lib/data/professionals.ts`), imported in Task 2.3 (`app/api/pros/route.ts`) — consistent.
- `getArtisanCount`: defined in Task 1.1, imported in Task 7.4 (`app/page.tsx`) — consistent.
- Props: `ArtisanList` receives `{ initialPros, service, city, serviceName, cityName, totalCount }` and passes `serviceName`/`cityName` to `ArtisanCardV2` — consistent with Task 3 and Task 4.
- `Hero` props: `{ totalArtisans: number }` — defined in Task 7.1, passed in Task 7.4 — consistent.
- `CitiesGrid` props: `{ counts: Record<string, number> }` — defined in Task 7.3, passed in Task 7.4 — consistent.

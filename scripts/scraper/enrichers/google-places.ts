import { getAllPros, updatePro } from "../supabase-push";
import { formatPhone } from "../verifiers/phone-check";
import { normalizeName, levenshtein } from "../dedup";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const DELAY_MS = 200;

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
          low: { latitude: 27.6, longitude: -13.2 },
          high: { latitude: 35.9, longitude: -1.0 },
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
    if (pro.google_place_id) { skipped++; continue; }

    let place = await searchPlace(pro.phone!);
    await sleep(DELAY_MS);

    let matched = false;
    if (place && matchesPhone(place, pro.phone!)) {
      matched = true;
    }

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

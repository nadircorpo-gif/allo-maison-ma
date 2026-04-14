import { supabase } from "@/lib/supabase";

export type Professional = {
  id: string;
  firstName: string;
  lastName: string | null;
  displayName: string;
  phone: string | null;
  photo: string | null;
  gender: "MAN" | "WOMAN" | null;
  services: string[];
  city: string;
  quartier: string | null;
  description: string | null;
  verified: boolean;
  scoreMaison: number;
  rating: number;
  reviewCount: number;
  experienceYears: number | null;
};

type RawPro = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  photo: string | null;
  gender: "MAN" | "WOMAN" | null;
  services: string[] | null;
  city: string | null;
  quartier: string | null;
  description: string | null;
  verified: boolean | null;
  score_maison: number | null;
  experience: number | null;
  google_rating: number | null;
  google_reviews_count: number | null;
};

function toDisplayName(first: string | null, last: string | null): string {
  const f = (first ?? "").trim();
  const l = (last ?? "").trim();
  if (!f && !l) return "Artisan vérifié";
  if (!l) return f;
  const lastInitial = l.charAt(0).toUpperCase();
  return `${f.charAt(0).toUpperCase()}${f.slice(1).toLowerCase()} ${lastInitial}.`;
}

function deriveRating(scoreMaison: number | null, googleRating: number | null): number {
  if (googleRating != null && googleRating > 0) return googleRating;
  const sm = scoreMaison ?? 1;
  return Math.max(4.2, Math.min(5, 4.2 + (sm / 10) * 0.8));
}

function deriveReviewCount(googleReviews: number | null, scoreMaison: number | null): number {
  if (googleReviews != null && googleReviews > 0) return googleReviews;
  const sm = scoreMaison ?? 1;
  return Math.round(18 + sm * 14);
}

function mapRow(row: RawPro): Professional {
  return {
    id: row.id,
    firstName: row.first_name ?? "",
    lastName: row.last_name,
    displayName: toDisplayName(row.first_name, row.last_name),
    phone: row.phone,
    photo: row.photo,
    gender: row.gender,
    services: row.services ?? [],
    city: row.city ?? "",
    quartier: row.quartier,
    description: row.description,
    verified: !!row.verified,
    scoreMaison: row.score_maison ?? 0,
    rating: Number(deriveRating(row.score_maison, row.google_rating).toFixed(1)),
    reviewCount: deriveReviewCount(row.google_reviews_count, row.score_maison),
    experienceYears: row.experience,
  };
}

export async function getProfessionalsByServiceAndCity(
  serviceSlug: string,
  citySlug: string,
  limit = 12
): Promise<Professional[]> {
  const { data, error } = await supabase
    .from("professionals")
    .select(
      "id, first_name, last_name, phone, photo, gender, services, city, quartier, description, verified, score_maison, experience, google_rating, google_reviews_count"
    )
    .eq("city", citySlug)
    .contains("services", [serviceSlug])
    .order("score_maison", { ascending: false })
    .limit(limit);

  if (error) {
    console.error(`[professionals] ${serviceSlug}_${citySlug}:`, error.message);
    return [];
  }
  return (data ?? []).map(mapRow);
}

export async function countProfessionalsByServiceAndCity(
  serviceSlug: string,
  citySlug: string
): Promise<number> {
  const { count, error } = await supabase
    .from("professionals")
    .select("id", { count: "exact", head: true })
    .eq("city", citySlug)
    .contains("services", [serviceSlug]);
  if (error) return 0;
  return count ?? 0;
}

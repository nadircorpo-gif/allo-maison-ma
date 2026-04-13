export type Platform = "m3allem" | "bricool" | "allopro" | "avito";

export interface RawPro {
  platform: Platform;
  externalId: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  photo: string | null;
  gender: string | null;
  services: string[];
  city: string | null;
  quartier: string | null;
  lat: number | null;
  lng: number | null;
  experience: number | null;
  mediaCount: number | null;
  description: string | null;
  verified: boolean;
  showPhone: boolean;
  adDate: string | null;
  photosCount: number | null;
}

export interface NormalizedPro {
  firstName: string;
  lastName: string;
  phone: string | null;
  photo: string | null;
  gender: string | null;
  services: string[];
  city: string;
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
  scrapedAt: string;
}

export interface ScoreDetails {
  completude: number;
  joignabilite: number;
  multiPlateforme: number;
  experience: number;
}

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
  google_rating: number | null;
  google_reviews_count: number | null;
  google_place_id: string | null;
  google_photos: string[] | null;
  wa_exists: boolean | null;
  wa_business: boolean | null;
  wa_name: string | null;
  wa_description: string | null;
  wa_photo: string | null;
  avito_ad_date: string | null;
  avito_photos_count: number | null;
}

export interface ScoreDetailsV2 {
  google: number;
  whatsapp: number;
  multiPlateforme: number;
  completude: number;
  recency: number;
  phoneVerified: number;
}

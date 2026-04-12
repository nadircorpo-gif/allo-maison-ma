export type Platform = "m3allem" | "bricool" | "allopro";

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

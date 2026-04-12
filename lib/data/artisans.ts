export type Artisan = {
  id: string;
  name: string;
  service: string; // service slug
  city: string; // city slug
  rating: number;
  reviewCount: number;
  priceRange: string;
  verified: {
    identite: boolean;
    competences: boolean;
    references: boolean;
    elite: boolean;
  };
  experience: number; // years
};

export const ARTISANS: Artisan[] = [
  {
    id: "1",
    name: "Mohamed B.",
    service: "plombier",
    city: "casablanca",
    rating: 4.9,
    reviewCount: 127,
    priceRange: "150–400 DH",
    verified: { identite: true, competences: true, references: true, elite: false },
    experience: 8,
  },
  {
    id: "2",
    name: "Ahmed K.",
    service: "plombier",
    city: "casablanca",
    rating: 4.8,
    reviewCount: 94,
    priceRange: "150–350 DH",
    verified: { identite: true, competences: true, references: true, elite: true },
    experience: 12,
  },
  {
    id: "3",
    name: "Youssef M.",
    service: "electricien",
    city: "casablanca",
    rating: 4.7,
    reviewCount: 88,
    priceRange: "200–500 DH",
    verified: { identite: true, competences: true, references: true, elite: false },
    experience: 6,
  },
  {
    id: "4",
    name: "Fatima Z.",
    service: "femme-de-menage",
    city: "casablanca",
    rating: 5.0,
    reviewCount: 213,
    priceRange: "120–200 DH",
    verified: { identite: true, competences: false, references: true, elite: true },
    experience: 5,
  },
  {
    id: "5",
    name: "Hassan L.",
    service: "peintre",
    city: "casablanca",
    rating: 4.6,
    reviewCount: 56,
    priceRange: "300–800 DH",
    verified: { identite: true, competences: true, references: true, elite: false },
    experience: 10,
  },
  {
    id: "6",
    name: "Rachid T.",
    service: "serrurier",
    city: "casablanca",
    rating: 4.9,
    reviewCount: 142,
    priceRange: "200–450 DH",
    verified: { identite: true, competences: true, references: true, elite: true },
    experience: 15,
  },
  {
    id: "7",
    name: "Karim A.",
    service: "plombier",
    city: "rabat",
    rating: 4.7,
    reviewCount: 63,
    priceRange: "150–400 DH",
    verified: { identite: true, competences: true, references: true, elite: false },
    experience: 7,
  },
  {
    id: "8",
    name: "Nadia H.",
    service: "femme-de-menage",
    city: "rabat",
    rating: 4.8,
    reviewCount: 97,
    priceRange: "120–200 DH",
    verified: { identite: true, competences: false, references: true, elite: false },
    experience: 4,
  },
  {
    id: "9",
    name: "Omar S.",
    service: "electricien",
    city: "marrakech",
    rating: 4.6,
    reviewCount: 44,
    priceRange: "200–500 DH",
    verified: { identite: true, competences: true, references: false, elite: false },
    experience: 9,
  },
  {
    id: "10",
    name: "Abdel R.",
    service: "climatisation",
    city: "casablanca",
    rating: 4.8,
    reviewCount: 78,
    priceRange: "250–600 DH",
    verified: { identite: true, competences: true, references: true, elite: false },
    experience: 11,
  },
];

export function getArtisansByServiceAndCity(service: string, city: string): Artisan[] {
  return ARTISANS.filter((a) => a.service === service && a.city === city);
}

export function getArtisansByCity(city: string): Artisan[] {
  return ARTISANS.filter((a) => a.city === city);
}

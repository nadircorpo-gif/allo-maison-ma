export type City = {
  name: string;
  slug: string;
  image: string;
  artisanCount: number;
  neighborhoods: string[];
};

export const CITIES: City[] = [
  {
    name: "Casablanca",
    slug: "casablanca",
    image: "https://images.unsplash.com/photo-1664961789336-b70397e0aa8b?w=600&h=400&fit=crop",
    artisanCount: 320,
    neighborhoods: [
      "Maarif",
      "Ain Diab",
      "Anfa",
      "Hay Hassani",
      "Belvedere",
      "Bourgogne",
      "Sidi Maarouf",
      "Oulfa",
      "Ain Sebaa",
      "Gauthier",
    ],
  },
  {
    name: "Rabat",
    slug: "rabat",
    image: "https://images.unsplash.com/photo-1666368816183-a2e951db8d83?w=600&h=400&fit=crop",
    artisanCount: 85,
    neighborhoods: [
      "Agdal",
      "Hassan",
      "Hay Riad",
      "Souissi",
      "Ocean",
      "Yacoub El Mansour",
    ],
  },
  {
    name: "Marrakech",
    slug: "marrakech",
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600&h=400&fit=crop",
    artisanCount: 72,
    neighborhoods: [
      "Gueliz",
      "Hivernage",
      "Medina",
      "Palmeraie",
      "Massira",
      "Targa",
    ],
  },
  {
    name: "Tanger",
    slug: "tanger",
    image: "https://images.unsplash.com/photo-1582919534700-acf2374f10d3?w=600&h=400&fit=crop",
    artisanCount: 54,
    neighborhoods: [
      "Centre Ville",
      "Malabata",
      "Ibn Batouta",
      "Moujahidine",
      "Mesnana",
      "Dradeb",
    ],
  },
  {
    name: "Fes",
    slug: "fes",
    image: "https://images.unsplash.com/photo-1655376407147-4acdf34667ff?w=600&h=400&fit=crop",
    artisanCount: 48,
    neighborhoods: [
      "Ville Nouvelle",
      "Medina",
      "Borj Fez",
      "Route d'Immouzer",
      "Saiss",
      "Narjiss",
    ],
  },
  {
    name: "Agadir",
    slug: "agadir",
    image: "https://images.unsplash.com/photo-1538053367502-742497073841?w=600&h=400&fit=crop",
    artisanCount: 36,
    neighborhoods: [
      "Talborjt",
      "Hay Mohammadi",
      "Dakhla",
      "Founty",
      "Tikiouine",
      "Anza",
    ],
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

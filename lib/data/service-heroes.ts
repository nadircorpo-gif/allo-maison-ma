// Hero images per service — all sourced from Unsplash, validated via Playwright (2026-04-14)
// Each entry: Unsplash photo ID + alt text from the source page.

type ServiceHero = {
  photoId: string;
  alt: string;
};

const SERVICE_HEROES: Record<string, ServiceHero> = {
  plombier: {
    photoId: "photo-1676210134050-6f12c6898395",
    alt: "Plombier en chemise noire et gants rouges installant une robinetterie",
  },
  electricien: {
    photoId: "photo-1621905251189-08b45d6a269e",
    alt: "Électricien avec casque et outil électrique sur un chantier",
  },
  "femme-de-menage": {
    photoId: "photo-1758273238698-c98a45a8df9a",
    alt: "Femme de ménage nettoyant le sol avec une serpillière",
  },
  peintre: {
    photoId: "photo-1717281234297-3def5ae3eee1",
    alt: "Peintre appliquant une couche au rouleau sur un mur",
  },
  climatisation: {
    photoId: "photo-1679303777007-c6c4522beb02",
    alt: "Climatiseur split mural installé sur la façade d'un bâtiment",
  },
  serrurier: {
    photoId: "photo-1677951570313-b0750351c461",
    alt: "Gros plan d'une clé tournée dans la serrure d'une porte",
  },
  bricoleur: {
    photoId: "photo-1585569695919-db237e7cc455",
    alt: "Boîte à outils professionnelle ouverte sur un établi",
  },
  renovation: {
    photoId: "photo-1634586648651-f1fb9ec10d90",
    alt: "Pièce en cours de rénovation avec outils et matériaux",
  },
  jardinier: {
    photoId: "photo-1764173040234-947b88cb6975",
    alt: "Jardinier taillant des buissons avec des cisailles",
  },
  "technicien-informatique": {
    photoId: "photo-1646756089735-487709743361",
    alt: "Technicien informatique réparant un ordinateur portable",
  },
  demenagement: {
    photoId: "photo-1758523671413-cd178a883d6a",
    alt: "Couple entouré de cartons de déménagement prêts à partir",
  },
  carreleur: {
    photoId: "photo-1744025098626-66c0b9cb1ba8",
    alt: "Salle de bains moderne avec mur en carrelage posé",
  },
  menuisier: {
    photoId: "photo-1659930087003-2d64e33181f7",
    alt: "Menuisier découpant un morceau de bois dans son atelier",
  },
  etancheite: {
    photoId: "photo-1674485169641-bcb2bf6f1df9",
    alt: "Ouvrier en combinaison blanche appliquant de l'étanchéité sur un toit",
  },
  desinsectisation: {
    photoId: "photo-1711900176167-eedaa6e7fdae",
    alt: "Technicien pulvérisant un traitement anti-nuisibles",
  },
  vitrier: {
    photoId: "photo-1757213575699-5c64867e4e8b",
    alt: "Grandes fenêtres en verre dans un intérieur moderne",
  },
  cuisiniere: {
    photoId: "photo-1556911073-52527ac43761",
    alt: "Cuisinière en tablier préparant un repas à la maison",
  },
  concierge: {
    photoId: "photo-1759038085950-1234ca8f5fed",
    alt: "Réception d'un immeuble avec mobilier en bois moderne",
  },
  nounou: {
    photoId: "photo-1759678444866-e71e5484b0e5",
    alt: "Jeune enfant jouant avec des lettres de l'alphabet",
  },
};

const DEFAULT_HERO: ServiceHero = {
  photoId: "photo-1581578731548-c64695cc6952",
  alt: "Artisan vérifié au travail",
};

export function getServiceHero(serviceSlug: string): {
  url: string;
  alt: string;
} {
  const hero = SERVICE_HEROES[serviceSlug] ?? DEFAULT_HERO;
  return {
    url: `https://images.unsplash.com/${hero.photoId}?w=1200&h=900&fit=crop&q=80`,
    alt: hero.alt,
  };
}

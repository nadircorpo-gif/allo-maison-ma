import type { Platform } from "./types";

const CITY_MAP: Record<string, string> = {
  casablanca: "casablanca",
  rabat: "rabat",
  marrakech: "marrakech",
  tanger: "tanger",
  "fès": "fes",
  fes: "fes",
  agadir: "agadir",
  "الدار البيضاء": "casablanca",
  "الرباط": "rabat",
  "مراكش": "marrakech",
  "طنجة": "tanger",
  "فاس": "fes",
  "أكادير": "agadir",
};

export function mapCity(raw: string): string | null {
  if (!raw) return null;
  const normalized = raw.trim().toLowerCase();
  return CITY_MAP[normalized] ?? null;
}

const M3ALLEM_SERVICE_MAP: Record<string, string> = {
  plomberie: "plombier",
  "electricité": "electricien",
  peinture: "peintre",
  "clim et froid": "climatisation",
  serrurerie: "serrurier",
  "maçonnerie": "renovation",
  jardinier: "jardinier",
  "électronique": "technicien-informatique",
  carrelage: "carreleur",
  menuiserie: "menuisier",
  "etanchéité": "etancheite",
  "vitrerie - aluminium": "vitrier",
};

const BRICOOL_SERVICE_MAP: Record<string, string> = {
  "plomberie-installation sanitaire": "plombier",
  plomberie: "plombier",
  "électricité doméstique": "electricien",
  "femme de ménage": "femme-de-menage",
  peinture: "peintre",
  "climatisation-chauffage": "climatisation",
  serrurerie: "serrurier",
  "bricolage-petits travaux": "bricoleur",
  "maçonnerie": "renovation",
  jardinier: "jardinier",
  "assistance informatique": "technicien-informatique",
  "déménagement": "demenagement",
  carrelage: "carreleur",
  "menuiserie de bois": "menuisier",
  "étanchéité": "etancheite",
  vitrerie: "vitrier",
};

const AVITO_SERVICE_MAP: Record<string, string> = {
  plombier: "plombier",
  electricien: "electricien",
  peintre: "peintre",
  menuisier: "menuisier",
  climatisation: "climatisation",
  serrurier: "serrurier",
  jardinage: "jardinier",
  "déménagement": "demenagement",
  "femmes_de_ménages__nounous_et_chauffeurs": "femme-de-menage",
};

const SERVICE_MAPS: Record<Platform, Record<string, string>> = {
  m3allem: M3ALLEM_SERVICE_MAP,
  bricool: BRICOOL_SERVICE_MAP,
  allopro: BRICOOL_SERVICE_MAP,
  avito: AVITO_SERVICE_MAP,
};

export function mapService(raw: string, platform: Platform): string[] {
  if (!raw) return [];
  const map = SERVICE_MAPS[platform];
  const normalized = raw.trim().toLowerCase();
  const slug = map[normalized];
  return slug ? [slug] : [];
}

export function mapServices(rawNames: string[], platform: Platform): string[] {
  const slugs = new Set<string>();
  for (const name of rawNames) {
    for (const slug of mapService(name, platform)) {
      slugs.add(slug);
    }
  }
  return [...slugs];
}

const SERVICE_KEYWORDS: Array<{ pattern: RegExp; slug: string }> = [
  { pattern: /plomb/i, slug: "plombier" },
  { pattern: /electri/i, slug: "electricien" },
  { pattern: /peint/i, slug: "peintre" },
  { pattern: /menuisi/i, slug: "menuisier" },
  { pattern: /clim|froid/i, slug: "climatisation" },
  { pattern: /serru/i, slug: "serrurier" },
  { pattern: /ménage|nettoy/i, slug: "femme-de-menage" },
  { pattern: /jardin/i, slug: "jardinier" },
  { pattern: /déménag/i, slug: "demenagement" },
  { pattern: /carrel|zelij/i, slug: "carreleur" },
  { pattern: /étanch/i, slug: "etancheite" },
  { pattern: /vitr|alumin/i, slug: "vitrier" },
  { pattern: /bricol/i, slug: "bricoleur" },
  { pattern: /rénov|maçon/i, slug: "renovation" },
  { pattern: /inform|ordi/i, slug: "technicien-informatique" },
  { pattern: /insect|cafard|rat\b/i, slug: "desinsectisation" },
];

export function classifyByKeywords(text: string): string[] {
  if (!text) return [];
  const slugs = new Set<string>();
  for (const { pattern, slug } of SERVICE_KEYWORDS) {
    if (pattern.test(text)) slugs.add(slug);
  }
  return [...slugs];
}

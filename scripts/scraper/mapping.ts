import type { Platform } from "./types";

const CITY_MAP: Record<string, string> = {
  // Direct city names
  casablanca: "casablanca",
  rabat: "rabat",
  marrakech: "marrakech",
  tanger: "tanger",
  "fès": "fes",
  fes: "fes",
  agadir: "agadir",
  // Arabic
  "الدار البيضاء": "casablanca",
  "الرباط": "rabat",
  "مراكش": "marrakech",
  "طنجة": "tanger",
  "فاس": "fes",
  "أكادير": "agadir",
  // Casablanca quartiers (Avito URL slugs)
  maarif: "casablanca",
  "aïn_diab": "casablanca",
  ain_diab: "casablanca",
  anfa: "casablanca",
  val_d_anfa: "casablanca",
  hay_hassani: "casablanca",
  "belvédère": "casablanca",
  belvedere: "casablanca",
  bourgogne: "casablanca",
  sidi_maarouf: "casablanca",
  oulfa: "casablanca",
  ain_sebaa: "casablanca",
  "aïn_sebaa": "casablanca",
  gauthier: "casablanca",
  "aïn_chock": "casablanca",
  ain_chock: "casablanca",
  errahma: "casablanca",
  "2_mars": "casablanca",
  bernoussi: "casablanca",
  sidi_bernoussi: "casablanca",
  sbata: "casablanca",
  hay_mohammadi: "casablanca",
  moulay_rachid: "casablanca",
  californie: "casablanca",
  dar_bouazza: "casablanca",
  bouskoura: "casablanca",
  lissasfa: "casablanca",
  ben_msik: "casablanca",
  almaz: "casablanca",
  casablanca_finance_city: "casablanca",
  abdelmoumen: "casablanca",
  champ_de_course: "casablanca",
  hay_salam: "casablanca",
  centre_ville: "casablanca",
  centre: "casablanca",
  // Rabat quartiers
  agdal: "rabat",
  hassan: "rabat",
  hay_riad: "rabat",
  souissi: "rabat",
  "océan": "rabat",
  ocean: "rabat",
  yacoub_el_mansour: "rabat",
  temara: "rabat",
  "salé": "rabat",
  sale: "rabat",
  hay_el_fath: "rabat",
  av_mohammed_vi: "rabat",
  m_hamid: "rabat",
  // Marrakech quartiers
  gueliz: "marrakech",
  "guéliz": "marrakech",
  hivernage: "marrakech",
  medina: "marrakech",
  palmeraie: "marrakech",
  massira: "marrakech",
  targa: "marrakech",
  "ancienne_médina": "marrakech",
  tilila: "marrakech",
  // Tanger quartiers
  malabata: "tanger",
  achakar: "tanger",
  achennad: "tanger",
  ahlane: "tanger",
  mghogha: "tanger",
  ibn_batouta: "tanger",
  moujahidine: "tanger",
  mesnana: "tanger",
  dradeb: "tanger",
  // Fes quartiers
  ville_nouvelle: "fes",
  borj_fez: "fes",
  saiss: "fes",
  narjiss: "fes",
  narjis: "fes",
  "fès_médina": "fes",
  fes_jdid: "fes",
  route_d_immouzere: "fes",
  route_ain_chkaf: "fes",
  oued_fès: "fes",
  ain_kadous: "fes",
  saies: "fes",
  // Agadir quartiers
  talborjt: "agadir",
  dakhla: "agadir",
  founty: "agadir",
  tikiouine: "agadir",
  anza: "agadir",
  haut_founty: "agadir",
  haut_anza: "agadir",
  sonaba: "agadir",
  extension_dakhla: "agadir",
  les_amicales: "agadir",
  amicales: "agadir",
  hay_najah: "agadir",
  anahda: "agadir",
  al_wifaq: "agadir",
  illigh: "agadir",
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

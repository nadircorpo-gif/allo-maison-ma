import type { MetadataRoute } from "next";

const NOW = new Date();
const STATIC_LAST_MOD = new Date("2026-04-13");

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://allo-maison.ma";
const MVP_SERVICES = [
  "plombier", "electricien", "femme-de-menage", "peintre", "climatisation", "serrurier",
  "bricoleur", "renovation", "jardinier", "technicien-informatique", "demenagement",
  "carreleur", "menuisier", "etancheite", "desinsectisation", "vitrier",
  "cuisiniere", "concierge", "nounou",
];
const MVP_CITIES = ["casablanca", "rabat", "marrakech", "tanger", "fes", "agadir"];
const URGENCE_SLUGS = ["plombier", "electricien", "serrurier"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: NOW, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/services`, lastModified: STATIC_LAST_MOD, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/tarifs`, lastModified: STATIC_LAST_MOD, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: STATIC_LAST_MOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/comment-ca-marche`, lastModified: STATIC_LAST_MOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/garantie`, lastModified: STATIC_LAST_MOD, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/a-propos`, lastModified: STATIC_LAST_MOD, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog`, lastModified: STATIC_LAST_MOD, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/confidentialite`, lastModified: STATIC_LAST_MOD, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/mentions-legales`, lastModified: STATIC_LAST_MOD, changeFrequency: "yearly", priority: 0.3 },
  ];

  for (const s of MVP_SERVICES) {
    for (const c of MVP_CITIES) {
      entries.push({
        url: `${BASE_URL}/${s}-${c}`,
        lastModified: NOW,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  for (const s of URGENCE_SLUGS) {
    for (const c of MVP_CITIES) {
      entries.push({
        url: `${BASE_URL}/urgence/${s}/${c}`,
        lastModified: NOW,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  }

  entries.push({
    url: `${BASE_URL}/urgence`,
    lastModified: NOW,
    changeFrequency: "weekly",
    priority: 0.9,
  });
  for (const s of URGENCE_SLUGS) {
    entries.push({
      url: `${BASE_URL}/urgence/${s}`,
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  entries.push({
    url: `${BASE_URL}/villes`,
    lastModified: NOW,
    changeFrequency: "weekly",
    priority: 0.85,
  });
  for (const c of MVP_CITIES) {
    entries.push({
      url: `${BASE_URL}/villes/${c}`,
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  return entries;
}

import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://allo-maison.ma";
const MVP_SERVICES = ["plombier", "electricien", "femme-de-menage", "peintre", "climatisation", "serrurier"];
const MVP_CITIES = ["casablanca", "rabat", "marrakech", "tanger", "fes", "agadir"];
const URGENCE_SLUGS = ["plombier", "electricien", "serrurier"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
  ];

  for (const s of MVP_SERVICES) {
    for (const c of MVP_CITIES) {
      entries.push({
        url: `${BASE_URL}/${s}-${c}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  for (const s of URGENCE_SLUGS) {
    for (const c of MVP_CITIES) {
      entries.push({
        url: `${BASE_URL}/urgence/${s}/${c}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  }

  return entries;
}

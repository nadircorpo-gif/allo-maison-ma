import type { SupabasePro, ScoreDetailsV2 } from "./types";

function calcGoogle(pro: SupabasePro): number {
  let score = 0;
  if (pro.google_rating) {
    score += (pro.google_rating / 5) * 1.5;
  }
  const reviews = pro.google_reviews_count ?? 0;
  if (reviews >= 20) score += 0.5;
  else if (reviews >= 6) score += 0.3;
  else if (reviews >= 1) score += 0.15;
  return Math.min(score, 2);
}

function calcWhatsApp(pro: SupabasePro): number {
  if (!pro.wa_exists) return 0;
  if (pro.wa_business && pro.wa_description) return 0.75;
  if (pro.wa_business) return 0.5;
  return 0.25;
}

function calcMultiPlateforme(pro: SupabasePro): number {
  const count = pro.sources?.length ?? 1;
  if (count >= 3) return 0.75;
  if (count >= 2) return 0.4;
  return 0;
}

function calcCompletude(pro: SupabasePro): number {
  let score = 0;
  if (pro.first_name && pro.last_name) score += 0.1;
  if (pro.phone) score += 0.15;
  if (pro.photo || pro.wa_photo || (pro.google_photos && pro.google_photos.length > 0)) score += 0.15;
  if (pro.description || pro.wa_description) score += 0.15;
  if (pro.quartier) score += 0.1;
  if ((pro.media_count ?? 0) > 0 || (pro.avito_photos_count ?? 0) > 0) score += 0.1;
  return Math.min(score, 0.75);
}

function calcRecency(pro: SupabasePro): number {
  const adDate = pro.avito_ad_date ? new Date(pro.avito_ad_date) : null;
  if (adDate) {
    const monthsAgo = (Date.now() - adDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
    if (monthsAgo <= 1) return 0.5;
    if (monthsAgo <= 3) return 0.35;
    if (monthsAgo <= 6) return 0.2;
  }
  if ((pro.experience ?? 0) >= 10) return 0.5;
  if ((pro.experience ?? 0) >= 6) return 0.35;
  return 0;
}

function calcPhoneVerified(pro: SupabasePro): number {
  if (!pro.wa_exists) return 0;
  if (pro.wa_name && pro.first_name) {
    const waLower = pro.wa_name.toLowerCase();
    const firstLower = pro.first_name.toLowerCase();
    if (waLower.includes(firstLower) || firstLower.includes(waLower)) return 0.25;
  }
  return 0.1;
}

export function calculateScoreV2(pro: SupabasePro): { score: number; details: ScoreDetailsV2 } {
  const details: ScoreDetailsV2 = {
    google: calcGoogle(pro),
    whatsapp: calcWhatsApp(pro),
    multiPlateforme: calcMultiPlateforme(pro),
    completude: calcCompletude(pro),
    recency: calcRecency(pro),
    phoneVerified: calcPhoneVerified(pro),
  };

  const score = Math.min(
    5,
    details.google + details.whatsapp + details.multiPlateforme +
    details.completude + details.recency + details.phoneVerified
  );

  return { score, details };
}

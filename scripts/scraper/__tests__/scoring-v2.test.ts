import { describe, it, expect } from "vitest";
import { calculateScoreV2 } from "../scoring-v2";
import type { SupabasePro } from "../types";

const basePro: Partial<SupabasePro> = {
  first_name: "Mohammed",
  last_name: "Bouziane",
  phone: "0661409190",
  services: ["plombier"],
  city: "casablanca",
  sources: [{ platform: "m3allem", externalId: "12", scrapedAt: "2026-04-13" }],
  status: "scraped",
};

describe("calculateScoreV2", () => {
  it("scores basic pro with no Google/WA", () => {
    const { score, details } = calculateScoreV2(basePro as SupabasePro);
    expect(details.google).toBe(0);
    expect(details.whatsapp).toBe(0);
    expect(details.completude).toBeGreaterThan(0);
    expect(score).toBeLessThan(2);
  });

  it("scores pro with Google 4.5 stars + 30 reviews", () => {
    const pro = { ...basePro, google_rating: 4.5, google_reviews_count: 30 };
    const { details } = calculateScoreV2(pro as SupabasePro);
    expect(details.google).toBeCloseTo(1.85, 1);
  });

  it("scores pro with WA Business + description", () => {
    const pro = { ...basePro, wa_exists: true, wa_business: true, wa_description: "Plombier pro" };
    const { details } = calculateScoreV2(pro as SupabasePro);
    expect(details.whatsapp).toBeCloseTo(0.75, 1);
  });

  it("gives multi-platform bonus", () => {
    const pro = {
      ...basePro,
      sources: [
        { platform: "m3allem", externalId: "12", scrapedAt: "2026-04-13" },
        { platform: "avito", externalId: "999", scrapedAt: "2026-04-13" },
        { platform: "bricool", externalId: "abc", scrapedAt: "2026-04-13" },
      ],
    };
    const { details } = calculateScoreV2(pro as SupabasePro);
    expect(details.multiPlateforme).toBeCloseTo(0.75, 1);
  });

  it("caps at 5", () => {
    const maxPro = {
      ...basePro,
      google_rating: 5.0,
      google_reviews_count: 50,
      wa_exists: true,
      wa_business: true,
      wa_description: "Pro",
      wa_name: "Mohammed",
      photo: "photo.jpg",
      description: "Expert",
      quartier: "Maarif",
      sources: [
        { platform: "m3allem", externalId: "1", scrapedAt: "2026-04-13" },
        { platform: "avito", externalId: "2", scrapedAt: "2026-04-13" },
      ],
      avito_ad_date: new Date().toISOString(),
    };
    const { score } = calculateScoreV2(maxPro as SupabasePro);
    expect(score).toBeLessThanOrEqual(5);
  });
});

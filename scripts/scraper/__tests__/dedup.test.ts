import { describe, it, expect } from "vitest";
import { normalizeName, levenshtein, findMatch } from "../dedup";
import type { NormalizedPro } from "../types";

describe("normalizeName", () => {
  it("lowercases and trims", () => {
    expect(normalizeName("  Mohammed  ")).toBe("mohammed");
  });

  it("removes diacritics", () => {
    expect(normalizeName("Réné")).toBe("rene");
    expect(normalizeName("Fès")).toBe("fes");
  });

  it("handles empty/null", () => {
    expect(normalizeName("")).toBe("");
    expect(normalizeName(null as unknown as string)).toBe("");
  });
});

describe("levenshtein", () => {
  it("returns 0 for identical strings", () => {
    expect(levenshtein("mohammed", "mohammed")).toBe(0);
  });

  it("returns correct distance for similar names", () => {
    expect(levenshtein("mohammed", "mohamed")).toBe(1);
    expect(levenshtein("bouziane", "bouzian")).toBe(1);
  });

  it("returns correct distance for different strings", () => {
    expect(levenshtein("ahmed", "khalid")).toBe(4);
  });
});

describe("findMatch", () => {
  const existing: NormalizedPro[] = [
    {
      firstName: "Mohammed",
      lastName: "Bouziane",
      phone: "0669096509",
      photo: null,
      gender: null,
      services: ["plombier"],
      city: "casablanca",
      quartier: "Maarif",
      lat: null,
      lng: null,
      experience: null,
      mediaCount: null,
      description: null,
      verified: false,
      showPhone: true,
      sources: [{ platform: "m3allem", externalId: "12", scrapedAt: "2026-04-12" }],
      scoreMaison: 2.1,
      scoreDetails: { completude: 0.6, joignabilite: 1.5, multiPlateforme: 0, experience: 0 },
      status: "scraped",
    },
  ];

  it("finds exact match by name + city", () => {
    const result = findMatch("Mohammed", "Bouziane", "casablanca", existing);
    expect(result).not.toBeNull();
    expect(result!.firstName).toBe("Mohammed");
  });

  it("finds fuzzy match (Mohamed vs Mohammed)", () => {
    const result = findMatch("Mohamed", "Bouziane", "casablanca", existing);
    expect(result).not.toBeNull();
  });

  it("returns null for different city", () => {
    const result = findMatch("Mohammed", "Bouziane", "rabat", existing);
    expect(result).toBeNull();
  });

  it("returns null for different name", () => {
    const result = findMatch("Ahmed", "Khalid", "casablanca", existing);
    expect(result).toBeNull();
  });
});

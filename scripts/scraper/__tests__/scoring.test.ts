import { describe, it, expect } from "vitest";
import { calculateScore } from "../scoring";
import type { RawPro } from "../types";

const m3allemPro: RawPro = {
  platform: "m3allem",
  externalId: "12",
  firstName: "Mohammed",
  lastName: "BOUZIANE",
  phone: "06 69 09 65 09",
  photo: null,
  gender: null,
  services: ["Plomberie"],
  city: "Casablanca",
  quartier: "Maarif",
  lat: null,
  lng: null,
  experience: null,
  mediaCount: null,
  description: null,
  verified: false,
  showPhone: true,
};

describe("calculateScore", () => {
  it("scores M3allem pro with phone + name + quartier", () => {
    const { scoreMaison, scoreDetails } = calculateScore(m3allemPro, false);
    expect(scoreDetails.completude).toBeCloseTo(0.6, 1);
    expect(scoreDetails.joignabilite).toBeCloseTo(1.5, 1);
    expect(scoreDetails.multiPlateforme).toBe(0);
    expect(scoreDetails.experience).toBe(0);
    expect(scoreMaison).toBeCloseTo(2.1, 1);
  });

  it("gives multi-platform bonus", () => {
    const { scoreDetails } = calculateScore(m3allemPro, true);
    expect(scoreDetails.multiPlateforme).toBe(1);
  });

  it("scores BriCool pro with photo + description + media + experience", () => {
    const bricoolPro: RawPro = {
      ...m3allemPro,
      platform: "bricool",
      phone: null,
      photo: "photo.jpg",
      description: "Expert plombier depuis 10 ans",
      mediaCount: 5,
      experience: 12,
      quartier: null,
      showPhone: true,
    };
    const { scoreMaison, scoreDetails } = calculateScore(bricoolPro, false);
    expect(scoreDetails.completude).toBeCloseTo(1.4, 1);
    expect(scoreDetails.joignabilite).toBeCloseTo(0.5, 1);
    expect(scoreDetails.experience).toBeCloseTo(0.5, 1);
    expect(scoreMaison).toBeCloseTo(2.4, 1);
  });

  it("caps score at 5", () => {
    const maxPro: RawPro = {
      ...m3allemPro,
      photo: "photo.jpg",
      description: "Full description",
      mediaCount: 10,
      services: ["Plomberie", "Electricité"],
      experience: 20,
    };
    const { scoreMaison } = calculateScore(maxPro, true);
    expect(scoreMaison).toBeLessThanOrEqual(5);
  });
});

import { describe, it, expect } from "vitest";
import { passesHardFilters, isFrenchName } from "../filters";
import type { RawPro } from "../types";

const basePro: RawPro = {
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

describe("isFrenchName", () => {
  it("accepts French names", () => {
    expect(isFrenchName("Mohammed", "BOUZIANE")).toBe(true);
    expect(isFrenchName("Jean-Pierre", "Dupont")).toBe(true);
  });

  it("rejects Arabic names", () => {
    expect(isFrenchName("سي محمد", "بن علي")).toBe(false);
    expect(isFrenchName("Mohammed", "بن علي")).toBe(false);
  });

  it("rejects empty names", () => {
    expect(isFrenchName("", "")).toBe(false);
    expect(isFrenchName(null as unknown as string, null as unknown as string)).toBe(false);
  });
});

describe("passesHardFilters", () => {
  it("accepts a complete M3allem pro", () => {
    expect(passesHardFilters(basePro).passes).toBe(true);
  });

  it("rejects pro with Arabic name", () => {
    const pro = { ...basePro, firstName: "سي محمد", lastName: "بن علي" };
    expect(passesHardFilters(pro).passes).toBe(false);
  });

  it("rejects pro with unmappable city", () => {
    const pro = { ...basePro, city: "Kenitra" };
    expect(passesHardFilters(pro).passes).toBe(false);
  });

  it("rejects pro with unmappable service", () => {
    const pro = { ...basePro, services: ["Parabole"] };
    expect(passesHardFilters(pro).passes).toBe(false);
  });

  it("accepts BriCool pro with complete profile but no phone", () => {
    const pro: RawPro = {
      ...basePro,
      platform: "bricool",
      phone: null,
      photo: "some-photo.jpg",
      showPhone: false,
    };
    expect(passesHardFilters(pro).passes).toBe(true);
  });

  it("rejects BriCool pro with no phone and no photo", () => {
    const pro: RawPro = {
      ...basePro,
      platform: "bricool",
      phone: null,
      photo: null,
      showPhone: false,
    };
    expect(passesHardFilters(pro).passes).toBe(false);
  });
});

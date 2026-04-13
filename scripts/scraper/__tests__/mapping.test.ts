import { describe, it, expect } from "vitest";
import { mapCity, mapService, classifyByKeywords } from "../mapping";

describe("mapCity", () => {
  it("maps French city names to slugs", () => {
    expect(mapCity("Casablanca")).toBe("casablanca");
    expect(mapCity("Rabat")).toBe("rabat");
    expect(mapCity("Marrakech")).toBe("marrakech");
    expect(mapCity("Tanger")).toBe("tanger");
    expect(mapCity("Fès")).toBe("fes");
    expect(mapCity("Agadir")).toBe("agadir");
  });

  it("maps Arabic city names to slugs", () => {
    expect(mapCity("الدار البيضاء")).toBe("casablanca");
    expect(mapCity("الرباط")).toBe("rabat");
    expect(mapCity("مراكش")).toBe("marrakech");
    expect(mapCity("طنجة")).toBe("tanger");
    expect(mapCity("فاس")).toBe("fes");
    expect(mapCity("أكادير")).toBe("agadir");
  });

  it("handles case variations", () => {
    expect(mapCity("casablanca")).toBe("casablanca");
    expect(mapCity("RABAT")).toBe("rabat");
    expect(mapCity("Fes")).toBe("fes");
  });

  it("returns null for unmapped cities", () => {
    expect(mapCity("Kenitra")).toBeNull();
    expect(mapCity("Oujda")).toBeNull();
    expect(mapCity("")).toBeNull();
  });
});

describe("mapService", () => {
  it("maps M3allem service names to our slugs", () => {
    expect(mapService("Plomberie", "m3allem")).toEqual(["plombier"]);
    expect(mapService("Electricité", "m3allem")).toEqual(["electricien"]);
    expect(mapService("Clim et froid", "m3allem")).toEqual(["climatisation"]);
    expect(mapService("Maçonnerie", "m3allem")).toEqual(["renovation"]);
    expect(mapService("Vitrerie - Aluminium", "m3allem")).toEqual(["vitrier"]);
  });

  it("maps BriCool service names to our slugs", () => {
    expect(mapService("Plomberie-Installation sanitaire", "bricool")).toEqual(["plombier"]);
    expect(mapService("Électricité doméstique", "bricool")).toEqual(["electricien"]);
    expect(mapService("Femme de ménage", "bricool")).toEqual(["femme-de-menage"]);
    expect(mapService("Bricolage-Petits travaux", "bricool")).toEqual(["bricoleur"]);
    expect(mapService("Déménagement", "bricool")).toEqual(["demenagement"]);
  });

  it("returns empty array for unmapped services", () => {
    expect(mapService("Parabole", "m3allem")).toEqual([]);
    expect(mapService("Unknown Service", "bricool")).toEqual([]);
    expect(mapService("", "m3allem")).toEqual([]);
  });
});

describe("mapService avito", () => {
  it("maps Avito category names", () => {
    expect(mapService("plombier", "avito")).toEqual(["plombier"]);
    expect(mapService("climatisation", "avito")).toEqual(["climatisation"]);
    expect(mapService("jardinage", "avito")).toEqual(["jardinier"]);
  });
});

describe("classifyByKeywords", () => {
  it("classifies by keywords", () => {
    expect(classifyByKeywords("plombier professionnel")).toContain("plombier");
    expect(classifyByKeywords("installation climatisation")).toContain("climatisation");
    expect(classifyByKeywords("femme de ménage")).toContain("femme-de-menage");
  });
  it("returns empty for unrelated text", () => {
    expect(classifyByKeywords("bonjour")).toEqual([]);
  });
  it("finds multiple services", () => {
    const result = classifyByKeywords("plombier et electricien");
    expect(result).toContain("plombier");
    expect(result).toContain("electricien");
  });
});

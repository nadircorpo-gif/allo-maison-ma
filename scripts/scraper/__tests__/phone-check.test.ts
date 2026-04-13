import { describe, it, expect } from "vitest";
import { formatPhone, isMobile, isValidMoroccanPhone, detectDuplicatePhones } from "../verifiers/phone-check";

describe("formatPhone", () => {
  it("formats 06 numbers to 212", () => {
    expect(formatPhone("0661409190")).toBe("212661409190");
    expect(formatPhone("06 61 40 91 90")).toBe("212661409190");
  });
  it("handles +212 prefix", () => {
    expect(formatPhone("+212661409190")).toBe("212661409190");
  });
  it("returns null for invalid", () => {
    expect(formatPhone("12345")).toBeNull();
    expect(formatPhone("")).toBeNull();
  });
});

describe("isMobile", () => {
  it("identifies mobile", () => {
    expect(isMobile("0661409190")).toBe(true);
    expect(isMobile("0712345678")).toBe(true);
  });
  it("identifies fixe", () => {
    expect(isMobile("0522334455")).toBe(false);
  });
});

describe("isValidMoroccanPhone", () => {
  it("validates correct", () => { expect(isValidMoroccanPhone("0661409190")).toBe(true); });
  it("rejects invalid", () => {
    expect(isValidMoroccanPhone("123")).toBe(false);
    expect(isValidMoroccanPhone("0861409190")).toBe(false);
  });
});

describe("detectDuplicatePhones", () => {
  it("finds duplicates", () => {
    expect(detectDuplicatePhones(["0661409190", "0712345678", "0661409190"])).toEqual(["212661409190"]);
  });
});

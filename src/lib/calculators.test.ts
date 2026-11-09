import { describe, expect, it } from "vitest";
import { convertArea, emi, pricePerSqft } from "./calculators";

describe("calculators", () => {
  it("emi matches standard formula", () => {
    expect(Math.round(emi(1_000_000, 10, 10))).toBe(13215);
  });
  it("emi with 0% interest splits evenly", () => {
    expect(emi(1200, 0, 1)).toBe(100);
  });
  it("converts katha to sqft and back", () => {
    expect(convertArea(5, "katha", "sqft")).toBe(3600);
    expect(convertArea(3600, "sqft", "katha")).toBe(5);
  });
  it("converts katha to decimal", () => {
    expect(convertArea(1, "katha", "decimal")).toBeCloseTo(1.6529, 3);
  });
  it("price per sqft", () => {
    expect(pricePerSqft(10_000_000, 2000)).toBe(5000);
    expect(pricePerSqft(1, 0)).toBe(0);
  });
});

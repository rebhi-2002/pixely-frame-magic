import { describe, expect, it } from "vitest";
import { isValidRating, normalizeReview, validateRating } from "@/lib/rating";

describe("isValidRating", () => {
  it("أعداد صحيحة 1..5 فقط", () => {
    for (const v of [1, 2, 3, 4, 5]) expect(isValidRating(v)).toBe(true);
    for (const v of [0, 6, -1, 2.5, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(isValidRating(v)).toBe(false);
    }
    expect(isValidRating("5")).toBe(false);
    expect(isValidRating(null)).toBe(false);
  });
});

describe("normalizeReview", () => {
  it("يقص ويحوّل الفاضي إلى null", () => {
    expect(normalizeReview("  ممتاز  ")).toBe("ممتاز");
    expect(normalizeReview("")).toBeNull();
    expect(normalizeReview("   ")).toBeNull();
  });
});

describe("validateRating", () => {
  it("صالح بدون مراجعة", () => {
    expect(validateRating(4, "")).toEqual([]);
  });
  it("تقييم غير مختار", () => {
    expect(validateRating(0, "")).toContain("rating");
  });
  it("مراجعة طويلة", () => {
    expect(validateRating(5, "x".repeat(1001))).toContain("review");
    expect(validateRating(5, "x".repeat(1000))).toEqual([]);
  });
});

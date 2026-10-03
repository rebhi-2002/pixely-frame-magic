import { describe, expect, it } from "vitest";
import { examPercent, formatExamPercent } from "@/lib/exam-percent";

describe("examPercent", () => {
  it("نسب عادية", () => {
    expect(examPercent(85, 100)).toBe(85);
    expect(examPercent(17, 20)).toBe(85);
    expect(examPercent(1, 3)).toBe(33.3);
    expect(examPercent(0, 50)).toBe(0);
    expect(examPercent(50, 50)).toBe(100);
  });
  it("درجة أعلى من المجموع تبقى كما هي (لا نقصّ)", () => {
    expect(examPercent(55, 50)).toBe(110);
  });
  it("المجموع صفر/سالب = null (لا قسمة على صفر)", () => {
    expect(examPercent(5, 0)).toBeNull();
    expect(examPercent(5, -10)).toBeNull();
  });
  it("قيم غير صالحة = null", () => {
    expect(examPercent(null, 10)).toBeNull();
    expect(examPercent(5, undefined)).toBeNull();
    expect(examPercent(Number.NaN, 10)).toBeNull();
    expect(examPercent(5, Number.POSITIVE_INFINITY)).toBeNull();
    expect(examPercent(-1, 10)).toBeNull();
  });
});

describe("formatExamPercent", () => {
  it("تنسيق العرض", () => {
    expect(formatExamPercent(85)).toBe("85%");
    expect(formatExamPercent(33.3)).toBe("33.3%");
    expect(formatExamPercent(null)).toBe("—");
    expect(formatExamPercent(Number.NaN)).toBe("—");
  });
});

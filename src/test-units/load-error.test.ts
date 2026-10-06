import { describe, expect, it } from "vitest";
import { errorStatus, loadErrorDetail, withLoadErrorDetail } from "@/lib/load-error";

const bi = <T>(ar: T, _en: T) => ar;

describe("errorStatus", () => {
  it("يقرأ status فقط لو رقم", () => {
    expect(errorStatus({ status: 500 })).toBe(500);
    expect(errorStatus({ status: "500" })).toBeNull();
    expect(errorStatus(new Error("x"))).toBeNull();
    expect(errorStatus(null)).toBeNull();
    expect(errorStatus(undefined)).toBeNull();
  });
});

describe("loadErrorDetail", () => {
  it("يشرح كل فئة رمز", () => {
    expect(loadErrorDetail({ status: 403 }, bi)).toContain("403");
    expect(loadErrorDetail({ status: 401 }, bi)).toContain("401");
    expect(loadErrorDetail({ status: 404 }, bi)).toContain("404");
    expect(loadErrorDetail({ status: 500 }, bi)).toContain("500");
    expect(loadErrorDetail({ status: 503 }, bi)).toContain("503");
    expect(loadErrorDetail({ status: 0 }, bi)).toContain("الخادم");
    expect(loadErrorDetail({ status: 418 }, bi)).toContain("418");
  });
  it("خطأ بلا رمز = فاضي", () => {
    expect(loadErrorDetail(new Error("boom"), bi)).toBe("");
  });
});

describe("withLoadErrorDetail", () => {
  it("يضيف السطر عند وجوده فقط", () => {
    expect(withLoadErrorDetail("أساس", { status: 500 }, bi)).toContain("أساس رمز 500");
    expect(withLoadErrorDetail("أساس", new Error("x"), bi)).toBe("أساس");
  });
});

import { describe, expect, it } from "vitest";
import { assertOk, getReturnId } from "./op-result";

describe("assertOk", () => {
  it("success=true لا يرمي", () => {
    expect(() => assertOk({ success: true }, "فشل", "Failed")).not.toThrow();
  });
  it("success=false يرمي رسالة الباك اند", () => {
    expect(() => assertOk({ success: false, message: "الرصيد غير كافٍ" }, "فشل", "Failed")).toThrow(
      "الرصيد غير كافٍ",
    );
  });
  it("بدون رسالة يرمي الاحتياطية (العربية افتراضيًا)", () => {
    expect(() => assertOk({ success: false }, "فشل العملية", "Operation failed")).toThrow(
      "فشل العملية",
    );
  });
  it("ردّ فاضي/غير كائن = فشل (لا نجاح صامت)", () => {
    expect(() => assertOk(null, "فشل", "Failed")).toThrow("فشل");
    expect(() => assertOk(undefined, "فشل", "Failed")).toThrow("فشل");
    expect(() => assertOk("ok" as never, "فشل", "Failed")).toThrow("فشل");
  });
  it("رسالة مسافات فقط = احتياطية", () => {
    expect(() => assertOk({ success: false, message: "   " }, "فشل", "Failed")).toThrow("فشل");
  });
});

describe("getReturnId", () => {
  it("يرجّع الرقم أو null", () => {
    expect(getReturnId({ success: true, returnId: 7 })).toBe(7);
    expect(getReturnId({ success: true })).toBeNull();
    expect(getReturnId(null)).toBeNull();
  });
});

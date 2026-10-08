import { describe, expect, it } from "vitest";
import { parsePositiveInt } from "@/lib/route-id";

describe("parsePositiveInt", () => {
  it("أرقام صحيحة موجبة", () => {
    expect(parsePositiveInt("7")).toBe(7);
    expect(parsePositiveInt(" 42 ")).toBe(42);
  });
  it("يرفض غير الرقمي والصفر والسالب والعشري", () => {
    for (const bad of ["", "0", "-3", "1.5", "12abc", "abc", "new", "1e3"]) {
      expect(parsePositiveInt(bad)).toBeNull();
    }
    expect(parsePositiveInt(undefined)).toBeNull();
    expect(parsePositiveInt(null)).toBeNull();
  });
  it("يرفض أرقامًا أكبر من الحد الآمن", () => {
    expect(parsePositiveInt("99999999999999999999")).toBeNull();
  });
});

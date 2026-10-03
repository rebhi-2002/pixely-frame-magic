import { describe, expect, it } from "vitest";
import { normalizeNote, todayLocalIso, validateRescheduleDraft } from "@/lib/reschedule-validation";

const now = new Date(2026, 9, 1, 12, 0, 0); // 2026-10-01 12:00

describe("validateRescheduleDraft", () => {
  const ok = { date: "2026-10-05", time: "16:30", note: "" };

  it("صالح", () => {
    expect(validateRescheduleDraft(ok, now)).toEqual([]);
  });
  it("تاريخ فاضي/غير صالح", () => {
    expect(validateRescheduleDraft({ ...ok, date: "" }, now)).toContain("date");
    expect(validateRescheduleDraft({ ...ok, date: "2026-02-31" }, now)).toContain("date");
    expect(validateRescheduleDraft({ ...ok, date: "05/10/2026" }, now)).toContain("date");
  });
  it("وقت فاضي/غير صالح", () => {
    expect(validateRescheduleDraft({ ...ok, time: "" }, now)).toContain("time");
    expect(validateRescheduleDraft({ ...ok, time: "25:00" }, now)).toContain("time");
  });
  it("موعد بالماضي أو الآن", () => {
    expect(validateRescheduleDraft({ ...ok, date: "2026-10-01", time: "09:00" }, now)).toContain(
      "past",
    );
    expect(validateRescheduleDraft({ ...ok, date: "2026-10-01", time: "12:00" }, now)).toContain(
      "past",
    );
    expect(validateRescheduleDraft({ ...ok, date: "2026-10-01", time: "12:01" }, now)).toEqual([]);
  });
  it("لا يُبلَّغ past عند فشل التاريخ/الوقت", () => {
    expect(validateRescheduleDraft({ ...ok, date: "" }, now)).not.toContain("past");
  });
  it("ملاحظة طويلة", () => {
    expect(validateRescheduleDraft({ ...ok, note: "x".repeat(501) }, now)).toContain("note");
    expect(validateRescheduleDraft({ ...ok, note: "x".repeat(500) }, now)).toEqual([]);
  });
});

describe("normalizeNote", () => {
  it("يقص ويحوّل الفاضي إلى null", () => {
    expect(normalizeNote("  تعديل الموعد  ")).toBe("تعديل الموعد");
    expect(normalizeNote("   ")).toBeNull();
    expect(normalizeNote("")).toBeNull();
  });
});

describe("todayLocalIso", () => {
  it("تاريخ محلي بصيغة YYYY-MM-DD", () => {
    expect(todayLocalIso(new Date(2026, 0, 5, 23, 59))).toBe("2026-01-05");
    expect(todayLocalIso(new Date(2026, 10, 30, 0, 1))).toBe("2026-11-30");
  });
});

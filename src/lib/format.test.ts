import { describe, expect, it } from "vitest";
import { combineDateTime, dayName, formatDate, formatMoney, formatTime, isHttpUrl } from "./format";

describe("formatTime", () => {
  it("يقصّ الثواني", () => {
    expect(formatTime("14:30:00")).toBe("14:30");
    expect(formatTime("09:05")).toBe("09:05");
  });
  it("يضيف صفرًا للساعة المفردة", () => {
    expect(formatTime("9:05:00")).toBe("09:05");
  });
  it("قيم ناقصة أو غير صالحة = —", () => {
    expect(formatTime(null)).toBe("—");
    expect(formatTime("")).toBe("—");
    expect(formatTime("25:00:00")).toBe("—");
    expect(formatTime("12:75")).toBe("—");
    expect(formatTime("abc")).toBe("—");
  });
});

describe("formatDate / dayName", () => {
  it("تاريخ بدون وقت لا ينزاح يومًا بسبب المنطقة الزمنية", () => {
    expect(dayName("2026-10-02", "en")).toBe("Friday");
    expect(dayName("2026-10-03", "en")).toBe("Saturday");
  });
  it("الاسم العربي لليوم", () => {
    expect(dayName("2026-10-02", "ar")).toContain("الجمعة");
  });
  it("التاريخ المنسّق يحوي السنة", () => {
    expect(formatDate("2026-10-02", "en")).toContain("2026");
    expect(formatDate("2026-10-02", "ar")).toContain("2026");
  });
  it("قيم غير صالحة = —", () => {
    expect(formatDate(undefined)).toBe("—");
    expect(formatDate("not-a-date")).toBe("—");
    expect(dayName("")).toBe("—");
  });
});

describe("formatMoney", () => {
  it("يضيف رمز الشيكل", () => {
    expect(formatMoney(25, "en")).toBe("25 ₪");
    expect(formatMoney(12.5, "en")).toBe("12.5 ₪");
  });
  it("لا يخترع رقمًا للقيم الناقصة", () => {
    expect(formatMoney(null)).toBe("—");
    expect(formatMoney(undefined)).toBe("—");
    expect(formatMoney(Number.NaN)).toBe("—");
  });
});

describe("combineDateTime", () => {
  it("يدمج التاريخ والوقت محليًا", () => {
    const d = combineDateTime("2026-10-02", "14:30:00");
    expect(d).not.toBeNull();
    expect(d?.getFullYear()).toBe(2026);
    expect(d?.getMonth()).toBe(9);
    expect(d?.getDate()).toBe(2);
    expect(d?.getHours()).toBe(14);
    expect(d?.getMinutes()).toBe(30);
  });
  it("null لو أحدهما غير صالح", () => {
    expect(combineDateTime("2026-10-02", "bad")).toBeNull();
    expect(combineDateTime("bad", "10:00")).toBeNull();
    expect(combineDateTime(null, "10:00")).toBeNull();
  });
});

describe("isHttpUrl", () => {
  it("يقبل http/https فقط", () => {
    expect(isHttpUrl("https://zoom.us/j/123")).toBe(true);
    expect(isHttpUrl("http://meet.example.com/abc")).toBe(true);
  });
  it("يرفض البروتوكولات الخطرة وغير الصالحة", () => {
    expect(isHttpUrl("javascript:alert(1)")).toBe(false);
    expect(isHttpUrl("data:text/html,<script>alert(1)</script>")).toBe(false);
    expect(isHttpUrl("file:///etc/passwd")).toBe(false);
    expect(isHttpUrl("ftp://example.com")).toBe(false);
    expect(isHttpUrl("zoom.us/j/123")).toBe(false);
    expect(isHttpUrl("")).toBe(false);
    expect(isHttpUrl(null)).toBe(false);
  });
});

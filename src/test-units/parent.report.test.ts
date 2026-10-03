import { describe, expect, it } from "vitest";
import { ApiError } from "../integrations/backend/client";
import { attendanceStatusLabel, attendanceStatusTone } from "../lib/enums";
import {
  isForbiddenError,
  parseUnreadCount,
  summarizeUnread,
  unreadStatValue,
} from "../lib/parent-report";

const ar = <T>(a: T, _e: T) => a;

describe("parseUnreadCount", () => {
  it("يقبل الأعداد الصحيحة غير السالبة", () => {
    expect(parseUnreadCount(0)).toBe(0);
    expect(parseUnreadCount(7)).toBe(7);
  });
  it("القيم الناقصة/غير الصالحة = null (لا يُخترع صفر)", () => {
    expect(parseUnreadCount(undefined)).toBeNull();
    expect(parseUnreadCount(null)).toBeNull();
    expect(parseUnreadCount("3")).toBeNull();
    expect(parseUnreadCount(-1)).toBeNull();
    expect(parseUnreadCount(Number.NaN)).toBeNull();
  });
});

describe("summarizeUnread", () => {
  it("يجمع عدّ كل ابن", () => {
    expect(
      summarizeUnread([
        { unreadNotificationsCount: 2 },
        { unreadNotificationsCount: 0 },
        { unreadNotificationsCount: 5 },
      ]),
    ).toEqual({ total: 7, hasMissing: false });
  });
  it("لا أبناء = صفر بلا نقص", () => {
    expect(summarizeUnread([])).toEqual({ total: 0, hasMissing: false });
  });
  it("ابن بعدّ ناقص: يُعلَّم المجموع ناقصًا ولا يُحسب صفرًا", () => {
    expect(summarizeUnread([{ unreadNotificationsCount: 3 }, {}])).toEqual({
      total: 3,
      hasMissing: true,
    });
  });
});

describe("unreadStatValue", () => {
  it("رقم أو —", () => {
    expect(unreadStatValue(0)).toBe("0");
    expect(unreadStatValue(4)).toBe("4");
    expect(unreadStatValue(undefined)).toBe("—");
  });
});

describe("isForbiddenError", () => {
  it("403 فقط", () => {
    expect(isForbiddenError(new ApiError("x", 403, "http"))).toBe(true);
    expect(isForbiddenError(new ApiError("x", 500, "http"))).toBe(false);
    expect(isForbiddenError(new Error("403"))).toBe(false);
    expect(isForbiddenError(null)).toBe(false);
  });
});

describe("تسميات حالة الحضور (P1-05)", () => {
  it("1..4 بالعربي", () => {
    expect([1, 2, 3, 4].map((s) => attendanceStatusLabel(s, ar))).toEqual([
      "حاضر",
      "غائب",
      "متأخر",
      "معذور",
    ]);
  });
  it("قيمة غير معروفة = —", () => {
    expect(attendanceStatusLabel(9, ar)).toBe("—");
    expect(attendanceStatusLabel(null, ar)).toBe("—");
  });
  it("ألوان: حاضر نجاح، غائب خطر", () => {
    expect(attendanceStatusTone(1)).toBe("success");
    expect(attendanceStatusTone(2)).toBe("danger");
  });
});

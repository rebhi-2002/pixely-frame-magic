import { describe, expect, it } from "vitest";
import {
  dayOfWeekOf,
  estimatePrice,
  filterFutureTimes,
  generateStartTimes,
  hourlyPriceFor,
  isWithinAvailability,
  slotsForDate,
  supportedModes,
  toMinutes,
  validateBookingDraft,
} from "@/lib/booking-slots";
import type { AvailabilitySlot } from "@/integrations/backend/teachers";

// 2026-10-05 = الاثنين (dayOfWeek=1)
const MON = "2026-10-05";
const slots: AvailabilitySlot[] = [
  { id: 1, dayOfWeek: 1, startTime: "16:00:00", endTime: "18:00:00", teachingMode: 2 },
  { id: 2, dayOfWeek: 1, startTime: "10:00:00", endTime: "11:00:00", teachingMode: 1 },
  {
    id: 3,
    dayOfWeek: 2,
    startTime: "09:00:00",
    endTime: "12:00:00",
    teachingMode: 2,
    effectiveFrom: "2026-11-01T00:00:00",
    effectiveTo: "2026-11-30T00:00:00",
  },
];

describe("dayOfWeekOf / toMinutes", () => {
  it("يشتق اليوم من التاريخ", () => {
    expect(dayOfWeekOf(MON)).toBe(1);
    expect(dayOfWeekOf("2026-10-04")).toBe(0);
    expect(dayOfWeekOf("2026-02-31")).toBeNull();
    expect(dayOfWeekOf("")).toBeNull();
    expect(dayOfWeekOf("abc")).toBeNull();
  });
  it("toMinutes", () => {
    expect(toMinutes("16:30:00")).toBe(990);
    expect(toMinutes("07:05")).toBe(425);
    expect(toMinutes("24:00")).toBeNull();
    expect(toMinutes(null)).toBeNull();
  });
});

describe("slotsForDate", () => {
  it("يفلتر باليوم والوضع", () => {
    expect(slotsForDate(slots, MON, 2).map((s) => s.id)).toEqual([1]);
    expect(slotsForDate(slots, MON, 1).map((s) => s.id)).toEqual([2]);
  });
  it("يحترم effectiveFrom/To", () => {
    // الثلاثاء 2026-10-06 خارج فترة السريان
    expect(slotsForDate(slots, "2026-10-06", 2)).toEqual([]);
    // الثلاثاء 2026-11-03 ضمنها
    expect(slotsForDate(slots, "2026-11-03", 2).map((s) => s.id)).toEqual([3]);
  });
  it("تاريخ غير صالح = فاضي", () => {
    expect(slotsForDate(slots, "nope", 2)).toEqual([]);
  });
});

describe("generateStartTimes", () => {
  it("أوقات بخطوة 30 تنتهي ضمن الفترة", () => {
    expect(generateStartTimes(slotsForDate(slots, MON, 2), 60)).toEqual([
      "16:00",
      "16:30",
      "17:00",
    ]);
    expect(generateStartTimes(slotsForDate(slots, MON, 2), 120)).toEqual(["16:00"]);
  });
  it("مدة أطول من الفترة = لا أوقات", () => {
    expect(generateStartTimes(slotsForDate(slots, MON, 1), 90)).toEqual([]);
  });
  it("مدة غير صالحة", () => {
    expect(generateStartTimes(slots, 0)).toEqual([]);
    expect(generateStartTimes(slots, Number.NaN)).toEqual([]);
  });
  it("دمج فترات بدون تكرار ومرتّب", () => {
    const two: AvailabilitySlot[] = [
      { id: 1, dayOfWeek: 1, startTime: "10:00", endTime: "11:00", teachingMode: 2 },
      { id: 2, dayOfWeek: 1, startTime: "10:30", endTime: "12:00", teachingMode: 2 },
    ];
    expect(generateStartTimes(two, 30)).toEqual(["10:00", "10:30", "11:00", "11:30"]);
  });
});

describe("isWithinAvailability", () => {
  it("ضمن الفترة", () => {
    expect(isWithinAvailability(slots, MON, 2, "16:30", 60)).toBe(true);
  });
  it("يتجاوز نهاية الفترة", () => {
    expect(isWithinAvailability(slots, MON, 2, "17:30", 60)).toBe(false);
  });
  it("وضع مختلف", () => {
    expect(isWithinAvailability(slots, MON, 1, "16:30", 60)).toBe(false);
  });
});

describe("estimatePrice / hourlyPriceFor / supportedModes", () => {
  it("سعر تقديري", () => {
    expect(estimatePrice(40, 90)).toBe(60);
    expect(estimatePrice(33.33, 45)).toBe(25);
  });
  it("سعر غير معروف = null", () => {
    expect(estimatePrice(null, 60)).toBeNull();
    expect(estimatePrice(undefined, 60)).toBeNull();
    expect(estimatePrice(-5, 60)).toBeNull();
    expect(estimatePrice(40, 0)).toBeNull();
  });
  it("سعر الساعة حسب الوضع", () => {
    const t = { hourlyPriceOnline: 30, hourlyPriceInPerson: null };
    expect(hourlyPriceFor(t, 2)).toBe(30);
    expect(hourlyPriceFor(t, 1)).toBeNull();
  });
  it("الأوضاع المدعومة", () => {
    expect(supportedModes({ supportsOnline: true, supportsInPerson: true })).toEqual([1, 2]);
    expect(supportedModes({ supportsOnline: true })).toEqual([2]);
    expect(supportedModes({})).toEqual([]);
  });
});

describe("validateBookingDraft", () => {
  const now = new Date(2026, 9, 1, 12, 0, 0); // 2026-10-01 12:00
  const ok = { mode: 2 as const, date: MON, startTime: "16:30", durationMinutes: 60, note: "" };

  it("مسودة صالحة", () => {
    expect(validateBookingDraft(ok, slots, now)).toEqual([]);
  });
  it("وضع غير مختار", () => {
    expect(validateBookingDraft({ ...ok, mode: null }, slots, now)).toContain("mode");
  });
  it("تاريخ غير صالح", () => {
    expect(validateBookingDraft({ ...ok, date: "" }, slots, now)).toContain("date");
  });
  it("وقت بالماضي", () => {
    expect(validateBookingDraft(ok, slots, new Date(2026, 9, 6, 0, 0, 0))).toContain("past");
  });
  it("وقت غير صالح", () => {
    expect(validateBookingDraft({ ...ok, startTime: "" }, slots, now)).toContain("time");
  });
  it("خارج التوفّر", () => {
    expect(validateBookingDraft({ ...ok, startTime: "19:00" }, slots, now)).toContain(
      "unavailable",
    );
  });
  it("مدة خارج الحدود", () => {
    expect(validateBookingDraft({ ...ok, durationMinutes: 10 }, slots, now)).toContain("duration");
    expect(validateBookingDraft({ ...ok, durationMinutes: 15 }, slots, now)).not.toContain("duration");
    expect(validateBookingDraft({ ...ok, durationMinutes: 481 }, slots, now)).toContain("duration");
  });
  it("ملاحظة طويلة", () => {
    expect(validateBookingDraft({ ...ok, note: "x".repeat(501) }, slots, now)).toContain("note");
  });
});

describe("filterFutureTimes", () => {
  const now = new Date(2026, 9, 5, 16, 45, 0); // الاثنين 16:45
  it("يحذف الأوقات الماضية بنفس اليوم", () => {
    expect(filterFutureTimes(MON, ["16:00", "16:30", "17:00", "17:30"], now)).toEqual([
      "17:00",
      "17:30",
    ]);
  });
  it("الأيام القادمة تبقى كاملة", () => {
    expect(filterFutureTimes("2026-10-06", ["08:00", "09:00"], now)).toEqual(["08:00", "09:00"]);
  });
  it("تاريخ غير صالح = فاضي", () => {
    expect(filterFutureTimes("nope", ["08:00"], now)).toEqual([]);
  });
});

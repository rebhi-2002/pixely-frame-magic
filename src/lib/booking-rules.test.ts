import { describe, expect, it } from "vitest";
import { BookingStatus } from "./enums";
import { canCancel, canRate, canReschedule, hasStarted } from "./booking-rules";

const NOW = new Date(2026, 9, 2, 12, 0, 0); // 2026-10-02 12:00 محلي
const FUTURE = { date: "2026-10-05", startTime: "10:00:00" };
const PAST = { date: "2026-09-30", startTime: "10:00:00" };

describe("hasStarted", () => {
  it("موعد قديم = بدأ، موعد قادم = لم يبدأ", () => {
    expect(hasStarted({ status: 5, ...PAST }, NOW)).toBe(true);
    expect(hasStarted({ status: 5, ...FUTURE }, NOW)).toBe(false);
  });
  it("موعد غير معروف = لا نفترض أنه بدأ", () => {
    expect(hasStarted({ status: 5 }, NOW)).toBe(false);
    expect(hasStarted({ status: 5, date: "bad", startTime: "x" }, NOW)).toBe(false);
  });
});

describe("canCancel", () => {
  it("معلّق/مقبول/مؤكّد قادم = نعم", () => {
    for (const status of [BookingStatus.Pending, BookingStatus.Accepted, BookingStatus.Confirmed]) {
      expect(canCancel({ status, ...FUTURE }, NOW)).toBe(true);
    }
  });
  it("بعد بدء الموعد = لا", () => {
    expect(canCancel({ status: BookingStatus.Confirmed, ...PAST }, NOW)).toBe(false);
  });
  it("مرفوض/ملغى/مكتمل = لا", () => {
    for (const status of [
      BookingStatus.Rejected,
      BookingStatus.Cancelled,
      BookingStatus.Completed,
    ]) {
      expect(canCancel({ status, ...FUTURE }, NOW)).toBe(false);
    }
  });
});

describe("canReschedule", () => {
  it("مؤكّد ولم يبدأ فقط", () => {
    expect(canReschedule({ status: BookingStatus.Confirmed, ...FUTURE }, NOW)).toBe(true);
    expect(canReschedule({ status: BookingStatus.Pending, ...FUTURE }, NOW)).toBe(false);
    expect(canReschedule({ status: BookingStatus.Confirmed, ...PAST }, NOW)).toBe(false);
  });
});

describe("canRate", () => {
  it("مكتمل فقط", () => {
    expect(canRate({ status: BookingStatus.Completed })).toBe(true);
    expect(canRate({ status: BookingStatus.Confirmed })).toBe(false);
  });
  it("لا يُظهر الزر لحجز مُقيَّم سابقًا (عند توفر الحقل)", () => {
    expect(canRate({ status: BookingStatus.Completed, alreadyRated: true })).toBe(false);
    expect(canRate({ status: BookingStatus.Completed, alreadyRated: false })).toBe(true);
    expect(canRate({ status: BookingStatus.Completed, alreadyRated: null })).toBe(true);
  });
});

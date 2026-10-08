import { describe, expect, it } from "vitest";
import {
  bookingTabStatus,
  canDecideReschedule,
  sortByCreatedNewest,
  teacherBookingActions,
  toRescheduleArgs,
  validateRescheduleDecision,
} from "@/lib/teacher-bookings";

describe("bookingTabStatus", () => {
  it("يربط التبويب بحالة الباك اند", () => {
    expect(bookingTabStatus("pending")).toBe(1);
    expect(bookingTabStatus("confirmed")).toBe(5);
    expect(bookingTabStatus("completed")).toBe(6);
    expect(bookingTabStatus("all")).toBeUndefined();
  });
});

describe("teacherBookingActions", () => {
  it("معلّق = قبول/رفض، مؤكّد = إنهاء، غيرهما = لا شيء", () => {
    expect(teacherBookingActions({ status: 1 })).toEqual({
      accept: true,
      reject: true,
      complete: false,
    });
    expect(teacherBookingActions({ status: 5 })).toEqual({
      accept: false,
      reject: false,
      complete: true,
    });
    for (const status of [2, 3, 4, 6]) {
      expect(teacherBookingActions({ status })).toEqual({
        accept: false,
        reject: false,
        complete: false,
      });
    }
  });
});

describe("sortByCreatedNewest", () => {
  it("الأحدث أولًا والفاسد للآخر دون تعديل الأصل", () => {
    const input = [
      { id: 1, createdOn: "2026-10-01T00:00:00" },
      { id: 2, createdOn: "2026-10-05T00:00:00" },
      { id: 3, createdOn: "bad" },
    ];
    expect(sortByCreatedNewest(input).map((r) => r.id)).toEqual([2, 1, 3]);
    expect(input[0]!.id).toBe(1);
  });
});

describe("قرار إعادة الجدولة", () => {
  it("المعلّق فقط قابل للقرار", () => {
    expect(canDecideReschedule({ status: 1 })).toBe(true);
    for (const status of [2, 3, 4]) expect(canDecideReschedule({ status })).toBe(false);
  });
  it("الرفض يحتاج سببًا، والموافقة لا", () => {
    expect(validateRescheduleDecision("accept", "")).toEqual([]);
    expect(validateRescheduleDecision("reject", "  ")).toEqual(["reason_required"]);
    expect(validateRescheduleDecision("reject", "x".repeat(501))).toEqual(["reason_too_long"]);
    expect(validateRescheduleDecision("reject", "غير متاح")).toEqual([]);
  });
  it("الوسائط: الموافقة بلا سبب والرفض بسبب مقصوص", () => {
    expect(toRescheduleArgs("accept", "نص")).toEqual({ approve: true, rejectionReason: null });
    expect(toRescheduleArgs("reject", "  غير متاح ")).toEqual({
      approve: false,
      rejectionReason: "غير متاح",
    });
  });
});

import { describe, expect, it } from "vitest";
import { bookingActions, bookingNotice, showTopUpAlert } from "@/lib/booking-detail";
import { sortRequestsNewestFirst, visibleRejectionReason } from "@/lib/reschedule-requests";
import {
  paymentStatusLabel,
  paymentStatusTone,
  rescheduleStatusLabel,
  rescheduleStatusTone,
} from "@/lib/enums";
import type { StudentRescheduleRequest } from "@/integrations/backend/student";

const bi = <T>(ar: T, _en: T) => ar;
const NOW = new Date("2026-10-07T10:00:00");

describe("bookingActions", () => {
  it("مؤكّد وموعده قادم = إلغاء + إعادة جدولة", () => {
    expect(bookingActions({ status: 5, date: "2026-10-10", startTime: "16:00:00" }, NOW)).toEqual({
      cancel: true,
      reschedule: true,
      rate: false,
    });
  });
  it("معلّق = إلغاء فقط", () => {
    expect(bookingActions({ status: 1, date: "2026-10-10", startTime: "16:00:00" }, NOW)).toEqual({
      cancel: true,
      reschedule: false,
      rate: false,
    });
  });
  it("مكتمل = تقييم فقط", () => {
    expect(bookingActions({ status: 6, date: "2026-10-01", startTime: "16:00:00" }, NOW)).toEqual({
      cancel: false,
      reschedule: false,
      rate: true,
    });
  });
  it("مرفوض/ملغى = لا شيء", () => {
    for (const status of [3, 4]) {
      expect(bookingActions({ status, date: "2026-10-10", startTime: "16:00:00" }, NOW)).toEqual({
        cancel: false,
        reschedule: false,
        rate: false,
      });
    }
  });
  it("موعده بدأ = لا إلغاء ولا إعادة جدولة", () => {
    const a = bookingActions({ status: 5, date: "2026-10-07", startTime: "09:00:00" }, NOW);
    expect(a.cancel).toBe(false);
    expect(a.reschedule).toBe(false);
  });
});

describe("bookingNotice", () => {
  it("رفض/إلغاء بسببه", () => {
    expect(
      bookingNotice({ status: 3, rejectionReason: " مشغول ", cancellationReason: null }),
    ).toEqual({
      kind: "rejected",
      reason: "مشغول",
    });
    expect(bookingNotice({ status: 4, rejectionReason: null, cancellationReason: "" })).toEqual({
      kind: "cancelled",
      reason: null,
    });
    expect(bookingNotice({ status: 5, rejectionReason: "x", cancellationReason: "y" })).toBeNull();
  });
});

describe("showTopUpAlert", () => {
  const base = { needsTopUp: true, paymentStatus: 1, bookingStatus: 2 };
  it("يظهر عند needsTopUp وغير مدفوع", () => {
    expect(showTopUpAlert(base)).toBe(true);
  });
  it("لا يظهر لو مدفوع أو الحجز مرفوض/ملغى أو الرصيد كافٍ", () => {
    expect(showTopUpAlert({ ...base, paymentStatus: 2 })).toBe(false);
    expect(showTopUpAlert({ ...base, bookingStatus: 3 })).toBe(false);
    expect(showTopUpAlert({ ...base, bookingStatus: 4 })).toBe(false);
    expect(showTopUpAlert({ ...base, needsTopUp: false })).toBe(false);
  });
});

describe("حالات الدفع وإعادة الجدولة", () => {
  it("تسميات الدفع", () => {
    expect(paymentStatusLabel(1, bi)).toBe("غير مدفوع");
    expect(paymentStatusLabel(2, bi)).toBe("مدفوع");
    expect(paymentStatusLabel(3, bi)).toBe("مُسترجَع");
    expect(paymentStatusLabel(9, bi)).toBe("—");
    expect(paymentStatusTone(2)).toBe("success");
    expect(paymentStatusTone(1)).toBe("muted");
  });
  it("تسميات إعادة الجدولة", () => {
    expect(rescheduleStatusLabel(1, bi)).toBe("بانتظار المعلم");
    expect(rescheduleStatusLabel(2, bi)).toBe("تمت الموافقة");
    expect(rescheduleStatusLabel(3, bi)).toBe("مرفوض");
    expect(rescheduleStatusLabel(4, bi)).toBe("ملغى");
    expect(rescheduleStatusLabel(null, bi)).toBe("—");
    expect(rescheduleStatusTone(2)).toBe("success");
    expect(rescheduleStatusTone(3)).toBe("danger");
    expect(rescheduleStatusTone(1)).toBe("primary");
  });
});

describe("طلبات إعادة الجدولة", () => {
  const req = (over: Partial<StudentRescheduleRequest>): StudentRescheduleRequest => ({
    id: 1,
    bookingId: 1,
    teacherName: null,
    studentName: null,
    originalDate: "2026-10-10",
    originalStartTime: "16:00:00",
    proposedDate: "2026-10-11",
    proposedStartTime: "16:00:00",
    note: null,
    status: 1,
    rejectionReason: null,
    createdOn: "2026-10-01T00:00:00",
    ...over,
  });
  it("الأحدث أولًا دون تعديل الأصل", () => {
    const input = [
      req({ id: 1, createdOn: "2026-10-01T00:00:00" }),
      req({ id: 2, createdOn: "2026-10-05T00:00:00" }),
      req({ id: 3, createdOn: "bad" }),
    ];
    expect(sortRequestsNewestFirst(input).map((r) => r.id)).toEqual([2, 1, 3]);
    expect(input[0]!.id).toBe(1);
  });
  it("سبب الرفض للمرفوض فقط", () => {
    expect(visibleRejectionReason({ status: 3, rejectionReason: " غير متاح " })).toBe("غير متاح");
    expect(visibleRejectionReason({ status: 3, rejectionReason: " " })).toBeNull();
    expect(visibleRejectionReason({ status: 2, rejectionReason: "x" })).toBeNull();
  });
});

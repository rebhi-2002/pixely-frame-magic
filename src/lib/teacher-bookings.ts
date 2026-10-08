// منطق صفحة حجوزات المعلم (WP-T5 / T5-01, T5-04, T5-05, T5-06) — نقي وقابل للاختبار.
// المصدر: TeacherBookingRow (= BookingDto) وTeacherRescheduleRequestRow (= RescheduleRequestDto).

import type {
  StudentBookingDetail,
  StudentRescheduleRequest,
} from "@/integrations/backend/student";
import { BookingStatus, RescheduleStatus } from "./enums";
import { validateDecision, toDecisionArgs, type DecisionKind } from "./booking-decision";

export type BookingTab = "all" | "pending" | "confirmed" | "completed";

/** فلتر الحالة المرسل للباك اند لكل تبويب (undefined = الكل). */
export function bookingTabStatus(tab: BookingTab): BookingStatus | undefined {
  switch (tab) {
    case "pending":
      return BookingStatus.Pending;
    case "confirmed":
      return BookingStatus.Confirmed;
    case "completed":
      return BookingStatus.Completed;
    default:
      return undefined;
  }
}

export interface TeacherBookingActions {
  accept: boolean;
  reject: boolean;
  complete: boolean;
}

/** قبول/رفض للمعلّق فقط، وإنهاء للمؤكَّد فقط. الباك اند مرجع نهائي لأي رفض. */
export function teacherBookingActions(
  booking: Pick<StudentBookingDetail, "status">,
): TeacherBookingActions {
  const pending = booking.status === BookingStatus.Pending;
  return {
    accept: pending,
    reject: pending,
    complete: booking.status === BookingStatus.Confirmed,
  };
}

/** الأحدث طلبًا أولًا (createdOn فاسد للآخر). لا يعدّل الأصل. */
export function sortByCreatedNewest<T extends { createdOn: string }>(rows: T[]): T[] {
  const time = (r: T) => {
    const t = new Date(r.createdOn).getTime();
    return Number.isNaN(t) ? Number.NEGATIVE_INFINITY : t;
  };
  return [...rows].sort((a, b) => time(b) - time(a));
}

/** قرار إعادة الجدولة يمكن فقط للطلب المعلّق. */
export function canDecideReschedule(request: Pick<StudentRescheduleRequest, "status">): boolean {
  return request.status === RescheduleStatus.Pending;
}

/** تحقق قرار إعادة الجدولة: الرفض يحتاج سببًا (نفس قاعدة قرار الحجز). */
export const validateRescheduleDecision = validateDecision;

/** وسائط decideReschedule: الموافقة لا ترسل سببًا حتى لو كُتب نص. */
export function toRescheduleArgs(
  kind: DecisionKind,
  reason: string,
): { approve: boolean; rejectionReason: string | null } {
  const { accept, rejectionReason } = toDecisionArgs(kind, reason);
  return { approve: accept, rejectionReason };
}

// قواعد أهلية الحجز (WP-00 — العقد C-15). دوال نقية لإخفاء/إظهار أزرار الإلغاء وإعادة
// الجدولة والتقييم فقط. ⚠️ الباك اند هو المرجع النهائي: أي رفض منه بيُعرض برسالته، وهالدوال
// ما بتمنع الاستدعاء ولا بتغني عن التحقق عنده.
//
// الافتراضات الافتراضية (لحد ما يُجاب Q-08/Q-09/Q-10):
// - الإلغاء: متاح للحجز المعلّق أو المؤكَّد (وللمقبول) ما دام لم يبدأ.
// - إعادة الجدولة: Confirmed فقط ولم يبدأ.
// - التقييم: Completed فقط، وإن توفر حقل «مُقيَّم سابقًا» يُمرَّر `alreadyRated`.

import { combineDateTime } from "./format";
import { BookingStatus } from "./enums";

export interface BookingLike {
  /** رقم الحالة 1..6 (lib/enums.ts). */
  status: number;
  /** "YYYY-MM-DD" (أو ISO) — موعد الجلسة. */
  date?: string | null;
  /** "HH:mm[:ss]". */
  startTime?: string | null;
  /** لو الباك اند بيرجّع حقلًا يدل أن الحجز مُقيَّم (Q-10) مرّره هون. */
  alreadyRated?: boolean | null;
}

/**
 * هل بدأ موعد الحجز؟ true لو الموعد ≤ الآن. لو الموعد غير معروف/غير صالح بنرجع false
 * (ما منفترض أنه بدأ) كي ما نخفي إجراءً قد يكون مسموحًا — والباك اند يرفض لو غير مسموح.
 */
export function hasStarted(booking: BookingLike, now: Date = new Date()): boolean {
  const start = combineDateTime(booking.date, booking.startTime);
  return start !== null && start.getTime() <= now.getTime();
}

export function canCancel(booking: BookingLike, now: Date = new Date()): boolean {
  const cancellable =
    booking.status === BookingStatus.Pending ||
    booking.status === BookingStatus.Accepted ||
    booking.status === BookingStatus.Confirmed;
  return cancellable && !hasStarted(booking, now);
}

export function canReschedule(booking: BookingLike, now: Date = new Date()): boolean {
  return booking.status === BookingStatus.Confirmed && !hasStarted(booking, now);
}

export function canRate(booking: BookingLike): boolean {
  return booking.status === BookingStatus.Completed && booking.alreadyRated !== true;
}

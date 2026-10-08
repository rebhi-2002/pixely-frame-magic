// منطق صفحة تفاصيل الحجز (WP-S2 / S2-01,S2-02,S2-05 + S4-02) — نقي وقابل للاختبار.
// الأزرار تُخفى/تُظهر حسب lib/booking-rules (الباك اند هو المرجع النهائي ويعرض رسالة الرفض).

import type { StudentBookingDetail, StudentBookingPayment } from "@/integrations/backend/student";
import { canCancel, canRate, canReschedule } from "./booking-rules";
import { BookingPaymentStatus, BookingStatus } from "./enums";

export interface BookingActions {
  cancel: boolean;
  reschedule: boolean;
  rate: boolean;
}

/** لا يوجد حقل «مُقيَّم سابقًا» بالرد → الزر يظهر لـCompleted والباك اند يرفض التكرار (برسالته). */
export function bookingActions(
  booking: Pick<StudentBookingDetail, "status" | "date" | "startTime">,
  now: Date = new Date(),
): BookingActions {
  return {
    cancel: canCancel(booking, now),
    reschedule: canReschedule(booking, now),
    rate: canRate(booking),
  };
}

/** أي إشعار بارز نعرضه أعلى الصفحة: رفض/إلغاء بسببه إن وُجد. */
export function bookingNotice(
  booking: Pick<StudentBookingDetail, "status" | "rejectionReason" | "cancellationReason">,
): { kind: "rejected" | "cancelled"; reason: string | null } | null {
  if (booking.status === BookingStatus.Rejected) {
    return { kind: "rejected", reason: booking.rejectionReason?.trim() || null };
  }
  if (booking.status === BookingStatus.Cancelled) {
    return { kind: "cancelled", reason: booking.cancellationReason?.trim() || null };
  }
  return null;
}

/** تنبيه الرصيد: فقط لو الباك اند قال needsTopUp وغير مدفوع والحجز لم يُرفض/يُلغَ. */
export function showTopUpAlert(
  payment: Pick<StudentBookingPayment, "needsTopUp" | "paymentStatus" | "bookingStatus">,
): boolean {
  return (
    payment.needsTopUp === true &&
    payment.paymentStatus === BookingPaymentStatus.Unpaid &&
    payment.bookingStatus !== BookingStatus.Rejected &&
    payment.bookingStatus !== BookingStatus.Cancelled
  );
}

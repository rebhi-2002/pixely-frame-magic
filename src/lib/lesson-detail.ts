// منطق صفحة تفاصيل الدرس (WP-S5 / S5-01..03) — نقي وقابل للاختبار.
// المصدر: StudentLessonDetail (student.ts). الدرس متداخل بحقل lesson.

import type { StudentLessonDetail } from "@/integrations/backend/student";
import { DeliveryType, type Bi } from "./enums";
import { joinHref, locationLabel } from "./schedule-join";

/**
 * نص المكان: حضوري + locationAvailable===false → «الموقع غير متوفر» حتى لو وُجدت قيمة room؛
 * غير ذلك نفس منطق الجدول (locationLabel) لتوحيد العرض.
 */
export function lessonLocationText(detail: StudentLessonDetail, bi: Bi): string {
  const { lesson } = detail;
  if (lesson.mode === DeliveryType.InPerson && detail.locationAvailable === false) {
    return bi("الموقع غير متوفر", "Location unavailable");
  }
  return locationLabel(lesson, bi);
}

/** رابط الانضمام الآمن (http/https وبشرط canJoin من الباك اند) أو null. */
export function lessonJoinHref(detail: StudentLessonDetail): string | null {
  return joinHref(detail.lesson);
}

/** الدرس ملغى لو status = "Cancelled" (LessonStatus.ToString() بالباك اند) أو أُرسل سبب إلغاء غير فارغ. */
export function isLessonCancelled(detail: {
  cancellationReason?: string | null;
  lesson?: { status?: string | null };
}): boolean {
  return detail.lesson?.status === "Cancelled" || !!detail.cancellationReason?.trim();
}

/**
 * تسمية حالة عنصر الجدول (نص من الباك اند): دروس Scheduled/Completed/Cancelled،
 * وحجوزات Pending/Accepted/Rejected/Cancelled/Confirmed/Completed. غير المعروف يُعرض كما هو.
 */
export function scheduleStatusLabel(status: string | null | undefined, bi: Bi): string {
  switch (status) {
    case "Scheduled":
      return bi("مجدول", "Scheduled");
    case "Completed":
      return bi("مكتمل", "Completed");
    case "Cancelled":
      return bi("ملغى", "Cancelled");
    case "Pending":
      return bi("بانتظار الرد", "Pending");
    case "Accepted":
      return bi("مقبول", "Accepted");
    case "Rejected":
      return bi("مرفوض", "Rejected");
    case "Confirmed":
      return bi("مؤكّد", "Confirmed");
    default:
      return status?.trim() || "—";
  }
}

export function scheduleStatusTone(
  status: string | null | undefined,
): "primary" | "success" | "danger" | "muted" {
  switch (status) {
    case "Cancelled":
    case "Rejected":
      return "danger";
    case "Completed":
    case "Confirmed":
      return "success";
    case "Scheduled":
    case "Pending":
    case "Accepted":
      return "primary";
    default:
      return "muted";
  }
}

/** نص تعليمات الاجتماع المنظّف (null لو فاضي) — يُعرض كنص عادي فقط. */
export function meetingInstructionsText(
  detail: Pick<StudentLessonDetail, "meetingInstructions">,
): string | null {
  const text = detail.meetingInstructions?.trim();
  return text ? text : null;
}

/** هل نعرض بلوك التعليمات/الانضمام؟ أونلاين فقط. */
export function isOnlineLesson(detail: StudentLessonDetail): boolean {
  return detail.lesson.mode === DeliveryType.Online;
}

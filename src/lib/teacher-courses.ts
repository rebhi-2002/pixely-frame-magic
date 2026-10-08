// منطق قائمة كورسات المعلم + جدول الدروس (WP-T1 / T1-01, WP-T4 / T4-01) — نقي وقابل للاختبار.

import type { LessonRow } from "@/integrations/backend/lessons";
import { combineDateTime } from "./format";
import { CourseStatus, DeliveryType } from "./enums";

/** ترتيب عرض الكورسات: منشور ثم مسودة ثم مؤرشف، وداخل كل حالة الأحدث (id الأكبر) أولًا. */
export function sortCoursesForTeacher<T extends { id: number; status: number }>(courses: T[]): T[] {
  const rank = (status: number) =>
    status === CourseStatus.Published ? 0 : status === CourseStatus.Draft ? 1 : 2;
  return [...courses].sort((a, b) => rank(a.status) - rank(b.status) || b.id - a.id);
}

/** «YYYY-MM-DD» من تاريخ الباك اند ISO؛ فاضي لو غير صالح. */
export function lessonDateOnly(date: string | null | undefined): string {
  const m = /^(\d{4}-\d{2}-\d{2})/.exec(date ?? "");
  return m ? m[1]! : "";
}

/** الأقدم موعدًا أولًا (تاريخ + وقت)؛ غير الصالح للآخر. لا يعدّل الأصل. */
export function sortLessonsBySchedule(rows: LessonRow[]): LessonRow[] {
  const time = (r: LessonRow) =>
    combineDateTime(r.date, r.startTime)?.getTime() ?? Number.POSITIVE_INFINITY;
  return [...rows].sort((a, b) => time(a) - time(b));
}

/**
 * اقتراح رقم الدرس التالي = عدد الدروس الحالية + 1. الرد لا يحمل orderIndex فهو مجرد اقتراح
 * قابل للتعديل بالنموذج (والباك اند مرجع نهائي).
 */
export function suggestNextOrderIndex(rows: LessonRow[]): number {
  return rows.length + 1;
}

export function lessonHasStarted(
  row: Pick<LessonRow, "date" | "startTime">,
  now: Date = new Date(),
): boolean {
  const start = combineDateTime(row.date, row.startTime);
  return start !== null && start.getTime() <= now.getTime();
}

export interface LessonRowActions {
  edit: boolean;
  cancel: boolean;
  meeting: boolean;
}

/**
 * GetSchedule لا يرجّع حالة الدرس (ملغى؟) فلا نخفي الإجراءات على أساسها — الباك اند يرفض (Failed) لو لزم.
 * التعديل والإلغاء وضبط الاجتماع لدرس لم يبدأ فقط؛ الاجتماع للأونلاين فقط.
 */
export function lessonRowActions(
  row: Pick<LessonRow, "date" | "startTime">,
  deliveryType: number | null,
  now: Date = new Date(),
): LessonRowActions {
  const upcoming = !lessonHasStarted(row, now);
  return {
    edit: upcoming,
    cancel: upcoming,
    meeting: upcoming && deliveryType === DeliveryType.Online,
  };
}

/**
 * عمود «القاعة / المنصة»: للأونلاين الباك اند يرجّع "{اسم المنصة} — {الرابط}" (قد يكون " — " فارغًا)،
 * فنعرض اسم المنصة فقط (الرابط يُدار من نافذة الاجتماع). للحضوري يرجّع القاعة أو "—".
 */
export function platformOrRoomText(
  raw: string | null | undefined,
  deliveryType: number | null,
): string {
  const text = raw?.trim() ?? "";
  if (deliveryType === DeliveryType.Online) {
    const platform = text.split(" — ")[0]?.trim() ?? "";
    return platform || "—";
  }
  return text || "—";
}

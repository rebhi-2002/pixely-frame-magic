// منطق نموذج الدرس النقي (WP-T4) — مفصول عن lesson-form-dialog.tsx كي يُختبر بدون React.
//
// الباك اند هو المرجع النهائي: أي رفض منه (تعارض درس، تاريخ/وقت غير صالح) بيُعرض داخل النموذج
// برسالته (T4-07). هالمحققات بتمنع الأخطاء الواضحة قبل الإرسال فقط.

import { combineDateTime, dayName, formatTime, isHttpUrl, type Lang } from "@/lib/format";
import { DeliveryType, MeetingPlatform } from "@/lib/enums";
import type { LessonInput } from "@/integrations/backend/lessons";

/** حدود مدة الدرس بالدقائق. ⚠️ افتراض (غير موثّق بـSwagger): الباك اند يحسم، وهذي حدود معقولة للواجهة. */
export const LESSON_DURATION_MIN = 15;
export const LESSON_DURATION_MAX = 480;

export interface LessonFormValues {
  title: string;
  /** "YYYY-MM-DD". */
  scheduledDate: string;
  /** "HH:mm". */
  startTime: string;
  /** نص من حقل الإدخال. */
  durationMinutes: string;
  /** رقم ترتيب الدرس داخل الكورس (نص من حقل الإدخال). */
  orderIndex: string;
  room: string;
  /** للأونلاين فقط: قيمة MeetingPlatform كنص، أو "" لو ما اختير. */
  meetingPlatform: string;
  meetingUrl: string;
  meetingInstructions: string;
}

/** حدود عنوان الدرس بالباك اند (LessonInputDto.Title). */
export const LESSON_TITLE_MIN = 3;
export const LESSON_TITLE_MAX = 250;

export type LessonFormErrorCode =
  | "title_required"
  | "title_length"
  | "date_invalid"
  | "time_invalid"
  | "duration_range"
  | "order_invalid"
  | "platform_required"
  | "url_required"
  | "url_invalid";

export type LessonFormErrors = Partial<
  Record<
    | "title"
    | "scheduledDate"
    | "startTime"
    | "durationMinutes"
    | "orderIndex"
    | "meetingPlatform"
    | "meetingUrl",
    LessonFormErrorCode
  >
>;

export function emptyLessonValues(nextOrderIndex = 1): LessonFormValues {
  return {
    title: "",
    scheduledDate: "",
    startTime: "",
    durationMinutes: "60",
    orderIndex: String(nextOrderIndex),
    room: "",
    meetingPlatform: "",
    meetingUrl: "",
    meetingInstructions: "",
  };
}

function parseIntStrict(text: string): number | null {
  const trimmed = text.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  const n = Number(trimmed);
  return Number.isSafeInteger(n) ? n : null;
}

/** يتحقق من النموذج. الفارغ (غير مُرسَل) = لا أخطاء. */
export function validateLessonForm(
  values: LessonFormValues,
  deliveryType: DeliveryType,
  options: { editing?: boolean } = {},
): LessonFormErrors {
  const errors: LessonFormErrors = {};

  const title = values.title.trim();
  if (!title) errors.title = "title_required";
  // الباك اند: [StringLength(250, MinimumLength = 3)] على Title.
  else if (title.length < LESSON_TITLE_MIN || title.length > LESSON_TITLE_MAX) {
    errors.title = "title_length";
  }

  if (combineDateTime(values.scheduledDate, "00:00") === null)
    errors.scheduledDate = "date_invalid";
  if (formatTime(values.startTime) === "—") errors.startTime = "time_invalid";

  const duration = parseIntStrict(values.durationMinutes);
  if (duration === null || duration < LESSON_DURATION_MIN || duration > LESSON_DURATION_MAX) {
    errors.durationMinutes = "duration_range";
  }

  const order = parseIntStrict(values.orderIndex);
  if (order === null || order < 1) errors.orderIndex = "order_invalid";

  // التعديل: الباك اند يترك بيانات الاجتماع كما هي لو أُرسلت null (Lesson/Update) → فارغان معًا مقبول.
  const keepMeeting =
    options.editing === true && !values.meetingPlatform.trim() && !values.meetingUrl.trim();
  if (deliveryType === DeliveryType.Online && !keepMeeting) {
    const platform = parseIntStrict(values.meetingPlatform);
    if (platform === null || platform < MeetingPlatform.Zoom || platform > MeetingPlatform.Other) {
      errors.meetingPlatform = "platform_required";
    }
    const url = values.meetingUrl.trim();
    if (!url) errors.meetingUrl = "url_required";
    else if (!isHttpUrl(url)) errors.meetingUrl = "url_invalid";
  }

  return errors;
}

export function hasErrors(errors: LessonFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** اسم يوم الدرس مشتقًّا من التاريخ (يُعرض ولا يُدخل). "—" لو التاريخ غير صالح. */
export function deriveLessonDay(scheduledDate: string, lang: Lang = "ar"): string {
  return dayName(scheduledDate, lang);
}

/**
 * تعديل الدرس متاح فقط لدرس لم يبدأ وغير ملغى. موعد غير معروف = نسمح (والباك اند يرفض لو لازم)
 * كي ما نخفي إجراءً قد يكون مسموحًا.
 */
export function canEditLesson(
  lesson: { scheduledDate?: string | null; startTime?: string | null; cancelled?: boolean | null },
  now: Date = new Date(),
): boolean {
  if (lesson.cancelled === true) return false;
  const start = combineDateTime(lesson.scheduledDate, lesson.startTime);
  return start === null || start.getTime() > now.getTime();
}

/** يبني جسم Lesson/Create أو Update. حقول الحضوري/الأونلاين بتتبع نوع التوصيل (الآخر null). */
export function toLessonInput(
  values: LessonFormValues,
  ids: { courseId: number; groupId?: number | null; lessonId?: number },
  deliveryType: DeliveryType,
): LessonInput {
  const online = deliveryType === DeliveryType.Online;
  const platform = parseIntStrict(values.meetingPlatform);
  return {
    ...(ids.lessonId !== undefined ? { id: ids.lessonId } : {}),
    // groupId اختياري (Q-02b): يُرسل فقط لو معروفًا ولا نخمّنه.
    ...(typeof ids.groupId === "number" ? { groupId: ids.groupId } : {}),
    courseId: ids.courseId,
    title: values.title.trim(),
    scheduledDate: values.scheduledDate,
    startTime: formatTime(values.startTime),
    durationMinutes: parseIntStrict(values.durationMinutes) ?? 0,
    orderIndex: parseIntStrict(values.orderIndex) ?? 0,
    meetingPlatform: online && platform !== null ? (platform as MeetingPlatform) : null,
    // فاضي → null (يبقي الرابط الحالي عند التعديل ولا يخالف [Url] عند الإنشاء).
    meetingUrl: online ? values.meetingUrl.trim() || null : null,
    meetingInstructions: online ? values.meetingInstructions.trim() || null : null,
    room: online ? null : values.room.trim() || null,
  };
}

/**
 * قيم نموذج التعديل من صف الجدول (LessonRow). الصف لا يحمل بيانات الاجتماع ولا القاعة → تُترك فارغة
 * (Lesson/Update يبقي الاجتماع الحالي لو null، ولا يحدّث القاعة أصلًا). orderIndex يتجاهله Update.
 */
export function lessonRowToValues(
  row: { topic: string; date: string; startTime: string; durationMinutes: number },
  orderIndex: number,
): LessonFormValues {
  const dateOnly = /^(\d{4}-\d{2}-\d{2})/.exec(row.date)?.[1] ?? "";
  const time = formatTime(row.startTime);
  return {
    ...emptyLessonValues(orderIndex),
    title: row.topic,
    scheduledDate: dateOnly,
    startTime: time === "—" ? "" : time,
    durationMinutes: String(row.durationMinutes > 0 ? row.durationMinutes : 60),
  };
}

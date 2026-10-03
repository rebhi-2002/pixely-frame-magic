// تحقق نقي لنافذة طلب إعادة الجدولة (WP-S3: S3-01 / S3-03 / S3-04).
// الباك اند هو المرجع النهائي (تعارض/عدم توفّر المعلم بيرجع كرسالة)، وهذا فقط تحقق أولي.

import { combineDateTime, formatTime } from "./format";

/** حد أعلى واجهي للملاحظة — افتراض (غير موثّق بالباك اند) لمنع نصوص ضخمة. */
export const MAX_RESCHEDULE_NOTE_LENGTH = 500;

/** تاريخ اليوم المحلي بصيغة "YYYY-MM-DD" (للحد الأدنى بحقل التاريخ). */
export function todayLocalIso(now: Date = new Date()): string {
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export interface RescheduleDraft {
  /** "YYYY-MM-DD". */
  date: string;
  /** "HH:mm". */
  time: string;
  note: string;
}

export type RescheduleError = "date" | "time" | "past" | "note";

function isCalendarDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return false;
  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);
  const parsed = new Date(y, m - 1, d);
  return parsed.getFullYear() === y && parsed.getMonth() === m - 1 && parsed.getDate() === d;
}

/** رموز الأخطاء (الواجهة بتترجمها). قائمة فاضية = صالح من جهة العميل. */
export function validateRescheduleDraft(
  draft: RescheduleDraft,
  now: Date = new Date(),
): RescheduleError[] {
  const errors: RescheduleError[] = [];
  const dateOk = isCalendarDate(draft.date);
  const timeOk = formatTime(draft.time) !== "—";
  if (!dateOk) errors.push("date");
  if (!timeOk) errors.push("time");
  if (dateOk && timeOk) {
    const proposed = combineDateTime(draft.date, draft.time);
    if (proposed === null || proposed.getTime() <= now.getTime()) errors.push("past");
  }
  if (draft.note.length > MAX_RESCHEDULE_NOTE_LENGTH) errors.push("note");
  return errors;
}

/** ملاحظة اختيارية: تُقصّ، والفاضية = null (الباك اند يستقبل note اختياريًا). */
export function normalizeNote(note: string): string | null {
  const trimmed = note.trim();
  return trimmed ? trimmed : null;
}

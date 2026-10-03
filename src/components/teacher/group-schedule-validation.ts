// التحقق من صحة جدول المجموعة (WP-T2 / T2-03) — دوال نقية على جانب العميل.
// الباك اند هو المرجع النهائي (Course/ConfigureGroupSchedule): هالتحققات بتمنع الأخطاء الواضحة
// قبل الإرسال فقط. يُستهلك من نموذج إعداد المجموعة (T2-01، مرحلة B) داخل group-config-tab.tsx.

import { combineDateTime, formatTime } from "@/lib/format";
import { DayOfWeek } from "@/lib/enums";
import type { GroupScheduleInput } from "@/integrations/backend/courses";

export type GroupScheduleErrorCode =
  | "start_date_invalid"
  | "end_date_invalid"
  | "end_before_start"
  | "duration_invalid"
  | "capacity_invalid"
  | "days_required"
  | "day_invalid"
  | "day_duplicate"
  | "time_invalid";

export interface GroupScheduleIssue {
  code: GroupScheduleErrorCode;
  /** فهرس يوم الجدول المعني (لأخطاء الأيام/الأوقات). */
  dayIndex?: number;
}

function isDayOfWeek(value: unknown): value is DayOfWeek {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 6;
}

/**
 * يرجّع قائمة المشاكل (فاضية = صالح). القواعد (T2-03):
 * نهاية ≥ بداية، مدة > 0، سعة ≥ 1، يوم واحد على الأقل بدون تكرار نفس اليوم، والوقت صالح.
 */
export function validateGroupSchedule(
  input: Pick<
    GroupScheduleInput,
    | "courseStartDate"
    | "courseEndDate"
    | "defaultLessonDurationMinutes"
    | "maxStudents"
    | "scheduleDays"
  >,
): GroupScheduleIssue[] {
  const issues: GroupScheduleIssue[] = [];

  const start = combineDateTime(input.courseStartDate, "00:00");
  const end = combineDateTime(input.courseEndDate, "00:00");
  if (start === null) issues.push({ code: "start_date_invalid" });
  if (end === null) issues.push({ code: "end_date_invalid" });
  if (start !== null && end !== null && end.getTime() < start.getTime()) {
    issues.push({ code: "end_before_start" });
  }

  const duration = input.defaultLessonDurationMinutes;
  if (!Number.isInteger(duration) || duration <= 0) issues.push({ code: "duration_invalid" });

  const capacity = input.maxStudents;
  if (!Number.isInteger(capacity) || capacity < 1) issues.push({ code: "capacity_invalid" });

  const days = input.scheduleDays;
  if (days.length === 0) {
    issues.push({ code: "days_required" });
  } else {
    const seen = new Set<number>();
    days.forEach((day, index) => {
      if (!isDayOfWeek(day.dayOfWeek)) {
        issues.push({ code: "day_invalid", dayIndex: index });
      } else if (seen.has(day.dayOfWeek)) {
        issues.push({ code: "day_duplicate", dayIndex: index });
      } else {
        seen.add(day.dayOfWeek);
      }
      if (formatTime(day.startTime) === "—") issues.push({ code: "time_invalid", dayIndex: index });
    });
  }

  return issues;
}

export function isGroupScheduleValid(input: Parameters<typeof validateGroupSchedule>[0]): boolean {
  return validateGroupSchedule(input).length === 0;
}

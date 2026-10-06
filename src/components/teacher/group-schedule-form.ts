// منطق نموذج إعداد المجموعة النقي (WP-T2: T2-01 / T2-02 / T2-06) — يبني جسم ConfigureGroupSchedule
// ويستهلك محقق T2-03 (group-schedule-validation.ts). بلا React وبلا شبكة.

import type { GroupScheduleInput } from "@/integrations/backend/courses";
import type { DayOfWeek } from "@/lib/enums";
import {
  validateGroupSchedule,
  type GroupScheduleIssue,
} from "@/components/teacher/group-schedule-validation";

export interface ScheduleDayRow {
  /** مفتاح ثابت للصف (لا يتغيّر بالحذف/الإضافة) كي ما تضيع حالة الحقول. */
  key: string;
  /** DayOfWeek كنص ("" = غير مختار). */
  dayOfWeek: string;
  /** "HH:mm". */
  startTime: string;
}

export interface GroupScheduleFormValues {
  maxStudents: string;
  /** "YYYY-MM-DD". */
  courseStartDate: string;
  courseEndDate: string;
  defaultLessonDurationMinutes: string;
  days: ScheduleDayRow[];
}

let rowCounter = 0;
export function newDayRow(): ScheduleDayRow {
  rowCounter += 1;
  return { key: `day-${rowCounter}`, dayOfWeek: "", startTime: "" };
}

export function emptyGroupScheduleValues(): GroupScheduleFormValues {
  return {
    maxStudents: "",
    courseStartDate: "",
    courseEndDate: "",
    defaultLessonDurationMinutes: "60",
    days: [newDayRow()],
  };
}

/** عدد صحيح موجب/صفر من نص، أو NaN (المحقق يعتبر NaN غير صالح). */
function toInt(text: string): number {
  const trimmed = text.trim();
  return /^\d+$/.test(trimmed) ? Number(trimmed) : Number.NaN;
}

/** يبني جسم الطلب من النموذج. قيم غير مفهومة تبقى NaN/-1 كي يرفضها المحقق ولا تُرسَل بصمت. */
export function toGroupScheduleInput(
  groupId: number,
  values: GroupScheduleFormValues,
): GroupScheduleInput {
  return {
    groupId,
    maxStudents: toInt(values.maxStudents),
    courseStartDate: values.courseStartDate,
    courseEndDate: values.courseEndDate,
    defaultLessonDurationMinutes: toInt(values.defaultLessonDurationMinutes),
    scheduleDays: values.days.map((row) => {
      const day = /^[0-6]$/.test(row.dayOfWeek.trim()) ? Number(row.dayOfWeek) : -1;
      return { dayOfWeek: day as DayOfWeek, startTime: row.startTime };
    }),
  };
}

/** مشاكل النموذج (فاضية = صالح) — groupId لا يدخل بالتحقق (يُفحص منفصلًا لأنه ربط وليس إدخال مستخدم). */
export function validateGroupScheduleForm(values: GroupScheduleFormValues): GroupScheduleIssue[] {
  return validateGroupSchedule(toGroupScheduleInput(0, values));
}

/** هل يوجد مشكلة بكود معيّن (أو لصف معيّن)؟ للعرض بجانب الحقل. */
export function issuesFor(
  issues: ReadonlyArray<GroupScheduleIssue>,
  codes: ReadonlyArray<GroupScheduleIssue["code"]>,
  dayIndex?: number,
): GroupScheduleIssue[] {
  return issues.filter(
    (issue) =>
      codes.includes(issue.code) && (dayIndex === undefined || issue.dayIndex === dayIndex),
  );
}

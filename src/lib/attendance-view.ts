// منطق صفحة سجل الحضور (WP-S7 / S7-01, S7-03, S7-04, S7-05) — نقي وقابل للاختبار.
// المصدر: StudentAttendance (student.ts). النسبة تأتي من الباك اند فقط ولا نحسبها محليًا (Truth Rule).

import type { StudentAttendance, StudentAttendanceRow } from "@/integrations/backend/student";
import { AttendanceStatus, attendanceStatusLabel, type Bi } from "./enums";

export interface AttendanceDateRange {
  /** "YYYY-MM-DD" أو "" (بدون حد). */
  from: string;
  to: string;
}

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/** المدى غير صالح فقط لو الحدّان معبّآن وصيغتهما سليمة والبداية بعد النهاية. */
export function isRangeInverted(range: AttendanceDateRange): boolean {
  if (!DATE_ONLY.test(range.from) || !DATE_ONLY.test(range.to)) return false;
  return range.from > range.to; // مقارنة نصية كافية لصيغة ISO
}

/** يحوّل المدى لوسائط الطلب (undefined لغير المعبّأ). الباك اند يشمل يوم النهاية بنفسه (to.Date + 1 يوم) فنرسل التاريخ كما هو. */
export function rangeToFilter(range: AttendanceDateRange): { from?: string; to?: string } {
  const out: { from?: string; to?: string } = {};
  if (DATE_ONLY.test(range.from)) out.from = range.from;
  if (DATE_ONLY.test(range.to)) out.to = range.to;
  return out;
}

/** الأحدث أولًا؛ تواريخ غير صالحة تنزل للآخر. لا يعدّل المصفوفة الأصلية. */
export function sortRecordsNewestFirst(records: StudentAttendanceRow[]): StudentAttendanceRow[] {
  const time = (r: StudentAttendanceRow) => {
    const t = new Date(r.sessionDate).getTime();
    return Number.isNaN(t) ? Number.NEGATIVE_INFINITY : t;
  };
  return [...records].sort((a, b) => time(b) - time(a));
}

export interface AttendanceStatItem {
  key: "present" | "absent" | "late" | "excused";
  status: number;
  label: string;
  count: number;
}

/** عدّادات الحالات الأربع كما أرسلها الباك اند (بدون إعادة حساب من السجلات). */
export function attendanceCounters(data: StudentAttendance, bi: Bi): AttendanceStatItem[] {
  return [
    { key: "present", status: AttendanceStatus.Present, count: data.present },
    { key: "absent", status: AttendanceStatus.Absent, count: data.absent },
    { key: "late", status: AttendanceStatus.Late, count: data.late },
    { key: "excused", status: AttendanceStatus.Excused, count: data.excused },
  ].map((item) => ({
    ...item,
    key: item.key as AttendanceStatItem["key"],
    label: attendanceStatusLabel(item.status, bi),
  }));
}

/** نص النسبة: «85%» أو «—» لو null/غير صالحة. */
export function attendanceRateText(percent: number | null | undefined): string {
  if (typeof percent !== "number" || !Number.isFinite(percent)) return "—";
  return `${Math.round(percent * 10) / 10}%`;
}

export function hasAttendanceData(data: StudentAttendance): boolean {
  return data.totalSessions > 0 || data.records.length > 0;
}

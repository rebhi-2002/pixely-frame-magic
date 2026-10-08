// منطق صفحة تفاصيل الكورس المسجَّل (WP-S6 / S6-01,S6-03,S6-04) — نقي وقابل للاختبار.

import type { StudentGroupScheduleDay } from "@/integrations/backend/student";
import { WEEK_DISPLAY_ORDER, dayOfWeekLabel, type Bi } from "./enums";
import { formatTime } from "./format";

/** يرتّب أيام المجموعة بترتيب العرض (السبت أولًا) ثم الوقت، ويحذف الأيام خارج 0..6. */
export function orderGroupDays(days: StudentGroupScheduleDay[]): StudentGroupScheduleDay[] {
  const rank = (d: number) => WEEK_DISPLAY_ORDER.indexOf(d as (typeof WEEK_DISPLAY_ORDER)[number]);
  return days
    .filter((d) => rank(d.day) !== -1)
    .sort((a, b) => rank(a.day) - rank(b.day) || a.startTime.localeCompare(b.startTime));
}

/** «السبت 16:00 · الاثنين 16:00» — فاضي لو لا أيام. */
export function groupDaysSummary(days: StudentGroupScheduleDay[], bi: Bi): string {
  return orderGroupDays(days)
    .map((d) => `${dayOfWeekLabel(d.day, bi)} ${formatTime(d.startTime)}`)
    .join(" · ");
}

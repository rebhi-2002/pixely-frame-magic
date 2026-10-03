// منطق صفحة التقدم الأكاديمي (WP-S9) النقي — مفصول كي يُختبر بدون React.
//
// المصدر: StudentProgressDto (الكود الحالي؛ لا Schema بـSwagger → يُتحقق منه بـJ-04 عند وصول عينة).
// ⚠️ قاعدة «لا أرقام مخترعة»: النسبة الناقصة (null/NaN/خارج 0..100) بتبقى «غير متاح» — لا صفر
// ولا قيمة افتراضية. الصفر الحقيقي (0%) بيُعرض صفرًا.

import type { StudentProgressDto } from "@/integrations/backend/student";

export type ProgressMetricState = "value" | "unavailable";

export interface ProgressMetric {
  state: ProgressMetricState;
  /** نسبة 0..100 مقرّبة لأقرب عدد صحيح؛ null لو غير متاح. */
  percent: number | null;
  /** عدد العينات (جلسات حضور/امتحانات) — يوضّح أساس النسبة. */
  samples: number;
}

/** نسبة صالحة (0..100) مقرّبة، أو null. */
export function normalizePercent(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  if (value < 0 || value > 100) return null;
  return Math.round(value);
}

/** عدد صحيح غير سالب، وغيره 0 (العدّادات أعداد لا نسب، فالصفر الافتراضي مقبول لها). */
export function normalizeCount(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? Math.floor(value) : 0;
}

export function toMetric(percent: unknown, samples: unknown): ProgressMetric {
  const p = normalizePercent(percent);
  return {
    state: p === null ? "unavailable" : "value",
    percent: p,
    samples: normalizeCount(samples),
  };
}

export interface ProgressView {
  attendance: ProgressMetric;
  exams: ProgressMetric;
  /** true لو ما في أي بيانات تقدم أبدًا (لا حضور ولا امتحانات) → حالة فراغ بدل أرقام. */
  isEmpty: boolean;
}

/** يحوّل رد Student/Progress إلى نموذج عرض آمن (يتحمل null/ناقص). */
export function buildProgressView(
  dto: Partial<StudentProgressDto> | null | undefined,
): ProgressView {
  const attendance = toMetric(dto?.attendanceRatePercent, dto?.attendanceSessions);
  const exams = toMetric(dto?.averageExamScorePercent, dto?.examsTaken);
  const isEmpty =
    attendance.state === "unavailable" &&
    exams.state === "unavailable" &&
    attendance.samples === 0 &&
    exams.samples === 0;
  return { attendance, exams, isEmpty };
}

/** نص النسبة: «85%» أو «—». */
export function percentText(metric: ProgressMetric): string {
  return metric.percent === null ? "—" : `${metric.percent}%`;
}

// منطق صفحة نتائج الامتحانات (WP-S8 / S8-01..03) — نقي وقابل للاختبار.
// النسبة: نستخدم percentage من الباك اند لو موجودة، وإلا نحسبها من الدرجة/المجموع (lib/exam-percent).

import type { StudentExamResultRow } from "@/integrations/backend/student";
import { examPercent } from "./exam-percent";

export function resolveExamPercent(row: StudentExamResultRow): number | null {
  if (typeof row.percentage === "number" && Number.isFinite(row.percentage)) return row.percentage;
  return examPercent(row.scoreObtained, row.totalMarks);
}

/** الأحدث أولًا؛ تواريخ غير صالحة تنزل للآخر. */
export function sortExamsNewestFirst(rows: StudentExamResultRow[]): StudentExamResultRow[] {
  const time = (r: StudentExamResultRow) => {
    const t = new Date(r.examDate).getTime();
    return Number.isNaN(t) ? Number.NEGATIVE_INFINITY : t;
  };
  return [...rows].sort((a, b) => time(b) - time(a));
}

/** «17 / 20» — «—» لو أحد القيمتين غير رقمية. */
export function scoreText(row: Pick<StudentExamResultRow, "scoreObtained" | "totalMarks">): string {
  const ok = (n: unknown): n is number => typeof n === "number" && Number.isFinite(n);
  if (!ok(row.scoreObtained) || !ok(row.totalMarks)) return "—";
  return `${row.scoreObtained} / ${row.totalMarks}`;
}

/** نغمة الشارة حسب النسبة (عرض فقط، بلا حكم أكاديمي): ≥70 نجاح، ≥50 عادي، أقل = تنبيه، null = محايد. */
export function percentTone(percent: number | null): "muted" | "primary" | "success" | "danger" {
  if (percent === null) return "muted";
  if (percent >= 70) return "success";
  if (percent >= 50) return "primary";
  return "danger";
}

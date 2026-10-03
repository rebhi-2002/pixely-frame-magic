// نسبة نتيجة الامتحان (WP-S8: S8-04). نقية؛ total=0 ما بيقسم على صفر.

/** النسبة المئوية بمنزلة عشرية واحدة (85.5). null لو total ≤ 0 أو أي قيمة غير صالحة. */
export function examPercent(
  score: number | null | undefined,
  total: number | null | undefined,
): number | null {
  if (typeof score !== "number" || typeof total !== "number") return null;
  if (!Number.isFinite(score) || !Number.isFinite(total) || total <= 0 || score < 0) return null;
  return Math.round((score / total) * 1000) / 10;
}

/** «85%» أو «85.5%»، و«—» لو غير متاحة. */
export function formatExamPercent(percent: number | null): string {
  if (percent === null || !Number.isFinite(percent)) return "—";
  return `${percent}%`;
}

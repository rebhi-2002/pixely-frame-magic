import type { Lang } from "./copy";

/** الشريط السفلي + وصف الهيدر — نفس نصوص بطاقة الرئيسية بصور المشاركة (scripts/og/generate_og.py). */
export const TICKER: Record<Lang, string[]> = {
  ar: ["دليل المعلمين", "جدول ومحفظة", "متابعة لولي الأمر"],
  en: ["Teacher directory", "Schedule & wallet", "Parent dashboard"],
};
export const DESCRIPTOR: Record<Lang, string> = {
  ar: "منصة تعليمية عربية",
  en: "Arabic-first learning platform",
};

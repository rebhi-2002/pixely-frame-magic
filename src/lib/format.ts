// دوال تنسيق التاريخ/الوقت/المبلغ/الروابط المشتركة (WP-00 — 00-08). نقية وبلا تبعيات React.
// كل دالة بترجع "—" (أو null/false) للقيم الناقصة أو غير الصالحة بدل ما تكسر العرض —
// تماشيًا مع قاعدة «لا أرقام مخترعة».

export type Lang = "ar" | "en";

const DASH = "—";

// أرقام لاتينية بالعربي (u-nu-latn) وتقويم ميلادي (ar-EG) كي تتطابق مع باقي الشاشات.
function intlLocale(lang: Lang): string {
  return lang === "en" ? "en-GB" : "ar-EG-u-nu-latn";
}

/** يحوّل نصًا "YYYY-MM-DD" إلى تاريخ محلي (بدون انزياح المنطقة الزمنية)، وأي نص ISO آخر كما هو. */
function parseDate(value: string | Date | null | undefined): Date | null {
  if (value == null || value === "") return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (dateOnly) {
    const date = new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]));
    return Number.isNaN(date.getTime()) ? null : date;
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/** تاريخ مقروء، مثلاً «2 Oct 2026». "—" لو القيمة ناقصة/غير صالحة. */
export function formatDate(value: string | Date | null | undefined, lang: Lang = "ar"): string {
  const date = parseDate(value);
  if (!date) return DASH;
  return new Intl.DateTimeFormat(intlLocale(lang), {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/** "HH:mm:ss" (أو "HH:mm") → "HH:mm". "—" لو الصيغة غير صالحة. */
export function formatTime(value: string | null | undefined): string {
  if (!value) return DASH;
  const match = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(value.trim());
  if (!match) return DASH;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return DASH;
  return `${String(hours).padStart(2, "0")}:${match[2]}`;
}

/** اسم اليوم مشتقًّا من التاريخ (للقوائم/النماذج حيث يُشتق اليوم ولا يُدخل). */
export function dayName(value: string | Date | null | undefined, lang: Lang = "ar"): string {
  const date = parseDate(value);
  if (!date) return DASH;
  return new Intl.DateTimeFormat(intlLocale(lang), { weekday: "long" }).format(date);
}

/** مبلغ بالشيكل: «25 ₪» (حتى منزلتين عشريتين، بدون أصفار زائدة). "—" لو غير رقمي. */
export function formatMoney(amount: number | null | undefined, lang: Lang = "ar"): string {
  if (typeof amount !== "number" || !Number.isFinite(amount)) return DASH;
  const text = new Intl.NumberFormat(intlLocale(lang), {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
  return `${text} ₪`;
}

/** يدمج تاريخًا ووقتًا ("HH:mm[:ss]") بتاريخ محلي واحد. null لو أي منهما غير صالح. */
export function combineDateTime(
  date: string | Date | null | undefined,
  time: string | null | undefined,
): Date | null {
  const base = parseDate(date);
  const hhmm = formatTime(time);
  if (!base || hhmm === DASH) return null;
  const [hours, minutes] = hhmm.split(":").map(Number);
  return new Date(base.getFullYear(), base.getMonth(), base.getDate(), hours, minutes, 0, 0);
}

/** true فقط لروابط http/https صالحة. يرفض javascript: وdata: وfile: وغيرها (أمان روابط الاجتماع). */
export function isHttpUrl(value: string | null | undefined): boolean {
  if (!value) return false;
  try {
    const url = new URL(value.trim());
    return (url.protocol === "http:" || url.protocol === "https:") && url.hostname.length > 0;
  } catch {
    return false;
  }
}

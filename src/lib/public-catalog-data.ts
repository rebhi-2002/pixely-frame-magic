// كتالوج الكورسات العام (صفحة /courses قبل تسجيل الدخول) — كان قبل هيك
// مكتوب داخل ملفات الترجمة (i18n JSON)، نقلته هون ليصير بيانات حقيقية
// قابلة للإدارة من لوحة الأدمن (نفس مبدأ باقي ملفات *-data.ts).

/** صيغة تقديم الكورس — أساسية لموديل العمل (أونلاين مباشر / وجاهي محلي /
 *  مسجّل مسبقاً)، مش حقل تجميلي اختياري متل rating/studentsCount تحت. */
export type CourseFormat = "live_online" | "onsite" | "recorded";

/** تسميات ثنائية اللغة لكل صيغة — مصدر واحد مشترك بين صفحة الكورسات العامة
 *  ولوحة إدارة الكتالوج، بدل تكرار نفس القائمة بملفين. */
export const COURSE_FORMAT_LABELS: Record<CourseFormat, [string, string]> = {
  live_online: ["أونلاين مباشر", "Live online"],
  onsite: ["وجاهي", "On-site"],
  recorded: ["مسجّل مسبقاً", "Recorded"],
};

export interface PublicCourseRow {
  id: string;
  title: [string, string];
  /** وصف قصير سطر واحد لمحتوى الكورس — يظهر بالبطاقة، يوضّح شو بالضبط جوّاه. */
  description: [string, string];
  teacher: [string, string];
  teacherId: string;
  subject: [string, string];
  level: [string, string];
  /** أونلاين مباشر / وجاهي (بموقع محدد) / مسجّل مسبقاً — يظهر كـbadge على
   *  البطاقة ويُستخدم للفلترة. راجع CourseFormat فوق. */
  format: CourseFormat;
  lessons: number;
  price: number;
  /* الحقول تحت اختيارية وفاضية/undefined حالياً بقصد — ما في بيانات حقيقية
     لهلق، وواجهة البطاقة (courses.tsx) ما بتعرضها إلا لو صارت موجودة فعلاً.
     الهدف: لما تتوفر بيانات حقيقية تحطها هون بس، بدون ولا سطر كود إضافي. */
  /** تقييم من 5 — يُعرض بس لو موجود (مافي رقم افتراضي/مختلق). */
  rating?: number;
  /** عدد الطلاب المشتركين فعلياً — يُعرض بس لو موجود. */
  studentsCount?: number;
  /** مدة الكورس التقريبية بالساعات. */
  durationHours?: number;
  /** وسوم قصيرة تظهر كـ chips على البطاقة، مثلاً ["مراجعة نهائية", "أسئلة وزارية"]. */
  tags?: [string, string][];
  /** تاريخ آخر تحديث للمحتوى (ISO)، يُعرض كـ"آخر تحديث" لو موجود. */
  updatedAt?: string;
}

/** مسار صورة المعلم — حسب teacherId، ثابت الاسم عشان تحط الصورة الحقيقية
 *  لاحقاً بنفس الاسم بدون أي تعديل كود (نفس مبدأ صور الفريق). */
export function teacherPhotoPath(teacherId: string): string {
  return `/team/teachers/${teacherId}.jpg`;
}

/** مسار غلاف الكورس — حسب id الكورس، بنفس مبدأ صورة المعلم (fallback تلقائي
 *  لتدرّج لوني + أيقونة المادة لو الملف غير موجود بعد). */
export function courseCoverPath(courseId: string): string {
  return `/courses/covers/${courseId}.jpg`;
}

/**
 * فاضي عمداً — لسا ما في كورسات أو أساتذة حقيقيين على المنصة (قيد التطوير).
 * صفحة /courses بتعرض حالة "قريباً" صادقة بدل بيانات وهمية (راجع
 * emptyCatalog* بملفات الترجمة). أضف الكورسات الحقيقية هون فقط لما تتوفر —
 * أو عبر لوحة الأدمن (saveCourse بـ public-catalog.functions.ts) — بدون أي
 * تعديل كود إضافي بصفحة العرض.
 *
 * مثال البنية المتوقّعة لكل صف (مو نشط، للتوضيح فقط):
 * {
 *   id: "math-tawjihi",
 *   title: ["الرياضيات — تفاضل وتكامل", "Mathematics — Calculus"],
 *   description: ["...", "..."],
 *   teacher: ["أ. اسم المعلم", "Teacher name"],
 *   teacherId: "teacher-slug",
 *   subject: ["رياضيات", "Math"],
 *   level: ["توجيهي علمي", "Science track"],
 *   format: "live_online", // أو "onsite" / "recorded"
 *   lessons: 42,
 *   price: 35,
 * }
 */
export const PUBLIC_COURSES: PublicCourseRow[] = [];

export function nextCatalogId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

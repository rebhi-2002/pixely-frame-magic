// منطق نموذج تفاصيل الكورس النقي (WP-T1: T1-03 / T1-04 / T1-06 / T1-08) — بلا React وبلا شبكة.
// SRS FR-I01: اسم الكورس، المادة، الوصف، اسم/رقم المجموعة، الحد الأقصى للطلاب. الباك اند هو المرجع
// النهائي (Course/CreateEdit)، وهالتحققات بتمنع الأخطاء الواضحة قبل الإرسال فقط.
//
// ⚠️ حدود واجهية افتراضية غير موثّقة بالـSwagger: العنوان ≤ 150 حرفًا، الوصف ≤ 2000، اسم المجموعة ≤ 100.

import { DeliveryType } from "@/lib/enums";
import type { CourseInput } from "@/integrations/backend/courses";

export const COURSE_TITLE_MAX = 150;
export const COURSE_DESCRIPTION_MAX = 2000;
export const COURSE_GROUP_NAME_MAX = 100;

export interface CourseFormValues {
  title: string;
  description: string;
  /** معرّفات الاختيار كنص ("" = غير مختار). */
  subjectId: string;
  categoryId: string;
  gradeId: string;
  /** نصوص من حقول الإدخال. */
  price: string;
  maxStudents: string;
  groupName: string;
}

export type CourseFormErrorCode =
  | "title_required"
  | "title_too_long"
  | "description_too_long"
  | "subject_required"
  | "category_required"
  | "grade_required"
  | "price_invalid"
  | "capacity_invalid"
  | "group_name_required"
  | "group_name_too_long";

export type CourseFormField =
  | "title"
  | "description"
  | "subjectId"
  | "categoryId"
  | "gradeId"
  | "price"
  | "maxStudents"
  | "groupName";

export type CourseFormErrors = Partial<Record<CourseFormField, CourseFormErrorCode>>;

export function emptyCourseValues(): CourseFormValues {
  return {
    title: "",
    description: "",
    subjectId: "",
    categoryId: "",
    gradeId: "",
    price: "",
    maxStudents: "",
    groupName: "",
  };
}

function parseIntStrict(text: string): number | null {
  const trimmed = text.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  const n = Number(trimmed);
  return Number.isSafeInteger(n) ? n : null;
}

/** سعر ≥ 0 بمنزلتين عشريتين كحد أقصى (فاصلة أو نقطة). null لو غير صالح. */
export function parsePrice(text: string): number | null {
  const normalized = text.trim().replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null;
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

/** يتحقق من النموذج. الأخطاء مفاتيحها الحقول؛ فاضي = صالح. */
export function validateCourseForm(values: CourseFormValues): CourseFormErrors {
  const errors: CourseFormErrors = {};
  const title = values.title.trim();
  if (!title) errors.title = "title_required";
  else if (title.length > COURSE_TITLE_MAX) errors.title = "title_too_long";

  if (values.description.length > COURSE_DESCRIPTION_MAX) errors.description = "description_too_long";

  if (parseIntStrict(values.subjectId) === null) errors.subjectId = "subject_required";
  if (parseIntStrict(values.categoryId) === null) errors.categoryId = "category_required";
  if (parseIntStrict(values.gradeId) === null) errors.gradeId = "grade_required";

  if (parsePrice(values.price) === null) errors.price = "price_invalid";

  const capacity = parseIntStrict(values.maxStudents);
  if (capacity === null || capacity < 1) errors.maxStudents = "capacity_invalid";

  const group = values.groupName.trim();
  if (!group) errors.groupName = "group_name_required";
  else if (group.length > COURSE_GROUP_NAME_MAX) errors.groupName = "group_name_too_long";

  return errors;
}

export function hasCourseErrors(errors: CourseFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * يبني جسم Course/CreateEdit. `saveAsDraft` يحدّد المسودة/النشر (T1-06). `teacherId` ما بنرسله إلا لو مُرِّر
 * صراحة (Q-03: غير محسوم هل يؤخذ من الجلسة). `id` للتعديل فقط.
 */
export function toCourseInput(
  values: CourseFormValues,
  deliveryType: DeliveryType,
  saveAsDraft: boolean,
  options: { courseId?: number; teacherId?: number } = {},
): CourseInput {
  return {
    ...(options.courseId !== undefined ? { id: options.courseId } : {}),
    ...(options.teacherId !== undefined ? { teacherId: options.teacherId } : {}),
    subjectId: parseIntStrict(values.subjectId) ?? 0,
    categoryId: parseIntStrict(values.categoryId) ?? 0,
    gradeId: parseIntStrict(values.gradeId) ?? 0,
    title: values.title.trim(),
    description: values.description.trim() || null,
    price: parsePrice(values.price) ?? 0,
    deliveryType,
    maxStudents: parseIntStrict(values.maxStudents) ?? 0,
    groupName: values.groupName.trim() || null,
    saveAsDraft,
  };
}

/** نوع التوصيل من search param (?type=1|2) أو القيمة الافتراضية (حضوري). */
export function deliveryTypeFromParam(value: unknown): DeliveryType {
  return value === DeliveryType.Online ? DeliveryType.Online : DeliveryType.InPerson;
}

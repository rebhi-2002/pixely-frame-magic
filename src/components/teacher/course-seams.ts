// «Seams» لبيانات الكورس غير الموثّقة بالـSwagger (WP-J / J-05 — Q-02/Q-03/Q-04).
// الدوال هون ترجّع «غير معروف» عمدًا إلا resolveCourseDeliveryType (صار ممكنًا من DTO الباك اند)، لأن TeacherCourseDetail = PendingResponse ولا نقرأ حقول ردود
// غير موثّقة (القاعدة: لا JSON مُخمَّن). عند وصول عينة GetMineById ينفّذ WP-J هالدوال فقط — ومكوّنات
// T1/T2/T3/T4 (التي تستدعيها) ما بتتغيّر. ⛔ لا تضف هون منطقًا مخمَّنًا.

import type { TeacherCourseDetail } from "@/integrations/backend/courses";
import type { DeliveryType } from "@/lib/enums";

/** رقم المجموعة المرتبطة بالكورس (Q-02). null = غير معروف بعد → الحفظ/العرض المعتمد عليه معطّل بنص صادق. */
export function resolveGroupId(_course: TeacherCourseDetail | null | undefined): number | null {
  return null;
}

/** نوع توصيل الكورس (حضوري/أونلاين) من CourseListItemDto.deliveryType (J-05). null = قيمة غير صالحة → عناوين محايدة. */
export function resolveCourseDeliveryType(
  course: TeacherCourseDetail | null | undefined,
): DeliveryType | null {
  const value = course?.deliveryType;
  return value === 1 || value === 2 ? value : null;
}

/** الحد الأقصى الحالي للطلاب بالمجموعة لتعبئة النموذج عند التعديل. null = غير معروف. */
export function resolveGroupMaxStudents(
  _course: TeacherCourseDetail | null | undefined,
): number | null {
  return null;
}

/**
 * قيم تفاصيل الكورس لتعبئة نموذج التعديل (T1-03). null = غير معروفة → التعديل معطّل بنص صادق
 * (ما نعرض نموذجًا فاضيًا ونسمح بالحفظ فوق بيانات لا نعرفها).
 */
export interface CourseDraftValues {
  title: string;
  description: string;
  subjectId: number | null;
  categoryId: number | null;
  gradeId: number | null;
  price: number;
  maxStudents: number;
  groupName: string;
  deliveryType: DeliveryType;
}
export function courseToDraft(
  _course: TeacherCourseDetail | null | undefined,
): CourseDraftValues | null {
  return null;
}

export interface LookupOption {
  id: number;
  name: string;
}
export interface CourseLookups {
  /** false = مصدر المادة/التصنيف غير محسوم بعد (Q-04). */
  available: boolean;
  subjects: LookupOption[];
  categories: LookupOption[];
}
/** مصدر المادة والتصنيف (Q-04). الصفوف تأتي من getGradesList الحقيقية، فمش هون. */
export const COURSE_LOOKUPS_UNAVAILABLE: CourseLookups = {
  available: false,
  subjects: [],
  categories: [],
};

// ربط حقيقي مع CourseController بالباك اند — الشكل متحقَّق منه من كود الباك الحالي
// (CourseController + CourseService + CourseListItemDto)، وليس من نسخة أقدم:
//
// - الكتالوج العام = POST /api/Course/GetPublished ([AllowAnonymous]، منشور فقط،
//   PageSize محصور بين 1 و50). أما GetAll فمقصور على الأدمن والمعلم (RequireUserTypes) —
//   لا يصلح للزوار ولا للطلاب (401/403).
// - الرد DTO مسطّح (CourseListItemDto): teacherName/subjectName/categoryName — مش كيان
//   Course متداخل.
// - GetPublished ما يقبل فلتر teacherId (DataTableRequestDto ما فيه هالحقل)؛ فكورسات معلم
//   بعينه بتُفلتر عندنا بعد جلب الصفحات (مؤقت) لحد ما الباك اند يضيف TeacherId —
//   موثّق بـdocs/operations/2026-09-21-backend-requirements.md.

import { ApiError, apiClient } from "./client";
import type { PagedResult } from "./teachers";

export type BackendCourseDeliveryType = 1 | 2; // 1=InPerson, 2=Online
export type BackendCourseStatus = 1 | 2 | 3; // 1=Draft, 2=Published, 3=Archived

export interface BackendCourseRow {
  id: number;
  title: string;
  description?: string | null;
  price: number;
  deliveryType: BackendCourseDeliveryType;
  status: BackendCourseStatus;
  maxStudents: number;
  teacherId: number;
  /** null لو حساب المعلم ما إله اسم. */
  teacherName?: string | null;
  subjectName?: string | null;
  categoryName?: string | null;
  /* ⬇️ الحقول تحت ما بيرجعها الباك اند حاليًا (لا بـCourse entity ولا بـCourseListItemDto).
     محفوظة كاختيارية (undefined دايمًا لهلق) بدل ما تنحذف من الواجهة: بطاقة /courses أصلاً
     مبنية تعرضها بس لو موجودة، فلما الباك اند يضيفها بتُملأ هون بدون تعديل على العرض. */
  /** تقييم الكورس من 5 — التقييمات موجودة على المعلم فقط (TeacherRating). */
  rating?: number;
  /** عدد المسجّلين فعليًا — ما فيه حقل مقابل (MaxStudents بس). */
  studentsCount?: number;
  /** مدة تقريبية بالساعات. */
  durationHours?: number;
  /** عدد الدروس — ما فيه حقل مقابل بالـDTO. */
  lessonsCount?: number;
  /** وسوم قصيرة (chips). */
  tags?: string[];
  /** الفرع/المستوى (علمي/أدبي…) — Course ما فيه Grade/Level بالقراءة. */
  level?: string;
}

/** أقصى PageSize يقبله GetPublished (يُقصّ بالباك اند عند 50). */
export const PUBLISHED_PAGE_SIZE = 50;

export interface PublishedCoursesPageRequest {
  skip?: number;
  pageSize?: number;
  sortColumn?: "Id" | "Title" | "Price" | "DeliveryType" | "CreatedOn";
  sortColumnDirection?: "asc" | "desc";
}

/** صفحة واحدة من الكورسات المنشورة. لازم PageSize صريح: الباك اند يقصّه لـ1 لو صفر. */
export async function listPublishedCoursesPage(
  request: PublishedCoursesPageRequest = {},
): Promise<PagedResult<BackendCourseRow>> {
  return apiClient.post<PagedResult<BackendCourseRow>>("/api/Course/GetPublished", {
    skip: request.skip ?? 0,
    pageSize: Math.min(request.pageSize ?? PUBLISHED_PAGE_SIZE, PUBLISHED_PAGE_SIZE),
    sortColumn: request.sortColumn,
    sortColumnDirection: request.sortColumnDirection,
  });
}

export interface PublishedCatalog {
  items: BackendCourseRow[];
  totalCount: number;
  /** true لو بالباك اند أكتر مما جلبناه (وصلنا سقف الصفحات) — بنعرض ملاحظة صادقة. */
  truncated: boolean;
}

/**
 * كل الكورسات المنشورة (بترقيم صفحات ٥٠) بسقف `maxPages` — الكتالوج الحالي صغير، والفلترة
 * والبحث بتصير عندنا لأن GetPublished ما بيدعم بحثًا ولا فلاتر. الصفحة الأولى بتحدّد
 * الإجمالي، وباقي الصفحات بتنجلب بالتوازي.
 */
export async function listAllPublishedCourses(maxPages = 6): Promise<PublishedCatalog> {
  const first = await listPublishedCoursesPage({ skip: 0 });
  const total = first.totalCount ?? first.data.length;
  const pagesNeeded = Math.min(Math.ceil(total / PUBLISHED_PAGE_SIZE), maxPages);

  if (pagesNeeded <= 1) {
    return { items: first.data, totalCount: total, truncated: total > first.data.length };
  }

  const rest = await Promise.all(
    Array.from({ length: pagesNeeded - 1 }, (_, i) =>
      listPublishedCoursesPage({ skip: (i + 1) * PUBLISHED_PAGE_SIZE }),
    ),
  );
  const items = [first, ...rest].flatMap((page) => page.data);
  return { items, totalCount: total, truncated: total > items.length };
}

/** كورسات معلم بعينه من كتالوج جُلب أصلاً (مؤقت لحد ما يدعم الباك اند TeacherId). */
export function coursesOfTeacher(items: BackendCourseRow[], teacherId: number): BackendCourseRow[] {
  return items.filter((course) => course.teacherId === teacherId);
}

/** تفاصيل كورس منشور واحد. null فقط لـ404 (غير موجود أو غير منشور)؛ غيره يرتفع كخطأ. */
export async function getPublishedCourse(id: number): Promise<BackendCourseRow | null> {
  try {
    return await apiClient.get<BackendCourseRow>(`/api/Course/GetById?id=${id}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

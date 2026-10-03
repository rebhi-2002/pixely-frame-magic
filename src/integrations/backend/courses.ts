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
import type { OperationResult } from "./op-result";
import type { PendingResponse } from "./pending-json";
import type { PagedResult } from "./teachers";
import type { DayOfWeek, DeliveryType } from "@/lib/enums";

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

/**
 * كل الكورسات (مسودة/منشور/مؤرشف) للأدمن — /api/Course/GetAll، مقصور على الأدمن
 * والمعلم (RequireUserTypes). إنشاء/تعديل كورس صار مربوطًا عبر createEditCourse أدناه.
 */
export async function listAllCoursesForAdmin(
  request: PublishedCoursesPageRequest & { searchValue?: string } = {},
): Promise<PagedResult<BackendCourseRow>> {
  return apiClient.post<PagedResult<BackendCourseRow>>("/api/Course/GetAll", {
    skip: request.skip ?? 0,
    pageSize: Math.min(request.pageSize ?? PUBLISHED_PAGE_SIZE, PUBLISHED_PAGE_SIZE),
    sortColumn: request.sortColumn,
    sortColumnDirection: request.sortColumnDirection,
    searchValue: request.searchValue,
  });
}

/** كل الكورسات (أي حالة) بترقيم صفحات، لإحصائيات الأدمن — نفس نمط التقسيم
 *  المستخدم بـlistAllPublishedCourses. */
export async function listAllCoursesForAdminFull(maxPages = 6): Promise<PublishedCatalog> {
  const first = await listAllCoursesForAdmin({ skip: 0 });
  const total = first.totalCount ?? first.data.length;
  const pagesNeeded = Math.min(Math.ceil(total / PUBLISHED_PAGE_SIZE), maxPages);

  if (pagesNeeded <= 1) {
    return { items: first.data, totalCount: total, truncated: total > first.data.length };
  }

  const rest = await Promise.all(
    Array.from({ length: pagesNeeded - 1 }, (_, i) =>
      listAllCoursesForAdmin({ skip: (i + 1) * PUBLISHED_PAGE_SIZE }),
    ),
  );
  const items = [first, ...rest].flatMap((page) => page.data);
  return { items, totalCount: total, truncated: total > items.length };
}

// ════════════════════════════════════════════════════════════════════════════════════
// WP-00 / 00-04 — دوال الكورسات الناقصة (جهة المعلم). أجسام الطلب من Swagger؛ كل رد غير
// موثّق = PendingResponse لحد WP-J. ⚠️ مجمّد بعد إغلاق WP-00 (CR لأي إضافة).
// ════════════════════════════════════════════════════════════════════════════════════

// PENDING-JSON (WP-J / J-05): تفاصيل كورس المعلم (يفترض أن تشمل groupId — Q-02).
export type TeacherCourseDetail = PendingResponse;
// PENDING-JSON (WP-J / J-05): صف طالب بمجموعة (الحقول المسموحة بالعرض: اسم/هاتف/موقع فقط).
export type GroupStudentRow = PendingResponse;

/** جسم Course/CreateEdit كما بالـSwagger. */
export interface CourseInput {
  /** 0 أو غايب = إنشاء، موجود = تعديل. */
  id?: number;
  /** مطلوب بالـDTO لكن غير محسوم: هل يؤخذ من الجلسة؟ (Q-03) — لا ترسله إلا بعد التأكد. */
  teacherId?: number;
  subjectId: number;
  categoryId: number;
  title: string;
  description?: string | null;
  price: number;
  deliveryType: DeliveryType;
  maxStudents: number;
  groupName?: string | null;
  gradeId: number;
  /** true = مسودة، false = نشر مباشر. */
  saveAsDraft: boolean;
}

export interface GroupScheduleDay {
  dayOfWeek: DayOfWeek;
  /** "HH:mm[:ss]". */
  startTime: string;
}

/** جسم Course/ConfigureGroupSchedule كما بالـSwagger. */
export interface GroupScheduleInput {
  groupId: number;
  maxStudents: number;
  /** "YYYY-MM-DD" (أو ISO). */
  courseStartDate: string;
  courseEndDate: string;
  defaultLessonDurationMinutes: number;
  scheduleDays: GroupScheduleDay[];
}

/** إنشاء/تعديل كورس (معلم). returnId = رقم الكورس عند النجاح. استدعِ assertOk بعدها. */
export async function createEditCourse(input: CourseInput): Promise<OperationResult> {
  return apiClient.post<OperationResult>("/api/Course/CreateEdit", input);
}

/** ضبط جدول المجموعة المتكرر (حد أقصى، فترة الكورس، مدة الدرس، أيام الحضور + الوقت). */
export async function configureGroupSchedule(input: GroupScheduleInput): Promise<OperationResult> {
  return apiClient.post<OperationResult>("/api/Course/ConfigureGroupSchedule", input);
}

/** طلاب مجموعة (بحث اختياري بالاسم). // PENDING-JSON: نفترض مصفوفة مسطّحة. */
export async function getGroupStudents(
  groupId: number,
  keyword?: string,
): Promise<GroupStudentRow[]> {
  const params = new URLSearchParams({ groupId: String(groupId) });
  if (keyword?.trim()) params.set("keyword", keyword.trim());
  const result = await apiClient.get<GroupStudentRow[]>(
    `/api/Course/GetGroupStudents?${params.toString()}`,
  );
  return Array.isArray(result) ? result : [];
}

/** تفاصيل كورس المعلم (GetMineById). // PENDING-JSON: الشكل (وgroupId) غير موثّق — Q-02/Q-05. */
export async function getMyCourse(id: number): Promise<TeacherCourseDetail> {
  return apiClient.get<TeacherCourseDetail>(`/api/Course/GetMineById?id=${id}`);
}

/**
 * قائمة كورسات المعلم. ⚠️ Q-01 مفتوح: لا يوجد endpoint موثّق مخصّص للمعلم، وGetAll
 * (RequireUserTypes) قد يرجّع كورسات كل المعلمين. لا تعرض النتيجة كـ«كورساتي» قبل حسم
 * الفلترة (WP-J / J-05)؛ ويُسمح بتصفية محلية بـcoursesOfTeacher لو توفر teacherId.
 */
export async function listMyCourses(
  request: PublishedCoursesPageRequest & { searchValue?: string } = {},
): Promise<PagedResult<BackendCourseRow>> {
  return listAllCoursesForAdmin(request);
}

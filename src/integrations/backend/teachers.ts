// ربط حقيقي مع TeacherController بالباك اند — كل حقل بالـDTOs متحقَّق منه من كود الباك
// (TeacherSearchFilterDto, TeacherProfileDto, TeacherAvailability) مش تخمين. السياق الكامل
// وقيود الباك اند الحالية: docs/operations/2026-09-21-teachers-courses-real-backend-connection.md
// وdocs/operations/2026-09-21-backend-requirements.md.
//
// ⚠️ النقاط الثلاث هون (Search/PublicProfile/Availability) شغّالة للزوار حاليًا لأن
// TeacherController ما عليه [Authorize] ولا سياسة عامة — مش لأن عليها [AllowAnonymous] صريحة.
// لو الباك اند شدّد الصلاحيات لازم يضيف [AllowAnonymous] عليها (مطلوب موثّق للفريق).

import { ApiError, apiClient } from "./client";

export interface TeacherSearchFilter {
  keyword?: string;
  subjectId?: number;
  gradeId?: number;
  serviceArea?: string;
  online?: boolean;
  inPerson?: boolean;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  minExperienceYears?: number;
  language?: string;
  /** DayOfWeek بترميز .NET: 0=الأحد … 6=السبت. */
  availableDay?: number;
  skip?: number;
  pageSize?: number;
}

export interface TeacherProfileRow {
  id: number;
  /** الباك اند يرجّع null لو حساب المعلم ما إله اسم (User?.Name) — تعامل معه بحذر بالعرض. */
  name?: string | null;
  bio?: string | null;
  qualifications?: string | null;
  experienceYears: number;
  serviceArea?: string | null;
  languages?: string | null;
  profileImage?: string | null;
  subjects: string[];
  grades: string[];
  hourlyPriceOnline?: number | null;
  hourlyPriceInPerson?: number | null;
  supportsOnline: boolean;
  supportsInPerson: boolean;
  averageRating?: number | null;
  ratingCount: number;
}

export interface PagedResult<T> {
  totalCount: number;
  data: T[];
}

/** تصفّح/فلترة المعلمين (FR-T01/T02) — صفحة عامة، بدون حساب.
 *  الباك اند بيرجّع بس المعلمين يلي IsPublicForDiscovery=true. */
export async function searchTeachers(
  filter: TeacherSearchFilter,
): Promise<PagedResult<TeacherProfileRow>> {
  return apiClient.post<PagedResult<TeacherProfileRow>>("/api/Teacher/Search", filter);
}

/** بروفايل معلم عام (FR-T03) — يقابل صفحة /teacher/$id.
 *  يرجّع null **فقط** لـ404 (معلم غير موجود أو غير معروض للتصفّح)؛ أي خطأ تاني
 *  (شبكة، 5xx) بيرتفع ليعرضه المستدعي كخطأ اتصال، مش كـ"غير موجود". */
export async function getTeacherPublicProfile(id: number): Promise<TeacherProfileRow | null> {
  try {
    return await apiClient.get<TeacherProfileRow>(`/api/Teacher/PublicProfile?id=${id}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

/** جدول أسبوعي متكرر (مش تواريخ محددة) — DayOfWeek بترميز .NET:
 *  0=الأحد...6=السبت. StartTime/EndTime نص "HH:mm:ss". */
export interface AvailabilitySlot {
  id: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  teachingMode: 1 | 2; // 1=InPerson, 2=Online
  effectiveFrom?: string | null;
  effectiveTo?: string | null;
}

/** أوقات توفّر معلم (FR-T04) — جاهزة لشاشة الحجز (المرحلة 2)، لسا ما استُخدمت بواجهة. */
export async function getTeacherAvailability(
  teacherId: number,
  mode?: 1 | 2,
  date?: string,
): Promise<AvailabilitySlot[]> {
  const params = new URLSearchParams({ teacherId: String(teacherId) });
  if (mode) params.set("mode", String(mode));
  if (date) params.set("date", date);
  return apiClient.get<AvailabilitySlot[]>(`/api/Teacher/Availability?${params.toString()}`);
}

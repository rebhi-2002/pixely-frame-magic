// تكامل بوابة ولي الأمر مع ParentController بالباك اند.
//
// تنبيه مهم: LinkChildAsync موجودة بـ IParentService لكن بدون أي endpoint
// بالـController — يعني ما في طريقة فعلية لولي الأمر يربط ابنه بحسابه عبر
// الـ API حاليًا (يحتاج endpoint جديد بالباك اند أولاً). وبما إنه "الطالب"
// (StudentId: int) كيان منفصل عن User وما في كود بالمشروع كله بينشئه، أي
// شاشة تستهلك getMyChildren() تحت رح ترجع مصفوفة فاضية دايمًا لحد ما تنحل
// الفجوتين هدول بالباك اند.
//
// أيضًا: صفحة "تقرير الابن" الحالية بالواجهة (parent.report.tsx) بتعتمد
// على بيانات وهمية (دقائق دراسة، إتقان مواد...) ما إلها معادل بالباك اند
// إطلاقًا — الدوال هون بترجع بس شكل البيانات الحقيقي (حضور + نتائج امتحانات
// + نظرة عامة)، وما بتحاول تقلّد شكل البيانات الوهمية.

import { apiClient } from "./client";

export interface ChildOverviewDto {
  studentId: number;
  studentName: string;
  gradeName: string | null;
  attendanceRatePercent: number;
  averageExamScorePercent: number | null;
  unreadNotificationsCount: number;
}

export interface ChildAttendanceRowDto {
  sessionDate: string;
  groupName: string;
  status: number;
  notes: string | null;
}

export interface ChildExamResultRowDto {
  examTitle: string;
  examDate: string;
  scoreObtained: number;
  totalMarks: number;
  feedback: string | null;
}

export async function getMyChildren(): Promise<ChildOverviewDto[]> {
  const result = await apiClient.get<ChildOverviewDto[]>("/api/Parent/MyChildren");
  return Array.isArray(result) ? result : [];
}

export async function getChildAttendance(
  studentId: number,
  from?: Date,
  to?: Date,
): Promise<ChildAttendanceRowDto[]> {
  const params = new URLSearchParams({ studentId: String(studentId) });
  if (from) params.set("from", from.toISOString());
  if (to) params.set("to", to.toISOString());
  const result = await apiClient.get<ChildAttendanceRowDto[]>(
    `/api/Parent/ChildAttendance?${params.toString()}`,
  );
  return Array.isArray(result) ? result : [];
}

export async function getChildExamResults(studentId: number): Promise<ChildExamResultRowDto[]> {
  const result = await apiClient.get<ChildExamResultRowDto[]>(
    `/api/Parent/ChildExamResults?studentId=${studentId}`,
  );
  return Array.isArray(result) ? result : [];
}

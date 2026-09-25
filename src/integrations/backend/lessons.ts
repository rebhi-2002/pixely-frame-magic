// ربط جاهز (طبقة الأنواع/الدوال فقط) مع LessonController بالباك اند — نفس ملاحظة
// bookings.ts: بدون واجهة بعد، بانتظار P1-1 (لا صف Teacher لحساب معلم حقيقي)، لأن
// كل هالدوال تفترض معلمًا يملك مجموعة/كورس فعليًا.

import { apiClient } from "./client";

export type MeetingPlatform = 1 | 2 | 3 | 4; // Zoom, GoogleMeet, MicrosoftTeams, Other

export interface LessonRow {
  id: number;
  groupId: number;
  courseId: number;
  title: string;
  scheduledDate: string; // "YYYY-MM-DD"
  startTime: string; // "HH:mm:ss"
  durationMinutes: number;
  orderIndex: number;
  meetingPlatform?: MeetingPlatform | null;
  meetingUrl?: string | null;
  meetingInstructions?: string | null;
  room?: string | null;
  isCancelled?: boolean;
  cancellationReason?: string | null;
}

export interface LessonInput {
  id?: number; // موجود = تعديل، غايب = إنشاء
  groupId: number;
  courseId: number;
  title: string;
  scheduledDate: string;
  startTime: string;
  durationMinutes: number;
  orderIndex: number;
  meetingPlatform?: MeetingPlatform;
  meetingUrl?: string;
  meetingInstructions?: string;
  room?: string;
}

/** إنشاء درس جديد بمجموعة (معلم — لازم يملك الكورس). */
export async function createLesson(input: LessonInput): Promise<LessonRow> {
  return apiClient.post<LessonRow>("/api/Lesson/Create", input);
}

/** تعديل درس موجود. */
export async function updateLesson(input: LessonInput & { id: number }): Promise<LessonRow> {
  return apiClient.put<LessonRow>("/api/Lesson/Update", input);
}

/** ضبط رابط/منصّة اجتماع أونلاين لدرس. */
export async function configureLessonMeeting(
  lessonId: number,
  meetingPlatform: MeetingPlatform,
  meetingUrl: string,
  meetingInstructions?: string,
): Promise<LessonRow> {
  return apiClient.put<LessonRow>("/api/Lesson/ConfigureMeeting", {
    lessonId,
    meetingPlatform,
    meetingUrl,
    meetingInstructions,
  });
}

/** إلغاء درس (لا يوجد Complete بهالكنترولر — راجع P2-6 بـbackend-requirements.md). */
export async function cancelLesson(lessonId: number, reason?: string): Promise<LessonRow> {
  return apiClient.put<LessonRow>("/api/Lesson/Cancel", { lessonId, reason });
}

/** جدول دروس كورس أو مجموعة معيّنة. */
export async function getLessonSchedule(courseId?: number, groupId?: number): Promise<LessonRow[]> {
  const params = new URLSearchParams();
  if (courseId) params.set("courseId", String(courseId));
  if (groupId) params.set("groupId", String(groupId));
  return apiClient.get<LessonRow[]>(`/api/Lesson/GetSchedule?${params.toString()}`);
}

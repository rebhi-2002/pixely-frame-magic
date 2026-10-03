// ربط LessonController بالباك اند — مواءمة مع Swagger (WP-00 / 00-03).
//
// Create / Update / ConfigureMeeting / Cancel بترجع OperationResult (وليس LessonRow) →
// الواجهة بتستدعي assertOk(result, …) من ./op-result بعد كل استدعاء.
// GetSchedule غير موثّق الرد → PendingResponse لحد WP-J / J-06.
//
// ⚠️ ملف مجمّد بعد إغلاق WP-00: من يحتاج دالة جديدة يرفع CR.

import { apiClient } from "./client";
import type { OperationResult } from "./op-result";
import type { PendingResponse } from "./pending-json";
import type { MeetingPlatform } from "@/lib/enums";

// توحيد MeetingPlatform عبر lib/enums.ts (Discrepancies D-10).
export type { MeetingPlatform } from "@/lib/enums";

// PENDING-JSON (WP-J / J-06): شكل صف الجدول غير موثّق — انتظر العينة (Q-05).
export type LessonRow = PendingResponse;

/** جسم Lesson/Create وLesson/Update كما بالـSwagger. */
export interface LessonInput {
  /** موجود = تعديل (Update)، غايب = إنشاء (Create). */
  id?: number;
  groupId: number;
  courseId: number;
  title: string;
  /** "YYYY-MM-DD" (أو ISO). */
  scheduledDate: string;
  /** "HH:mm[:ss]". */
  startTime: string;
  durationMinutes: number;
  orderIndex: number;
  meetingPlatform?: MeetingPlatform | null;
  meetingUrl?: string | null;
  meetingInstructions?: string | null;
  room?: string | null;
}

/** إنشاء درس بمجموعة (معلم — لازم يملك الكورس). returnId = رقم الدرس عند النجاح. */
export async function createLesson(input: LessonInput): Promise<OperationResult> {
  return apiClient.post<OperationResult>("/api/Lesson/Create", input);
}

/** تعديل درس موجود (لدرس لم يبدأ وغير ملغى). */
export async function updateLesson(input: LessonInput & { id: number }): Promise<OperationResult> {
  return apiClient.put<OperationResult>("/api/Lesson/Update", input);
}

/** ضبط منصّة/رابط/تعليمات اجتماع أونلاين لدرس. تحقّق من الرابط بـisHttpUrl قبل الإرسال. */
export async function configureLessonMeeting(
  lessonId: number,
  meetingPlatform: MeetingPlatform,
  meetingUrl: string,
  meetingInstructions?: string | null,
): Promise<OperationResult> {
  return apiClient.put<OperationResult>("/api/Lesson/ConfigureMeeting", {
    lessonId,
    meetingPlatform,
    meetingUrl,
    meetingInstructions: meetingInstructions ?? null,
  });
}

/** إلغاء درس مع سبب اختياري (يبقى بالسجل بحالة ملغى). */
export async function cancelLesson(
  lessonId: number,
  reason?: string | null,
): Promise<OperationResult> {
  return apiClient.put<OperationResult>("/api/Lesson/Cancel", {
    lessonId,
    reason: reason ?? null,
  });
}

/**
 * جدول دروس كورس أو مجموعة. // PENDING-JSON: نفترض مصفوفة مسطّحة، وغيرها = قائمة فارغة.
 * بارامترات الاستعلام بالـSwagger: courseId, groupId.
 */
export async function getLessonSchedule(courseId?: number, groupId?: number): Promise<LessonRow[]> {
  const params = new URLSearchParams();
  if (courseId) params.set("courseId", String(courseId));
  if (groupId) params.set("groupId", String(groupId));
  const qs = params.toString();
  const result = await apiClient.get<LessonRow[]>(`/api/Lesson/GetSchedule${qs ? `?${qs}` : ""}`);
  return Array.isArray(result) ? result : [];
}

// تكامل بوابة الطالب مع StudentController الحقيقي بالباك اند.
// الأنواع هون منسوخة حرفياً عن Acadimia.Infrastructure/Dtos/Students/StudentDtos.cs
// حتى ما نخمّن شكل الرد.

import { apiClient } from "./client";
import type { OperationResult } from "./op-result";
import type { PendingResponse } from "./pending-json";
import type { BookingStatus, DeliveryType, MeetingPlatform } from "@/lib/enums";

// الأنواع الرقمية مصدرها الوحيد lib/enums.ts (Discrepancies D-10) — بنعيد تصديرها هون
// حتى ما تنكسر الاستيرادات الحالية.
export type { AttendanceStatus, BookingStatus, MeetingPlatform } from "@/lib/enums";
export type CourseDeliveryType = DeliveryType; // 1=InPerson, 2=Online
export type NotificationType = 1 | 2 | 3 | 4 | 5; // JoinRequest, Wallet, Schedule, System, Booking

export interface ActiveCourseDto {
  enrollmentId: number;
  courseId: number | null;
  courseTitle: string | null;
  groupId: number | null;
  groupName: string | null;
  teacherName: string | null;
  deliveryType: CourseDeliveryType | null;
}

export interface StudentScheduleItemDto {
  kind: "Lesson" | "Booking";
  id: number;
  lessonNumber: number | null;
  topic: string;
  courseTitle: string | null;
  teacherName: string | null;
  mode: CourseDeliveryType | null;
  date: string;
  day: number; // .NET DayOfWeek: 0=Sunday..6=Saturday
  startTime: string;
  durationMinutes: number;
  status: string;
  room: string | null;
  meetingPlatform: MeetingPlatform | null;
  meetingUrl: string | null;
  canJoin: boolean;
}

export interface StudentProgressDto {
  attendanceRatePercent: number | null;
  averageExamScorePercent: number | null;
  attendanceSessions: number;
  examsTaken: number;
}

export interface StudentDashboardDto {
  studentName: string;
  /** false = الحساب مش مربوط بملف طالب فعلي بعد — كل الأقسام المبنية على
   * التسجيل (كورسات/دروس/حضور/امتحانات) بترجع فاضية بهالحالة. */
  hasStudentProfile: boolean;
  activeCourses: ActiveCourseDto[];
  upcomingSchedule: StudentScheduleItemDto[];
  pendingRequestsCount: number;
  confirmedBookingsCount: number;
  progress: StudentProgressDto;
  walletBalance: number;
  unreadNotificationsCount: number;
}

export interface StudentScheduleFilter {
  from?: Date;
  to?: Date;
  courseId?: number;
  teacherId?: number;
  mode?: CourseDeliveryType;
}

export interface StudentNotificationDto {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  relatedEntityType: string | null;
  relatedEntityId: number | null;
  createdOn: string;
}

export interface StudentNotificationsResult {
  recordsFiltered: number;
  totalCount: number;
  data: StudentNotificationDto[];
}

export async function getStudentDashboard(): Promise<StudentDashboardDto> {
  return apiClient.get<StudentDashboardDto>("/api/Student/Dashboard");
}

export async function getStudentSchedule(
  filter: StudentScheduleFilter = {},
): Promise<StudentScheduleItemDto[]> {
  const params = new URLSearchParams();
  if (filter.from) params.set("From", filter.from.toISOString());
  if (filter.to) params.set("To", filter.to.toISOString());
  if (filter.courseId) params.set("CourseId", String(filter.courseId));
  if (filter.teacherId) params.set("TeacherId", String(filter.teacherId));
  if (filter.mode) params.set("Mode", String(filter.mode));
  const qs = params.toString();
  const result = await apiClient.get<StudentScheduleItemDto[]>(
    `/api/Student/Schedule${qs ? `?${qs}` : ""}`,
  );
  return Array.isArray(result) ? result : [];
}

export async function getStudentMyBookings(): Promise<StudentScheduleItemDto[]> {
  const result = await apiClient.get<StudentScheduleItemDto[]>("/api/Student/MyBookings");
  return Array.isArray(result) ? result : [];
}

export async function getStudentMyRequests(
  status?: BookingStatus,
): Promise<StudentScheduleItemDto[]> {
  const qs = status ? `?status=${status}` : "";
  const result = await apiClient.get<StudentScheduleItemDto[]>(`/api/Student/MyRequests${qs}`);
  return Array.isArray(result) ? result : [];
}

export async function getStudentNotifications(
  opts: { unreadOnly?: boolean; skip?: number; pageSize?: number } = {},
): Promise<StudentNotificationsResult> {
  const params = new URLSearchParams({
    unreadOnly: String(opts.unreadOnly ?? false),
    skip: String(opts.skip ?? 0),
    pageSize: String(opts.pageSize ?? 20),
  });
  return apiClient.get<StudentNotificationsResult>(`/api/Student/Notifications?${params}`);
}

export async function markStudentNotificationRead(
  id: number,
): Promise<{ success: boolean; message?: string | null }> {
  return apiClient.post<{ success: boolean; message?: string | null }>(
    `/api/Student/MarkNotificationRead?id=${id}`,
    {},
  );
}

// ════════════════════════════════════════════════════════════════════════════════════
// WP-00 / 00-05 — الدوال العشر الناقصة لبوابة الطالب. بارامترات/أجسام الطلب من Swagger.
// الردود غير الموثّقة = PendingResponse (WP-J). الاستثناء: getStudentProgress يستخدم
// StudentProgressDto الموجود أعلاه. ⚠️ مجمّد بعد إغلاق WP-00 (CR لأي إضافة).
// ════════════════════════════════════════════════════════════════════════════════════

// PENDING-JSON (WP-J / J-02): تفاصيل حجز (هل فيها isRated/تفاصيل الدفع؟ — Q-10).
export type StudentBookingDetail = PendingResponse;
// PENDING-JSON (WP-J / J-02): حالة دفع الحجز.
export type StudentBookingPayment = PendingResponse;
// PENDING-JSON (WP-J / J-02): طلب إعادة جدولة (أسماء الحالات 1..4 غير موثّقة).
export type StudentRescheduleRequest = PendingResponse;
// PENDING-JSON (WP-J / J-03): تفاصيل درس.
export type StudentLessonDetail = PendingResponse;
// PENDING-JSON (WP-J / J-03): تفاصيل كورس مسجَّل.
export type StudentCourseDetail = PendingResponse;
// PENDING-JSON (WP-J / J-04): صف سجل الحضور.
export type StudentAttendanceRow = PendingResponse;
// PENDING-JSON (WP-J / J-04): صف نتيجة امتحان.
export type StudentExamResultRow = PendingResponse;

/** جسم Student/RequestReschedule كما بالـSwagger. */
export interface RescheduleRequestInput {
  bookingId: number;
  /** "YYYY-MM-DD" (أو ISO). */
  proposedDate: string;
  /** "HH:mm[:ss]". */
  proposedStartTime: string;
  note?: string | null;
}

export interface StudentAttendanceFilter {
  from?: Date | string;
  to?: Date | string;
  courseId?: number;
}

function dateParam(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : value;
}

function asArray<T>(value: T[] | null | undefined): T[] {
  return Array.isArray(value) ? value : [];
}

/** تفاصيل حجز للطالب (403/404 لحجز لا يخصّه). */
export async function getStudentBooking(id: number): Promise<StudentBookingDetail> {
  return apiClient.get<StudentBookingDetail>(`/api/Student/GetBooking?id=${id}`);
}

/** حالة دفع حجز (الخصم من المحفظة). */
export async function getStudentBookingPayment(bookingId: number): Promise<StudentBookingPayment> {
  return apiClient.get<StudentBookingPayment>(`/api/Student/BookingPayment?bookingId=${bookingId}`);
}

/** إلغاء حجز من جهة الطالب: body {bookingId, reason}. استدعِ assertOk بعدها. */
export async function studentCancelBooking(
  bookingId: number,
  reason?: string | null,
): Promise<OperationResult> {
  return apiClient.post<OperationResult>("/api/Student/CancelBooking", {
    bookingId,
    reason: reason ?? null,
  });
}

/** طلب إعادة جدولة حجز. استدعِ assertOk بعدها (رسائل التعارض/عدم التوفر من الباك اند). */
export async function requestReschedule(input: RescheduleRequestInput): Promise<OperationResult> {
  return apiClient.post<OperationResult>("/api/Student/RequestReschedule", {
    bookingId: input.bookingId,
    proposedDate: input.proposedDate,
    proposedStartTime: input.proposedStartTime,
    note: input.note ?? null,
  });
}

/** طلبات إعادة الجدولة الخاصة بالطالب. // PENDING-JSON: نفترض مصفوفة مسطّحة. */
export async function getMyRescheduleRequests(): Promise<StudentRescheduleRequest[]> {
  return asArray(
    await apiClient.get<StudentRescheduleRequest[]>("/api/Student/MyRescheduleRequests"),
  );
}

/** تفاصيل درس للطالب. */
export async function getStudentLesson(id: number): Promise<StudentLessonDetail> {
  return apiClient.get<StudentLessonDetail>(`/api/Student/GetLesson?id=${id}`);
}

/** تفاصيل كورس مسجَّل للطالب. */
export async function getStudentCourse(id: number): Promise<StudentCourseDetail> {
  return apiClient.get<StudentCourseDetail>(`/api/Student/GetCourse?id=${id}`);
}

/** سجل الحضور (فلاتر from/to/courseId اختيارية). // PENDING-JSON */
export async function getStudentAttendance(
  filter: StudentAttendanceFilter = {},
): Promise<StudentAttendanceRow[]> {
  const params = new URLSearchParams();
  if (filter.from) params.set("from", dateParam(filter.from));
  if (filter.to) params.set("to", dateParam(filter.to));
  if (filter.courseId) params.set("courseId", String(filter.courseId));
  const qs = params.toString();
  return asArray(
    await apiClient.get<StudentAttendanceRow[]>(`/api/Student/Attendance${qs ? `?${qs}` : ""}`),
  );
}

/** نتائج الامتحانات (فلتر courseId اختياري). // PENDING-JSON */
export async function getStudentExamResults(courseId?: number): Promise<StudentExamResultRow[]> {
  const qs = courseId ? `?courseId=${courseId}` : "";
  return asArray(await apiClient.get<StudentExamResultRow[]>(`/api/Student/ExamResults${qs}`));
}

/** مؤشرات التقدم الأكاديمي. النوع StudentProgressDto موجود بالكود (يُتحقَّق منه بـJ-04). */
export async function getStudentProgress(): Promise<StudentProgressDto> {
  return apiClient.get<StudentProgressDto>("/api/Student/Progress");
}

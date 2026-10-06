// تكامل بوابة الطالب مع StudentController الحقيقي بالباك اند.
// الأنواع هون منسوخة حرفياً عن Acadimia.Infrastructure/Dtos/Students/StudentDtos.cs
// حتى ما نخمّن شكل الرد.

import { apiClient } from "./client";
import type { OperationResult } from "./op-result";
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

// J-02/J-03/J-04 — أنواع مأخوذة حرفيًا من DTOs كود الباك اند (Acadimia.Infrastructure/Dtos): ASP.NET Core
// بيسلسل camelCase، والـenums أرقام، وDateTime ISO، وTimeSpan "HH:mm:ss". ⚠️ مصدرها الكود وليس تشغيلًا حيًا.

/** BookingDto — رد Student/GetBooking وBooking/MyBookings وBooking/TeacherBookings. */
export interface StudentBookingDetail {
  id: number;
  teacherId: number;
  teacherName: string | null;
  /** string (معرّف المستخدم)، ليس رقمًا. */
  studentId: string;
  studentName: string | null;
  subjectId: number | null;
  subjectName: string | null;
  teachingMode: CourseDeliveryType;
  date: string;
  startTime: string;
  durationMinutes: number;
  price: number;
  /** BookingStatus: 1 Pending · 2 Accepted · 3 Rejected · 4 Cancelled · 5 Confirmed · 6 Completed. */
  status: number;
  studentNote: string | null;
  rejectionReason: string | null;
  paidOn: string | null;
  cancellationReason: string | null;
  createdOn: string;
}

/** BookingPaymentStatus: 1 Unpaid · 2 Paid · 3 Refunded. */
export interface StudentBookingPayment {
  bookingId: number;
  bookingStatus: number;
  price: number;
  paymentStatus: number;
  paidOn: string | null;
  walletBalance: number;
  hasSufficientBalance: boolean;
  needsTopUp: boolean;
}

/** RescheduleRequestDto. status: 1 Pending · 2 Approved · 3 Rejected · 4 Cancelled. */
export interface StudentRescheduleRequest {
  id: number;
  bookingId: number;
  teacherName: string | null;
  studentName: string | null;
  originalDate: string;
  originalStartTime: string;
  proposedDate: string;
  proposedStartTime: string;
  note: string | null;
  status: number;
  rejectionReason: string | null;
  createdOn: string;
}

/** StudentLessonDetailDto — الدرس متداخل بحقل lesson (وليس مسطّحًا). */
export interface StudentLessonDetail {
  lesson: StudentScheduleItemDto;
  groupName: string | null;
  meetingInstructions: string | null;
  /** false = الموقع غير متوفر (حضوري بلا قاعة). */
  locationAvailable: boolean | null;
  cancellationReason: string | null;
}

export interface StudentGroupScheduleDay {
  day: number;
  startTime: string;
}
export interface StudentGroupInfo {
  groupId: number;
  name: string;
  courseStartDate: string | null;
  courseEndDate: string | null;
  lessonDurationMinutes: number;
  days: StudentGroupScheduleDay[];
}
/** StudentCourseDetailDto. */
export interface StudentCourseDetail {
  courseId: number;
  title: string;
  description: string | null;
  deliveryType: CourseDeliveryType;
  teacherName: string | null;
  subjectName: string | null;
  groups: StudentGroupInfo[];
  lessons: StudentScheduleItemDto[];
}

/** StudentAttendanceRowDto. status: 1 Present · 2 Absent · 3 Late · 4 Excused. */
export interface StudentAttendanceRow {
  sessionDate: string;
  groupName: string;
  courseTitle: string | null;
  status: number;
  notes: string | null;
}
/** StudentAttendanceDto — كائن واحد (ليس مصفوفة) فيه الإحصاءات والسجلات. */
export interface StudentAttendance {
  attendanceRatePercent: number | null;
  totalSessions: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  records: StudentAttendanceRow[];
}

/** StudentExamResultDto. */
export interface StudentExamResultRow {
  examId: number;
  examTitle: string;
  examDate: string;
  courseTitle: string | null;
  scoreObtained: number;
  totalMarks: number;
  percentage: number | null;
  feedback: string | null;
}

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

/** طلبات إعادة الجدولة الخاصة بالطالب (قائمة RescheduleRequestDto). */
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

/** سجل الحضور + الإحصاءات (فلاتر from/to/courseId اختيارية). الرد كائن StudentAttendanceDto. */
export async function getStudentAttendance(
  filter: StudentAttendanceFilter = {},
): Promise<StudentAttendance> {
  const params = new URLSearchParams();
  if (filter.from) params.set("from", dateParam(filter.from));
  if (filter.to) params.set("to", dateParam(filter.to));
  if (filter.courseId) params.set("courseId", String(filter.courseId));
  const qs = params.toString();
  const data = await apiClient.get<Partial<StudentAttendance> | null>(
    `/api/Student/Attendance${qs ? `?${qs}` : ""}`,
  );
  return {
    attendanceRatePercent: data?.attendanceRatePercent ?? null,
    totalSessions: data?.totalSessions ?? 0,
    present: data?.present ?? 0,
    absent: data?.absent ?? 0,
    late: data?.late ?? 0,
    excused: data?.excused ?? 0,
    records: asArray(data?.records),
  };
}

/** نتائج الامتحانات (فلتر courseId اختياري). */
export async function getStudentExamResults(courseId?: number): Promise<StudentExamResultRow[]> {
  const qs = courseId ? `?courseId=${courseId}` : "";
  return asArray(await apiClient.get<StudentExamResultRow[]>(`/api/Student/ExamResults${qs}`));
}

/** مؤشرات التقدم الأكاديمي. النوع StudentProgressDto موجود بالكود (يُتحقَّق منه بـJ-04). */
export async function getStudentProgress(): Promise<StudentProgressDto> {
  return apiClient.get<StudentProgressDto>("/api/Student/Progress");
}

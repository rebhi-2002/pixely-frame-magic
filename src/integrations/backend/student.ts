// تكامل بوابة الطالب مع StudentController الحقيقي بالباك اند.
// الأنواع هون منسوخة حرفياً عن Acadimia.Infrastructure/Dtos/Students/StudentDtos.cs
// حتى ما نخمّن شكل الرد.

import { apiClient } from "./client";

export type CourseDeliveryType = 1 | 2; // 1=InPerson, 2=Online
export type MeetingPlatform = 1 | 2 | 3 | 4; // Zoom, GoogleMeet, MicrosoftTeams, Other
export type AttendanceStatus = 1 | 2 | 3 | 4; // Present, Absent, Late, Excused
export type NotificationType = 1 | 2 | 3 | 4 | 5; // JoinRequest, Wallet, Schedule, System, Booking
export type BookingStatus = 1 | 2 | 3 | 4 | 5 | 6; // Pending, Accepted, Rejected, Cancelled, Confirmed, Completed

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

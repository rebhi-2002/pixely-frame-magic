// مفاتيح react-query الموحّدة (WP-00 — العقد C-16). ممنوع ابتكار مفاتيح جديدة خارج هذا
// الملف: كل WP بيستورد `qk` ويستدعي `invalidateBookingQueries` بعد أي mutation للحجز.
//
// المفاتيح «الموجودة» بقيت بنفس شكلها الحالي (حتى لا تنكسر شاشات قائمة)، والجديدة بنفس النمط
// (اسم kebab-case + معاملات). الإبطال بالبادئة: invalidate(["student-schedule"]) بيبطل كل
// المتغيرات بغض النظر عن الفلتر.

import type { QueryClient } from "@tanstack/react-query";

export const qk = {
  // ---------------------------------------------------------------- موجودة
  studentDashboard: () => ["student-dashboard"] as const,
  studentMyBookings: () => ["student-my-bookings"] as const,
  studentMyRequests: (status?: number) =>
    (status === undefined
      ? ["student-my-requests"]
      : ["student-my-requests", status]) as readonly unknown[],
  studentSchedule: (filter?: unknown) =>
    (filter === undefined
      ? ["student-schedule"]
      : ["student-schedule", filter]) as readonly unknown[],
  studentNotifications: () => ["student-notifications"] as const,
  myWallet: () => ["my-wallet"] as const,
  myWalletHistory: (page?: number) =>
    (page === undefined
      ? ["my-wallet-history"]
      : ["my-wallet-history", page]) as readonly unknown[],
  parentChildren: () => ["parent-children"] as const,
  parentChildAttendance: (studentId?: number) => ["parent-child-attendance", studentId] as const,
  parentChildExams: (studentId?: number) => ["parent-child-exams", studentId] as const,
  backendTeacherProfile: (teacherId?: number) => ["backend-teacher-profile", teacherId] as const,
  backendTeacherAvailability: (teacherId?: number) =>
    ["backend-teacher-availability", teacherId] as const,
  publishedCourses: () => ["published-courses"] as const,

  // ----------------------------------------------------------------- جديدة
  studentBooking: (id: number) => ["student-booking", id] as const,
  studentBookingPayment: (bookingId: number) => ["student-booking-payment", bookingId] as const,
  studentRescheduleRequests: () => ["student-reschedule-requests"] as const,
  studentLesson: (id: number) => ["student-lesson", id] as const,
  studentCourse: (id: number) => ["student-course", id] as const,
  studentAttendance: (from?: string, to?: string, courseId?: number) =>
    ["student-attendance", { from, to, courseId }] as const,
  studentExamResults: (courseId?: number) => ["student-exam-results", { courseId }] as const,
  studentProgress: () => ["student-progress"] as const,

  teacherBookings: (status?: number) =>
    (status === undefined
      ? ["teacher-bookings"]
      : ["teacher-bookings", status]) as readonly unknown[],
  teacherRescheduleRequests: (status?: number) =>
    (status === undefined
      ? ["teacher-reschedule-requests"]
      : ["teacher-reschedule-requests", status]) as readonly unknown[],
  /** آخر 50 حركة محفظة للمعلم (WP-W2) — مفتاح مستقل عن my-wallet-history كي لا يتعارض حجم الصفحة. */
  teacherEarningsCredits: () => ["teacher-earnings-credits"] as const,
  teacherCourses: () => ["teacher-courses"] as const,
  teacherCourse: (id: number | string) => ["teacher-course", id] as const,
  teacherGroupStudents: (groupId: number, keyword?: string) =>
    ["teacher-group-students", { groupId, keyword }] as const,
  teacherLessons: (courseId?: number, groupId?: number) =>
    ["teacher-lessons", { courseId, groupId }] as const,
} as const;

/**
 * يبطل كل ما يتأثر بتغيّر حجز (إرسال/قرار/إلغاء/إعادة جدولة/تقييم/إنهاء): قوائم الطالب
 * والمعلم والجدول واللوحة والمحفظة (الخصم/الاسترجاع). مرّر `bookingId` لإبطال تفاصيله وحالة
 * دفعه أيضًا، و`teacherId` لتحديث ملف المعلم بعد التقييم.
 */
export function invalidateBookingQueries(
  queryClient: QueryClient,
  bookingId?: number,
  teacherId?: number,
): void {
  const keys: ReadonlyArray<readonly unknown[]> = [
    qk.studentDashboard(),
    qk.studentMyBookings(),
    qk.studentMyRequests(),
    qk.studentSchedule(),
    qk.studentRescheduleRequests(),
    qk.teacherBookings(),
    qk.teacherRescheduleRequests(),
    qk.myWallet(),
    qk.myWalletHistory(),
    qk.teacherEarningsCredits(),
  ];
  for (const queryKey of keys) {
    void queryClient.invalidateQueries({ queryKey });
  }
  if (bookingId !== undefined) {
    void queryClient.invalidateQueries({ queryKey: qk.studentBooking(bookingId) });
    void queryClient.invalidateQueries({ queryKey: qk.studentBookingPayment(bookingId) });
  } else {
    void queryClient.invalidateQueries({ queryKey: ["student-booking"] });
    void queryClient.invalidateQueries({ queryKey: ["student-booking-payment"] });
  }
  if (teacherId !== undefined) {
    void queryClient.invalidateQueries({ queryKey: qk.backendTeacherProfile(teacherId) });
  }
}

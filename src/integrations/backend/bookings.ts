// ربط BookingController بالباك اند — مواءمة كاملة مع Swagger (WP-00 / 00-01 + 00-02).
//
// المصدر المعتمد: Swagger_UI (2026-09-22) + SRS. أي تعليق أقدم عن «P0-1/P1-1» أو ملفات
// docs/operations/* لا يُعتمد (راجع Discrepancies D-14).
//
// القواعد:
// - كل POST بيرجع OperationResult (HTTP 200 حتى عند الفشل المنطقي) → الواجهة لازم تستدعي
//   assertOk(result, …) من ./op-result بعد كل استدعاء كتابة.
// - الحالات أرقام 1..6 (lib/enums.ts: BookingStatus)، لا نصوص.
// - ردود القوائم غير موثّقة بالـSwagger → PendingResponse (WP-J يستبدلها بعد وصول العينات).
//   ممنوع قراءة حقولها قبل ذلك.
//
// ⚠️ ملف مجمّد بعد إغلاق WP-00: من يحتاج دالة جديدة يرفع CR (راجع FileOwnership).

import { apiClient } from "./client";
import type { OperationResult } from "./op-result";
import type { StudentBookingDetail, StudentRescheduleRequest } from "./student";
import type { BookingStatus, DeliveryType } from "@/lib/enums";

export type { BookingStatus } from "@/lib/enums";

// PENDING-JSON (WP-J / J-01): شكل الصف غير موثّق — انتظر العينة (Q-05).
/** BookingDto (Booking/MyBookings) — نفس شكل StudentBookingDetail. */
export type BookingRow = StudentBookingDetail;
// PENDING-JSON (WP-J / J-01)
/** BookingDto (Booking/TeacherBookings). */
export type TeacherBookingRow = StudentBookingDetail;
// PENDING-JSON (WP-J / J-01)
/** RescheduleRequestDto (Booking/TeacherRescheduleRequests). */
export type TeacherRescheduleRequestRow = StudentRescheduleRequest;

/** حالات طلب إعادة الجدولة المسموحة كفلتر (Swagger: 1..4). أسماؤها غير موثّقة (تُحسم بـJ-02). */
export type RescheduleStatusFilter = 1 | 2 | 3 | 4;

/** جسم Booking/Submit كما بالـSwagger. التاريخ "YYYY-MM-DD" (أو ISO)، والوقت "HH:mm[:ss]". */
export interface BookingInput {
  teacherId: number;
  /** اختياري بالباك اند (BookingInputDto.SubjectId nullable). */
  subjectId?: number | null;
  /** اختياري بالباك اند (BookingInputDto.GradeId nullable). */
  gradeId?: number | null;
  /** 1 = حضوري، 2 = أونلاين. */
  teachingMode: DeliveryType;
  date: string;
  startTime: string;
  durationMinutes: number;
  studentNote?: string | null;
}

export interface RescheduleDecisionInput {
  requestId: number;
  approve: boolean;
  rejectionReason?: string | null;
}

/** يرسل طلب حجز جديد (طالب). النتيجة: OperationResult — returnId = رقم الحجز عند النجاح. */
export async function submitBooking(input: BookingInput): Promise<OperationResult> {
  return apiClient.post<OperationResult>("/api/Booking/Submit", input);
}

/**
 * قبول/رفض طلب حجز (معلم). الحقل `accept` (وليس approve). السبب مطلوب واجهيًا عند الرفض.
 * ملاحظة: متى يُخصم المبلغ (عند القبول أم الإرسال) بانتظار Q-06.
 */
export async function decideBooking(
  bookingId: number,
  accept: boolean,
  rejectionReason?: string | null,
): Promise<OperationResult> {
  return apiClient.post<OperationResult>("/api/Booking/Decide", {
    bookingId,
    accept,
    rejectionReason: rejectionReason ?? null,
  });
}

/**
 * إلغاء حجز — bookingId وreason كلاهما query params (الـaction بلا body).
 * للطالب الأفضل Student/CancelBooking (student.ts → studentCancelBooking) لأنه بجسم JSON.
 */
export async function cancelBooking(bookingId: number, reason?: string): Promise<OperationResult> {
  const params = new URLSearchParams({ bookingId: String(bookingId) });
  if (reason?.trim()) params.set("reason", reason.trim());
  return apiClient.post<OperationResult>(`/api/Booking/Cancel?${params.toString()}`);
}

/** إنهاء حصة مؤكَّدة (معلم، Confirmed → Completed). */
export async function completeBooking(bookingId: number): Promise<OperationResult> {
  return apiClient.post<OperationResult>(
    `/api/Booking/Complete?bookingId=${encodeURIComponent(String(bookingId))}`,
  );
}

/** تقييم حجز مكتمل (طالب). الحقول بالـSwagger: ratingValue (1..5) + review. */
export async function rateBooking(
  bookingId: number,
  ratingValue: number,
  review?: string | null,
): Promise<OperationResult> {
  return apiClient.post<OperationResult>("/api/Booking/Rate", {
    bookingId,
    ratingValue,
    review: review ?? null,
  });
}

/** حجوزات المستخدم الحالي. // PENDING-JSON: نفترض مصفوفة مسطّحة، وغيرها = قائمة فارغة. */
export async function listMyBookings(): Promise<BookingRow[]> {
  const result = await apiClient.get<BookingRow[]>("/api/Booking/MyBookings");
  return Array.isArray(result) ? result : [];
}

/** حجوزات المعلم الحالي مع فلتر حالة رقمي اختياري (1..6). // PENDING-JSON */
export async function listTeacherBookings(status?: BookingStatus): Promise<TeacherBookingRow[]> {
  const qs = status ? `?status=${status}` : "";
  const result = await apiClient.get<TeacherBookingRow[]>(`/api/Booking/TeacherBookings${qs}`);
  return Array.isArray(result) ? result : [];
}

/** طلبات إعادة الجدولة الواردة للمعلم (فلتر حالة 1..4 اختياري). // PENDING-JSON */
export async function listTeacherRescheduleRequests(
  status?: RescheduleStatusFilter,
): Promise<TeacherRescheduleRequestRow[]> {
  const qs = status ? `?status=${status}` : "";
  const result = await apiClient.get<TeacherRescheduleRequestRow[]>(
    `/api/Booking/TeacherRescheduleRequests${qs}`,
  );
  return Array.isArray(result) ? result : [];
}

/** قرار المعلم بطلب إعادة الجدولة: {requestId, approve, rejectionReason}. */
export async function decideReschedule(input: RescheduleDecisionInput): Promise<OperationResult> {
  return apiClient.post<OperationResult>("/api/Booking/DecideReschedule", {
    requestId: input.requestId,
    approve: input.approve,
    rejectionReason: input.rejectionReason ?? null,
  });
}

// ربط جاهز (طبقة الأنواع/الدوال فقط) مع BookingController بالباك اند — تحقّقت من كل
// حقل مباشرة من كود الباك اند (BookingDtos.cs + BookingController.cs). **لسا ما فيه أي
// واجهة تستخدم هالملف** — مقصود، مش نسيان: عرض شاشة حجز حية للمستخدمين الحقيقيين الآن
// خطر فعلي (راجع docs/operations/2026-09-21-remaining-integration-roadmap.md، بند
// "Booking/Submit ضد معلم يتيم بلا UserId"). لما ينحل P0-1 وP1-1 بالباك اند، هالدوال
// جاهزة للاستيراد المباشر بدون أي تعديل.

import { apiClient } from "./client";

export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Rejected" | "Cancelled";
// ⚠️ "Accepted" موجودة بالـenum بالباك اند لكن BookingService ما بيحطّها أبدًا —
// Decide (قبول) بيحوّل الحالة رأسًا لـConfirmed (بعد خصم المحفظة). لا تتوقّعها بالعرض.

export interface BookingRow {
  id: number;
  studentId: number;
  teacherId: number;
  courseId?: number | null;
  date: string; // "YYYY-MM-DD" — بدون منطقة زمنية صريحة، راجع P2-5 بـbackend-requirements.md
  startTime: string; // "HH:mm:ss"
  durationMinutes: number;
  price: number;
  status: BookingStatus;
  rejectionReason?: string | null;
  createdOn: string;
}

export interface BookingInput {
  teacherId: number;
  courseId?: number | null;
  date: string;
  startTime: string;
  durationMinutes: number;
}

/** يرسل طلب حجز جديد (طالب/ولي أمر). */
export async function submitBooking(input: BookingInput): Promise<BookingRow> {
  return apiClient.post<BookingRow>("/api/Booking/Submit", input);
}

/** قبول/رفض طلب حجز (معلم). القبول يخصم فورًا من محفظة الطالب ويحوّل الحالة لـConfirmed. */
export async function decideBooking(
  bookingId: number,
  approve: boolean,
  rejectionReason?: string,
): Promise<BookingRow> {
  return apiClient.post<BookingRow>("/api/Booking/Decide", { bookingId, approve, rejectionReason });
}

/** إلغاء حجز — bookingId يُرسل كـquery param (الباك اند ما فيه [FromBody] على هالـaction). */
export async function cancelBooking(bookingId: number): Promise<BookingRow> {
  return apiClient.post<BookingRow>(`/api/Booking/Cancel?bookingId=${bookingId}`);
}

/** إنهاء حصة مؤكَّدة (معلم فقط، من Confirmed → Completed). */
export async function completeBooking(bookingId: number): Promise<BookingRow> {
  return apiClient.post<BookingRow>(`/api/Booking/Complete?bookingId=${bookingId}`);
}

/** تقييم حجز مكتمل (طالب). */
export async function rateBooking(
  bookingId: number,
  rating: number,
  comment?: string,
): Promise<void> {
  await apiClient.post("/api/Booking/Rate", { bookingId, rating, comment });
}

/** حجوزات المستخدم الحالي (طالب/ولي أمر). قائمة فاضية أمر طبيعي وصادق — راجع الملاحظة أعلى الملف. */
export async function listMyBookings(): Promise<BookingRow[]> {
  return apiClient.get<BookingRow[]>("/api/Booking/MyBookings");
}

/** حجوزات المعلم الحالي، مع فلتر حالة اختياري. */
export async function listTeacherBookings(status?: BookingStatus): Promise<BookingRow[]> {
  const q = status ? `?status=${encodeURIComponent(status)}` : "";
  return apiClient.get<BookingRow[]>(`/api/Booking/TeacherBookings${q}`);
}

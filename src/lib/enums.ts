// القيم الرقمية المشتركة (WP-00 — العقد C-21). الباك اند بيتعامل بأرقام لا نصوص
// (Swagger: BookingStatus 1..6، DeliveryType 1|2، MeetingPlatform 1..4...). أي WP بيحتاج
// تسمية/لون لحالة بيستخدم الدوال هون — ممنوع تعريف نسخة محلية.

/** دالة الترجمة المرجعة من useBi() — منعرّفها هون كي تبقى الدوال نقية وقابلة للاختبار. */
export type Bi = <T>(ar: T, en: T) => T;

/** نغمات الألوان المدعومة بـBadge/RowList بالـkit. */
export type Tone = "muted" | "primary" | "success" | "danger";

// ---------------------------------------------------------------- BookingStatus
export const BookingStatus = {
  Pending: 1,
  Accepted: 2,
  Rejected: 3,
  Cancelled: 4,
  Confirmed: 5,
  Completed: 6,
} as const;
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

export function isBookingStatus(value: unknown): value is BookingStatus {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 6;
}

export function bookingStatusLabel(status: number | null | undefined, bi: Bi): string {
  switch (status) {
    case BookingStatus.Pending:
      return bi("بانتظار الموافقة", "Pending");
    case BookingStatus.Accepted:
      return bi("مقبول", "Accepted");
    case BookingStatus.Rejected:
      return bi("مرفوض", "Rejected");
    case BookingStatus.Cancelled:
      return bi("ملغى", "Cancelled");
    case BookingStatus.Confirmed:
      return bi("مؤكّد", "Confirmed");
    case BookingStatus.Completed:
      return bi("مكتمل", "Completed");
    default:
      return "—";
  }
}

export function bookingStatusTone(status: number | null | undefined): Tone {
  switch (status) {
    case BookingStatus.Accepted:
    case BookingStatus.Completed:
      return "primary";
    case BookingStatus.Confirmed:
      return "success";
    case BookingStatus.Rejected:
    case BookingStatus.Cancelled:
      return "danger";
    default:
      return "muted";
  }
}

// ---------------------------------------------------------------- DeliveryType
export const DeliveryType = { InPerson: 1, Online: 2 } as const;
export type DeliveryType = (typeof DeliveryType)[keyof typeof DeliveryType];

export function deliveryTypeLabel(type: number | null | undefined, bi: Bi): string {
  if (type === DeliveryType.InPerson) return bi("حضوري", "In person");
  if (type === DeliveryType.Online) return bi("أونلاين", "Online");
  return "—";
}

// -------------------------------------------------------------- MeetingPlatform
export const MeetingPlatform = { Zoom: 1, GoogleMeet: 2, MicrosoftTeams: 3, Other: 4 } as const;
export type MeetingPlatform = (typeof MeetingPlatform)[keyof typeof MeetingPlatform];

export function meetingPlatformLabel(platform: number | null | undefined, bi: Bi): string {
  switch (platform) {
    case MeetingPlatform.Zoom:
      return "Zoom";
    case MeetingPlatform.GoogleMeet:
      return "Google Meet";
    case MeetingPlatform.MicrosoftTeams:
      return "Microsoft Teams";
    case MeetingPlatform.Other:
      return bi("منصة أخرى", "Other platform");
    default:
      return "—";
  }
}

// ------------------------------------------------------------- AttendanceStatus
export const AttendanceStatus = { Present: 1, Absent: 2, Late: 3, Excused: 4 } as const;
export type AttendanceStatus = (typeof AttendanceStatus)[keyof typeof AttendanceStatus];

export function attendanceStatusLabel(status: number | null | undefined, bi: Bi): string {
  switch (status) {
    case AttendanceStatus.Present:
      return bi("حاضر", "Present");
    case AttendanceStatus.Absent:
      return bi("غائب", "Absent");
    case AttendanceStatus.Late:
      return bi("متأخر", "Late");
    case AttendanceStatus.Excused:
      return bi("معذور", "Excused");
    default:
      return "—";
  }
}

export function attendanceStatusTone(status: number | null | undefined): Tone {
  switch (status) {
    case AttendanceStatus.Present:
      return "success";
    case AttendanceStatus.Absent:
      return "danger";
    case AttendanceStatus.Late:
      return "primary";
    default:
      return "muted";
  }
}

// -------------------------------------------------------------------- DayOfWeek
/** نفس ترقيم .NET DayOfWeek: 0=الأحد … 6=السبت. */
export const DayOfWeek = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
} as const;
export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek];

/** ترتيب عرض الأيام بالواجهة: السبت أولًا (عُرف المنطقة — افتراض Q-15)، التخزين يبقى رقميًا. */
export const WEEK_DISPLAY_ORDER: readonly DayOfWeek[] = [6, 0, 1, 2, 3, 4, 5];

export function dayOfWeekLabel(day: number | null | undefined, bi: Bi): string {
  switch (day) {
    case DayOfWeek.Sunday:
      return bi("الأحد", "Sunday");
    case DayOfWeek.Monday:
      return bi("الاثنين", "Monday");
    case DayOfWeek.Tuesday:
      return bi("الثلاثاء", "Tuesday");
    case DayOfWeek.Wednesday:
      return bi("الأربعاء", "Wednesday");
    case DayOfWeek.Thursday:
      return bi("الخميس", "Thursday");
    case DayOfWeek.Friday:
      return bi("الجمعة", "Friday");
    case DayOfWeek.Saturday:
      return bi("السبت", "Saturday");
    default:
      return "—";
  }
}

// ------------------------------------------------------------ RescheduleStatus
// RescheduleRequestStatus بالباك اند (كود الباك اند، القسم 7 بالـHANDOFF): 1 Pending · 2 Approved · 3 Rejected · 4 Cancelled.
export const RescheduleStatus = { Pending: 1, Approved: 2, Rejected: 3, Cancelled: 4 } as const;
export type RescheduleStatus = (typeof RescheduleStatus)[keyof typeof RescheduleStatus];

export function rescheduleStatusLabel(status: number | null | undefined, bi: Bi): string {
  switch (status) {
    case RescheduleStatus.Pending:
      return bi("بانتظار المعلم", "Awaiting teacher");
    case RescheduleStatus.Approved:
      return bi("تمت الموافقة", "Approved");
    case RescheduleStatus.Rejected:
      return bi("مرفوض", "Rejected");
    case RescheduleStatus.Cancelled:
      return bi("ملغى", "Cancelled");
    default:
      return "—";
  }
}

export function rescheduleStatusTone(status: number | null | undefined): Tone {
  switch (status) {
    case RescheduleStatus.Approved:
      return "success";
    case RescheduleStatus.Rejected:
    case RescheduleStatus.Cancelled:
      return "danger";
    case RescheduleStatus.Pending:
      return "primary";
    default:
      return "muted";
  }
}

// ----------------------------------------------------------- BookingPaymentStatus
export const BookingPaymentStatus = { Unpaid: 1, Paid: 2, Refunded: 3 } as const;
export type BookingPaymentStatus = (typeof BookingPaymentStatus)[keyof typeof BookingPaymentStatus];

export function paymentStatusLabel(status: number | null | undefined, bi: Bi): string {
  switch (status) {
    case BookingPaymentStatus.Unpaid:
      return bi("غير مدفوع", "Unpaid");
    case BookingPaymentStatus.Paid:
      return bi("مدفوع", "Paid");
    case BookingPaymentStatus.Refunded:
      return bi("مُسترجَع", "Refunded");
    default:
      return "—";
  }
}

export function paymentStatusTone(status: number | null | undefined): Tone {
  switch (status) {
    case BookingPaymentStatus.Paid:
      return "success";
    case BookingPaymentStatus.Refunded:
      return "primary";
    default:
      return "muted";
  }
}

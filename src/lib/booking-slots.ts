// منطق نقي لشاشة الحجز (WP-S1: S1-02 / S1-04 / S1-07) — بلا React وبلا شبكة، قابل للاختبار.
//
// ⚠️ افتراضات موثّقة (لم تُؤكَّد من الباك اند):
// - أقصى مدة للحجز 480 دقيقة: مثال Swagger لحقل durationMinutes في Booking/Submit هو 480
//   (نفس نمط ratingValue=5 بمثال Rate)، فاعتُبر الحد الأقصى. الباك اند هو المرجع النهائي وأي
//   رفض منه بيُعرض برسالته.
// - الوقت المتاح = ضمن فترة توفّر المعلم لنفس يوم الأسبوع والوضع (حضوري/أونلاين).

import { combineDateTime } from "./format";
import { DeliveryType } from "./enums";
import type { AvailabilitySlot } from "@/integrations/backend/teachers";

/**
 * علم تشغيل مسار الحجز بصفحة المعلم العامة (S1-06). false = يبقى الزر معطّلاً بنصه الصادق.
 * اقلبه إلى true فقط عند اكتمال إرسال الحجز (S1-05) وربط قوائم المادة/الصف (S1-03 / Q-04)،
 * وإلا وعدنا المستخدم بوظيفة غير مكتملة.
 */
export const BOOKING_FLOW_ENABLED = false;

export const MIN_BOOKING_MINUTES = 30;
export const MAX_BOOKING_MINUTES = 480;
/** خيارات المدة المعروضة بالواجهة (دقائق) — كلها ضمن الحدّين. */
export const DURATION_OPTIONS = [30, 45, 60, 90, 120, 180] as const;
/** خطوة توليد أوقات البدء. */
export const START_STEP_MINUTES = 30;
export const MAX_NOTE_LENGTH = 500;

/** تاريخ اليوم المحلي بصيغة "YYYY-MM-DD" (للحد الأدنى بحقل التاريخ). */
export function todayLocalIso(now: Date = new Date()): string {
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

const HHMM = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/;

/** "HH:mm[:ss]" → دقائق منذ منتصف الليل، أو null لو غير صالح. */
export function toMinutes(time: string | null | undefined): number | null {
  if (!time) return null;
  const match = HHMM.exec(time.trim());
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return hours * 60 + minutes;
}

/** دقائق → "HH:mm". */
export function fromMinutes(total: number): string {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

/** يوم الأسبوع (.NET: 0=الأحد…6=السبت) لتاريخ "YYYY-MM-DD" محلي، أو null. */
export function dayOfWeekOf(date: string | null | undefined): number | null {
  if (!date) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(date.trim());
  if (!match) return null;
  const parsed = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  if (Number.isNaN(parsed.getTime())) return null;
  // حماية من التواريخ الغير موجودة (2026-02-31 تنزاح لشهر تاني).
  if (parsed.getMonth() !== Number(match[2]) - 1) return null;
  return parsed.getDay();
}

function dateOnly(value: string | null | undefined): string | null {
  if (!value) return null;
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(value.trim());
  return match ? match[1] : null;
}

/** فترات التوفّر التي تغطي هذا التاريخ والوضع (يوم الأسبوع + effectiveFrom/To). */
export function slotsForDate(
  slots: ReadonlyArray<AvailabilitySlot>,
  date: string | null | undefined,
  mode: DeliveryType,
): AvailabilitySlot[] {
  const day = dayOfWeekOf(date);
  const picked = dateOnly(date);
  if (day === null || picked === null) return [];
  return slots.filter((slot) => {
    if (slot.dayOfWeek !== day || slot.teachingMode !== mode) return false;
    const from = dateOnly(slot.effectiveFrom);
    const to = dateOnly(slot.effectiveTo);
    // مقارنة نصية صحيحة لصيغة YYYY-MM-DD.
    if (from && picked < from) return false;
    if (to && picked > to) return false;
    return true;
  });
}

/**
 * أوقات البدء المتاحة بخطوة ثابتة داخل الفترات، بحيث تنتهي الحصة قبل/عند نهاية الفترة.
 * مرتبة تصاعديًا بلا تكرار.
 */
export function generateStartTimes(
  slots: ReadonlyArray<AvailabilitySlot>,
  durationMinutes: number,
  step: number = START_STEP_MINUTES,
): string[] {
  if (!Number.isFinite(durationMinutes) || durationMinutes <= 0 || step <= 0) return [];
  const out = new Set<number>();
  for (const slot of slots) {
    const start = toMinutes(slot.startTime);
    const end = toMinutes(slot.endTime);
    if (start === null || end === null || end <= start) continue;
    for (let t = start; t + durationMinutes <= end; t += step) out.add(t);
  }
  return [...out].sort((a, b) => a - b).map(fromMinutes);
}

/** يحذف أوقات اليوم التي مرّت (لو التاريخ هو اليوم). أوقات الأيام القادمة تبقى كما هي. */
export function filterFutureTimes(
  date: string | null | undefined,
  times: ReadonlyArray<string>,
  now: Date = new Date(),
): string[] {
  return times.filter((time) => {
    const start = combineDateTime(date, time);
    return start !== null && start.getTime() > now.getTime();
  });
}

/** هل الحصة (تاريخ + بداية + مدة) تقع بالكامل ضمن إحدى فترات التوفّر؟ */
export function isWithinAvailability(
  slots: ReadonlyArray<AvailabilitySlot>,
  date: string | null | undefined,
  mode: DeliveryType,
  startTime: string | null | undefined,
  durationMinutes: number,
): boolean {
  const start = toMinutes(startTime);
  if (start === null || !Number.isFinite(durationMinutes) || durationMinutes <= 0) return false;
  return slotsForDate(slots, date, mode).some((slot) => {
    const from = toMinutes(slot.startTime);
    const to = toMinutes(slot.endTime);
    return from !== null && to !== null && start >= from && start + durationMinutes <= to;
  });
}

/** سعر تقديري = سعر الساعة × المدة. null لو سعر الساعة غير معروف/غير صالح (لا نخمّن). */
export function estimatePrice(
  hourlyPrice: number | null | undefined,
  durationMinutes: number,
): number | null {
  if (typeof hourlyPrice !== "number" || !Number.isFinite(hourlyPrice) || hourlyPrice < 0)
    return null;
  if (!Number.isFinite(durationMinutes) || durationMinutes <= 0) return null;
  return Math.round(hourlyPrice * (durationMinutes / 60) * 100) / 100;
}

/** سعر الساعة حسب الوضع من ملف المعلم. */
export function hourlyPriceFor(
  teacher: { hourlyPriceOnline?: number | null; hourlyPriceInPerson?: number | null },
  mode: DeliveryType,
): number | null {
  const value =
    mode === DeliveryType.Online ? teacher.hourlyPriceOnline : teacher.hourlyPriceInPerson;
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

/** الأوضاع التي يدعمها المعلم، للعرض بالاختيار. */
export function supportedModes(teacher: {
  supportsOnline?: boolean;
  supportsInPerson?: boolean;
}): DeliveryType[] {
  const modes: DeliveryType[] = [];
  if (teacher.supportsInPerson) modes.push(DeliveryType.InPerson);
  if (teacher.supportsOnline) modes.push(DeliveryType.Online);
  return modes;
}

export interface BookingDraft {
  mode: DeliveryType | null;
  /** "YYYY-MM-DD". */
  date: string;
  /** "HH:mm". */
  startTime: string;
  durationMinutes: number;
  note: string;
}

export type BookingDraftError =
  "mode" | "date" | "past" | "time" | "unavailable" | "duration" | "note";

/** رموز أخطاء (الواجهة بتترجمها). قائمة فاضية = المسودة صالحة من جهة العميل. */
export function validateBookingDraft(
  draft: BookingDraft,
  slots: ReadonlyArray<AvailabilitySlot>,
  now: Date = new Date(),
): BookingDraftError[] {
  const errors: BookingDraftError[] = [];
  if (draft.mode !== DeliveryType.InPerson && draft.mode !== DeliveryType.Online)
    errors.push("mode");
  if (dayOfWeekOf(draft.date) === null) {
    errors.push("date");
  } else {
    const start = combineDateTime(draft.date, draft.startTime);
    if (start === null) errors.push("time");
    else if (start.getTime() <= now.getTime()) errors.push("past");
    else if (
      draft.mode &&
      !isWithinAvailability(slots, draft.date, draft.mode, draft.startTime, draft.durationMinutes)
    ) {
      errors.push("unavailable");
    }
  }
  if (
    !Number.isFinite(draft.durationMinutes) ||
    draft.durationMinutes < MIN_BOOKING_MINUTES ||
    draft.durationMinutes > MAX_BOOKING_MINUTES
  ) {
    errors.push("duration");
  }
  if (draft.note.length > MAX_NOTE_LENGTH) errors.push("note");
  return errors;
}

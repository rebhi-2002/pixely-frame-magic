// قواعد عرض الجدول للطالب (WP-S5: S5-04 / S5-06) — نقية وقابلة للاختبار.
// DTO مأخوذ من student.ts (StudentScheduleItemDto — موثّق بالكود، ليس JSON مخمَّنًا).

import { isHttpUrl } from "./format";
import { DeliveryType, meetingPlatformLabel, type Bi } from "./enums";

export interface ScheduleItemLike {
  kind: "Lesson" | "Booking";
  id: number;
  mode: number | null;
  room: string | null;
  meetingPlatform: number | null;
  meetingUrl: string | null;
  canJoin: boolean;
}

/**
 * رابط الانضمام: فقط لو الباك اند سمح (canJoin) والرابط http/https صالح (أمان: يرفض
 * javascript: وغيره). غير ذلك = null (تفاصيل بلا زر انضمام).
 */
export function joinHref(item: Pick<ScheduleItemLike, "canJoin" | "meetingUrl">): string | null {
  if (!item.canJoin) return null;
  const url = item.meetingUrl?.trim();
  return url && isHttpUrl(url) ? url : null;
}

/**
 * عمود «القاعة / المنصة»: حضوري → القاعة أو «الموقع غير متوفر»، أونلاين → اسم المنصة،
 * وغير معروف الوضع → «—». لا نخمّن قاعة ولا منصة.
 */
export function locationLabel(
  item: Pick<ScheduleItemLike, "mode" | "room" | "meetingPlatform">,
  bi: Bi,
): string {
  if (item.mode === DeliveryType.InPerson) {
    const room = item.room?.trim();
    return room ? room : bi("الموقع غير متوفر", "Location unavailable");
  }
  if (item.mode === DeliveryType.Online) return meetingPlatformLabel(item.meetingPlatform, bi);
  return "—";
}

/** وجهة صفّ الجدول: درس → /lesson/$id، حجز → /booking/$id (مساران مسجّلان بالعقد C-18). */
export function detailTarget(item: Pick<ScheduleItemLike, "kind" | "id">): {
  to: "/lesson/$id" | "/booking/$id";
  id: string;
} {
  return item.kind === "Booking"
    ? { to: "/booking/$id", id: String(item.id) }
    : { to: "/lesson/$id", id: String(item.id) };
}

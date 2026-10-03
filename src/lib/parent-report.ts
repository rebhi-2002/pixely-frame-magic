// منطق تقرير ولي الأمر النقي (WP-P1). مفصول عن الصفحة كي يُختبر بدون React.
//
// ⚠️ Q-11: unreadNotificationsCount بيجي من Parent/MyChildren «لكل ابن»، وما في endpoint
// يؤكد إنه عدد إشعارات ولي الأمر نفسه. فالواجهة بتعرضه دائمًا بصيغة «لكل ابن» أو «مجموع
// الأبناء» وبتوضّح مصدره، ولا بتسميه «إشعاراتك».

import { ApiError } from "@/integrations/backend/client";

/** عدد صحيح غير سالب، أو null لو القيمة ناقصة/غير صالحة (لا نخترع صفرًا لقيمة مفقودة). */
export function parseUnreadCount(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return null;
  return Math.floor(value);
}

export interface UnreadSummary {
  /** مجموع الأبناء الذين وصلنا عدّهم فقط. */
  total: number;
  /** true لو فيه ابن واحد على الأقل عدّه ناقص/غير صالح (المجموع حينها ناقص). */
  hasMissing: boolean;
}

export function summarizeUnread(
  children: ReadonlyArray<{ unreadNotificationsCount?: unknown }>,
): UnreadSummary {
  let total = 0;
  let hasMissing = false;
  for (const child of children) {
    const n = parseUnreadCount(child.unreadNotificationsCount);
    if (n === null) hasMissing = true;
    else total += n;
  }
  return { total, hasMissing };
}

/** نص بطاقة العدد: "—" لو ناقص، وإلا الرقم. */
export function unreadStatValue(count: unknown): string {
  const n = parseUnreadCount(count);
  return n === null ? "—" : String(n);
}

/** رفض الوصول من الباك اند (ابن غير مرتبط بولي الأمر). 401 لا يُحسب هون — له معالجة جلسة عامة. */
export function isForbiddenError(error: unknown): boolean {
  return error instanceof ApiError && error.status === 403;
}

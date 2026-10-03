// نتيجة العمليات (WP-00 — العقد C-22). كل POST/PUT/DELETE بالباك اند (حسب Swagger) بيرجع
// OperationResult؛ الفشل المنطقي (رصيد غير كافٍ، تعارض موعد، سياسة إلغاء...) بيجي بـ
// HTTP 200 مع success=false — فلازم نتحقق منه دائمًا بدل ما نفترض النجاح.

import { cleanBackendMessage, currentLang } from "./client";

export interface OperationResult {
  success: boolean;
  message?: string | null;
  /** رقم الكيان المُنشأ/المتأثر (مثلاً رقم الحجز أو الكورس الجديد). */
  returnId?: number | null;
  isNameChanged?: boolean;
  newName?: string | null;
  isAvatarChanged?: boolean;
  newAvatar?: string | null;
  oldAvatar?: string | null;
  fileName?: string | null;
}

/**
 * يرمي Error برسالة الباك اند (منظّفة) لو success=false، أو بالرسالة الاحتياطية لو ما
 * وصلت رسالة. رد فاضي/غير كائن بيُعامل كفشل أيضًا: كل عمليات الكتابة الموثّقة بترجع
 * OperationResult، فغيابه معناه ردّ غير متوقع وما منسمح بنجاح صامت.
 */
export function assertOk(
  result: OperationResult | null | undefined,
  fallbackAr: string,
  fallbackEn: string,
): void {
  if (result && typeof result === "object" && result.success === true) return;
  const backend = result && typeof result === "object" ? result.message : null;
  if (typeof backend === "string" && backend.trim()) {
    throw new Error(cleanBackendMessage(backend));
  }
  throw new Error(currentLang() === "ar" ? fallbackAr : fallbackEn);
}

/** رقم الكيان من returnId (أو null لو غير موجود/غير رقمي). استدعِه بعد assertOk. */
export function getReturnId(result: OperationResult | null | undefined): number | null {
  const id = result?.returnId;
  return typeof id === "number" && Number.isFinite(id) ? id : null;
}

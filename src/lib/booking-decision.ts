// تحقق نقي لقرار المعلم على طلب الحجز (WP-T5: T5-02 / T5-03). Booking/Decide {bookingId, accept, rejectionReason}.
// الرفض يتطلب سببًا (قاعدة واجهة: الطالب يستحق أن يعرف السبب — SRS FR-T10)؛ والباك اند هو المرجع النهائي.
// ⚠️ حد أعلى واجهي للسبب (500) افتراض غير موثّق.

export const MAX_REJECTION_REASON = 500;

export type DecisionKind = "accept" | "reject";
export type DecisionError = "reason_required" | "reason_too_long";

/** السبب بعد القص؛ فاضي = null (القبول لا يرسل سببًا). */
export function normalizeReason(reason: string): string | null {
  const trimmed = reason.trim();
  return trimmed ? trimmed : null;
}

/** القبول بلا شروط؛ الرفض يحتاج سببًا غير فاضي وضمن الحد. */
export function validateDecision(kind: DecisionKind, reason: string): DecisionError[] {
  if (kind === "accept") return [];
  const errors: DecisionError[] = [];
  const normalized = normalizeReason(reason);
  if (normalized === null) errors.push("reason_required");
  else if (normalized.length > MAX_REJECTION_REASON) errors.push("reason_too_long");
  return errors;
}

/** وسائط decideBooking: القبول لا يرسل سببًا حتى لو كُتب نص بالحقل. */
export function toDecisionArgs(
  kind: DecisionKind,
  reason: string,
): { accept: boolean; rejectionReason: string | null } {
  return kind === "accept"
    ? { accept: true, rejectionReason: null }
    : { accept: false, rejectionReason: normalizeReason(reason) };
}

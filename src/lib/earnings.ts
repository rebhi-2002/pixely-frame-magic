// منطق أرباح المعلم النقي (WP-W2) — مفصول عن الصفحة كي يُختبر بدون React.
//
// ⚠️ لا أرقام مخترعة: الباك اند ما عنده endpoint لملخص الأرباح ولا لنسبة العمولة (Q-12).
// فالواجهة بتفلتر محليًا «آخر N حركة» (حرفيًا) وبتسمّيها بصراحة، ولا بتحسب مجاميع أو نسب.

import { WalletTransactionType, type WalletTransactionDto } from "@/integrations/backend/wallet";

/** عدد الحركات المجلوبة لنافذة «آخر الإيداعات». التسمية بالواجهة لازم تذكر هالرقم. */
export const EARNINGS_WINDOW_SIZE = 50;

/** مراحل طلب السحب كما تُعرض (ترتيب المسار الطبيعي)، دون endpoint جديد. */
export const WITHDRAWAL_STAGES = [
  { key: "pending", ar: "قيد المراجعة", en: "Pending review" },
  { key: "approved", ar: "موافق عليه — بانتظار التحويل", en: "Approved — awaiting transfer" },
  { key: "completed", ar: "مكتمل", en: "Completed" },
] as const;

/**
 * إيداعات الأرباح (type=InstructorCredit) من نافذة الحركات، الأحدث أولًا. ما بنستبعد
 * أي حالة (مثلاً Reversed) كي ما نخفي حركة حقيقية — الواجهة بتعرض حالتها.
 */
export function pickInstructorCredits(
  transactions: ReadonlyArray<WalletTransactionDto>,
): WalletTransactionDto[] {
  return transactions
    .filter((t) => t.type === WalletTransactionType.InstructorCredit)
    .sort((a, b) => timeOf(b.createdOn) - timeOf(a.createdOn));
}

function timeOf(value: string): number {
  const t = new Date(value).getTime();
  return Number.isNaN(t) ? 0 : t;
}

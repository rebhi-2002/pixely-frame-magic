// بيانات ثابتة (in-memory) لصفحات "المعلم: متابعة ومال" — التصحيح،
// التحليلات، الأرباح. نفس مبدأ باقي ملفات *-data.ts.

export type GradingStatus = "بانتظار" | "مُصحّح";

export interface GradingItemRow {
  id: string;
  studentName: string;
  itemTitle: string;
  submittedLabel: string;
  status: GradingStatus;
  overdue: boolean;
}

// فاضية بقصد — أعمال طلاب حقيقيين تنتظر تصحيح، ما في طلاب حقيقيين بعد.
export const GRADING_ITEMS: GradingItemRow[] = [];

export type MissedPriority = "أولوية" | "مراجعة";

export interface MissedQuestionRow {
  id: string;
  questionTitle: string;
  wrongPercent: number;
  priority: MissedPriority;
}

// فاضية بقصد — هاي إحصاءات تحليلية عن أداء طلاب حقيقيين، وما في طلاب
// حقيقيين بعد. بتتعبى تلقائياً لما توصل بيانات امتحانات فعلية.
export const MISSED_QUESTIONS: MissedQuestionRow[] = [];

export type TransactionStatus = "مؤكد" | "قيد التنفيذ";

export interface EarningTransactionRow {
  id: string;
  dateLabel: string;
  description: string;
  amount: number;
  status: TransactionStatus;
}

// فاضية بقصد — نموذج الدخل ونسبة العمولة لسا قيد الإعداد (نفس قرار صفحة
// "للمعلمين" العامة)، فما بنعرض ولا معاملة وهمية توحي إنه فيه أرباح حقيقية
// قبل ما يصير في نظام دفع فعلي. أول معاملة حقيقية بتضاف هون لما يجهز الباك اند.
export const EARNING_TRANSACTIONS: EarningTransactionRow[] = [];

export interface EarningsSettings {
  /** null = لسا ما تقرر رسميًا. لا تحطّ رقم افتراضي هون. */
  platformFeePercent: number | null;
}

export const EARNINGS_SETTINGS: EarningsSettings = { platformFeePercent: null };

export function nextFollowUpId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

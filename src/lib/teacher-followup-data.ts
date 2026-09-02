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

export const GRADING_ITEMS: GradingItemRow[] = [
  {
    id: "gr-1",
    studentName: "أحمد ع.",
    itemTitle: "امتحان وحدة 4 — مقالي",
    submittedLabel: "اليوم 10:12",
    status: "بانتظار",
    overdue: false,
  },
  {
    id: "gr-2",
    studentName: "سما ح.",
    itemTitle: "ورقة عمل مرفوعة",
    submittedLabel: "أمس",
    status: "بانتظار",
    overdue: true,
  },
  {
    id: "gr-3",
    studentName: "يزن م.",
    itemTitle: "امتحان وحدة 3",
    submittedLabel: "2026/07/28",
    status: "مُصحّح",
    overdue: false,
  },
];

export type MissedPriority = "أولوية" | "مراجعة";

export interface MissedQuestionRow {
  id: string;
  questionTitle: string;
  wrongPercent: number;
  priority: MissedPriority;
}

export const MISSED_QUESTIONS: MissedQuestionRow[] = [
  { id: "mq-1", questionTitle: "تكامل بالتجزيء — سؤال 7", wrongPercent: 68, priority: "أولوية" },
  { id: "mq-2", questionTitle: "قاعدة السلسلة — سؤال 3", wrongPercent: 54, priority: "مراجعة" },
  {
    id: "mq-3",
    questionTitle: "النهايات اللانهائية — سؤال 11",
    wrongPercent: 41,
    priority: "مراجعة",
  },
];

export type TransactionStatus = "مؤكد" | "قيد التنفيذ";

export interface EarningTransactionRow {
  id: string;
  dateLabel: string;
  description: string;
  amount: number;
  status: TransactionStatus;
}

export const EARNING_TRANSACTIONS: EarningTransactionRow[] = [
  {
    id: "et-1",
    dateLabel: "2026/07/30",
    description: "اشتراك كورس تفاضل",
    amount: 45,
    status: "مؤكد",
  },
  {
    id: "et-2",
    dateLabel: "2026/07/28",
    description: "طلب سحب",
    amount: -500,
    status: "قيد التنفيذ",
  },
  { id: "et-3", dateLabel: "2026/07/25", description: "اشتراك مراجعة", amount: 15, status: "مؤكد" },
];

export interface EarningsSettings {
  platformFeePercent: number;
}

export const EARNINGS_SETTINGS: EarningsSettings = { platformFeePercent: 15 };

export function nextFollowUpId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

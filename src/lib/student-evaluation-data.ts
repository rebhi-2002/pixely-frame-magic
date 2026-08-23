// بيانات ثابتة (in-memory) لصفحات "تقييم وإنجاز" بمساحة الطالب — محاكي
// الامتحان، بنك الأخطاء، الإنجاز، شهاداتي. نفس مبدأ باقي ملفات *-data.ts.

export interface MockExamRow {
  id: string;
  title: string;
  questionsCount: number;
  minutesLimit: number;
}

export const MOCK_EXAMS: MockExamRow[] = [
  { id: "mex-1", title: "رياضيات — نموذج وزاري كامل", questionsCount: 40, minutesLimit: 60 },
  { id: "mex-2", title: "فيزياء — الوحدات 1-3", questionsCount: 25, minutesLimit: 35 },
  { id: "mex-3", title: "كيمياء — امتحان سريع", questionsCount: 10, minutesLimit: 12 },
];

export interface ExamAttemptRow {
  id: string;
  examTitle: string;
  dateLabel: string;
  scorePercent: number;
  minutesTaken: number;
}

export const EXAM_ATTEMPTS: ExamAttemptRow[] = [
  {
    id: "att-1",
    examTitle: "رياضيات — نموذج 2",
    dateLabel: "2026/07/28",
    scorePercent: 88,
    minutesTaken: 54,
  },
  {
    id: "att-2",
    examTitle: "فيزياء — وحدة 2",
    dateLabel: "2026/07/21",
    scorePercent: 72,
    minutesTaken: 31,
  },
  {
    id: "att-3",
    examTitle: "كيمياء — سريع",
    dateLabel: "2026/07/14",
    scorePercent: 54,
    minutesTaken: 11,
  },
];

export type MistakeStatus = "أولوية" | "مراجعة" | "مُتقن";

export interface MistakeRow {
  id: string;
  questionTitle: string;
  subjectName: string;
  wrongCount: number;
  status: MistakeStatus;
}

export const MISTAKES: MistakeRow[] = [
  {
    id: "mis-1",
    questionTitle: "قوانين نيوتن — الاحتكاك",
    subjectName: "الفيزياء",
    wrongCount: 4,
    status: "أولوية",
  },
  {
    id: "mis-2",
    questionTitle: "المعادلات التربيعية",
    subjectName: "الرياضيات",
    wrongCount: 3,
    status: "أولوية",
  },
  {
    id: "mis-3",
    questionTitle: "التفاعلات الطاردة",
    subjectName: "الكيمياء",
    wrongCount: 2,
    status: "مراجعة",
  },
  {
    id: "mis-4",
    questionTitle: "إعراب الجملة الاسمية",
    subjectName: "اللغة العربية",
    wrongCount: 1,
    status: "مُتقن",
  },
];

export interface BadgeRow {
  id: string;
  title: string;
  subtitle: string;
  unlocked: boolean;
}

export const BADGES: BadgeRow[] = [
  { id: "bdg-1", title: "مُتقن المشتقات", subtitle: "رياضيات · وحدة 4", unlocked: true },
  { id: "bdg-2", title: "21 يوم متتالي", subtitle: "انتظام", unlocked: true },
  { id: "bdg-3", title: "صائد الأخطاء", subtitle: "أتقن 50 خطأ", unlocked: false },
];

export type CertificateStatus = "صادرة" | "قيد الإصدار";

export interface CertificateRow {
  id: string;
  courseTitle: string;
  code: string;
  status: CertificateStatus;
  shareCount: number;
}

export const CERTIFICATES: CertificateRow[] = [
  {
    id: "cert-1",
    courseTitle: "مهارات المراجعة الذكية",
    code: "ACD-2026-0142",
    status: "صادرة",
    shareCount: 3,
  },
  {
    id: "cert-2",
    courseTitle: "أساسيات الكيمياء",
    code: "ACD-2026-0091",
    status: "صادرة",
    shareCount: 2,
  },
];

export function nextEvalId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

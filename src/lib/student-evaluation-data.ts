// بيانات ثابتة (in-memory) لصفحات "تقييم وإنجاز" بمساحة الطالب — محاكي
// الامتحان، بنك الأخطاء، الإنجاز، شهاداتي. نفس مبدأ باقي ملفات *-data.ts.
//
// ملاحظة مهمة: MOCK_EXAMS تحت هي قوالب امتحانات (محتوى، مش بيانات شخصية)
// فبقيت كما هي. أما EXAM_ATTEMPTS وMISTAKES وBADGES وCERTIFICATES فكانت
// تحتوي صفوف بيانات إنجاز شخصي وهمية (محاولات امتحان، أخطاء، شارات
// "مفتوحة"، شهادات "صادرة") تظهر لأي مستخدم يسجّل دخول وكأنها إنجازه
// الفعلي — قبل ما يستخدم المنصة إطلاقاً. صفّرت الأربعة عمدًا (2026-09-17):
// كل صفحة مستهلكة (exam-simulator, mistakes-bank, achievements,
// my-certificates, parent.report) عندها أصلاً حالة فراغ صادقة (EmptyState)
// جاهزة، فما احتجنا أي تعديل واجهة — بس شيل البيانات الابتدائية الوهمية.

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

/** فاضية عمداً — راجع الملاحظة أعلى الملف. تُملأ فعليًا لما يبدأ طلاب
 *  حقيقيون يحلّوا امتحانات فعلاً (عبر saveExamAttempt بـ
 *  student-evaluation.functions.ts)، مش بصفوف بذرة. */
export const EXAM_ATTEMPTS: ExamAttemptRow[] = [];

export type MistakeStatus = "أولوية" | "مراجعة" | "مُتقن";

export interface MistakeRow {
  id: string;
  questionTitle: string;
  subjectName: string;
  wrongCount: number;
  status: MistakeStatus;
}

/** فاضية عمداً — راجع الملاحظة أعلى الملف. */
export const MISTAKES: MistakeRow[] = [];

export interface BadgeRow {
  id: string;
  title: string;
  subtitle: string;
  unlocked: boolean;
}

/** فاضية عمداً — راجع الملاحظة أعلى الملف. لسا مافي آلية حقيقية "تمنح"
 *  الشارة تلقائيًا (لا يوجد Achievements/Badges endpoint بالباك اند بعد،
 *  راجع docs/api/frontend-integration-status.md)، فأي شارة "مفتوحة" حاليًا
 *  بتنضاف يدويًا (صفحة /achievements، خلف صلاحية student_achievements) —
 *  قرار مين بالضبط يقدر يمنحها (أدمن/معلم فقط، مش الطالب لنفسه) قرار
 *  منتج منفصل لسا ما اتحسم، راجعه قبل ما تفتح الصلاحية لأي دور. */
export const BADGES: BadgeRow[] = [];

export type CertificateStatus = "صادرة" | "قيد الإصدار";

export interface CertificateRow {
  id: string;
  courseTitle: string;
  code: string;
  status: CertificateStatus;
  shareCount: number;
}

/** فاضية عمداً — نفس ملاحظة BADGES فوق بالضبط، وأهم: صفحة /certificate
 *  العامة بتتحقق من صحة رقم الشهادة اعتمادًا على وجوده بهاي القائمة —
 *  فأي صف هون بصير "شهادة صالحة" فعليًا بصفحة التحقق العامة. لا تضف صف
 *  هون إلا لشهادة صدرت فعلاً. */
export const CERTIFICATES: CertificateRow[] = [];

export function nextEvalId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

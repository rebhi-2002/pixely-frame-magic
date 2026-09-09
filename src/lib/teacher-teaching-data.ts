// بيانات ثابتة (in-memory) لصفحات "المعلم: تدريس" — كورساتي، المحتوى،
// الاختبارات، لوحة المعلم. نفس مبدأ باقي ملفات *-data.ts.

export type TeacherCourseStatus = "منشور" | "مسوّدة";

export interface TeacherCourseRow {
  id: string;
  title: string;
  price: number;
  enrolledCount: number;
  status: TeacherCourseStatus;
}

export const TEACHER_COURSES: TeacherCourseRow[] = [
  // أصفار بقصد — ما في طلاب حقيقيين مشتركين بعد، ما بنعرض رقم مختلق
  // (ونفس الوقت صحّحنا عدم منطقية "مسودة" وعندها مشتركين أصلاً).
  { id: "tc-1", title: "تفاضل وتكامل — الوزاري", price: 45, enrolledCount: 0, status: "منشور" },
  { id: "tc-2", title: "مراجعة ليلة الامتحان", price: 15, enrolledCount: 0, status: "منشور" },
  { id: "tc-3", title: "أساسيات الجبر", price: 0, enrolledCount: 0, status: "مسوّدة" },
];

export type ContentStatus = "منشور" | "قيد المراجعة" | "مسوّدة";

export interface ContentItemRow {
  id: string;
  title: string;
  subjectName: string;
  status: ContentStatus;
  viewsCount: number;
}

export const CONTENT_ITEMS: ContentItemRow[] = [
  {
    id: "ci-1",
    title: "الدوال — شرح كامل",
    subjectName: "رياضيات",
    status: "قيد المراجعة",
    viewsCount: 0,
  },
  // أصفار بقصد — مشاهدات طلاب حقيقيين، ما توفرت بعد.
  { id: "ci-2", title: "قوانين نيوتن", subjectName: "فيزياء", status: "منشور", viewsCount: 0 },
  {
    id: "ci-3",
    title: "ورقة تدريب المشتقات",
    subjectName: "رياضيات",
    status: "مسوّدة",
    viewsCount: 0,
  },
  {
    id: "ci-4",
    title: "التفاعلات الكيميائية",
    subjectName: "كيمياء",
    status: "منشور",
    viewsCount: 0,
  },
];

export type QuizStatus = "نشط" | "مسوّدة";

export interface QuizItemRow {
  id: string;
  title: string;
  questionsCount: number;
  attemptsCount: number;
  avgScore: number;
  status: QuizStatus;
}

export const QUIZ_ITEMS: QuizItemRow[] = [
  {
    id: "qz-1",
    title: "رياضيات — وحدة 4",
    questionsCount: 20,
    // صفر بقصد — ما في طلاب حقيقيين أخذوا الاختبار بعد، ما بنعرض رقم مختلق.
    attemptsCount: 0,
    avgScore: 0,
    status: "نشط",
  },
  {
    id: "qz-2",
    title: "فيزياء — الحركة",
    questionsCount: 15,
    attemptsCount: 0,
    avgScore: 0,
    status: "نشط",
  },
  {
    id: "qz-3",
    title: "كيمياء — تدريب سريع",
    questionsCount: 10,
    attemptsCount: 0,
    avgScore: 0,
    status: "مسوّدة",
  },
];

export function nextTeachingId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

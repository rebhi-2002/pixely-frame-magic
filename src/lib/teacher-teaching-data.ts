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
  { id: "tc-1", title: "تفاضل وتكامل — الوزاري", price: 45, enrolledCount: 96, status: "منشور" },
  { id: "tc-2", title: "مراجعة ليلة الامتحان", price: 15, enrolledCount: 74, status: "منشور" },
  { id: "tc-3", title: "أساسيات الجبر", price: 0, enrolledCount: 48, status: "مسوّدة" },
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
  { id: "ci-2", title: "قوانين نيوتن", subjectName: "فيزياء", status: "منشور", viewsCount: 1204 },
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
    viewsCount: 732,
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
    attemptsCount: 96,
    avgScore: 74,
    status: "نشط",
  },
  {
    id: "qz-2",
    title: "فيزياء — الحركة",
    questionsCount: 15,
    attemptsCount: 74,
    avgScore: 68,
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

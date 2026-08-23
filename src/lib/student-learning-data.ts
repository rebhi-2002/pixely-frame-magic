// بيانات ثابتة (in-memory) لصفحات "تعلّم" بمساحة الطالب — لوحة المعلومات،
// كورساتي، المكتبة، البطاقات. نفس مبدأ باقي ملفات *-data.ts.

export type EnrollmentStatus = "قيد الدراسة" | "مكتمل";

export interface EnrollmentRow {
  id: string;
  courseTitle: string;
  teacherName: string;
  progressPercent: number;
  nextSessionLabel: string;
  status: EnrollmentStatus;
}

export const ENROLLMENTS: EnrollmentRow[] = [
  {
    id: "enr-1",
    courseTitle: "تفاضل وتكامل",
    teacherName: "أ. سامي",
    progressPercent: 62,
    nextSessionLabel: "الأحد 18:00",
    status: "قيد الدراسة",
  },
  {
    id: "enr-2",
    courseTitle: "فيزياء الوزاري",
    teacherName: "أ. ريم",
    progressPercent: 45,
    nextSessionLabel: "الثلاثاء 19:30",
    status: "قيد الدراسة",
  },
  {
    id: "enr-3",
    courseTitle: "عربي — بلاغة وتحليل",
    teacherName: "أ. لينا",
    progressPercent: 88,
    nextSessionLabel: "مسجّل مسبقاً",
    status: "قيد الدراسة",
  },
  {
    id: "enr-4",
    courseTitle: "مهارات المراجعة الذكية",
    teacherName: "أ. خالد",
    progressPercent: 100,
    nextSessionLabel: "—",
    status: "مكتمل",
  },
  {
    id: "enr-5",
    courseTitle: "أساسيات الكيمياء",
    teacherName: "أ. ياسر",
    progressPercent: 100,
    nextSessionLabel: "—",
    status: "مكتمل",
  },
];

export interface LibrarySubjectRow {
  id: string;
  subjectName: string;
  termLabel: string;
  unitsCount: number;
  lessonsCount: number;
  progressPercent: number;
}

export const LIBRARY_SUBJECTS: LibrarySubjectRow[] = [
  {
    id: "lib-1",
    subjectName: "الرياضيات",
    termLabel: "الفصل الأول",
    unitsCount: 6,
    lessonsCount: 32,
    progressPercent: 78,
  },
  {
    id: "lib-2",
    subjectName: "الفيزياء",
    termLabel: "الفصل الأول",
    unitsCount: 5,
    lessonsCount: 26,
    progressPercent: 54,
  },
  {
    id: "lib-3",
    subjectName: "الكيمياء",
    termLabel: "الفصل الأول",
    unitsCount: 4,
    lessonsCount: 21,
    progressPercent: 40,
  },
  {
    id: "lib-4",
    subjectName: "اللغة العربية",
    termLabel: "الفصل الأول",
    unitsCount: 5,
    lessonsCount: 30,
    progressPercent: 91,
  },
];

export interface FlashcardDeckRow {
  id: string;
  deckName: string;
  totalCards: number;
  dueCards: number;
  masteredCards: number;
}

export const FLASHCARD_DECKS: FlashcardDeckRow[] = [
  { id: "deck-1", deckName: "رياضيات — مشتقات", totalCards: 48, dueCards: 12, masteredCards: 30 },
  { id: "deck-2", deckName: "فيزياء — الحركة", totalCards: 36, dueCards: 14, masteredCards: 18 },
  { id: "deck-3", deckName: "عربي — بلاغة", totalCards: 60, dueCards: 8, masteredCards: 45 },
];

export interface DailyStudyRow {
  day: [string, string];
  minutes: number;
}

export const WEEKLY_STUDY_LOG: DailyStudyRow[] = [
  { day: ["سبت", "Sat"], minutes: 35 },
  { day: ["أحد", "Sun"], minutes: 50 },
  { day: ["اثنين", "Mon"], minutes: 42 },
  { day: ["ثلاثاء", "Tue"], minutes: 68 },
  { day: ["أربعاء", "Wed"], minutes: 55 },
  { day: ["خميس", "Thu"], minutes: 72 },
  { day: ["جمعة", "Fri"], minutes: 30 },
];

export type UpcomingTaskType = "امتحان" | "واجب" | "مراجعة";

export interface UpcomingTaskRow {
  id: string;
  title: string;
  whenLabel: string;
  type: UpcomingTaskType;
}

export const UPCOMING_TASKS: UpcomingTaskRow[] = [
  { id: "up-1", title: "امتحان فيزياء — وحدة 3", whenLabel: "غداً 9:00", type: "امتحان" },
  { id: "up-2", title: "تسليم ورقة عمل رياضيات", whenLabel: "بعد يومين", type: "واجب" },
  { id: "up-3", title: "مراجعة بطاقات كيمياء", whenLabel: "اليوم", type: "مراجعة" },
];

export interface StudyStats {
  streakDays: number;
  achievementPoints: number;
  longestStreak: number;
}

export const STUDY_STATS: StudyStats = {
  streakDays: 12,
  achievementPoints: 1240,
  longestStreak: 21,
};

export function nextStudentId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

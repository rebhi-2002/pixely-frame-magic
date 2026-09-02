// بيانات ثابتة (in-memory) لصفحات الإشراف الأكاديمي — المعلمون، نظرة
// الطلاب، التقارير. نفس مبدأ باقي ملفات *-data.ts.

export type TeacherPerfStatus = "ممتاز" | "جيد" | "تأخر تصحيح";

export interface TeacherPerformanceRow {
  id: string;
  teacherName: string;
  subjectName: string;
  studentsCount: number;
  responseHours: number;
  gradingDays: number;
  rating: number;
  status: TeacherPerfStatus;
}

export const TEACHER_PERFORMANCE: TeacherPerformanceRow[] = [
  {
    id: "tp-1",
    teacherName: "أ. سامي خالد",
    subjectName: "رياضيات",
    studentsCount: 126,
    responseHours: 3,
    gradingDays: 0.8,
    rating: 4.9,
    status: "ممتاز",
  },
  {
    id: "tp-2",
    teacherName: "أ. ريم ناصر",
    subjectName: "فيزياء",
    studentsCount: 98,
    responseHours: 9,
    gradingDays: 3.2,
    rating: 4.1,
    status: "تأخر تصحيح",
  },
  {
    id: "tp-3",
    teacherName: "أ. هدى سليم",
    subjectName: "كيمياء",
    studentsCount: 84,
    responseHours: 5,
    gradingDays: 1.5,
    rating: 4.6,
    status: "جيد",
  },
];

export type StudentRiskStatus = "متعثّر" | "مراقبة" | "منتظم";

export interface StudentRiskRow {
  id: string;
  studentName: string;
  gradeLabel: string;
  weakestSubject: string;
  weakestPercent: number;
  status: StudentRiskStatus;
}

export const STUDENT_RISK: StudentRiskRow[] = [
  {
    id: "sr-1",
    studentName: "أحمد ع.",
    gradeLabel: "11",
    weakestSubject: "كيمياء",
    weakestPercent: 40,
    status: "متعثّر",
  },
  {
    id: "sr-2",
    studentName: "سما ح.",
    gradeLabel: "9",
    weakestSubject: "رياضيات",
    weakestPercent: 48,
    status: "متعثّر",
  },
  {
    id: "sr-3",
    studentName: "يزن م.",
    gradeLabel: "10",
    weakestSubject: "فيزياء",
    weakestPercent: 58,
    status: "مراقبة",
  },
];

export interface SupervisionReportRow {
  id: string;
  title: string;
  formatLabel: string;
  downloadsCount: number;
}

export const SUPERVISION_REPORTS: SupervisionReportRow[] = [
  {
    id: "rp-1",
    title: "تقرير جودة التدريس — يوليو",
    formatLabel: "PDF · 12 صفحة",
    downloadsCount: 21,
  },
  { id: "rp-2", title: "تقرير الإتقان بالمواد", formatLabel: "XLSX", downloadsCount: 14 },
  { id: "rp-3", title: "تقرير الالتزام الأسبوعي", formatLabel: "PDF · 6 صفحات", downloadsCount: 7 },
];

export interface SupervisionSettings {
  reportFrequencyLabel: string;
  dataAnonymised: boolean;
  improvedThisMonth: number;
}

export const SUPERVISION_SETTINGS: SupervisionSettings = {
  reportFrequencyLabel: "أسبوعي",
  dataAnonymised: true,
  improvedThisMonth: 184,
};

export function nextOversightId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

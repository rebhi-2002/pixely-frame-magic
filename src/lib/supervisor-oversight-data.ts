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

// أصفار/فاضية بقصد — كل هاي الجداول بتعرض بيانات معلمين وطلاب حقيقيين
// (مو بيانات المستخدم نفسه)، وما في معلمين/طلاب حقيقيين على المنصة بعد.
// بتتعبى تلقائياً لما يبدأ نشاط حقيقي، بدون أي تعديل كود.
export const TEACHER_PERFORMANCE: TeacherPerformanceRow[] = [];

export type StudentRiskStatus = "متعثّر" | "مراقبة" | "منتظم";

export interface StudentRiskRow {
  id: string;
  studentName: string;
  gradeLabel: string;
  weakestSubject: string;
  weakestPercent: number;
  status: StudentRiskStatus;
}

export const STUDENT_RISK: StudentRiskRow[] = [];

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
    // صفر بقصد — لا تنزيلات حقيقية بعد.
    downloadsCount: 0,
  },
  { id: "rp-2", title: "تقرير الإتقان بالمواد", formatLabel: "XLSX", downloadsCount: 0 },
  { id: "rp-3", title: "تقرير الالتزام الأسبوعي", formatLabel: "PDF · 6 صفحات", downloadsCount: 0 },
];

export interface SupervisionSettings {
  reportFrequencyLabel: string;
  dataAnonymised: boolean;
  improvedThisMonth: number;
}

export const SUPERVISION_SETTINGS: SupervisionSettings = {
  reportFrequencyLabel: "أسبوعي",
  dataAnonymised: true,
  // صفر بقصد — رقم "تحسّن" مجمّع عن طلاب حقيقيين، ما في بيانات حقيقية بعد.
  improvedThisMonth: 0,
};

export function nextOversightId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

// بيانات ثابتة (in-memory) لشاشات مراجعة الأدمن — توثيق المعلمين، مراجعة
// المحتوى، بلاغات المجتمع. نفس مبدأ src/lib/rbac-static-data.ts: بديل مؤقت
// لجداول حقيقية بالباك اند، بتتحفظ التعديلات أثناء تشغيل السيرفر بس.

export type TeacherVerificationStatus = "قيد المراجعة" | "مكتمل" | "ينقص مستند" | "مرفوض";

export interface TeacherVerificationRow {
  id: string;
  teacherName: string;
  specialty: string;
  requestedOn: string;
  status: TeacherVerificationStatus;
  notes: string | null;
}

export const TEACHER_VERIFICATIONS: TeacherVerificationRow[] = [
  {
    id: "tv-1",
    teacherName: "سارة الحسن",
    specialty: "رياضيات",
    requestedOn: "2026-08-05",
    status: "قيد المراجعة",
    notes: null,
  },
  {
    id: "tv-2",
    teacherName: "محمد العلي",
    specialty: "فيزياء",
    requestedOn: "2026-08-04",
    status: "مكتمل",
    notes: null,
  },
  {
    id: "tv-3",
    teacherName: "ريم خالد",
    specialty: "لغة عربية",
    requestedOn: "2026-08-04",
    status: "ينقص مستند",
    notes: "ينقص إثبات المؤهل الجامعي",
  },
  {
    id: "tv-4",
    teacherName: "أحمد يوسف",
    specialty: "كيمياء",
    requestedOn: "2026-08-02",
    status: "قيد المراجعة",
    notes: null,
  },
];

export type ContentType = "درس" | "اختبار" | "كورس";
export type ContentStatus = "جديد" | "مراجعة ثانية" | "جاهز للاعتماد" | "معتمد" | "مرفوض";

export interface ContentSubmissionRow {
  id: string;
  title: string;
  teacherName: string;
  type: ContentType;
  status: ContentStatus;
}

export const CONTENT_SUBMISSIONS: ContentSubmissionRow[] = [
  {
    id: "cs-1",
    title: "التفاضل — الوحدة الثانية",
    teacherName: "أحمد يوسف",
    type: "درس",
    status: "جديد",
  },
  {
    id: "cs-2",
    title: "اختبار الكهرباء",
    teacherName: "لينا سمير",
    type: "اختبار",
    status: "مراجعة ثانية",
  },
  {
    id: "cs-3",
    title: "الكيمياء العضوية",
    teacherName: "ياسر علي",
    type: "كورس",
    status: "جاهز للاعتماد",
  },
];

export type ReportPriority = "عالية" | "متوسطة" | "منخفضة";
export type ReportStatus = "مفتوح" | "مغلق" | "مؤجل";

export interface CommunityReportRow {
  id: string;
  code: string;
  community: string;
  reason: string;
  priority: ReportPriority;
  status: ReportStatus;
}

export const COMMUNITY_REPORTS: CommunityReportRow[] = [
  {
    id: "cr-1",
    code: "#R-1042",
    community: "رياضيات الثانوية",
    reason: "محتوى غير مناسب",
    priority: "عالية",
    status: "مفتوح",
  },
  {
    id: "cr-2",
    code: "#R-1041",
    community: "مجتمع الفيزياء",
    reason: "إزعاج متكرر",
    priority: "متوسطة",
    status: "مفتوح",
  },
  {
    id: "cr-3",
    code: "#R-1038",
    community: "اللغة العربية",
    reason: "معلومة مضللة",
    priority: "متوسطة",
    status: "مؤجل",
  },
];

export function nextModId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

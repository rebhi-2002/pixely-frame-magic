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

// فاضية بقصد — طلبات توثيق معلمين حقيقيين، ما في طلبات حقيقية بعد.
export const TEACHER_VERIFICATIONS: TeacherVerificationRow[] = [];

export type ContentType = "درس" | "اختبار" | "كورس";
export type ContentStatus = "جديد" | "مراجعة ثانية" | "جاهز للاعتماد" | "معتمد" | "مرفوض";

export interface ContentSubmissionRow {
  id: string;
  title: string;
  teacherName: string;
  type: ContentType;
  status: ContentStatus;
}

// فاضية بقصد — محتوى مرسل من معلمين حقيقيين للمراجعة، ما في محتوى حقيقي بعد.
export const CONTENT_SUBMISSIONS: ContentSubmissionRow[] = [];

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

// فاضية بقصد — بلاغات حقيقية من مستخدمين حقيقيين، ما في بلاغات حقيقية بعد.
export const COMMUNITY_REPORTS: CommunityReportRow[] = [];

export function nextModId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

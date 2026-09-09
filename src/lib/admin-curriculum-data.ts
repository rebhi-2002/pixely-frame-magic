// بيانات ثابتة (in-memory) لشاشات المدفوعات والمنهج بلوحة الأدمن — نفس مبدأ
// src/lib/admin-moderation-data.ts.

export type PaymentStatus = "ناجحة" | "قيد المعالجة" | "مستردة" | "فاشلة";

export interface PaymentRow {
  id: string;
  code: string;
  userName: string;
  amount: number;
  status: PaymentStatus;
}

// فاضية بقصد — مافي نظام دفع فعلي متّصل بعد (راجع ملاحظة الباك اند بالتقرير)،
// فما بنعرض عمليات دفع وهمية بأسماء مستخدمين حقيقيين. بتتعبى تلقائياً لما
// يشتغل نظام الدفع الحقيقي.
export const PAYMENTS: PaymentRow[] = [];

export interface CurriculumSubjectRow {
  id: string;
  grade: string;
  group: string;
  subject: string;
  coursesCount: number;
}

// أصفار بقصد — العدد الحقيقي للكورسات المبنية فعليًا تحت كل مادة بالمنهاج،
// ومش مربوطة فعليًا ببنك الكورسات العام (public-catalog-data.ts) بعد —
// نظامين منفصلين حاليًا، فما بنعرض رقم مختلق غير متوافق مع الكتالوج الفعلي.
export const CURRICULUM_SUBJECTS: CurriculumSubjectRow[] = [
  { id: "cur-1", grade: "الثاني عشر", group: "العلمي", subject: "الفيزياء", coursesCount: 0 },
  { id: "cur-2", grade: "الثاني عشر", group: "العلمي", subject: "الرياضيات", coursesCount: 0 },
  { id: "cur-3", grade: "الحادي عشر", group: "الأدبي", subject: "اللغة العربية", coursesCount: 0 },
];

export type CurriculumEntityType = "وحدة" | "مادة" | "مجموعة" | "صف" | "كورس";
export type CurriculumRequestStatus = "جديد" | "قيد الدراسة" | "جاهز للاعتماد" | "معتمد" | "مرفوض";

export interface CurriculumRequestRow {
  id: string;
  title: string;
  requesterName: string;
  entityType: CurriculumEntityType;
  status: CurriculumRequestStatus;
}

// فاضية بقصد — طلبات تعديل منهج من معلمين/مشرفين حقيقيين، ما في طلبات
// حقيقية بعد.
export const CURRICULUM_REQUESTS: CurriculumRequestRow[] = [];

export function nextCurriculumId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

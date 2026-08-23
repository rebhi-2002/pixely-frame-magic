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

export const PAYMENTS: PaymentRow[] = [
  { id: "pay-1", code: "#PAY-9281", userName: "عمر سليم", amount: 49, status: "ناجحة" },
  { id: "pay-2", code: "#PAY-9280", userName: "سارة كامل", amount: 89, status: "قيد المعالجة" },
  { id: "pay-3", code: "#PAY-9274", userName: "ليان أحمد", amount: 29, status: "مستردة" },
];

export interface CurriculumSubjectRow {
  id: string;
  grade: string;
  group: string;
  subject: string;
  coursesCount: number;
}

export const CURRICULUM_SUBJECTS: CurriculumSubjectRow[] = [
  { id: "cur-1", grade: "الثاني عشر", group: "العلمي", subject: "الفيزياء", coursesCount: 8 },
  { id: "cur-2", grade: "الثاني عشر", group: "العلمي", subject: "الرياضيات", coursesCount: 11 },
  { id: "cur-3", grade: "الحادي عشر", group: "الأدبي", subject: "اللغة العربية", coursesCount: 6 },
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

export const CURRICULUM_REQUESTS: CurriculumRequestRow[] = [
  {
    id: "creq-1",
    title: "إضافة وحدة الموجات",
    requesterName: "د. خالد عمر",
    entityType: "وحدة",
    status: "جديد",
  },
  {
    id: "creq-2",
    title: "تحديث ترتيب الكيمياء",
    requesterName: "سلمى حسن",
    entityType: "مادة",
    status: "قيد الدراسة",
  },
  {
    id: "creq-3",
    title: "إضافة مجموعة أدبي",
    requesterName: "المشرف الأكاديمي",
    entityType: "مجموعة",
    status: "جاهز للاعتماد",
  },
];

export function nextCurriculumId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

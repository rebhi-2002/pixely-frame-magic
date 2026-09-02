import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuth } from "@/integrations/backend/auth-middleware";
import { requirePageAction } from "./rbac.server";
import { COMMUNITY_QUESTIONS } from "./student-social-data";
import {
  EARNINGS_SETTINGS,
  EARNING_TRANSACTIONS,
  GRADING_ITEMS,
  MISSED_QUESTIONS,
  nextFollowUpId,
  type EarningTransactionRow,
  type GradingItemRow,
  type MissedQuestionRow,
} from "./teacher-followup-data";

// ---------------------------------------------------------------------------
// التصحيح
// ---------------------------------------------------------------------------

export const listGradingItems = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "teacher_grading", "view_list");
    return GRADING_ITEMS;
  });

export const saveGradingItem = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        studentName: z.string().trim().min(2, "اسم الطالب مطلوب"),
        itemTitle: z.string().trim().min(2, "العنوان مطلوب"),
        submittedLabel: z.string().trim().min(1),
        status: z.enum(["بانتظار", "مُصحّح"]),
        overdue: z.boolean(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "teacher_grading", data.id ? "edit" : "execute_add");
    if (data.id) {
      const row = GRADING_ITEMS.find((r) => r.id === data.id);
      if (!row) throw new Error("العنصر غير موجود");
      Object.assign(row, data);
    } else {
      const row: GradingItemRow = { id: nextFollowUpId("gr"), ...data };
      GRADING_ITEMS.push(row);
    }
    return { ok: true };
  });

export const deleteGradingItem = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "teacher_grading", "delete");
    const idx = GRADING_ITEMS.findIndex((r) => r.id === data.id);
    if (idx !== -1) GRADING_ITEMS.splice(idx, 1);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// التحليلات — الأسئلة الأكثر خطأً (إتقان الوحدات مُشتق من الاختبارات الفعلية)
// ---------------------------------------------------------------------------

export const listMissedQuestions = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "teacher_analytics", "view_list");
    return MISSED_QUESTIONS;
  });

export const saveMissedQuestion = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        questionTitle: z.string().trim().min(2, "السؤال مطلوب"),
        wrongPercent: z.number().min(0).max(100),
        priority: z.enum(["أولوية", "مراجعة"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "teacher_analytics", data.id ? "edit" : "execute_add");
    if (data.id) {
      const row = MISSED_QUESTIONS.find((r) => r.id === data.id);
      if (!row) throw new Error("السؤال غير موجود");
      Object.assign(row, data);
    } else {
      const row: MissedQuestionRow = { id: nextFollowUpId("mq"), ...data };
      MISSED_QUESTIONS.push(row);
    }
    return { ok: true };
  });

export const deleteMissedQuestion = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "teacher_analytics", "delete");
    const idx = MISSED_QUESTIONS.findIndex((r) => r.id === data.id);
    if (idx !== -1) MISSED_QUESTIONS.splice(idx, 1);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// الأرباح
// ---------------------------------------------------------------------------

export const listEarningTransactions = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "teacher_earnings", "view_list");
    return EARNING_TRANSACTIONS;
  });

export const saveEarningTransaction = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        dateLabel: z.string().trim().min(1, "التاريخ مطلوب"),
        description: z.string().trim().min(2, "الوصف مطلوب"),
        amount: z.number(),
        status: z.enum(["مؤكد", "قيد التنفيذ"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "teacher_earnings", data.id ? "edit" : "execute_add");
    if (data.id) {
      const row = EARNING_TRANSACTIONS.find((r) => r.id === data.id);
      if (!row) throw new Error("الحركة غير موجودة");
      Object.assign(row, data);
    } else {
      const row: EarningTransactionRow = { id: nextFollowUpId("et"), ...data };
      EARNING_TRANSACTIONS.push(row);
    }
    return { ok: true };
  });

export const deleteEarningTransaction = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "teacher_earnings", "delete");
    const idx = EARNING_TRANSACTIONS.findIndex((r) => r.id === data.id);
    if (idx !== -1) EARNING_TRANSACTIONS.splice(idx, 1);
    return { ok: true };
  });

export const getEarningsSettings = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "teacher_earnings", "view_list");
    return EARNINGS_SETTINGS;
  });

// ---------------------------------------------------------------------------
// مجتمع الصف — قراءة وإجابة (بمنظور المعلم، نفس بيانات مجتمع الطالب)
// ---------------------------------------------------------------------------

export const listClassQuestions = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "teacher_community", "view_list");
    return COMMUNITY_QUESTIONS;
  });

export const answerClassQuestion = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "teacher_community", "edit");
    const row = COMMUNITY_QUESTIONS.find((r) => r.id === data.id);
    if (!row) throw new Error("السؤال غير موجود");
    row.status = "إجابة معلم";
    row.answersCount += 1;
    return { ok: true };
  });

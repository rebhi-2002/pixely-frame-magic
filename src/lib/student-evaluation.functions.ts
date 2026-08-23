import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuth } from "@/integrations/backend/auth-middleware";
import { requirePageAction } from "./rbac.server";
import {
  BADGES,
  CERTIFICATES,
  EXAM_ATTEMPTS,
  MISTAKES,
  MOCK_EXAMS,
  nextEvalId,
  type BadgeRow,
  type CertificateRow,
  type ExamAttemptRow,
  type MistakeRow,
  type MockExamRow,
} from "./student-evaluation-data";

// ---------------------------------------------------------------------------
// محاكي الامتحان
// ---------------------------------------------------------------------------

export const listMockExams = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "student_exam", "view_list");
    return MOCK_EXAMS;
  });

export const saveMockExam = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        title: z.string().trim().min(2, "العنوان مطلوب"),
        questionsCount: z.number().int().min(1),
        minutesLimit: z.number().int().min(1),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_exam", data.id ? "edit" : "execute_add");
    if (data.id) {
      const row = MOCK_EXAMS.find((r) => r.id === data.id);
      if (!row) throw new Error("الامتحان غير موجود");
      Object.assign(row, data);
    } else {
      const row: MockExamRow = { id: nextEvalId("mex"), ...data };
      MOCK_EXAMS.push(row);
    }
    return { ok: true };
  });

export const deleteMockExam = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_exam", "delete");
    const idx = MOCK_EXAMS.findIndex((r) => r.id === data.id);
    if (idx !== -1) MOCK_EXAMS.splice(idx, 1);
    return { ok: true };
  });

export const listExamAttempts = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "student_exam", "view_list");
    return EXAM_ATTEMPTS;
  });

export const saveExamAttempt = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        examTitle: z.string().trim().min(2, "اسم الامتحان مطلوب"),
        dateLabel: z.string().trim().min(1, "التاريخ مطلوب"),
        scorePercent: z.number().min(0).max(100),
        minutesTaken: z.number().int().min(0),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_exam", data.id ? "edit" : "execute_add");
    if (data.id) {
      const row = EXAM_ATTEMPTS.find((r) => r.id === data.id);
      if (!row) throw new Error("النتيجة غير موجودة");
      Object.assign(row, data);
    } else {
      const row: ExamAttemptRow = { id: nextEvalId("att"), ...data };
      EXAM_ATTEMPTS.push(row);
    }
    return { ok: true };
  });

export const deleteExamAttempt = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_exam", "delete");
    const idx = EXAM_ATTEMPTS.findIndex((r) => r.id === data.id);
    if (idx !== -1) EXAM_ATTEMPTS.splice(idx, 1);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// بنك الأخطاء
// ---------------------------------------------------------------------------

export const listMistakes = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "student_mistakes", "view_list");
    return MISTAKES;
  });

export const saveMistake = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        questionTitle: z.string().trim().min(2, "السؤال مطلوب"),
        subjectName: z.string().trim().min(2, "المادة مطلوبة"),
        wrongCount: z.number().int().min(1),
        status: z.enum(["أولوية", "مراجعة", "مُتقن"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_mistakes", data.id ? "edit" : "execute_add");
    if (data.id) {
      const row = MISTAKES.find((r) => r.id === data.id);
      if (!row) throw new Error("الخطأ غير موجود");
      Object.assign(row, data);
    } else {
      const row: MistakeRow = { id: nextEvalId("mis"), ...data };
      MISTAKES.push(row);
    }
    return { ok: true };
  });

export const deleteMistake = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_mistakes", "delete");
    const idx = MISTAKES.findIndex((r) => r.id === data.id);
    if (idx !== -1) MISTAKES.splice(idx, 1);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// الإنجاز
// ---------------------------------------------------------------------------

export const listBadges = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "student_achievements", "view_list");
    return BADGES;
  });

export const saveBadge = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        title: z.string().trim().min(2, "العنوان مطلوب"),
        subtitle: z.string().trim().min(1, "الوصف مطلوب"),
        unlocked: z.boolean(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(
      context.userId,
      "student_achievements",
      data.id ? "edit" : "execute_add",
    );
    if (data.id) {
      const row = BADGES.find((r) => r.id === data.id);
      if (!row) throw new Error("الشارة غير موجودة");
      Object.assign(row, data);
    } else {
      const row: BadgeRow = { id: nextEvalId("bdg"), ...data };
      BADGES.push(row);
    }
    return { ok: true };
  });

export const deleteBadge = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_achievements", "delete");
    const idx = BADGES.findIndex((r) => r.id === data.id);
    if (idx !== -1) BADGES.splice(idx, 1);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// شهاداتي
// ---------------------------------------------------------------------------

export const listCertificates = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "student_certificates", "view_list");
    return CERTIFICATES;
  });

export const saveCertificate = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        courseTitle: z.string().trim().min(2, "اسم الكورس مطلوب"),
        code: z.string().trim().min(2, "الرمز مطلوب"),
        status: z.enum(["صادرة", "قيد الإصدار"]),
        shareCount: z.number().int().min(0),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(
      context.userId,
      "student_certificates",
      data.id ? "edit" : "execute_add",
    );
    if (data.id) {
      const row = CERTIFICATES.find((r) => r.id === data.id);
      if (!row) throw new Error("الشهادة غير موجودة");
      Object.assign(row, data);
    } else {
      const row: CertificateRow = { id: nextEvalId("cert"), ...data };
      CERTIFICATES.push(row);
    }
    return { ok: true };
  });

export const deleteCertificate = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_certificates", "delete");
    const idx = CERTIFICATES.findIndex((r) => r.id === data.id);
    if (idx !== -1) CERTIFICATES.splice(idx, 1);
    return { ok: true };
  });

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuth } from "@/integrations/backend/auth-middleware";
import { requirePageAction } from "./rbac.server";
import {
  SUPERVISION_REPORTS,
  SUPERVISION_SETTINGS,
  STUDENT_RISK,
  TEACHER_PERFORMANCE,
  nextOversightId,
  type StudentRiskRow,
  type TeacherPerformanceRow,
} from "./supervisor-oversight-data";
import { LIBRARY_SUBJECTS, WEEKLY_STUDY_LOG } from "./student-learning-data";
import { EXAM_ATTEMPTS, MISTAKES } from "./student-evaluation-data";
import { LINKED_CHILDREN } from "./account-pages-data";

// ---------------------------------------------------------------------------
// المعلمون (منظور الإشراف)
// ---------------------------------------------------------------------------

export const listTeacherPerformance = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "supervisor_teachers", "view_list");
    return TEACHER_PERFORMANCE;
  });

export const saveTeacherPerformance = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        teacherName: z.string().trim().min(2, "اسم المعلم مطلوب"),
        subjectName: z.string().trim().min(2, "المادة مطلوبة"),
        studentsCount: z.number().int().min(0),
        responseHours: z.number().min(0),
        gradingDays: z.number().min(0),
        rating: z.number().min(0).max(5),
        status: z.enum(["ممتاز", "جيد", "تأخر تصحيح"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(
      context.userId,
      "supervisor_teachers",
      data.id ? "edit" : "execute_add",
    );
    if (data.id) {
      const row = TEACHER_PERFORMANCE.find((r) => r.id === data.id);
      if (!row) throw new Error("المعلم غير موجود");
      Object.assign(row, data);
    } else {
      const row: TeacherPerformanceRow = { id: nextOversightId("tp"), ...data };
      TEACHER_PERFORMANCE.push(row);
    }
    return { ok: true };
  });

export const deleteTeacherPerformance = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "supervisor_teachers", "delete");
    const idx = TEACHER_PERFORMANCE.findIndex((r) => r.id === data.id);
    if (idx !== -1) TEACHER_PERFORMANCE.splice(idx, 1);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// نظرة الطلاب
// ---------------------------------------------------------------------------

export const listStudentRisk = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "supervisor_students", "view_list");
    return STUDENT_RISK;
  });

export const saveStudentRisk = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        studentName: z.string().trim().min(2, "اسم الطالب مطلوب"),
        gradeLabel: z.string().trim().min(1, "الصف مطلوب"),
        weakestSubject: z.string().trim().min(2, "المادة مطلوبة"),
        weakestPercent: z.number().min(0).max(100),
        status: z.enum(["متعثّر", "مراقبة", "منتظم"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(
      context.userId,
      "supervisor_students",
      data.id ? "edit" : "execute_add",
    );
    if (data.id) {
      const row = STUDENT_RISK.find((r) => r.id === data.id);
      if (!row) throw new Error("الطالب غير موجود");
      Object.assign(row, data);
    } else {
      const row: StudentRiskRow = { id: nextOversightId("sr"), ...data };
      STUDENT_RISK.push(row);
    }
    return { ok: true };
  });

export const deleteStudentRisk = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "supervisor_students", "delete");
    const idx = STUDENT_RISK.findIndex((r) => r.id === data.id);
    if (idx !== -1) STUDENT_RISK.splice(idx, 1);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// التقارير
// ---------------------------------------------------------------------------

export const listSupervisionReports = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "supervisor_reports", "view_list");
    return SUPERVISION_REPORTS;
  });

export const recordReportDownload = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "supervisor_reports", "edit");
    const row = SUPERVISION_REPORTS.find((r) => r.id === data.id);
    if (!row) throw new Error("التقرير غير موجود");
    row.downloadsCount += 1;
    return { ok: true };
  });

export const deleteSupervisionReport = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "supervisor_reports", "delete");
    const idx = SUPERVISION_REPORTS.findIndex((r) => r.id === data.id);
    if (idx !== -1) SUPERVISION_REPORTS.splice(idx, 1);
    return { ok: true };
  });

export const getSupervisionSettings = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "supervisor_reports", "view_list");
    return SUPERVISION_SETTINGS;
  });

// ---------------------------------------------------------------------------
// تقرير الابن (ولي أمر) — قراءة فقط، مُشتقّة من بيانات الطالب الحقيقية
// (المكتبة/سجل الدراسة/الامتحانات/الأخطاء) عبر بوابة صلاحية "parent_report".
// ---------------------------------------------------------------------------

export const getChildReport = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "parent_report", "view_list");

    const childName = LINKED_CHILDREN[0]?.childName ?? "—";
    const studyDaysCount = WEEKLY_STUDY_LOG.filter((d) => d.minutes > 0).length;
    const totalMinutes = WEEKLY_STUDY_LOG.reduce((s, d) => s + d.minutes, 0);
    const avgMastery = LIBRARY_SUBJECTS.length
      ? Math.round(
          LIBRARY_SUBJECTS.reduce((s, sub) => s + sub.progressPercent, 0) / LIBRARY_SUBJECTS.length,
        )
      : 0;
    const weakSubjects = LIBRARY_SUBJECTS.filter((s) => s.progressPercent < 50);
    const priorityMistakes = MISTAKES.filter((m) => m.status === "أولوية");

    return {
      childName,
      studyDaysCount,
      totalMinutes,
      avgMastery,
      weeklyLog: WEEKLY_STUDY_LOG,
      subjects: LIBRARY_SUBJECTS,
      weakSubjectsCount: weakSubjects.length,
      examAttempts: EXAM_ATTEMPTS,
      priorityMistakes,
    };
  });

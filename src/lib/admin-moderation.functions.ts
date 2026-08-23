import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuth } from "@/integrations/backend/auth-middleware";
import { requirePermission } from "./rbac.server";
import {
  COMMUNITY_REPORTS,
  CONTENT_SUBMISSIONS,
  TEACHER_VERIFICATIONS,
  nextModId,
  type CommunityReportRow,
  type ContentSubmissionRow,
  type TeacherVerificationRow,
} from "./admin-moderation-data";

// ---------------------------------------------------------------------------
// توثيق المعلمين
// ---------------------------------------------------------------------------

export const listTeacherVerifications = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePermission(context.userId, "admin_teachers", "view_list");
    return TEACHER_VERIFICATIONS;
  });

export const saveTeacherVerification = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        teacherName: z.string().trim().min(2, "الاسم قصير جداً"),
        specialty: z.string().trim().min(2, "التخصص مطلوب"),
        status: z.enum(["قيد المراجعة", "مكتمل", "ينقص مستند", "مرفوض"]),
        notes: z.string().trim().max(300).optional().or(z.literal("")),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePermission(context.userId, "admin_teachers", data.id ? "edit" : "execute_add");
    if (data.id) {
      const row = TEACHER_VERIFICATIONS.find((r) => r.id === data.id);
      if (!row) throw new Error("الطلب غير موجود");
      row.teacherName = data.teacherName;
      row.specialty = data.specialty;
      row.status = data.status;
      row.notes = data.notes || null;
    } else {
      const row: TeacherVerificationRow = {
        id: nextModId("tv"),
        teacherName: data.teacherName,
        specialty: data.specialty,
        requestedOn: new Date().toISOString().slice(0, 10),
        status: data.status,
        notes: data.notes || null,
      };
      TEACHER_VERIFICATIONS.push(row);
    }
    return { ok: true };
  });

export const deleteTeacherVerification = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePermission(context.userId, "admin_teachers", "delete");
    const idx = TEACHER_VERIFICATIONS.findIndex((r) => r.id === data.id);
    if (idx !== -1) TEACHER_VERIFICATIONS.splice(idx, 1);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// مراجعة المحتوى
// ---------------------------------------------------------------------------

export const listContentSubmissions = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePermission(context.userId, "admin_content_review", "view_list");
    return CONTENT_SUBMISSIONS;
  });

export const saveContentSubmission = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        title: z.string().trim().min(2, "العنوان قصير جداً"),
        teacherName: z.string().trim().min(2, "اسم المعلم مطلوب"),
        type: z.enum(["درس", "اختبار", "كورس"]),
        status: z.enum(["جديد", "مراجعة ثانية", "جاهز للاعتماد", "معتمد", "مرفوض"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePermission(
      context.userId,
      "admin_content_review",
      data.id ? "edit" : "execute_add",
    );
    if (data.id) {
      const row = CONTENT_SUBMISSIONS.find((r) => r.id === data.id);
      if (!row) throw new Error("العنصر غير موجود");
      row.title = data.title;
      row.teacherName = data.teacherName;
      row.type = data.type;
      row.status = data.status;
    } else {
      const row: ContentSubmissionRow = {
        id: nextModId("cs"),
        title: data.title,
        teacherName: data.teacherName,
        type: data.type,
        status: data.status,
      };
      CONTENT_SUBMISSIONS.push(row);
    }
    return { ok: true };
  });

export const deleteContentSubmission = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePermission(context.userId, "admin_content_review", "delete");
    const idx = CONTENT_SUBMISSIONS.findIndex((r) => r.id === data.id);
    if (idx !== -1) CONTENT_SUBMISSIONS.splice(idx, 1);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// بلاغات المجتمع
// ---------------------------------------------------------------------------

export const listCommunityReports = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePermission(context.userId, "admin_community_reports", "view_list");
    return COMMUNITY_REPORTS;
  });

export const saveCommunityReport = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        community: z.string().trim().min(2, "اسم المجتمع مطلوب"),
        reason: z.string().trim().min(2, "السبب مطلوب"),
        priority: z.enum(["عالية", "متوسطة", "منخفضة"]),
        status: z.enum(["مفتوح", "مغلق", "مؤجل"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePermission(
      context.userId,
      "admin_community_reports",
      data.id ? "edit" : "execute_add",
    );
    if (data.id) {
      const row = COMMUNITY_REPORTS.find((r) => r.id === data.id);
      if (!row) throw new Error("البلاغ غير موجود");
      row.community = data.community;
      row.reason = data.reason;
      row.priority = data.priority;
      row.status = data.status;
    } else {
      const row: CommunityReportRow = {
        id: nextModId("cr"),
        code: `#R-${Math.floor(1000 + Math.random() * 9000)}`,
        community: data.community,
        reason: data.reason,
        priority: data.priority,
        status: data.status,
      };
      COMMUNITY_REPORTS.push(row);
    }
    return { ok: true };
  });

export const deleteCommunityReport = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePermission(context.userId, "admin_community_reports", "delete");
    const idx = COMMUNITY_REPORTS.findIndex((r) => r.id === data.id);
    if (idx !== -1) COMMUNITY_REPORTS.splice(idx, 1);
    return { ok: true };
  });

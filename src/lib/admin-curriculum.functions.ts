import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuth } from "@/integrations/backend/auth-middleware";
import { requirePermission } from "./rbac.server";
import {
  CURRICULUM_REQUESTS,
  CURRICULUM_SUBJECTS,
  PAYMENTS,
  nextCurriculumId,
  type CurriculumRequestRow,
  type CurriculumSubjectRow,
  type PaymentRow,
} from "./admin-curriculum-data";

// ---------------------------------------------------------------------------
// المدفوعات
// ---------------------------------------------------------------------------

export const listPayments = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePermission(context.userId, "admin_payments", "view_list");
    return PAYMENTS;
  });

export const savePayment = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        userName: z.string().trim().min(2, "اسم المستخدم مطلوب"),
        amount: z.number().positive("القيمة يجب أن تكون أكبر من صفر"),
        status: z.enum(["ناجحة", "قيد المعالجة", "مستردة", "فاشلة"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePermission(context.userId, "admin_payments", data.id ? "edit" : "execute_add");
    if (data.id) {
      const row = PAYMENTS.find((r) => r.id === data.id);
      if (!row) throw new Error("العملية غير موجودة");
      row.userName = data.userName;
      row.amount = data.amount;
      row.status = data.status;
    } else {
      const row: PaymentRow = {
        id: nextCurriculumId("pay"),
        code: `#PAY-${Math.floor(9000 + Math.random() * 999)}`,
        userName: data.userName,
        amount: data.amount,
        status: data.status,
      };
      PAYMENTS.push(row);
    }
    return { ok: true };
  });

export const deletePayment = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePermission(context.userId, "admin_payments", "delete");
    const idx = PAYMENTS.findIndex((r) => r.id === data.id);
    if (idx !== -1) PAYMENTS.splice(idx, 1);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// المنهج الأكاديمي (المواد)
// ---------------------------------------------------------------------------

export const listCurriculumSubjects = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePermission(context.userId, "admin_curriculum", "view_list");
    return CURRICULUM_SUBJECTS;
  });

export const saveCurriculumSubject = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        grade: z.string().trim().min(2, "الصف مطلوب"),
        group: z.string().trim().min(2, "المجموعة مطلوبة"),
        subject: z.string().trim().min(2, "المادة مطلوبة"),
        coursesCount: z.number().int().min(0),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePermission(context.userId, "admin_curriculum", data.id ? "edit" : "execute_add");
    if (data.id) {
      const row = CURRICULUM_SUBJECTS.find((r) => r.id === data.id);
      if (!row) throw new Error("المادة غير موجودة");
      row.grade = data.grade;
      row.group = data.group;
      row.subject = data.subject;
      row.coursesCount = data.coursesCount;
    } else {
      const row: CurriculumSubjectRow = {
        id: nextCurriculumId("cur"),
        grade: data.grade,
        group: data.group,
        subject: data.subject,
        coursesCount: data.coursesCount,
      };
      CURRICULUM_SUBJECTS.push(row);
    }
    return { ok: true };
  });

export const deleteCurriculumSubject = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePermission(context.userId, "admin_curriculum", "delete");
    const idx = CURRICULUM_SUBJECTS.findIndex((r) => r.id === data.id);
    if (idx !== -1) CURRICULUM_SUBJECTS.splice(idx, 1);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// طلبات المنهج
// ---------------------------------------------------------------------------

export const listCurriculumRequests = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePermission(context.userId, "admin_curriculum_requests", "view_list");
    return CURRICULUM_REQUESTS;
  });

export const saveCurriculumRequest = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        title: z.string().trim().min(2, "العنوان مطلوب"),
        requesterName: z.string().trim().min(2, "اسم مقدّم الطلب مطلوب"),
        entityType: z.enum(["وحدة", "مادة", "مجموعة", "صف", "كورس"]),
        status: z.enum(["جديد", "قيد الدراسة", "جاهز للاعتماد", "معتمد", "مرفوض"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePermission(
      context.userId,
      "admin_curriculum_requests",
      data.id ? "edit" : "execute_add",
    );
    if (data.id) {
      const row = CURRICULUM_REQUESTS.find((r) => r.id === data.id);
      if (!row) throw new Error("الطلب غير موجود");
      row.title = data.title;
      row.requesterName = data.requesterName;
      row.entityType = data.entityType;
      row.status = data.status;
    } else {
      const row: CurriculumRequestRow = {
        id: nextCurriculumId("creq"),
        title: data.title,
        requesterName: data.requesterName,
        entityType: data.entityType,
        status: data.status,
      };
      CURRICULUM_REQUESTS.push(row);
    }
    return { ok: true };
  });

export const deleteCurriculumRequest = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePermission(context.userId, "admin_curriculum_requests", "delete");
    const idx = CURRICULUM_REQUESTS.findIndex((r) => r.id === data.id);
    if (idx !== -1) CURRICULUM_REQUESTS.splice(idx, 1);
    return { ok: true };
  });

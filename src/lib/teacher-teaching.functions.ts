import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuth } from "@/integrations/backend/auth-middleware";
import { requirePageAction } from "./rbac.server";
import { COMMUNITY_QUESTIONS } from "./student-social-data";
import {
  CONTENT_ITEMS,
  QUIZ_ITEMS,
  TEACHER_COURSES,
  nextTeachingId,
  type ContentItemRow,
  type QuizItemRow,
  type TeacherCourseRow,
} from "./teacher-teaching-data";

// ---------------------------------------------------------------------------
// كورساتي (معلم)
// ---------------------------------------------------------------------------

export const listTeacherCourses = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "teacher_courses", "view_list");
    return TEACHER_COURSES;
  });

export const saveTeacherCourse = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        title: z.string().trim().min(2, "اسم الكورس مطلوب"),
        price: z.number().min(0),
        enrolledCount: z.number().int().min(0),
        status: z.enum(["منشور", "مسوّدة"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "teacher_courses", data.id ? "edit" : "execute_add");
    if (data.id) {
      const row = TEACHER_COURSES.find((r) => r.id === data.id);
      if (!row) throw new Error("الكورس غير موجود");
      Object.assign(row, data);
    } else {
      const row: TeacherCourseRow = { id: nextTeachingId("tc"), ...data };
      TEACHER_COURSES.push(row);
    }
    return { ok: true };
  });

export const deleteTeacherCourse = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "teacher_courses", "delete");
    const idx = TEACHER_COURSES.findIndex((r) => r.id === data.id);
    if (idx !== -1) TEACHER_COURSES.splice(idx, 1);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// المحتوى
// ---------------------------------------------------------------------------

export const listContentItems = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "teacher_content", "view_list");
    return CONTENT_ITEMS;
  });

export const saveContentItem = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        title: z.string().trim().min(2, "العنوان مطلوب"),
        subjectName: z.string().trim().min(2, "المادة مطلوبة"),
        status: z.enum(["منشور", "قيد المراجعة", "مسوّدة"]),
        viewsCount: z.number().int().min(0),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "teacher_content", data.id ? "edit" : "execute_add");
    if (data.id) {
      const row = CONTENT_ITEMS.find((r) => r.id === data.id);
      if (!row) throw new Error("العنصر غير موجود");
      Object.assign(row, data);
    } else {
      const row: ContentItemRow = { id: nextTeachingId("ci"), ...data };
      CONTENT_ITEMS.push(row);
    }
    return { ok: true };
  });

export const deleteContentItem = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "teacher_content", "delete");
    const idx = CONTENT_ITEMS.findIndex((r) => r.id === data.id);
    if (idx !== -1) CONTENT_ITEMS.splice(idx, 1);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// الاختبارات
// ---------------------------------------------------------------------------

export const listQuizItems = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "teacher_quizzes", "view_list");
    return QUIZ_ITEMS;
  });

export const saveQuizItem = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        title: z.string().trim().min(2, "اسم الاختبار مطلوب"),
        questionsCount: z.number().int().min(1),
        attemptsCount: z.number().int().min(0),
        avgScore: z.number().min(0).max(100),
        status: z.enum(["نشط", "مسوّدة"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "teacher_quizzes", data.id ? "edit" : "execute_add");
    if (data.id) {
      const row = QUIZ_ITEMS.find((r) => r.id === data.id);
      if (!row) throw new Error("الاختبار غير موجود");
      Object.assign(row, data);
    } else {
      const row: QuizItemRow = { id: nextTeachingId("qz"), ...data };
      QUIZ_ITEMS.push(row);
    }
    return { ok: true };
  });

export const deleteQuizItem = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "teacher_quizzes", "delete");
    const idx = QUIZ_ITEMS.findIndex((r) => r.id === data.id);
    if (idx !== -1) QUIZ_ITEMS.splice(idx, 1);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// أسئلة مجتمع الصف — قراءة فقط، بمنظور المعلم (نفس بيانات مجتمع الطالب،
// بس بوابة صلاحية مختلفة: teacher_dashboard بدل student_community).
// ---------------------------------------------------------------------------

export const listOpenClassQuestions = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "teacher_dashboard", "view_list");
    return COMMUNITY_QUESTIONS.filter((q) => q.status === "مفتوح");
  });

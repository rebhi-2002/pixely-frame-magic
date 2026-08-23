import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuth } from "@/integrations/backend/auth-middleware";
import { requirePageAction } from "./rbac.server";
import {
  ENROLLMENTS,
  FLASHCARD_DECKS,
  LIBRARY_SUBJECTS,
  STUDY_STATS,
  UPCOMING_TASKS,
  WEEKLY_STUDY_LOG,
  nextStudentId,
  type EnrollmentRow,
  type FlashcardDeckRow,
  type LibrarySubjectRow,
  type UpcomingTaskRow,
} from "./student-learning-data";

// ---------------------------------------------------------------------------
// كورساتي
// ---------------------------------------------------------------------------

export const listEnrollments = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "student_my_courses", "view_list");
    return ENROLLMENTS;
  });

export const saveEnrollment = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        courseTitle: z.string().trim().min(2, "اسم الكورس مطلوب"),
        teacherName: z.string().trim().min(2, "اسم المعلم مطلوب"),
        progressPercent: z.number().min(0).max(100),
        nextSessionLabel: z.string().trim().max(100),
        status: z.enum(["قيد الدراسة", "مكتمل"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_my_courses", data.id ? "edit" : "execute_add");
    if (data.id) {
      const row = ENROLLMENTS.find((r) => r.id === data.id);
      if (!row) throw new Error("الكورس غير موجود");
      Object.assign(row, data);
    } else {
      const row: EnrollmentRow = { id: nextStudentId("enr"), ...data };
      ENROLLMENTS.push(row);
    }
    return { ok: true };
  });

export const deleteEnrollment = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_my_courses", "delete");
    const idx = ENROLLMENTS.findIndex((r) => r.id === data.id);
    if (idx !== -1) ENROLLMENTS.splice(idx, 1);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// المكتبة
// ---------------------------------------------------------------------------

export const listLibrarySubjects = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "student_library", "view_list");
    return LIBRARY_SUBJECTS;
  });

export const saveLibrarySubject = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        subjectName: z.string().trim().min(2, "اسم المادة مطلوب"),
        termLabel: z.string().trim().min(2, "الفصل مطلوب"),
        unitsCount: z.number().int().min(0),
        lessonsCount: z.number().int().min(0),
        progressPercent: z.number().min(0).max(100),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_library", data.id ? "edit" : "execute_add");
    if (data.id) {
      const row = LIBRARY_SUBJECTS.find((r) => r.id === data.id);
      if (!row) throw new Error("المادة غير موجودة");
      Object.assign(row, data);
    } else {
      const row: LibrarySubjectRow = { id: nextStudentId("lib"), ...data };
      LIBRARY_SUBJECTS.push(row);
    }
    return { ok: true };
  });

export const deleteLibrarySubject = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_library", "delete");
    const idx = LIBRARY_SUBJECTS.findIndex((r) => r.id === data.id);
    if (idx !== -1) LIBRARY_SUBJECTS.splice(idx, 1);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// البطاقات التعليمية
// ---------------------------------------------------------------------------

export const listFlashcardDecks = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "student_flashcards", "view_list");
    return FLASHCARD_DECKS;
  });

export const saveFlashcardDeck = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        deckName: z.string().trim().min(2, "اسم المجموعة مطلوب"),
        totalCards: z.number().int().min(0),
        dueCards: z.number().int().min(0),
        masteredCards: z.number().int().min(0),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_flashcards", data.id ? "edit" : "execute_add");
    if (data.id) {
      const row = FLASHCARD_DECKS.find((r) => r.id === data.id);
      if (!row) throw new Error("المجموعة غير موجودة");
      Object.assign(row, data);
    } else {
      const row: FlashcardDeckRow = { id: nextStudentId("deck"), ...data };
      FLASHCARD_DECKS.push(row);
    }
    return { ok: true };
  });

export const deleteFlashcardDeck = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_flashcards", "delete");
    const idx = FLASHCARD_DECKS.findIndex((r) => r.id === data.id);
    if (idx !== -1) FLASHCARD_DECKS.splice(idx, 1);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// لوحة المعلومات — سجل الدراسة الأسبوعي + المهام القادمة + إحصاءات الإنجاز
// ---------------------------------------------------------------------------

export const listWeeklyStudyLog = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "student_dashboard", "view_list");
    return WEEKLY_STUDY_LOG;
  });

export const updateWeeklyStudyMinutes = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z.object({ dayAr: z.string(), minutes: z.number().int().min(0).max(1440) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_dashboard", "edit");
    const row = WEEKLY_STUDY_LOG.find((r) => r.day[0] === data.dayAr);
    if (!row) throw new Error("اليوم غير موجود");
    row.minutes = data.minutes;
    return { ok: true };
  });

export const listUpcomingTasks = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "student_dashboard", "view_list");
    return UPCOMING_TASKS;
  });

export const saveUpcomingTask = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        title: z.string().trim().min(2, "العنوان مطلوب"),
        whenLabel: z.string().trim().min(1, "الموعد مطلوب"),
        type: z.enum(["امتحان", "واجب", "مراجعة"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_dashboard", data.id ? "edit" : "execute_add");
    if (data.id) {
      const row = UPCOMING_TASKS.find((r) => r.id === data.id);
      if (!row) throw new Error("المهمة غير موجودة");
      Object.assign(row, data);
    } else {
      const row: UpcomingTaskRow = { id: nextStudentId("up"), ...data };
      UPCOMING_TASKS.push(row);
    }
    return { ok: true };
  });

export const deleteUpcomingTask = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_dashboard", "delete");
    const idx = UPCOMING_TASKS.findIndex((r) => r.id === data.id);
    if (idx !== -1) UPCOMING_TASKS.splice(idx, 1);
    return { ok: true };
  });

export const getStudyStats = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "student_dashboard", "view_list");
    return STUDY_STATS;
  });

export const saveStudyStats = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        streakDays: z.number().int().min(0),
        achievementPoints: z.number().int().min(0),
        longestStreak: z.number().int().min(0).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_dashboard", "edit");
    Object.assign(STUDY_STATS, data);
    return { ok: true };
  });

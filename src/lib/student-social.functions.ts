import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuth } from "@/integrations/backend/auth-middleware";
import { requirePageAction } from "./rbac.server";
import {
  BOOKMARKS,
  COMMUNITY_QUESTIONS,
  COMMUNITY_STATS,
  REFERRALS,
  REFERRAL_LINK,
  SCHEDULE_EVENTS,
  nextSocialId,
  type BookmarkRow,
  type CommunityQuestionRow,
  type ReferralRow,
  type ScheduleEventRow,
} from "./student-social-data";

// ---------------------------------------------------------------------------
// الجدول
// ---------------------------------------------------------------------------

export const listScheduleEvents = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "student_schedule", "view_list");
    return SCHEDULE_EVENTS;
  });

export const saveScheduleEvent = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        dayAr: z.string().trim().min(2, "اليوم مطلوب"),
        dayEn: z.string().trim().min(2),
        activityTitle: z.string().trim().min(2, "النشاط مطلوب"),
        timeLabel: z.string().trim().min(1, "الوقت مطلوب"),
        type: z.enum(["حصة", "مراجعة", "امتحان", "واجب"]),
        hoursPlanned: z.number().min(0),
        reminderOn: z.boolean(),
        overdue: z.boolean(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_schedule", data.id ? "edit" : "execute_add");
    if (data.id) {
      const row = SCHEDULE_EVENTS.find((r) => r.id === data.id);
      if (!row) throw new Error("الحدث غير موجود");
      Object.assign(row, data);
    } else {
      const row: ScheduleEventRow = { id: nextSocialId("sch"), ...data };
      SCHEDULE_EVENTS.push(row);
    }
    return { ok: true };
  });

export const deleteScheduleEvent = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_schedule", "delete");
    const idx = SCHEDULE_EVENTS.findIndex((r) => r.id === data.id);
    if (idx !== -1) SCHEDULE_EVENTS.splice(idx, 1);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// مجتمع المواد
// ---------------------------------------------------------------------------

export const listCommunityQuestions = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "student_community", "view_list");
    return COMMUNITY_QUESTIONS;
  });

export const saveCommunityQuestion = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        questionTitle: z.string().trim().min(3, "السؤال مطلوب"),
        subjectName: z.string().trim().min(2, "المادة مطلوبة"),
        answersCount: z.number().int().min(0),
        status: z.enum(["إجابة معلم", "مفتوح", "مُغلق"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_community", data.id ? "edit" : "execute_add");
    if (data.id) {
      const row = COMMUNITY_QUESTIONS.find((r) => r.id === data.id);
      if (!row) throw new Error("السؤال غير موجود");
      Object.assign(row, data);
    } else {
      const row: CommunityQuestionRow = { id: nextSocialId("cq"), ...data };
      COMMUNITY_QUESTIONS.push(row);
    }
    return { ok: true };
  });

export const deleteCommunityQuestion = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_community", "delete");
    const idx = COMMUNITY_QUESTIONS.findIndex((r) => r.id === data.id);
    if (idx !== -1) COMMUNITY_QUESTIONS.splice(idx, 1);
    return { ok: true };
  });

export const getCommunityStats = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "student_community", "view_list");
    return COMMUNITY_STATS;
  });

export const saveCommunityStats = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({ memberCount: z.number().int().min(0), reputation: z.number().int().min(0) })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_community", "edit");
    Object.assign(COMMUNITY_STATS, data);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// المحفوظات
// ---------------------------------------------------------------------------

export const listBookmarks = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "student_bookmarks", "view_list");
    return BOOKMARKS;
  });

export const saveBookmark = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        itemTitle: z.string().trim().min(2, "العنوان مطلوب"),
        subjectName: z.string().trim().min(1, "المادة مطلوبة"),
        type: z.enum(["درس", "سؤال", "نقاش"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_bookmarks", data.id ? "edit" : "execute_add");
    if (data.id) {
      const row = BOOKMARKS.find((r) => r.id === data.id);
      if (!row) throw new Error("العنصر غير موجود");
      Object.assign(row, data);
    } else {
      const row: BookmarkRow = { id: nextSocialId("bm"), ...data };
      BOOKMARKS.push(row);
    }
    return { ok: true };
  });

export const deleteBookmark = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_bookmarks", "delete");
    const idx = BOOKMARKS.findIndex((r) => r.id === data.id);
    if (idx !== -1) BOOKMARKS.splice(idx, 1);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// الإحالات
// ---------------------------------------------------------------------------

export const listReferrals = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "student_referrals", "view_list");
    return REFERRALS;
  });

export const saveReferral = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        friendName: z.string().trim().min(2, "الاسم مطلوب"),
        dateLabel: z.string().trim().min(1),
        status: z.enum(["مكافأة", "معلّق"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_referrals", data.id ? "edit" : "execute_add");
    if (data.id) {
      const row = REFERRALS.find((r) => r.id === data.id);
      if (!row) throw new Error("الدعوة غير موجودة");
      Object.assign(row, data);
    } else {
      const row: ReferralRow = { id: nextSocialId("ref"), ...data };
      REFERRALS.push(row);
    }
    return { ok: true };
  });

export const deleteReferral = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "student_referrals", "delete");
    const idx = REFERRALS.findIndex((r) => r.id === data.id);
    if (idx !== -1) REFERRALS.splice(idx, 1);
    return { ok: true };
  });

export const getReferralLink = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "student_referrals", "view_list");
    return REFERRAL_LINK;
  });

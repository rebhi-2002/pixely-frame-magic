import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuth } from "@/integrations/backend/auth-middleware";
import { requirePageAction } from "./rbac.server";
import {
  LINKED_CHILDREN,
  NOTIFICATIONS,
  PARENT_NOTIFICATION_PREFS,
  TEACHER_PROFILE,
  TEACHER_SETTINGS,
  nextAccountId,
  type LinkedChildRow,
} from "./account-pages-data";

// ---------------------------------------------------------------------------
// إعدادات المعلم
// ---------------------------------------------------------------------------

export const getTeacherSettings = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "teacher_settings", "view_list");
    return TEACHER_SETTINGS;
  });

export const saveTeacherSettings = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        privateSessionPrice: z.number().min(0),
        availabilityLabel: z.string().trim().min(2),
        payoutMethodLabel: z.string().trim().min(2),
        notifyNewQuestion: z.boolean(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "teacher_settings", "edit");
    Object.assign(TEACHER_SETTINGS, data);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// الملف العام للمعلم
// ---------------------------------------------------------------------------

export const getTeacherProfile = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "teacher_profile_edit", "view_profile");
    return TEACHER_PROFILE;
  });

export const saveTeacherProfile = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        displayName: z.string().trim().min(2, "الاسم مطلوب"),
        bio: z.string().trim().min(2, "النبذة مطلوبة"),
        subjectsLabel: z.string().trim().min(1, "المواد مطلوبة"),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "teacher_profile_edit", "edit_profile");
    Object.assign(TEACHER_PROFILE, data);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// إعدادات ولي الأمر
// ---------------------------------------------------------------------------

export const listLinkedChildren = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "parent_settings", "view_list");
    return LINKED_CHILDREN;
  });

export const addLinkedChild = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        childName: z.string().trim().min(2, "اسم الابن مطلوب"),
        gradeLabel: z.string().trim().min(2, "الصف مطلوب"),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "parent_settings", "execute_add");
    const row: LinkedChildRow = {
      id: nextAccountId("lc"),
      ...data,
      linkedDateLabel: new Date().toISOString().slice(0, 10),
    };
    LINKED_CHILDREN.push(row);
    return { ok: true };
  });

export const unlinkChild = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "parent_settings", "delete");
    const idx = LINKED_CHILDREN.findIndex((r) => r.id === data.id);
    if (idx !== -1) LINKED_CHILDREN.splice(idx, 1);
    return { ok: true };
  });

export const getParentNotificationPrefs = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "parent_settings", "view_list");
    return PARENT_NOTIFICATION_PREFS;
  });

export const saveParentNotificationPrefs = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        weeklyReport: z.boolean(),
        masteryAlert: z.boolean(),
        teacherMessages: z.boolean(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "parent_settings", "edit");
    Object.assign(PARENT_NOTIFICATION_PREFS, data);
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// الإشعارات
// ---------------------------------------------------------------------------

export const listNotifications = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "notifications", "view_list");
    return NOTIFICATIONS;
  });

export const markNotificationRead = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "notifications", "edit");
    const row = NOTIFICATIONS.find((r) => r.id === data.id);
    if (!row) throw new Error("الإشعار غير موجود");
    row.isNew = false;
    return { ok: true };
  });

export const markAllNotificationsRead = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePageAction(context.userId, "notifications", "edit");
    for (const row of NOTIFICATIONS) row.isNew = false;
    return { ok: true };
  });

export const deleteNotification = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "notifications", "delete");
    const idx = NOTIFICATIONS.findIndex((r) => r.id === data.id);
    if (idx !== -1) NOTIFICATIONS.splice(idx, 1);
    return { ok: true };
  });

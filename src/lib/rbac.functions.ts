import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuth } from "@/integrations/backend/auth-middleware";
import { USERS, loadAccess, requirePageAction } from "./rbac.server";

/**
 * تُستخدم فقط لجلسات "تسجيل الدخول التجريبي (Demo)" — القائمة الجانبية
 * للحسابات الحقيقية القادمة من الباك اند بتتبنى محلياً بالمتصفح
 * (useAccess ← rbac-client.ts) لأن هالدالة ما بتقدر تتحقق من كوكي الباك
 * اند (دومين منفصل). راجع src/hooks/use-access.ts.
 */
export const getMyAccess = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => loadAccess(context.userId));

/**
 * تعديل ذاتي لجلسة الديمو فقط — كل مستخدم ديمو يقدر يعدّل اسمه/بريده
 * الخاص. الحسابات الحقيقية بتستخدم /api/User/MyProfile مباشرة
 * (src/integrations/backend/auth.ts) بدل هاي الدالة. راجع
 * src/routes/_authenticated/settings.tsx.
 */
export const updateOwnProfile = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        full_name: z.string().trim().min(2, "الاسم قصير جداً"),
        email: z.string().trim().email("بريد غير صالح").optional().or(z.literal("")),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePageAction(context.userId, "account_settings", "edit_profile");
    const user = USERS.find((u) => u.id === context.userId);
    if (!user) throw new Error("المستخدم غير موجود");
    user.full_name = data.full_name;
    user.email = data.email || null;
    return { ok: true };
  });

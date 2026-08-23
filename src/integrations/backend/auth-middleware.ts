// بديل مؤقت لـ requireSupabaseAuth (integrations/supabase/auth-middleware.ts
// سابقاً). الباك اند الجديد ما عنده endpoint للتحقق من الجلسة على مستوى
// السيرفر بعد (لا "/me" ولا JWT نتحقق منه هون).
//
// الهوية الحالية بتُقرأ من كوكي محلي بسيط (`academia_demo_user`) بيضبطه
// الفرونت بعد أي نوع دخول (حقيقي عبر /api/Auth/Login أو تجريبي محلي عبر
// "دخول سريع") — راجع src/integrations/backend/auth.ts. هاد الكوكي غير
// httpOnly ومش آمن أمنياً (أي حد يقدر يغيّره من DevTools) — عادي حالياً لأن
// البيانات وراه كلها ثابتة/تجريبية بلا معلومات حساسة حقيقية. الحماية
// الحقيقية لازم تصير على مستوى الباك اند نفسه (ASP.NET) بعد ما يضيف endpoint
// جلسة حقيقي — استبدل هذا الملف حينها.

import { createMiddleware } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { DEMO_USER_COOKIE } from "./auth";

export const requireAuth = createMiddleware({ type: "function" }).server(async ({ next }) =>
  next({ context: { userId: getCookie(DEMO_USER_COOKIE) || "u-admin" } }),
);

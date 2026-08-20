// بديل مؤقت لـ requireSupabaseAuth (integrations/supabase/auth-middleware.ts
// سابقاً). الباك اند الجديد ما عنده endpoint للتحقق من الجلسة على مستوى
// السيرفر بعد (لا "/me" ولا JWT نتحقق منه هون)، وحالياً في مستخدم أدمن واحد
// بس. فمؤقتاً: كل server function بتستخدم هالـ middleware بتعتبر المستخدم
// "u-admin" مباشرة.
//
// ⚠️ هذا التحقق شكلي فقط الآن (ما بيرفض أي طلب) — الحماية الحقيقية لازم
// تصير على مستوى الباك اند نفسه (ASP.NET) بعد ما يضيف endpoint جلسة حقيقي.
// استبدل هذا الملف أول ما يتوفر ذلك.

import { createMiddleware } from "@tanstack/react-start";

export const requireAuth = createMiddleware({ type: "function" }).server(async ({ next }) =>
  next({ context: { userId: "u-admin" } }),
);

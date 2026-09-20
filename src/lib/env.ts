// نقطة مركزية وحيدة لقراءة والتحقق من متغيرات البيئة (import.meta.env).
//
// ليش هالملف؟ قبله كانت كل وحدة (client.ts، auth.ts، analytics.ts...) بتقرأ
// import.meta.env.VITE_XXX مباشرة، كل وحدة وقيمتها الافتراضية الخاصة فيها.
// المشكلة: لو تغيّر اسم متغيّر أو انكتب غلط، ما في أي تحذير — التطبيق بيشتغل
// بصمت بالقيمة الافتراضية وحدا بيكتشف المشكلة بالإنتاج بس. هالملف بيتحقق من
// كل المتغيرات مرة وحدة عند الإقلاع، وبيطبع تحذير واضح بالـ console لو في
// قيمة ناقصة أو غير صالحة (بدون ما يوقف التطبيق — راجع التعليق تحت).
//
// أي متغيّر بيئة جديد لازم يُضاف هون بالسكيما (envSchema) مش يُقرأ مباشرة
// بمكان تاني بالكود.

import { z } from "zod";

const booleanFlag = z
  .string()
  .optional()
  .transform((v) => v === "true");

const envSchema = z.object({
  // فاضي ("") = نفس أصل الموقع (same-origin) — الوضع الموصى به: طلبات /api/*
  // بتمرّ عبر بروكسي (Nitro routeRules بالإنتاج، Vite proxy بالتطوير — راجع
  // vite.config.ts) فالكوكي بتصير first-party ولا تتأثر بحجب كوكيز الطرف الثالث.
  // رابط كامل = اتصال مباشر cross-origin (يتطلب CORS + SameSite=None بالباك اند).
  VITE_API_BASE_URL: z
    .union([z.literal(""), z.string().url("لازم يكون رابط صالح (https://...)")])
    .optional(),
  VITE_SITE_URL: z.string().url("لازم يكون رابط صالح (https://...)").optional(),
  VITE_ENABLE_DEMO_LOGIN: booleanFlag,
  VITE_ENABLE_SIGNUP: booleanFlag,
  VITE_SENTRY_DSN: z.string().optional(),
  VITE_POSTHOG_KEY: z.string().optional(),
  VITE_POSTHOG_HOST: z.string().url("لازم يكون رابط صالح (https://...)").optional(),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  // ما منرمي (throw) عمداً: خطأ بمتغيّر بيئة ثانوي (زي PostHog host غلط) ما
  // لازم يوقف التطبيق كله عن الشغل. بنطبع تحذير واضح وبنكمل بالقيم
  // الافتراضية تحت، وبيضل يبين بالـ console/Sentry لحد ما ينحل.
  console.error(
    "[env] متغيرات بيئة غير صالحة — راجع .env.example:",
    parsed.error.flatten().fieldErrors,
  );
}

const raw = parsed.success ? parsed.data : ({} as z.infer<typeof envSchema>);

// الافتراضي: same-origin (عبر البروكسي). ما عاد فيه fallback لـlocalhost لأنه
// كان بيمرّ بصمت بنشر ناسي حدا يضبط المتغير ويخلي كل الطلبات تفشل.
const DEFAULT_API_BASE_URL = "";
const DEFAULT_SITE_URL = "https://pixely-frame-magic.vercel.app";
const DEFAULT_SENTRY_DSN =
  "https://21151ae17d7188a038b5b79715f5cf2d@o4512061652467712.ingest.de.sentry.io/4512061664002128";
const DEFAULT_POSTHOG_HOST = "https://us.i.posthog.com";

export const env = {
  API_BASE_URL: (raw.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/+$/, ""),
  SITE_URL: (raw.VITE_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/$/, ""),
  ENABLE_DEMO_LOGIN: import.meta.env.DEV || raw.VITE_ENABLE_DEMO_LOGIN === true,
  ENABLE_SIGNUP: raw.VITE_ENABLE_SIGNUP === true,
  SENTRY_DSN: raw.VITE_SENTRY_DSN || DEFAULT_SENTRY_DSN,
  POSTHOG_KEY: raw.VITE_POSTHOG_KEY,
  POSTHOG_HOST: raw.VITE_POSTHOG_HOST ?? DEFAULT_POSTHOG_HOST,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
} as const;

// فحص أمان إضافي: لو البناء إنتاجي وعنوان الباك اند صريح لـlocalhost، هاد شبه
// أكيد غلطة نشر (قيمة محلية انرفعت للاستضافة). بنصرخ بوضوح بالـ console
// (و Sentry بالتقاطها كـ error لو مفعّل) بدل ما يكتشفها المستخدم لما تفشل كل
// الطلبات بصمت.
if (env.PROD && env.API_BASE_URL.includes("localhost")) {
  console.error(
    "[env] تحذير نشر: VITE_API_BASE_URL ما زالت تشير لـ localhost ببناء إنتاجي. " +
      "تأكد من ضبط متغيرات البيئة الصحيحة بمنصة الاستضافة قبل النشر.",
  );
}

import { o as objectType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/env-FodiAD7N.js
var booleanFlag = stringType().optional().transform((v) => v === "true");
var parsed = objectType({
	VITE_API_BASE_URL: stringType().url("لازم يكون رابط صالح (https://...)").optional(),
	VITE_SITE_URL: stringType().url("لازم يكون رابط صالح (https://...)").optional(),
	VITE_ENABLE_DEMO_LOGIN: booleanFlag,
	VITE_ENABLE_SIGNUP: booleanFlag,
	VITE_SENTRY_DSN: stringType().optional(),
	VITE_POSTHOG_KEY: stringType().optional(),
	VITE_POSTHOG_HOST: stringType().url("لازم يكون رابط صالح (https://...)").optional()
}).safeParse({
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_API_BASE_URL": "https://ziadkamalaln2842-001-site1.etempurl.com",
	"VITE_ENABLE_DEMO_LOGIN": "true",
	"VITE_ENABLE_SIGNUP": "true",
	"VITE_POSTHOG_HOST": "https://us.i.posthog.com",
	"VITE_POSTHOG_KEY": "phc_xiySFLRMy4zcoZSAk2tJrFa7PwPYiS2tZYkPH8zRYuAv"
});
if (!parsed.success) console.error("[env] متغيرات بيئة غير صالحة — راجع .env.example:", parsed.error.flatten().fieldErrors);
var raw = parsed.success ? parsed.data : {};
var env = {
	API_BASE_URL: (raw.VITE_API_BASE_URL ?? "https://localhost:7176").replace(/\/+$/, ""),
	SITE_URL: (raw.VITE_SITE_URL ?? "https://pixely-frame-magic.vercel.app").replace(/\/$/, ""),
	ENABLE_DEMO_LOGIN: raw.VITE_ENABLE_DEMO_LOGIN === true,
	ENABLE_SIGNUP: raw.VITE_ENABLE_SIGNUP === true,
	SENTRY_DSN: raw.VITE_SENTRY_DSN || "https://21151ae17d7188a038b5b79715f5cf2d@o4512061652467712.ingest.de.sentry.io/4512061664002128",
	POSTHOG_KEY: raw.VITE_POSTHOG_KEY,
	POSTHOG_HOST: raw.VITE_POSTHOG_HOST ?? "https://us.i.posthog.com",
	MODE: "production",
	DEV: false,
	PROD: true
};
if (env.PROD && env.API_BASE_URL.includes("localhost")) console.error("[env] تحذير نشر: VITE_API_BASE_URL ما زالت تشير لـ localhost ببناء إنتاجي. تأكد من ضبط متغيرات البيئة الصحيحة بمنصة الاستضافة قبل النشر.");
//#endregion
export { env as t };

// تهيئة Sentry لجهة السيرفر — تُستخدم فقط لو شغّلت التطبيق بـ--import flag
// (بيئة Node تقليدية، مش Vercel/Netlify serverless). لو ناشرين على
// Vercel/Netlify متل هالمشروع حاليًا (راجع nitroPreset بـvite.config.ts)،
// التهيئة الفعلية صايرة مباشرة جوا src/server.ts بدل هالملف، لأن --import
// مش مدعوم بشكل موثوق ببيئات serverless حسب توثيق Sentry نفسه.
//
// خليتها هون لأي نشر مستقبلي على سيرفر Node عادي (VPS مثلاً) بدل
// serverless — راجع package.json (سكربتات dev/start) لتفعيلها عبر
// NODE_OPTIONS='--import ./instrument.server.mjs'.

import * as Sentry from "@sentry/tanstackstart-react";

Sentry.init({
  dsn:
    process.env.VITE_SENTRY_DSN ||
    "https://21151ae17d7188a038b5b79715f5cf2d@o4512061652467712.ingest.de.sentry.io/4512061664002128",
  tracesSampleRate: 0.2,
});

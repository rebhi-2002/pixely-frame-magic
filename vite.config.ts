import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { sentryTanstackStart } from "@sentry/tanstackstart-react/vite";

// حدد منصة النشر عبر متغير بيئة NITRO_PRESET (مثلاً "vercel" أو "netlify").
// افتراضيًا "vercel" إذا لم يُحدَّد المتغير.
const nitroPreset = process.env.NITRO_PRESET || "vercel";

// عنوان الباك اند الحقيقي يلي بنمرّر له طلبات /api/* (بروكسي same-origin).
// بالإنتاج: Nitro routeRules (تشتغل كـrewrite على Vercel/Netlify وبنفس الوقت
// بتمنع مشاكل CORS وحجب كوكيز الطرف الثالث لأن المتصفح بيشوف كل شي من دومين
// الموقع نفسه). بالتطوير: Vite server.proxy. بدّله بمتغير بيئة (وقت البناء/
// التشغيل) لو انتقل الباك اند لعنوان تاني، مثلاً https://localhost:7176.
const API_PROXY_TARGET = (
  process.env.API_PROXY_TARGET || "https://ziadkamalaln2842-001-site1.etempurl.com"
).replace(/\/+$/, "");

export default defineConfig(({ command }) => ({
  // Nitro is only needed for the deployable server bundle. Keeping it out of
  // the dev graph prevents its separate Vite environment from racing the
  // client entry during automatic restarts, which can surface as a failed
  // dynamic import of /src/client.tsx.
  // Vite's proxy above provides the same local /api behavior during dev.
  // Vite 8 بيدعم حل مسارات tsconfig (@/...) بشكل أصلي، فما عاد لازم بلوجن
  // "vite-tsconfig-paths" الخارجي (كان يعمل نفس الشي بس أبطأ وغير مُصان).
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({ server: { entry: "server" } }),
    viteReact(),
    // مشكلة معروفة: @sentry/tanstackstart-react (وتبعياته الديناميكية
    // require-in-the-middle/import-in-the-middle الخاصة بالـauto-
    // instrumentation) بتستخدم require() ديناميكي ما بتقدر أداة تتبّع
    // الحزم التلقائية بـNitro (لتحديد شو يترحّل لدالة السيرفرلس على
    // Vercel/Netlify) تكتشفه بشكل موثوق. النتيجة: الحزمة تتثبّت وتُبنى
    // محليًا بدون أي مشكلة، بس تختفي وقت التشغيل الفعلي بالسيرفرلس
    // (ERR_MODULE_NOT_FOUND) — وبما إنها مستوردة بأول src/server.ts،
    // هيك بتكسر كل طلب SSR (كل صفحة بالموقع!). صار مؤكد فعليًا بسجلات
    // Vercel بتاريخ 2026-09-17 (راجع docs/operations/2026-09-17-*.md).
    // traceDeps مع بادئة "*" = "انسخ كل ملفات الحزمة" بدل الاعتماد على
    // التتبّع التلقائي الناقص لهاي الحزم تحديدًا. راجع أيضًا src/server.ts
    // (import() ديناميكي محاط بـtry/catch) كخط دفاع ثاني لو تكرر نفس
    // النوع من المشاكل بحزمة تانية بالمستقبل.
    ...(command === "build"
      ? [
          nitro({
            preset: nitroPreset,
            routeRules: {
              "/api/**": { proxy: `${API_PROXY_TARGET}/api/**` },
            },
            traceDeps: [
              "@sentry/tanstackstart-react*",
              "require-in-the-middle*",
              "import-in-the-middle*",
            ],
          }),
        ]
      : []),
    // رفع source maps لـSentry وقت البناء — شرطي: بدون SENTRY_AUTH_TOKEN
    // (من إعدادات مشروعك بـSentry) البلوجن ما بينضاف إطلاقًا، فما فيه خطر
    // يكسر البناء عند حد ما ضبط التوكن بعد.
    ...(process.env.SENTRY_AUTH_TOKEN
      ? [
          sentryTanstackStart({
            org: process.env.SENTRY_ORG || "voidunemployed",
            project: process.env.SENTRY_PROJECT || "javascript-tanstackstart-react",
            authToken: process.env.SENTRY_AUTH_TOKEN,
          }),
        ]
      : []),
  ],
  server: {
    host: true,
    proxy: {
      "/api": { target: API_PROXY_TARGET, changeOrigin: true, secure: false },
    },
  },
}));

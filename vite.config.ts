import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { sentryTanstackStart } from "@sentry/tanstackstart-react/vite";

// حدد منصة النشر عبر متغير بيئة NITRO_PRESET (مثلاً "vercel" أو "netlify").
// على Vercel بينكشف تلقائيًا عبر متغير VERCEL. غير هيك الافتراضي هو
// cloudflare_module (منصة استضافة Lovable) مع مخرجات ببـ dist/.
const nitroPreset =
  process.env.NITRO_PRESET || (process.env.VERCEL ? "vercel" : "cloudflare_module");
const nitroOutputDir = nitroPreset.startsWith("cloudflare") ? "dist" : undefined;

// عنوان الباك اند الحقيقي يلي بنمرّر له طلبات /api/* (بروكسي same-origin).
// بالإنتاج: Nitro routeRules (تشتغل كـrewrite على Vercel/Netlify وبنفس الوقت
// بتمنع مشاكل CORS وحجب كوكيز الطرف الثالث لأن المتصفح بيشوف كل شي من دومين
// الموقع نفسه). بالتطوير: Vite server.proxy. بدّله بمتغير بيئة (وقت البناء/
// التشغيل) لو انتقل الباك اند لعنوان تاني، مثلاً https://localhost:7176.
const API_PROXY_TARGET = (
  process.env.API_PROXY_TARGET || "https://ziadkamalaln2842-001-site1.etempurl.com"
).replace(/\/+$/, "");

export default defineConfig({
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
    nitro({
      preset: nitroPreset,
      ...(nitroOutputDir ? { output: { dir: nitroOutputDir } } : {}),
      routeRules: {
        "/api/**": { proxy: `${API_PROXY_TARGET}/api/**` },
      },
      traceDeps: [
        "@sentry/tanstackstart-react*",
        "require-in-the-middle*",
        "import-in-the-middle*",
      ],
    }),
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
});

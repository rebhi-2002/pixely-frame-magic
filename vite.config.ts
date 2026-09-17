import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { sentryTanstackStart } from "@sentry/tanstackstart-react/vite";

// حدد منصة النشر عبر متغير بيئة NITRO_PRESET (مثلاً "vercel" أو "netlify").
// افتراضيًا "vercel" إذا لم يُحدَّد المتغير.
const nitroPreset = process.env.NITRO_PRESET || "vercel";

export default defineConfig({
  // Vite 8 بيدعم حل مسارات tsconfig (@/...) بشكل أصلي، فما عاد لازم بلوجن
  // "vite-tsconfig-paths" الخارجي (كان يعمل نفس الشي بس أبطأ وغير مُصان).
  resolve: {
    tsconfigPaths: true,
  },
  // إجبار Vite SSR على تضمين حزمة Sentry داخل ملف الـ ssr.mjs النهائي لـ Vercel
  ssr: {
    noExternal: ["@sentry/tanstackstart-react"],
  },
  plugins: [
    tailwindcss(),
    tanstackStart({ server: { entry: "server" } }),
    viteReact(),
    nitro({ preset: nitroPreset }),
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
  },
});

// import { defineConfig } from "vite";
// import { tanstackStart } from "@tanstack/react-start/plugin/vite";
// import viteReact from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import { nitro } from "nitro/vite";
// import { sentryTanstackStart } from "@sentry/tanstackstart-react/vite";

// // حدد منصة النشر عبر متغير بيئة NITRO_PRESET (مثلاً "vercel" أو "netlify").
// // افتراضيًا "vercel" إذا لم يُحدَّد المتغير.
// const nitroPreset = process.env.NITRO_PRESET || "vercel";

// export default defineConfig({
//   // Vite 8 بيدعم حل مسارات tsconfig (@/...) بشكل أصلي، فما عاد لازم بلوجن
//   // "vite-tsconfig-paths" الخارجي (كان يعمل نفس الشي بس أبطأ وغير مُصان).
//   resolve: {
//     tsconfigPaths: true,
//   },
//   plugins: [
//     tailwindcss(),
//     tanstackStart({ server: { entry: "server" } }),
//     viteReact(),
//     nitro({ preset: nitroPreset }),
//     // رفع source maps لـSentry وقت البناء — شرطي: بدون SENTRY_AUTH_TOKEN
//     // (من إعدادات مشروعك بـSentry) البلوجن ما بينضاف إطلاقًا، فما فيه خطر
//     // يكسر البناء عند حد ما ضبط التوكن بعد.
//     ...(process.env.SENTRY_AUTH_TOKEN
//       ? [
//           sentryTanstackStart({
//             org: process.env.SENTRY_ORG || "voidunemployed",
//             project: process.env.SENTRY_PROJECT || "javascript-tanstackstart-react",
//             authToken: process.env.SENTRY_AUTH_TOKEN,
//           }),
//         ]
//       : []),
//   ],
//   server: {
//     host: true,
//   },
// });

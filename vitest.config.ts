import { defineConfig } from "vitest/config";
import viteReact from "@vitejs/plugin-react";

// إعداد منفصل عن vite.config.ts الرئيسي عمدًا: بلوجن TanStack Start
// (tanstackStart/nitro) مش مصمم لبيئة اختبار الوحدات، فبنستخدم هون بس
// react + tsconfig paths (لدعم استيراد @/...، عبر resolve.tsconfigPaths
// الأصلية بـVite 8) + jsdom لمحاكاة DOM.
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [viteReact()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    // فقط اختبارات المشروع نفسه. exclude لحاله كان يستبدل الافتراضي (**/node_modules/**)
    // فكان vitest يفحص node_modules المتداخلة بمجلدات زي .netlify/plugins (آلاف اختبارات مكتبات
    // خارجية، 148 ثانية، وبعضها يفشل بدون علاقة بالمشروع).
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["**/node_modules/**", "e2e/**", "dist/**", ".output/**", ".vercel/**", ".netlify/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/lib/**", "src/integrations/**"],
    },
  },
});

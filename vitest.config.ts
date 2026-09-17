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
    exclude: ["node_modules", "e2e", "dist", ".output"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/lib/**", "src/integrations/**"],
    },
  },
});

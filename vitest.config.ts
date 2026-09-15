import { defineConfig } from "vitest/config";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// إعداد منفصل عن vite.config.ts الرئيسي عمدًا: بلوجن TanStack Start
// (tanstackStart/nitro) مش مصمم لبيئة اختبار الوحدات، فبنستخدم هون بس
// react + tsconfig paths (لدعم استيراد @/...) + jsdom لمحاكاة DOM.
export default defineConfig({
  plugins: [tsconfigPaths({ projects: ["./tsconfig.json"] }), viteReact()],
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

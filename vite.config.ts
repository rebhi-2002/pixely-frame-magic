// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // ملاحظة أداء: تحقّقنا من الـ start-manifest الفعلي — TanStack Start يقسّم كل
  // route لحزمته الخاصة تلقائياً (لا حاجة لخيار يدوي هنا). صفحة الهبوط تحمّل
  // ~286KB gzip فقط؛ الحزم الثقيلة (Recharts، إلخ) لا تُحمَّل إلا عند دخول
  // الصفحة التي تستخدمها فعلياً.
});

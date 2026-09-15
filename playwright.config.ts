import { defineConfig, devices } from "@playwright/test";

// حسب docs/testing-guidelines.md قسم 2.3: اختبارات E2E لازم تشتغل على
// production build فعلي (npm run build ثم npm run preview) مش على dev
// server، حتى تلتقط سلوك الـchunking والتحميل الحقيقي.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: process.env.E2E_BASE_URL || "http://localhost:4173",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: "npm run build && npm run preview",
        url: "http://localhost:4173",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});

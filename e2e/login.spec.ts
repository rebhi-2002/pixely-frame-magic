import { test, expect } from "@playwright/test";

// دخان بسيط لصفحة تسجيل الدخول — أول خطوة بأي "critical user flow" (راجع
// docs/testing-guidelines.md قسم 2.3). ما بيعتمد على باك اند حي، فبيشتغل
// بأي بيئة CI بدون بيانات اعتماد حقيقية.

test.describe("صفحة تسجيل الدخول", () => {
  test("بتعرض حقلي الإيميل وكلمة المرور وزر الدخول", async ({ page }) => {
    await page.goto("/login");

    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.getByRole("button", { name: /دخول|log in|sign in/i })).toBeVisible();
  });

  test("بتمنع الإرسال ببيانات ناقصة (تحقق من جهة العميل)", async ({ page }) => {
    await page.goto("/login");

    await page.locator("#email").fill("not-an-email");
    await page.getByRole("button", { name: /دخول|log in|sign in/i }).click();

    // لسا بنفس الصفحة (ما صار توجيه) — يعني الـvalidation منعت الإرسال.
    await expect(page).toHaveURL(/\/login/);
  });
});

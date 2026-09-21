import { describe, expect, it, beforeEach } from "vitest";
import {
  getOnboardingSteps,
  getCompletedStepIds,
  ensureOnboardingEnabled,
  isOnboardingVisible,
  markStepVisited,
  dismissOnboarding,
} from "@/lib/onboarding";

// هالتيستات بتقفل قرار منتج مقصود من جلسة بنائها: onboarding ما بيظهر
// إلا لحساب سجّل بعد ما صارت الميزة موجودة (justRegistered=true أول
// مرة بس) — حساب قديم ما لازم يتفاجأ بقائمة onboarding فجأة بزيارة
// عادية. راجع full-project-report.md قسم 25 للسياق الكامل.

beforeEach(() => {
  localStorage.clear();
});

describe("getOnboardingSteps", () => {
  it("الطالب عنده خطوات", () => {
    expect(getOnboardingSteps("student").length).toBeGreaterThan(0);
  });

  it("المعلّم عنده خطوات", () => {
    expect(getOnboardingSteps("teacher").length).toBeGreaterThan(0);
  });

  it("ولي الأمر بدون خطوات عمدًا (بوابته معطّلة — راجع قسم 4 بالتقرير)", () => {
    expect(getOnboardingSteps("parent")).toEqual([]);
  });

  it("المشرف والأدمن بدون خطوات (ما بُنيت لهم)", () => {
    expect(getOnboardingSteps("supervisor")).toEqual([]);
    expect(getOnboardingSteps("admin")).toEqual([]);
  });
});

describe("ensureOnboardingEnabled — قاعدة 'حساب قديم ما يتفاجأ'", () => {
  it("حساب جديد (justRegistered=true) بيصير ظاهر", () => {
    ensureOnboardingEnabled("user-1", true);
    expect(isOnboardingVisible("user-1")).toBe(true);
  });

  it("حساب قديم (justRegistered=false) بيضل غير ظاهر", () => {
    ensureOnboardingEnabled("user-2", false);
    expect(isOnboardingVisible("user-2")).toBe(false);
  });

  it("مرة ما تفعّلت لحساب، بتضل مفعّلة حتى لو صار استدعاء تاني بـfalse", () => {
    ensureOnboardingEnabled("user-3", true);
    ensureOnboardingEnabled("user-3", false); // جلسة لاحقة، مش تسجيل جديد
    expect(isOnboardingVisible("user-3")).toBe(true);
  });

  it("حساب مختلف ما بتأثر فيه تفعيل حساب تاني", () => {
    ensureOnboardingEnabled("user-4", true);
    expect(isOnboardingVisible("user-5")).toBe(false);
  });
});

describe("dismissOnboarding", () => {
  it("بعد الرفض، ما بتظهر تاني حتى لو الحساب مفعّل", () => {
    ensureOnboardingEnabled("user-6", true);
    expect(isOnboardingVisible("user-6")).toBe(true);
    dismissOnboarding("user-6");
    expect(isOnboardingVisible("user-6")).toBe(false);
  });
});

describe("markStepVisited / getCompletedStepIds", () => {
  it("خطوة مزورة بتنضاف لقائمة المكتمل", () => {
    markStepVisited("user-7", "explore-library");
    expect(getCompletedStepIds("user-7")).toContain("explore-library");
  });

  it("نفس الخطوة مرتين ما بتتكرر بالقائمة", () => {
    markStepVisited("user-8", "explore-library");
    markStepVisited("user-8", "explore-library");
    expect(getCompletedStepIds("user-8")).toEqual(["explore-library"]);
  });

  it("حساب بدون أي زيارة برجع مصفوفة فاضية", () => {
    expect(getCompletedStepIds("user-9")).toEqual([]);
  });
});

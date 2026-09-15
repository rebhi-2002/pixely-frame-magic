// حالة "خطواتك الأولى" (onboarding checklist) — محفوظة محليًا بالمتصفح،
// مربوطة بـuserId (مش عامة لكل زوار الجهاز). بعض الخطوات إنجازها حقيقي
// (رصيد المحفظة > صفر — بيانات حقيقية من الباك اند)، والباقي "زرته/زرتها"
// بالنقر (نمط شائع ومقبول بمنتجات حقيقية زي Notion/Linear) — ما في أي
// خطوة بتتظاهر إنها متتبّعة تلقائيًا من بيانات مش موجودة أصلاً بالباك اند
// (زي عدد الكورسات المسجّل فيها — هاي لسا بيانات ديمو، فما منستخدمها هون).

import type { RoleKey } from "./bi";

export interface OnboardingStep {
  id: string;
  title: string;
  titleEn: string;
  href: string;
  icon: string;
}

// ولي الأمر مستثنى عمدًا: بوابة ولي الأمر حاليًا بدون طريقة فعلية لربط
// الأبناء (لا endpoint ولا بيانات) — قائمة "خطوات أولى" بتوعد بخطوات ما
// بتشتغل فعليًا أسوأ من عدم وجود قائمة إطلاقًا. راجع قسم 4 بالتقرير الشامل.
const STEPS_BY_ROLE: Partial<Record<RoleKey, OnboardingStep[]>> = {
  student: [
    {
      id: "explore-library",
      title: "استكشف مكتبتك",
      titleEn: "Explore your library",
      href: "/library",
      icon: "Library",
    },
    {
      id: "top-up-wallet",
      title: "اشحن رصيد محفظتك",
      titleEn: "Top up your wallet",
      href: "/wallet",
      icon: "Wallet",
    },
    {
      id: "set-schedule",
      title: "جهّز جدولك الدراسي",
      titleEn: "Set up your study schedule",
      href: "/schedule",
      icon: "Calendar",
    },
  ],
  teacher: [
    {
      id: "add-course",
      title: "أضف أول كورس إلك",
      titleEn: "Add your first course",
      href: "/teacher/courses",
      icon: "BookOpen",
    },
    {
      id: "check-analytics",
      title: "استعرض لوحة الأداء",
      titleEn: "Check your performance dashboard",
      href: "/teacher/analytics",
      icon: "BarChart3",
    },
    {
      id: "edit-profile",
      title: "جهّز ملفك المهني",
      titleEn: "Set up your professional profile",
      href: "/teacher/profile/edit",
      icon: "UserCog",
    },
  ],
};

export function getOnboardingSteps(roleKey: RoleKey): OnboardingStep[] {
  return STEPS_BY_ROLE[roleKey] ?? [];
}

interface OnboardingState {
  /** انضبط true أول مرة بس (لحظة التسجيل الفعلية) — يحدد "هل هالحساب من
   * الحسابات يلي شافت الميزة من أول يوم" بشكل دائم. بدونه، أي حساب قديم
   * (سجّل قبل ما تُبنى هالميزة) ممكن يفاجَأ بقائمة onboarding فجأة بزيارة
   * عادية — قرار منتج مقصود: الميزة لمين بلش تسجيله جديد بس. */
  enabled: boolean;
  dismissed: boolean;
  completedStepIds: string[];
}

function storageKey(userId: string): string {
  return `academia.onboarding.${userId}`;
}

function readState(userId: string): OnboardingState {
  const empty: OnboardingState = { enabled: false, dismissed: false, completedStepIds: [] };
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(storageKey(userId));
    if (!raw) return empty;
    const parsed = JSON.parse(raw);
    return {
      enabled: parsed?.enabled === true,
      dismissed: parsed?.dismissed === true,
      completedStepIds: Array.isArray(parsed?.completedStepIds) ? parsed.completedStepIds : [],
    };
  } catch {
    return empty;
  }
}

function writeState(userId: string, state: OnboardingState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(storageKey(userId), JSON.stringify(state));
}

export function getCompletedStepIds(userId: string): string[] {
  return readState(userId).completedStepIds;
}

/** بتقرر هل القائمة تظهر إطلاقًا لهالحساب — أول مرة بس عبر `justRegistered`
 * (راجع wasJustRegistered بـauth.ts)، وبعدها القرار محفوظ دائمًا محليًا
 * بغض النظر شو صار بجلسات لاحقة. لازم تُستدعى قبل isOnboardingVisible. */
export function ensureOnboardingEnabled(userId: string, justRegistered: boolean): void {
  const state = readState(userId);
  if (state.enabled || !justRegistered) return;
  writeState(userId, { ...state, enabled: true });
}

export function isOnboardingVisible(userId: string): boolean {
  const state = readState(userId);
  return state.enabled && !state.dismissed;
}

export function markStepVisited(userId: string, stepId: string): void {
  const state = readState(userId);
  if (state.completedStepIds.includes(stepId)) return;
  writeState(userId, { ...state, completedStepIds: [...state.completedStepIds, stepId] });
}

export function dismissOnboarding(userId: string): void {
  const state = readState(userId);
  writeState(userId, { ...state, dismissed: true });
}

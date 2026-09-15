import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { DynamicIcon } from "@/components/admin/dynamic-icon";
import { Reveal } from "@/components/ui/reveal";
import { useBi, type RoleKey } from "@/lib/bi";
import {
  getOnboardingSteps,
  getCompletedStepIds,
  ensureOnboardingEnabled,
  isOnboardingVisible,
  markStepVisited,
  dismissOnboarding,
} from "@/lib/onboarding";

/**
 * قائمة "خطواتك الأولى" — بتظهر بس للحسابات يلي بلشت تسجيلها من بعد ما
 * انبنت هالميزة (`showInitially`/`justRegistered` أول جلسة بتفعّلها
 * بشكل دائم لهالحساب)، حتى ما يتفاجأ حساب قديم بقائمة onboarding فجأة.
 * الطالب والمعلّم بس (ولي الأمر مستثنى — راجع onboarding.ts). "اشحن
 * محفظتك" وحدها إنجازها حقيقي (رصيد فعلي > صفر)؛ الباقي "زرتها" بالنقر.
 */
export function OnboardingChecklist({
  userId,
  roleKey,
  showInitially,
  walletBalance,
}: {
  userId: string;
  roleKey: RoleKey;
  /** مرّر نتيجة wasJustRegistered() هون — أول مرة true بتفعّل الميزة
   * لهالحساب بشكل دائم (محفوظ محليًا)، مش بس تعرضها لمرة وحدة. */
  showInitially: boolean;
  /** الرصيد الحالي الحقيقي — لو > 0، خطوة "اشحن محفظتك" تنعلّم منجزة
   * تلقائيًا (إشارة حقيقية، مش نقرة). مرّرها بس لو الدور "طالب". */
  walletBalance?: number;
}) {
  const bi = useBi();
  const steps = getOnboardingSteps(roleKey);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [visible, setVisible] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    ensureOnboardingEnabled(userId, showInitially);
    const stored = new Set(getCompletedStepIds(userId));
    if (walletBalance != null && walletBalance > 0) stored.add("top-up-wallet");
    setCompleted(stored);
    setVisible(isOnboardingVisible(userId));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (!hydrated || steps.length === 0 || !visible || completed.size >= steps.length) {
    return null;
  }

  function visit(stepId: string) {
    markStepVisited(userId, stepId);
    setCompleted((prev) => new Set(prev).add(stepId));
  }

  function dismiss() {
    dismissOnboarding(userId);
    setVisible(false);
  }

  return (
    <Reveal>
      <div className="soft-glow rounded-2xl border border-primary/20 bg-card p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-base font-bold text-foreground">
              {bi("خطواتك الأولى", "Your first steps")}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {bi(
                `أكملت ${completed.size} من ${steps.length}`,
                `${completed.size} of ${steps.length} done`,
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={dismiss}
            className="tap-target inline-flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label={bi("إخفاء لاحقًا", "Dismiss for now")}
          >
            <X className="size-4" />
          </button>
        </div>

        <ul className="space-y-1.5">
          {steps.map((step) => {
            const isDone = completed.has(step.id);
            return (
              <li key={step.id}>
                <Link
                  to={step.href}
                  onClick={() => visit(step.id)}
                  className="hover-press flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 hover:border-border hover:bg-secondary/50"
                >
                  <span
                    className={`inline-flex size-8 shrink-0 items-center justify-center rounded-lg ${
                      isDone ? "bg-success/15 text-success" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {isDone ? (
                      <Check className="size-4" />
                    ) : (
                      <DynamicIcon name={step.icon} className="size-4" />
                    )}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      isDone ? "text-muted-foreground line-through" : "text-foreground"
                    }`}
                  >
                    {bi(step.title, step.titleEn)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Reveal>
  );
}

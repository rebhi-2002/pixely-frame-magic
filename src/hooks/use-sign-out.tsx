import { useCallback, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { BrandLogo } from "@/components/site/brand-logo";

/**
 * خروج موحّد مع تغذية بصرية: إلغاء الاستعلامات ← تفريغ الكاش ← إنهاء الجلسة ←
 * تنقّل. `pending` يُستخدم لعرض <SignOutOverlay /> أثناء العملية.
 */
export function useSignOut(to = "/") {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [pending, setPending] = useState(false);

  const signOut = useCallback(async () => {
    if (pending) return;
    setPending(true);
    try {
      await queryClient.cancelQueries();
      queryClient.clear();
      await supabase.auth.signOut();
      navigate({ to, replace: true });
    } finally {
      // نُبقي الطبقة ظاهرة لحظة قصيرة حتى يكتمل التنقّل بسلاسة
      window.setTimeout(() => setPending(false), 400);
    }
  }, [navigate, pending, queryClient, to]);

  return { signOut, pending };
}

/** طبقة انتقال ناعمة تُعرض أثناء تسجيل الخروج. */
export function SignOutOverlay({ pending }: { pending: boolean }) {
  const { t } = useTranslation();
  if (!pending) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-in fade-in fixed inset-0 z-[90] flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-sm duration-200"
    >
      <span className="relative grid size-14 place-items-center rounded-2xl bg-primary/12 text-primary">
        <BrandLogo className="size-11 animate-pulse" />
      </span>
      <span className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
        <span className="size-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        {t("common.signingOut")}
      </span>
    </div>
  );
}

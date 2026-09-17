import { useTranslation } from "react-i18next";
import { BrandLogo } from "@/components/site/brand-logo";

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

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";
import { useTranslation } from "react-i18next";
import { buttonVariants } from "@/components/ui/button-variants";

const CONSENT_KEY = "academia.cookieConsent";

/** بانر الموافقة — يظهر أول زيارة فقط، ولا يُشغَّل أي تتبّع تحليلي قبل الموافقة. */
export function CookieConsent() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
  }, []);

  const decide = (value: "accepted" | "declined") => {
    localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new CustomEvent("academia:cookie-consent", { detail: value }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("cookie.title")}
      className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-[60] mx-auto max-h-[calc(100dvh-1.5rem)] max-w-3xl overflow-y-auto rounded-2xl border-2 border-[var(--border-strong)] bg-card p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-[var(--shadow-brutal)] md:inset-x-6 md:bottom-6 md:pb-4"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border-2 border-[var(--border-strong)] bg-primary/12 text-primary">
          <Cookie className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-foreground">{t("cookie.title")}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {t("cookie.text")}{" "}
            <Link to="/privacy" className="font-semibold text-primary hover:underline">
              {t("cookie.more")}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide("declined")}
            className={buttonVariants({
              variant: "outline",
              className: "h-auto px-3 py-2 text-xs",
            })}
          >
            {t("cookie.decline")}
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className={buttonVariants({
              variant: "default",
              className: "h-auto px-4 py-2 text-xs",
            })}
          >
            {t("cookie.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}

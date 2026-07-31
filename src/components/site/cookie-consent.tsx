import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";
import { useTranslation } from "react-i18next";

const CONSENT_KEY = "acadimia.cookieConsent";

/** بانر الموافقة — يظهر أول زيارة فقط، ولا يُشغَّل أي تتبّع تحليلي قبل الموافقة. */
export function CookieConsent() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
  }, []);

  const decide = (value: "accepted" | "declined") => {
    localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new CustomEvent("acadimia:cookie-consent", { detail: value }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("cookie.title")}
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur md:inset-x-6 md:bottom-6"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
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
            className="rounded-xl border border-border px-3 py-2 text-xs font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("cookie.decline")}
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("cookie.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}

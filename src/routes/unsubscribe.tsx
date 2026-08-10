import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MailX } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";

export const Route = createFileRoute("/unsubscribe")({
  head: () => ({
    meta: [
      { title: "إلغاء الإشعارات | أكاديميا" },
      { name: "description", content: "أوقف رسائل أكاديميا البريدية بدون الحاجة لتسجيل الدخول." },
      { property: "og:title", content: "إلغاء الإشعارات | أكاديميا" },
      { property: "og:description", content: "اختر ما تريد إيقافه من رسائل أكاديميا البريدية." },
    ],
  }),
  component: UnsubscribePage,
});

const OPTION_KEYS = ["weekly", "reminders", "community", "marketing"] as const;

function UnsubscribePage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [off, setOff] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const allOff = off.length === OPTION_KEYS.length;

  return (
    <PublicLayout>
      <section className="mx-auto max-w-xl px-5 py-20">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
          <MailX className="size-6" />
        </span>
        <h1 className="mt-5 text-3xl font-bold text-foreground">{t("unsubscribe.h1")}</h1>
        <p className="mt-3 text-muted-foreground">{t("unsubscribe.sub")}</p>

        <form
          className="mt-8 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
            toast.success(t("unsubscribe.done"));
          }}
        >
          <div>
            <label htmlFor="email" className="mb-2.5 block text-sm font-semibold text-foreground">
              {t("unsubscribe.email")}
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-xl border border-border bg-card px-4 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-2 rounded-2xl border border-border bg-card p-5">
            {OPTION_KEYS.map((k) => (
              <label key={k} className="flex items-center gap-3 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={off.includes(k)}
                  onChange={(e) =>
                    setOff((prev) =>
                      e.target.checked ? [...prev, k] : prev.filter((p) => p !== k),
                    )
                  }
                  className="size-4 accent-[var(--color-primary)]"
                />
                {t(`unsubscribe.options.${k}`)}
              </label>
            ))}
            <label className="mt-3 flex items-center gap-3 border-t border-border pt-3 text-sm font-bold text-foreground">
              <input
                type="checkbox"
                checked={allOff}
                onChange={(e) => setOff(e.target.checked ? [...OPTION_KEYS] : [])}
                className="size-4 accent-[var(--color-primary)]"
              />
              {t("unsubscribe.all")}
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("unsubscribe.submit")}
          </button>
        </form>

        {done && (
          <p className="mt-5 rounded-xl border border-success/40 bg-success/10 p-4 text-sm font-semibold text-success">
            {t("unsubscribe.done")}
          </p>
        )}

        <p className="mt-6 text-xs text-muted-foreground">{t("unsubscribe.note")}</p>
        <Link to="/" className="mt-4 inline-flex text-sm font-bold text-primary hover:underline">
          {t("unsubscribe.back")}
        </Link>
      </section>
    </PublicLayout>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Palette, ShieldCheck, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/admin/page-header";
import { usePreferences } from "@/components/providers/preferences-provider";
import { useAccess } from "@/hooks/use-access";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({
    meta: [
      { title: "الإعدادات | أكاديميا" },
      { name: "description", content: "اللغة، الثيم، وبيانات حسابك في أكاديميا." },
      { property: "og:title", content: "الإعدادات | أكاديميا" },
      { property: "og:description", content: "تفضيلاتك تُحفظ على جهازك وعلى حسابك معاً." },
    ],
  }),
  component: SettingsPage,
});

const THEMES = ["light", "dark", "auto"] as const;
const LOCALES = ["ar", "en"] as const;

function SettingsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { access } = useAccess();
  const { theme, setTheme, locale, setLocale } = usePreferences();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  }

  return (
    <div>
      <PageHeader title={t("settings.h1")} icon="Settings" />
      <div className="mx-auto max-w-3xl px-5 py-6">
        <p className="text-sm text-muted-foreground">{t("settings.sub")}</p>

      <section className="mt-6 rounded-2xl border border-border bg-card p-6">
        <h2 className="inline-flex items-center gap-2 font-bold text-foreground">
          <Palette className="size-4 text-primary" />
          {t("settings.langThemeTab")}
        </h2>

        <div className="mt-5">
          <p className="text-sm font-semibold text-foreground">{t("settings.theme")}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {THEMES.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setTheme(value)}
                className={`rounded-lg border px-3.5 py-2 text-xs font-bold transition-colors ${
                  theme === value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(`common.theme.${value}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-foreground">{t("settings.language")}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {LOCALES.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setLocale(value)}
                className={`rounded-lg border px-3.5 py-2 text-xs font-bold transition-colors ${
                  locale === value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(`common.language.${value}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="inline-flex items-center gap-2 font-bold text-foreground">
          <UserRound className="size-4 text-primary" />
          {t("settings.account")}
        </h2>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-muted-foreground">{t("settings.name")}</dt>
            <dd className="font-semibold text-foreground">{access?.profile?.full_name ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">{t("settings.email")}</dt>
            <dd className="font-semibold text-foreground">{access?.profile?.email ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">{t("settings.role")}</dt>
            <dd className="font-semibold text-foreground">{access?.profile?.role_name ?? "—"}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="inline-flex items-center gap-2 font-bold text-foreground">
          <ShieldCheck className="size-4 text-primary" />
          {t("settings.security")}
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">{t("settings.idleNote")}</p>
        <button
          type="button"
          onClick={signOut}
          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
        >
          <LogOut className="size-4" />
          {t("settings.signOut")}
        </button>
      </section>
      </div>
    </div>
  );
}

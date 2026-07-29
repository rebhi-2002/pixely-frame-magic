import { Languages, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePreferences } from "@/components/providers/preferences-provider";

const buttonClass =
  "inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground";

export function ThemeToggle() {
  const { t } = useTranslation();
  const { resolvedTheme, toggleTheme } = usePreferences();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t("common.themeToggle")}
      title={t(resolvedTheme === "dark" ? "common.theme.light" : "common.theme.dark")}
      className={buttonClass}
    >
      {resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

export function LanguageToggle() {
  const { t } = useTranslation();
  const { locale, toggleLocale } = usePreferences();
  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t("common.languageToggle")}
      title={t(locale === "ar" ? "common.language.en" : "common.language.ar")}
      className={`${buttonClass} w-auto gap-1.5 px-2.5 text-xs font-bold`}
    >
      <Languages className="size-4" />
      {locale === "ar" ? "EN" : "ع"}
    </button>
  );
}

export function PreferenceToggles({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <ThemeToggle />
      <LanguageToggle />
    </div>
  );
}

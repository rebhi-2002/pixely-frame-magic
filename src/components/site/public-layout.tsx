import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PreferenceToggles } from "@/components/site/preference-toggles";

const navItems = [
  { to: "/", key: "nav.home" },
  { to: "/how-it-works", key: "nav.howItWorks" },
  { to: "/pricing", key: "nav.pricing" },
  { to: "/for-teachers", key: "nav.forTeachers" },
] as const;

export function BrandMark({ className = "" }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <GraduationCap className="size-5" />
      </span>
      <span className="font-display text-xl font-bold text-foreground">{t("common.brand")}</span>
    </Link>
  );
}

export function PublicLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:inset-inline-start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-primary-foreground"
      >
        {t("common.skipToContent")}
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <BrandMark />
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-secondary text-foreground" }}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <PreferenceToggles />
            <Link
              to="/auth"
              className="hidden rounded-lg px-3 py-2 text-sm font-semibold whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              {t("common.signIn")}
            </Link>
            <Link
              to="/auth"
              className="rounded-xl bg-primary px-3 py-2 text-sm font-bold whitespace-nowrap text-primary-foreground transition-opacity hover:opacity-90 sm:px-4"
            >
              {t("common.startFree")}
            </Link>
          </div>

        </div>
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border bg-card/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <BrandMark />
            <p className="text-sm text-muted-foreground">{t("nav.tagline")}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div className="space-y-2">
              <p className="font-bold text-foreground">{t("nav.platform")}</p>
              {navItems.slice(1).map((i) => (
                <Link
                  key={i.to}
                  to={i.to}
                  className="block text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(i.key)}
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              <p className="font-bold text-foreground">{t("nav.legal")}</p>
              <Link
                to="/privacy"
                className="block text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("nav.privacy")}
              </Link>
              <Link
                to="/terms"
                className="block text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("nav.terms")}
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
          {t("nav.rights", { year: new Date().getFullYear() })}
        </div>
      </footer>
    </div>
  );
}

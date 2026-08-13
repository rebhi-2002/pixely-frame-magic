import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { LayoutDashboard } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PreferenceToggles } from "@/components/site/preference-toggles";
import { BrandLockup } from "@/components/site/brand-logo";
import { PageTransition } from "@/components/site/page-transition";
import { UserMenu } from "@/components/site/user-menu";
import { useSession } from "@/hooks/use-session";
import { useScrolled } from "@/hooks/use-scrolled";
import { allowedPublicPaths } from "@/lib/bi";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", key: "nav.home" },
  { to: "/courses", key: "nav.courses" },
  { to: "/how-it-works", key: "nav.howItWorks" },
  { to: "/pricing", key: "nav.pricing" },
  { to: "/for-teachers", key: "nav.forTeachers" },
] as const;

const footerPlatform = [
  { to: "/courses", key: "nav.courses" },
  { to: "/how-it-works", key: "nav.howItWorks" },
  { to: "/pricing", key: "nav.pricing" },
  { to: "/for-teachers", key: "nav.forTeachers" },
  { to: "/blog", key: "nav.blog" },
  { to: "/about", key: "nav.about" },
] as const;

const footerLegal = [
  { to: "/help", key: "nav.help" },
  { to: "/contact", key: "nav.contact" },
  { to: "/privacy", key: "nav.privacy" },
  { to: "/terms", key: "nav.terms" },
  { to: "/unsubscribe", key: "nav.unsubscribe" },
] as const;

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <BrandLockup />
    </Link>
  );
}

export function PublicLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const { session, isSignedIn } = useSession();
  const scrolled = useScrolled();
  const allowed = allowedPublicPaths(session?.roleKey ?? null);
  const visible = <T extends { to: string }>(items: readonly T[]) =>
    allowed ? items.filter((i) => allowed.includes(i.to)) : items;
  const nav = visible(navItems);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-primary-foreground"
      >
        {t("common.skipToContent")}
      </a>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-all duration-300",
          scrolled
            ? "shadow-elevation-2 border-border bg-background/85 backdrop-blur"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <BrandMark />
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-secondary text-foreground" }}
                className="nav-underline rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {isSignedIn && session ? (
              <>
                <Link
                  to={session.home}
                  className="hover-press hidden items-center gap-2 rounded-xl bg-primary px-3 py-2 text-sm font-bold whitespace-nowrap text-primary-foreground sm:inline-flex"
                >
                  <LayoutDashboard className="size-4" />
                  {t("common.dashboard")}
                </Link>
                <UserMenu session={session} />
              </>
            ) : (
              <>
                <PreferenceToggles />
                <Link
                  to="/login"
                  className="hidden rounded-lg px-3 py-2 text-sm font-semibold whitespace-nowrap text-muted-foreground hover:text-foreground sm:inline-flex"
                >
                  {t("common.signIn")}
                </Link>
                <Link
                  to="/signup"
                  className="hover-press rounded-xl bg-primary px-3 py-2 text-sm font-bold whitespace-nowrap text-primary-foreground sm:px-4"
                >
                  {t("common.startFree")}
                </Link>
              </>
            )}
          </div>
        </div>
        <div
          className={cn(
            "border-t px-3 py-2 backdrop-blur transition-colors duration-300 lg:hidden",
            scrolled ? "border-border bg-background/85" : "border-transparent bg-background/60",
          )}
        >
          <nav className="segmented-nav">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-background text-foreground shadow-sm" }}
                className="rounded-[10px] px-3 py-1.5 text-xs font-bold whitespace-nowrap text-muted-foreground transition-all duration-200"
              >
                {t(item.key)}
              </Link>
            ))}
            {isSignedIn && session && (
              <Link
                to={session.home}
                className="rounded-[10px] bg-primary px-3 py-1.5 text-xs font-bold whitespace-nowrap text-primary-foreground"
              >
                {t("common.dashboard")}
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main id="main" className="flex-1">
        <PageTransition>{children}</PageTransition>
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
              {visible(footerPlatform).map((i) => (
                <Link
                  key={i.to}
                  to={i.to}
                  className="block text-muted-foreground transition-transform duration-200 hover:text-primary rtl:hover:-translate-x-1 ltr:hover:translate-x-1"
                >
                  {t(i.key)}
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              <p className="font-bold text-foreground">{t("nav.legal")}</p>
              {footerLegal.map((i) => (
                <Link
                  key={i.to}
                  to={i.to}
                  className="block text-muted-foreground hover:text-primary rtl:hover:-translate-x-1 ltr:hover:translate-x-1"
                >
                  {t(i.key)}
                </Link>
              ))}
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

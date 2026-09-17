import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogIn,
  Menu,
  Route,
  Tag,
  UserPlus,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PreferenceToggles } from "@/components/site/preference-toggles";
import { BrandLockup } from "@/components/site/brand-logo";
import { PageTransition } from "@/components/site/page-transition";
import { UserMenu } from "@/components/site/user-menu";
import { useSession } from "@/hooks/use-session";
import { useScrolled } from "@/hooks/use-scrolled";
import { allowedPublicPaths } from "@/lib/bi";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { to: "/", key: "nav.home", icon: Home },
  { to: "/courses", key: "nav.courses", icon: BookOpen },
  { to: "/how-it-works", key: "nav.howItWorks", icon: Route },
  { to: "/pricing", key: "nav.pricing", icon: Tag },
  { to: "/for-teachers", key: "nav.forTeachers", icon: GraduationCap },
  { to: "/for-parents", key: "nav.forParents", icon: Users },
] as const;

const footerPlatform = [
  { to: "/courses", key: "nav.courses" },
  { to: "/how-it-works", key: "nav.howItWorks" },
  { to: "/pricing", key: "nav.pricing" },
  { to: "/for-teachers", key: "nav.forTeachers" },
  { to: "/for-parents", key: "nav.forParents" },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        <div className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <BrandMark />
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-secondary text-foreground" }}
                className="nav-underline rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label={t("common.openMenu")}
                  className="tap-target inline-flex items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden"
                >
                  <Menu aria-hidden="true" className="size-5" />
                </button>
              </SheetTrigger>
              {/* "start" = نفس جهة بداية النص: يمين بالعربي (RTL)، يسار
                  بالإنجليزي (LTR) — حسب طلب المستخدم صراحة. الانعكاس بين
                  اللغتين تلقائي عبر CSS (dir="rtl"/"ltr" على <html>) داخل
                  sheet.tsx، فما في داعي نحسبه هون بالجافاسكربت. */}
              <SheetContent side="start" className="w-[min(88vw,360px)]">
                <SheetHeader className="text-start">
                  <SheetTitle>{t("common.menu")}</SheetTitle>
                  <SheetDescription>{t("nav.tagline")}</SheetDescription>
                </SheetHeader>
                <nav className="mt-8 grid gap-1" aria-label={t("common.navigation")}>
                  {nav.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      activeOptions={{ exact: item.to === "/" }}
                      activeProps={{ className: "bg-secondary text-foreground" }}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <item.icon aria-hidden="true" className="size-4 shrink-0" />
                      {t(item.key)}
                    </Link>
                  ))}
                </nav>
                <div className="mt-6 grid gap-2 border-t border-border pt-6">
                  {isSignedIn && session ? (
                    <Link
                      to={session.home}
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
                    >
                      <LayoutDashboard aria-hidden="true" className="size-4" />
                      {t("common.dashboard")}
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-bold text-foreground hover:bg-secondary"
                      >
                        <LogIn aria-hidden="true" className="size-4" />
                        {t("common.signIn")}
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setMobileMenuOpen(false)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
                      >
                        <UserPlus aria-hidden="true" className="size-4" />
                        {t("common.startFree")}
                      </Link>
                    </>
                  )}
                  <PreferenceToggles className="justify-center pt-2" />
                </div>
              </SheetContent>
            </Sheet>
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
                <PreferenceToggles className="hidden lg:flex" />
                <Link
                  to="/login"
                  className="hidden rounded-lg px-3 py-2 text-sm font-semibold whitespace-nowrap text-muted-foreground hover:text-foreground sm:inline-flex"
                >
                  {t("common.signIn")}
                </Link>
                <Link
                  to="/signup"
                  className="hover-press inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-sm font-bold whitespace-nowrap text-primary-foreground sm:px-4"
                >
                  <UserPlus className="size-4" />
                  {t("common.startFree")}
                </Link>
              </>
            )}
          </div>
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

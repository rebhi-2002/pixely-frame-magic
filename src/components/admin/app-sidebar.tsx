import { useMemo, useState } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronLeft,
  Home,
  Languages,
  LogOut,
  Moon,
  PanelRightClose,
  PanelRightOpen,
  Search,
  Settings,
  Sun,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePreferences } from "@/components/providers/preferences-provider";
import { supabase } from "@/integrations/supabase/client";
import { DynamicIcon } from "./dynamic-icon";
import { cn } from "@/lib/utils";
import type { AccessModule, AccessPage, MyAccess } from "@/lib/rbac-types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BrandLockup } from "@/components/site/brand-logo";

function collectPaths(pages: AccessPage[]): string[] {
  return pages.flatMap((p) => [...(p.path ? [p.path] : []), ...collectPaths(p.children)]);
}

export function AppSidebar({
  access,
  collapsed,
  onToggle,
  onNavigate,
}: {
  access: MyAccess;
  collapsed: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}) {
  const { t } = useTranslation();
  const { resolvedTheme, toggleTheme, locale, toggleLocale } = usePreferences();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [flyout, setFlyout] = useState<string | null>(null);

  /** اسم القسم/الصفحة بلغة الواجهة الحالية. */
  const label = (item: { name: string; nameEn: string }) =>
    locale === "en" ? item.nameEn || item.name : item.name;

  const activeModuleKeys = useMemo(
    () =>
      access.modules
        .filter((m) => collectPaths(m.pages).some((p) => pathname.startsWith(p)))
        .map((m) => m.key),
    [access.modules, pathname],
  );

  const [openModules, setOpenModules] = useState<string[]>(activeModuleKeys);
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [closedModules, setClosedModules] = useState<string[]>([]);

  const effectiveOpenModules = Array.from(new Set([...openModules, ...activeModuleKeys])).filter(
    (k) => !closedModules.includes(k),
  );

  const toggleModule = (key: string) => {
    if (effectiveOpenModules.includes(key)) {
      setClosedModules((prev) => [...prev, key]);
      setOpenModules((prev) => prev.filter((k) => k !== key));
    } else {
      setClosedModules((prev) => prev.filter((k) => k !== key));
      setOpenModules((prev) => [...prev, key]);
    }
  };

  const searchResults = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return [];
    const out: { name: string; path: string; module: string }[] = [];
    const walk = (m: AccessModule, pages: AccessPage[]) => {
      for (const p of pages) {
        const name = label(p);
        if (
          p.path &&
          (p.name.toLowerCase().includes(term) || p.nameEn.toLowerCase().includes(term))
        )
          out.push({ name, path: p.path, module: label(m) });
        walk(m, p.children);
      }
    };
    access.modules.forEach((m) => walk(m, m.pages));
    return out.slice(0, 8);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, access.modules, locale]);

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  const isActive = (path: string | null) => Boolean(path && pathname === path);

  const accountItem = (extra?: string) =>
    cn(
      "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-sidebar-foreground/85 transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-foreground",
      collapsed && "justify-center px-0",
      extra,
    );

  return (
    <aside
      className={cn(
        "shadow-elevation-2 flex h-full shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        collapsed ? "w-[76px]" : "w-72",
      )}
    >
      <div className="flex items-center justify-between gap-2 px-3 py-4">
        {!collapsed && <BrandLockup />}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          aria-label={collapsed ? "توسيع القائمة" : "طي القائمة"}
          className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          {collapsed ? (
            <PanelRightOpen className="size-5" />
          ) : (
            <PanelRightClose className="size-5" />
          )}
        </Button>
      </div>

      {!collapsed && (
        <div className="px-3 pb-3">
          <div className="relative">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-sidebar-foreground/50" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("common.searchPages")}
              className="h-9 border-sidebar-border bg-sidebar-accent ps-9 text-sidebar-foreground placeholder:text-sidebar-foreground/50"
            />
          </div>
          {searchResults.length > 0 && (
            <ul className="panel-swap mt-2 space-y-1 rounded-lg bg-sidebar-accent p-1">
              {searchResults.map((r) => (
                <li key={r.path}>
                  <Link
                    to={r.path}
                    onClick={() => setSearch("")}
                    className="block rounded-md px-2 py-1.5 text-xs hover:bg-sidebar-primary/20"
                  >
                    <span className="font-medium">{r.name}</span>
                    <span className="ms-1 text-sidebar-foreground/50">— {r.module}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        {!collapsed && (
          <p className="px-3 pb-1.5 text-[11px] font-bold tracking-wide text-sidebar-foreground/45">
            {t("common.navigation")}
          </p>
        )}
        {access.modules.map((m) => {
          const open = effectiveOpenModules.includes(m.key);
          return (
            <div key={m.key} className="relative mb-1">
              <button
                onClick={() =>
                  collapsed ? setFlyout(flyout === m.key ? null : m.key) : toggleModule(m.key)
                }
                title={collapsed ? label(m) : undefined}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-xl border-s-2 border-transparent px-3 py-2.5 text-sm font-semibold transition-all duration-200",
                  "hover:bg-sidebar-accent",
                  open && !collapsed && "border-sidebar-primary bg-sidebar-accent",
                  collapsed && "justify-center px-0",
                )}
              >
                <DynamicIcon name={m.icon} className="size-[18px] shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-start">{label(m)}</span>
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform duration-200",
                        !open && "-rotate-90 rtl:rotate-90",
                      )}
                    />
                  </>
                )}
              </button>

              {collapsed && flyout === m.key && (
                <div className="panel-swap absolute top-0 z-50 w-56 rounded-xl border border-sidebar-border bg-sidebar p-2 shadow-xl ltr:left-full ltr:ml-2 rtl:right-full rtl:mr-2">
                  <p className="px-2 py-1 text-xs font-bold text-sidebar-foreground/60">
                    {label(m)}
                  </p>
                  <PageList
                    pages={m.pages}
                    isActive={isActive}
                    label={label}
                    openGroups={openGroups}
                    setOpenGroups={setOpenGroups}
                    onNavigate={() => {
                      setFlyout(null);
                      onNavigate?.();
                    }}
                  />
                </div>
              )}

              {!collapsed && open && (
                <div className="panel-swap mt-1">
                  <PageList
                    pages={m.pages}
                    isActive={isActive}
                    label={label}
                    openGroups={openGroups}
                    setOpenGroups={setOpenGroups}
                    onNavigate={onNavigate}
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* حسابي — التفضيلات والإعدادات والخروج داخل نفس القائمة */}
        <div className="mt-4 border-t border-sidebar-border pt-3">
          {!collapsed && (
            <div className="mb-2 px-3">
              <p className="text-[11px] font-bold tracking-wide text-sidebar-foreground/45">
                {t("common.account")}
              </p>
              <p className="mt-1.5 truncate text-sm font-semibold">
                {access.profile?.full_name ?? "مستخدم"}
              </p>
              <p className="truncate text-xs text-sidebar-foreground/60">
                {access.profile?.role_name ?? "بدون نوع"}
              </p>
            </div>
          )}

          <Link
            to="/"
            onClick={onNavigate}
            title={t("common.backToSite")}
            className={accountItem()}
          >
            <Home className="size-4 shrink-0" />
            {!collapsed && t("common.backToSite")}
          </Link>

          <Link
            to="/settings"
            onClick={onNavigate}
            title={t("common.settings")}
            className={accountItem(
              pathname === "/settings"
                ? "bg-sidebar-primary/12 font-bold text-sidebar-primary"
                : undefined,
            )}
          >
            <Settings className="size-4 shrink-0" />
            {!collapsed && t("common.settings")}
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            title={t("common.themeToggle")}
            className={accountItem()}
          >
            {resolvedTheme === "dark" ? (
              <Sun className="size-4 shrink-0" />
            ) : (
              <Moon className="size-4 shrink-0" />
            )}
            {!collapsed && t(resolvedTheme === "dark" ? "common.theme.light" : "common.theme.dark")}
          </button>

          <button
            type="button"
            onClick={toggleLocale}
            title={t("common.languageToggle")}
            className={accountItem()}
          >
            <Languages className="size-4 shrink-0" />
            {!collapsed && t(locale === "ar" ? "common.language.en" : "common.language.ar")}
          </button>

          <button
            type="button"
            onClick={handleSignOut}
            title={t("common.signOut")}
            className={accountItem(
              "text-destructive hover:bg-destructive/10 hover:text-destructive",
            )}
          >
            <LogOut className="size-4 shrink-0" />
            {!collapsed && t("common.signOut")}
          </button>
        </div>
      </nav>
    </aside>
  );
}

function PageList({
  pages,
  isActive,
  label,
  openGroups,
  setOpenGroups,
  onNavigate,
  depth = 0,
}: {
  pages: AccessPage[];
  isActive: (p: string | null) => boolean;
  label: (item: { name: string; nameEn: string }) => string;
  openGroups: string[];
  setOpenGroups: React.Dispatch<React.SetStateAction<string[]>>;
  onNavigate?: () => void;
  depth?: number;
}) {
  return (
    <ul className={cn("space-y-0.5", depth > 0 && "ms-3 border-s border-sidebar-border ps-2")}>
      {pages.map((p) => {
        if (p.children.length > 0) {
          const open = openGroups.includes(p.key) || p.children.some((c) => isActive(c.path));
          return (
            <li key={p.key}>
              <button
                onClick={() =>
                  setOpenGroups((prev) =>
                    prev.includes(p.key) ? prev.filter((k) => k !== p.key) : [...prev, p.key],
                  )
                }
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[13px] transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
              >
                <DynamicIcon name={p.icon} className="size-4 shrink-0" />
                <span className="flex-1 text-start">{label(p)}</span>
                {open ? (
                  <ChevronDown className="size-3.5" />
                ) : (
                  <ChevronLeft className="size-3.5 rtl:rotate-0 ltr:rotate-180" />
                )}
              </button>
              {open && (
                <div className="animate-in slide-in-from-top-1 fade-in mt-0.5 duration-200">
                  <PageList
                    pages={p.children}
                    isActive={isActive}
                    label={label}
                    openGroups={openGroups}
                    setOpenGroups={setOpenGroups}
                    onNavigate={onNavigate}
                    depth={depth + 1}
                  />
                </div>
              )}
            </li>
          );
        }

        if (!p.path) return null;

        const active = isActive(p.path);

        return (
          <li key={p.key}>
            <Link
              to={p.path}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2 rounded-xl border-s-2 px-3 py-2 text-[13px] transition-all duration-200",
                active
                  ? "border-sidebar-primary bg-sidebar-primary/12 font-bold text-sidebar-primary"
                  : "border-transparent text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-foreground",
              )}
            >
              <DynamicIcon name={p.icon} className="size-4 shrink-0" />
              <span>{label(p)}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

import { useMemo, useState } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronDown, LogOut, PanelRightClose, PanelRightOpen, Search, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DynamicIcon } from "./dynamic-icon";
import { cn } from "@/lib/utils";
import type { AccessModule, AccessPage, MyAccess } from "@/lib/rbac-types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PreferenceToggles } from "@/components/site/preference-toggles";
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [flyout, setFlyout] = useState<string | null>(null);

  const activeModuleKeys = useMemo(
    () =>
      access.modules
        .filter((m) => collectPaths(m.pages).some((p) => pathname.startsWith(p)))
        .map((m) => m.key),
    [access.modules, pathname],
  );

  const [openModules, setOpenModules] = useState<string[]>(activeModuleKeys);
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const effectiveOpenModules = Array.from(new Set([...openModules, ...activeModuleKeys]));

  const toggleModule = (key: string) =>
    setOpenModules((prev) =>
      effectiveOpenModules.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );

  const searchResults = useMemo(() => {
    const term = search.trim();
    if (!term) return [];
    const out: { name: string; path: string; module: string }[] = [];
    const walk = (m: AccessModule, pages: AccessPage[]) => {
      for (const p of pages) {
        if (p.path && p.name.includes(term)) out.push({ name: p.name, path: p.path, module: m.name });
        walk(m, p.children);
      }
    };
    access.modules.forEach((m) => walk(m, m.pages));
    return out.slice(0, 8);
  }, [search, access.modules]);

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  }

  const isActive = (path: string | null) => Boolean(path && pathname === path);

  return (
    <aside
      className={cn(
        "flex shrink-0 flex-col transition-all duration-300",
        collapsed ? "w-[76px] bg-sidebar text-sidebar-foreground" : "w-72 bg-sidebar text-sidebar-foreground",
      )}
    >
      <div className="flex items-center justify-between gap-2 px-3 py-4">
        {!collapsed && (
          <BrandLockup />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          aria-label={collapsed ? "توسيع القائمة" : "طي القائمة"}
          className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          {collapsed ? <PanelRightOpen className="size-5" /> : <PanelRightClose className="size-5" />}
        </Button>
      </div>

      <div className="px-3 pb-3">
        <div className="relative">
          <Search className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-sidebar-foreground/50" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={collapsed ? "بحث" : "ابحث في كل الصفحات..."}
            className="h-9 border-sidebar-border bg-sidebar-accent pr-8 text-sidebar-foreground placeholder:text-sidebar-foreground/50"
          />
        </div>
        {searchResults.length > 0 && (
          <ul className="mt-2 space-y-1 rounded-lg bg-sidebar-accent p-1">
            {searchResults.map((r) => (
              <li key={r.path}>
                <Link
                  to={r.path}
                  onClick={() => setSearch("")}
                  className="block rounded-md px-2 py-1.5 text-xs hover:bg-sidebar-primary/20"
                >
                  <span className="font-medium">{r.name}</span>
                  <span className="mr-1 text-sidebar-foreground/50">— {r.module}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        {access.modules.map((m) => {
          const open = effectiveOpenModules.includes(m.key);
          return (
            <div key={m.key} className="relative mb-1">
              <button
                onClick={() => (collapsed ? setFlyout(flyout === m.key ? null : m.key) : toggleModule(m.key))}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                  "hover:bg-sidebar-accent",
                  open && !collapsed && "bg-sidebar-accent",
                  collapsed && "justify-center px-0",
                )}
              >
                <DynamicIcon name={m.icon} className="size-[18px] shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-right">{m.name}</span>
                    {open ? <ChevronDown className="size-4" /> : <ChevronLeft className="size-4" />}
                  </>
                )}
              </button>

              {collapsed && flyout === m.key && (
                <div className="absolute left-full top-0 z-50 mr-2 w-56 rounded-xl border border-sidebar-border bg-sidebar p-2 shadow-xl">
                  <p className="px-2 py-1 text-xs font-bold text-sidebar-foreground/60">{m.name}</p>
                  <PageList
                    pages={m.pages}
                    isActive={isActive}
                    openGroups={openGroups}
                    setOpenGroups={setOpenGroups}
                    onNavigate={() => { setFlyout(null); onNavigate?.(); }}
                  />
                </div>
              )}

              {!collapsed && open && (
                <div className="animate-in slide-in-from-top-1 fade-in mt-1 duration-200">
                  <PageList
                    pages={m.pages}
                    isActive={isActive}
                    openGroups={openGroups}
                    setOpenGroups={setOpenGroups}
                    onNavigate={onNavigate}
                  />
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        {!collapsed && (
          <div className="mb-2 px-1">
            <p className="truncate text-sm font-semibold">{access.profile?.full_name ?? "مستخدم"}</p>
            <p className="truncate text-xs text-sidebar-foreground/60">
              {access.profile?.role_name ?? "بدون نوع"}
            </p>
          </div>
        )}
        <div className={cn("mb-2 flex items-center gap-1", collapsed && "flex-col")}>
          <PreferenceToggles />
        </div>
        <Link
          to="/settings"
          onClick={onNavigate}
          className={cn(
            "mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
            collapsed && "justify-center px-0",
            pathname === "/settings" && "bg-sidebar-primary text-sidebar-primary-foreground",
          )}
        >
          <Settings className="size-4" />
          {!collapsed && "الإعدادات"}
        </Link>
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className={cn(
            "w-full justify-start gap-2 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
            collapsed && "justify-center px-0",
          )}
        >
          <LogOut className="size-4" />
          {!collapsed && "تسجيل الخروج"}
        </Button>
      </div>
    </aside>
  );
}

function PageList({
  pages,
  isActive,
  openGroups,
  setOpenGroups,
  onNavigate,
  depth = 0,
}: {
  pages: AccessPage[];
  isActive: (p: string | null) => boolean;
  openGroups: string[];
  setOpenGroups: React.Dispatch<React.SetStateAction<string[]>>;
  onNavigate?: () => void;
  depth?: number;
}) {
  return (
    <ul className={cn("space-y-0.5", depth > 0 && "mr-3 border-r border-sidebar-border pr-2")}>
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
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[13px] transition-colors hover:bg-sidebar-accent"
              >
                <DynamicIcon name={p.icon} className="size-4 shrink-0" />
                <span className="flex-1 text-right">{p.name}</span>
                {open ? <ChevronDown className="size-3.5" /> : <ChevronLeft className="size-3.5" />}
              </button>
              {open && (
                <div className="animate-in slide-in-from-top-1 fade-in mt-0.5 duration-200">
                  <PageList
                    pages={p.children}
                    isActive={isActive}
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

        return (
          <li key={p.key}>
            <Link
              to={p.path}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] transition-colors hover:bg-sidebar-accent",
                isActive(p.path) && "bg-sidebar-primary font-semibold text-sidebar-primary-foreground",
              )}
            >
              <DynamicIcon name={p.icon} className="size-4 shrink-0" />
              <span>{p.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

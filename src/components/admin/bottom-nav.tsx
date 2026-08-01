import { useMemo, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { MoreHorizontal, Settings, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DynamicIcon } from "./dynamic-icon";
import { cn } from "@/lib/utils";
import type { AccessModule, AccessPage, MyAccess } from "@/lib/rbac-types";
import { PreferenceToggles } from "@/components/site/preference-toggles";

type Item = { key: string; name: string; icon: string; path: string };

function firstPath(pages: AccessPage[]): string | null {
  for (const p of pages) {
    if (p.path) return p.path;
    const nested = firstPath(p.children);
    if (nested) return nested;
  }
  return null;
}

function flatten(module: AccessModule): Item[] {
  const out: Item[] = [];
  const walk = (pages: AccessPage[]) => {
    for (const p of pages) {
      if (p.path) out.push({ key: p.key, name: p.name, icon: p.icon, path: p.path });
      walk(p.children);
    }
  };
  walk(module.pages);
  return out;
}

/** شريط تنقّل سفلي للجوال — يظهر فقط بعد تسجيل الدخول (قرار المستخدم). */
export function BottomNav({ access }: { access: MyAccess }) {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [sheetOpen, setSheetOpen] = useState(false);

  const primary = useMemo<Item[]>(
    () =>
      access.modules
        .map((m) => {
          const path = firstPath(m.pages);
          return path ? { key: m.key, name: m.name, icon: m.icon, path } : null;
        })
        .filter((i): i is Item => i !== null),
    [access.modules],
  );

  const visible = primary.slice(0, 4);
  const overflowModules = access.modules.filter((m) => !visible.some((v) => v.key === m.key));
  const hasOverflow = overflowModules.length > 0;

  if (visible.length === 0) return null;

  return (
    <>
      {sheetOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm md:hidden"
          onClick={() => setSheetOpen(false)}
        >
          <div
            className="absolute inset-x-0 bottom-16 max-h-[60vh] overflow-y-auto rounded-t-2xl border-t border-sidebar-border bg-sidebar p-4 text-sidebar-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="font-display text-sm font-bold">{t("common.menu")}</p>
              <button
                type="button"
                aria-label={t("common.cancel")}
                onClick={() => setSheetOpen(false)}
                className="rounded-lg p-1.5 text-sidebar-foreground/70"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="space-y-4">
              {overflowModules.map((m) => (
                <div key={m.key}>
                  <p className="mb-1.5 text-xs font-bold text-sidebar-foreground/60">{m.name}</p>
                  <ul className="space-y-1">
                    {flatten(m).map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          onClick={() => setSheetOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm hover:bg-sidebar-accent"
                        >
                          <DynamicIcon name={item.icon} className="size-4 shrink-0" />
                          <span className="truncate">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="border-t border-sidebar-border pt-3">
                <Link
                  to="/settings"
                  onClick={() => setSheetOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm hover:bg-sidebar-accent"
                >
                  <Settings className="size-4 shrink-0" />
                  <span>{t("settings.h1")}</span>
                </Link>
                <div className="mt-2 flex items-center gap-1 px-1.5">
                  <PreferenceToggles />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav
        aria-label={t("common.menu")}
        className="fixed inset-x-0 bottom-0 z-50 border-t border-sidebar-border bg-sidebar text-sidebar-foreground md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid" style={{ gridTemplateColumns: `repeat(${visible.length + (hasOverflow ? 1 : 0)}, minmax(0,1fr))` }}>
          {visible.map((item) => {
            const active = pathname.startsWith(item.path);
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex h-16 flex-col items-center justify-center gap-1 px-1 text-[11px] font-semibold transition-colors",
                    active ? "text-sidebar-primary" : "text-sidebar-foreground/65",
                  )}
                >
                  <DynamicIcon name={item.icon} className="size-5 shrink-0" />
                  <span className="w-full truncate text-center">{item.name}</span>
                </Link>
              </li>
            );
          })}
          {hasOverflow && (
            <li>
              <button
                type="button"
                onClick={() => setSheetOpen((v) => !v)}
                className={cn(
                  "flex h-16 w-full flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors",
                  sheetOpen ? "text-sidebar-primary" : "text-sidebar-foreground/65",
                )}
              >
                <MoreHorizontal className="size-5 shrink-0" />
                <span>{t("common.more")}</span>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

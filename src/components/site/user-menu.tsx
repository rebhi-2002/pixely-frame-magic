import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDown, LayoutDashboard, Languages, LogOut, Moon, Settings, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { usePreferences } from "@/components/providers/preferences-provider";
import type { PublicSession } from "@/hooks/use-session";

const item =
  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-foreground/80 transition-all duration-200 hover:translate-x-0 hover:bg-secondary hover:text-foreground rtl:hover:-translate-x-0.5 ltr:hover:translate-x-0.5";

/** قائمة المستخدم بعد تسجيل الدخول — لوحة التحكم، الثيم، اللغة، الإعدادات، الخروج. */
export function UserMenu({ session }: { session: PublicSession }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { resolvedTheme, toggleTheme, locale, toggleLocale } = usePreferences();

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  const initial = session.fullName.trim().charAt(0) || "A";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={session.fullName}
        className="flex items-center gap-2 rounded-xl border border-border bg-card px-2 py-1.5 text-sm font-bold text-foreground transition-all duration-200 hover:border-primary/50 hover:shadow-sm"
      >
        <span className="grid size-7 place-items-center rounded-lg bg-primary/15 text-xs font-black text-primary">
          {initial}
        </span>
        <span className="hidden max-w-24 truncate sm:inline">{session.fullName}</span>
        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="animate-in fade-in slide-in-from-top-1 absolute end-0 top-full z-50 mt-2 w-60 rounded-2xl border border-border bg-popover p-2 shadow-xl duration-200">
          <div className="border-b border-border px-3 pb-2.5 pt-1.5">
            <p className="truncate text-sm font-bold text-foreground">{session.fullName}</p>
            <p className="truncate text-xs text-muted-foreground">
              {session.roleName ?? session.email}
            </p>
          </div>

          <div className="mt-1.5 space-y-0.5">
            <Link to={session.home} onClick={() => setOpen(false)} className={item}>
              <LayoutDashboard className="size-4 text-primary" />
              {t("common.dashboard")}
            </Link>
            <Link to="/settings" onClick={() => setOpen(false)} className={item}>
              <Settings className="size-4" />
              {t("common.settings")}
            </Link>
            <button type="button" onClick={toggleTheme} className={item}>
              {resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              {t(resolvedTheme === "dark" ? "common.theme.light" : "common.theme.dark")}
            </button>
            <button type="button" onClick={toggleLocale} className={item}>
              <Languages className="size-4" />
              {t(locale === "ar" ? "common.language.en" : "common.language.ar")}
            </button>
          </div>

          <div className="mt-1.5 border-t border-border pt-1.5">
            <button
              type="button"
              onClick={signOut}
              className={`${item} text-destructive hover:bg-destructive/10 hover:text-destructive`}
            >
              <LogOut className="size-4" />
              {t("common.signOut")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

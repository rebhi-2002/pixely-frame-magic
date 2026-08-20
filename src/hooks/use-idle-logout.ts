import { useEffect, useRef } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { isAuthenticated, logout } from "@/integrations/backend/auth";

/** ساعتان — تسجيل خروج تلقائي عند الخمول (قرار أمان متفق عليه مع المستخدم). */
export const IDLE_LIMIT_MS = 2 * 60 * 60 * 1000;
export const LAST_ACTIVITY_KEY = "acadimia.lastActivity";

const ACTIVITY_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart", "visibilitychange"];

/**
 * الجلسة نفسها محفوظة (persistSession) فتبقى بعد الريلود أو إغلاق المتصفح،
 * لكن الخمول أكثر من ساعتين ينهيها فوراً عند العودة أو أثناء الجلسة.
 */
export function useIdleLogout() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const signingOut = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const touch = () => {
      if (document.visibilityState === "hidden") return;
      localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
    };

    const expire = async () => {
      if (signingOut.current) return;
      signingOut.current = true;
      if (!isAuthenticated()) {
        signingOut.current = false;
        return;
      }
      localStorage.removeItem(LAST_ACTIVITY_KEY);
      await logout();
      toast.warning(t("session.expired"));
      navigate({ to: "/login", replace: true });
      signingOut.current = false;
    };

    const check = () => {
      const raw = Number(localStorage.getItem(LAST_ACTIVITY_KEY) ?? 0);
      if (!raw) {
        touch();
        return;
      }
      if (Date.now() - raw > IDLE_LIMIT_MS) void expire();
    };

    check();
    touch();
    ACTIVITY_EVENTS.forEach((e) => window.addEventListener(e, touch, { passive: true }));
    const timer = window.setInterval(check, 60_000);

    return () => {
      ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, touch));
      window.clearInterval(timer);
    };
  }, [navigate, t]);

  // كل تنقّل داخل المنصة يُعتبر نشاطاً
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
    }
  }, [pathname]);
}

export function IdleLogoutWatcher() {
  useIdleLogout();
  return null;
}

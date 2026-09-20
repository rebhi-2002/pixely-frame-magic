import { useEffect, useState } from "react";
import { createFileRoute, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Menu } from "lucide-react";
import { toast } from "sonner";
import {
  clearStoredSession,
  getStoredUserId,
  isAuthenticated,
  isDemoSession,
  verifyServerSession,
} from "@/integrations/backend/auth";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/site/page-transition";
import { DashboardSkeleton } from "@/components/app/dashboard-skeleton";

import { SESSION_EXPIRED_EVENT } from "@/integrations/backend/client";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { env } from "@/lib/env";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const demoAllowed = env.ENABLE_DEMO_LOGIN;

    // Demo routes remain available in local dev, or on a deployment where
    // VITE_ENABLE_DEMO_LOGIN is explicitly set — same condition everywhere
    // demo mode is checked (auth.ts, auth-middleware.ts, login.tsx).
    if (demoAllowed && isDemoSession()) {
      return { user: { id: getStoredUserId() ?? "u-demo" } };
    }

    if (!isAuthenticated() || !(await verifyServerSession())) {
      throw redirect({ to: "/login" });
    }

    const userId = getStoredUserId();
    if (!userId) throw redirect({ to: "/login" });
    return { user: { id: userId } };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  /* البند 6 — حالة القائمة محفوظة بين الجلسات */
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    setCollapsed(localStorage.getItem("academia.sidebar") === "collapsed");
  }, []);
  useEffect(() => {
    localStorage.setItem("academia.sidebar", collapsed ? "collapsed" : "expanded");
  }, [collapsed]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { access, isLoading, error } = useAccess();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const bi = useBi();

  /* أي طلب للباك اند رجع 401 (الكوكي انتهت/ما وصلت) = الجلسة الفعلية انتهت رغم
     إن الواجهة لسا مخزّنة "مسجّل دخول". بدل ما تضل الصفحة عالقة بأخطاء، منمسح
     الجلسة المحلية ونرجّع المستخدم لصفحة الدخول. جلسات الديمو ما بتتأثر (ما
     بتنادي الباك اند). */
  useEffect(() => {
    let handled = false;
    const onExpired = () => {
      if (handled) return;
      if (env.ENABLE_DEMO_LOGIN && isDemoSession()) return;
      handled = true;
      clearStoredSession();
      queryClient.clear();
      toast.error(
        bi(
          "انتهت جلستك. سجّل الدخول مجددًا للمتابعة.",
          "Your session has ended. Please sign in again to continue.",
        ),
      );
      navigate({ to: "/login", replace: true });
    };
    window.addEventListener(SESSION_EXPIRED_EVENT, onExpired);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired);
  }, [bi, navigate, queryClient]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error || !access) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
        <p className="text-sm text-muted-foreground">
          تعذّر تحميل صلاحياتك. حاول تحديث الصفحة أو تسجيل الدخول مجدداً.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      {mobileOpen && (
        <button
          type="button"
          aria-label="إغلاق القائمة"
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 start-0 z-50 flex transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:sticky md:top-0 md:z-auto md:h-screen md:translate-x-0 ${mobileOpen ? "translate-x-0" : "max-md:ltr:-translate-x-full max-md:rtl:translate-x-full"}`}
      >
        <AppSidebar
          access={access}
          collapsed={mobileOpen ? false : collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          onClose={() => setMobileOpen(false)}
          onNavigate={() => setMobileOpen(false)}
        />
      </div>
      <main className="min-w-0 flex-1">
        <div className="shadow-elevation-1 sticky top-0 z-30 flex h-12 items-center border-b border-border bg-background/90 px-3 backdrop-blur md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(true)}
            aria-label="فتح القائمة"
          >
            <Menu className="size-5" />
          </Button>
          <span className="ms-2 font-display text-sm font-bold text-foreground">Academia</span>
        </div>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  );
}

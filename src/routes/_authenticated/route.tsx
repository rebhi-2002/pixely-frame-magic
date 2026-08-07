import { useState } from "react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Loader2, Menu } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/site/page-transition";

import { useAccess } from "@/hooks/use-access";
import { IdleLogoutWatcher } from "@/hooks/use-idle-logout";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/login" });
    return { user: data.user };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { access, isLoading, error } = useAccess();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
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
      <IdleLogoutWatcher />
      {mobileOpen && (
        <button
          type="button"
          aria-label="إغلاق القائمة"
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div className={`fixed inset-y-0 start-0 z-50 flex transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:sticky md:top-0 md:z-auto md:h-screen md:translate-x-0 ${mobileOpen ? "translate-x-0" : "ltr:-translate-x-full rtl:translate-x-full"}`}>
        <AppSidebar
          access={access}
          collapsed={mobileOpen ? false : collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          onNavigate={() => setMobileOpen(false)}
        />
      </div>
      <main className="min-w-0 flex-1">
        <div className="sticky top-0 z-30 flex h-12 items-center border-b border-border bg-background/90 px-3 backdrop-blur md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} aria-label="فتح القائمة">
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


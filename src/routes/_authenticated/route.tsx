import { useState } from "react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { useAccess } from "@/hooks/use-access";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const [collapsed, setCollapsed] = useState(false);
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
      <div className="hidden md:flex">
        <AppSidebar
          access={access}
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
        />
      </div>
      <main className="min-w-0 flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <BottomNav access={access} />
    </div>
  );
}


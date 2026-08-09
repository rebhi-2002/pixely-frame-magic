import { Link } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { useAccess } from "@/hooks/use-access";
import { pageMatchesRole, roleHome, roleKeyFromName, useBi } from "@/lib/bi";

/** حراسة الصفحة على الواجهة (الحراسة الحقيقية على السيرفر في rbac.server.ts). */
export function useCanView(pageKey: string) {
  const { access, can, isLoading } = useAccess();
  const role = roleKeyFromName(access?.profile?.role_name, access?.isAdmin);
  return {
    loading: isLoading,
    allowed: can(pageKey, "view_list") && pageMatchesRole(pageKey, role),
    access,
  };
}

export function Forbidden() {
  const bi = useBi();
  const { access } = useAccess();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-5 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <ShieldAlert className="size-7" />
      </span>
      <h1 className="mt-4 font-display text-xl font-bold text-foreground">
        {bi("هذه الصفحة ليست جزءاً من مساحتك", "This page is not part of your space")}
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {bi(
          "دورك الحالي لا يملك صلاحية عرض هذه الصفحة. ارجع إلى مساحتك أو اطلب الصلاحية من الإدارة.",
          "Your current role cannot view this page. Go back to your space or request access from the admin.",
        )}
      </p>
      <Link
        to={roleHome(access?.profile?.role_name, access?.isAdmin)}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {bi("رجوع إلى مساحتي", "Back to my space")}
      </Link>
    </div>
  );
}

export function Guard({ pageKey, children }: { pageKey: string; children: React.ReactNode }) {
  const { loading, allowed } = useCanView(pageKey);
  if (loading) return null;
  if (!allowed) return <Forbidden />;
  return <>{children}</>;
}

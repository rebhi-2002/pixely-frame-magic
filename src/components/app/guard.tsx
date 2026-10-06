import { Link } from "@tanstack/react-router";
import { ShieldX } from "lucide-react";
import { useAccess } from "@/hooks/use-access";
import { useCanView } from "@/hooks/use-can-view";
import { roleHome, roleHomeForKey, useBi } from "@/lib/bi";
import { DashboardSkeleton } from "@/components/app/dashboard-skeleton";
import { buttonVariants } from "@/components/ui/button-variants";

/* كانت هذه الصفحة الوحيدة الناسية ترقية Neo-Brutalism (surface-mesh/btn-shine
   القديمة + توضيح SVG زخرفي ForbiddenIllustration)، رغم أنها شاشة عامة فعليًا
   (مسار /403 مباشر) لا جزء من لوحات التحكم المؤجَّلة. استبدلنا التوضيح
   الزخرفي بأيقونة ShieldX ذات معنى واضح (صلاحية محظورة) بلون destructive
   (أحمر) تطابق أسلوب صفحتي 404/500 بـ__root.tsx تمامًا. */
export function Forbidden() {
  const bi = useBi();
  const { access } = useAccess();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md rounded-3xl border-2 border-[var(--border-strong)] bg-card p-8 text-center shadow-[var(--shadow-brutal)]">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full border-2 border-[var(--border-strong)] bg-destructive/12 text-destructive">
          <ShieldX className="size-7" aria-hidden="true" />
        </span>
        <h1 className="mt-4 text-xl font-bold text-foreground">
          {bi("هذه الصفحة ليست جزءاً من مساحتك", "This page is not part of your space")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {bi(
            "دورك الحالي لا يملك صلاحية عرض هذه الصفحة. ارجع إلى مساحتك أو اطلب الصلاحية من الإدارة.",
            "Your current role cannot view this page. Go back to your space or request access from the admin.",
          )}
        </p>
        <Link
          to={
            access?.profile?.role_key
              ? roleHomeForKey(access.profile.role_key)
              : roleHome(access?.profile?.role_name, access?.isAdmin)
          }
          className={buttonVariants({
            variant: "default",
            className: "mt-7 h-auto px-6 py-3 text-sm",
          })}
        >
          {bi("رجوع إلى مساحتي", "Back to my space")}
        </Link>
      </div>
    </div>
  );
}

export function Guard({ pageKey, children }: { pageKey: string; children: React.ReactNode }) {
  const { loading, allowed } = useCanView(pageKey);
  if (loading) return <DashboardSkeleton />;
  if (!allowed) return <Forbidden />;
  return <>{children}</>;
}

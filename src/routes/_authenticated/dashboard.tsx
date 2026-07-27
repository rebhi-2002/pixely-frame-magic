import { createFileRoute, Link } from "@tanstack/react-router";
import { LayoutDashboard, ShieldCheck, ToggleRight, Users2 } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { useAccess } from "@/hooks/use-access";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "لوحة المعلومات | نظام الصلاحيات" },
      { name: "description", content: "نظرة عامة على وحدات النظام وصلاحيات المستخدم الحالي." },
      { property: "og:title", content: "لوحة المعلومات | نظام الصلاحيات" },
      { property: "og:description", content: "نظرة عامة على وحدات النظام وصلاحيات المستخدم." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { access, can } = useAccess();
  const moduleCount = access?.modules.length ?? 0;
  const pageCount = Object.keys(access?.permissions ?? {}).length;

  return (
    <div>
      <PageHeader title="لوحة المعلومات" icon="LayoutDashboard" />
      <div className="p-5">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-base font-bold text-foreground">
            أهلاً {access?.profile?.full_name ?? "بك"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            نوع المستخدم: <span className="font-semibold">{access?.profile?.role_name ?? "غير محدد"}</span>
            {access?.isAdmin && " — مدير نظام"}
          </p>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Stat icon={LayoutDashboard} label="وحدات متاحة لك" value={moduleCount} />
          <Stat icon={ShieldCheck} label="صفحات مصرّح بها" value={pageCount} />
          <Stat
            icon={Users2}
            label="صلاحية مفعّلة"
            value={Object.values(access?.permissions ?? {}).reduce((a, b) => a + b.length, 0)}
          />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {can("system_modules", "view_list") && (
            <QuickLink to="/system-modules" icon={ToggleRight} title="وحدات النظام" />
          )}
          {can("user_types", "view_list") && (
            <QuickLink to="/user-types" icon={ShieldCheck} title="أنواع المستخدم" />
          )}
          {can("users", "view_list") && <QuickLink to="/users" icon={Users2} title="المستخدمين" />}
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof LayoutDashboard;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <p className="mt-3 text-2xl font-extrabold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function QuickLink({
  to,
  icon: Icon,
  title,
}: {
  to: string;
  icon: typeof LayoutDashboard;
  title: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-accent"
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <span className="text-sm font-semibold text-foreground">{title}</span>
    </Link>
  );
}

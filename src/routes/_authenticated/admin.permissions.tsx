import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Settings2 } from "lucide-react";
import { Guard } from "@/components/app/guard";
import { PageHeader } from "@/components/admin/page-header";
import { listRoles } from "@/lib/rbac.functions";
import { useBi } from "@/lib/bi";

import { authPageHead } from "@/lib/seo";
import { LoadingState } from "@/components/app/feedback-states";

export const Route = createFileRoute("/_authenticated/admin/permissions")({
  head: () =>
    authPageHead(
      {
        title: "مصفوفة الصلاحيات | Academia",
        description: "اختر نوع المستخدم لتحرير شجرة صلاحياته في Academia.",
      },
      {
        title: "Permissions matrix | Academia",
        description: "Pick a user type to edit its permission tree on Academia.",
      },
    ),
  component: () => (
    <Guard pageKey="admin_roles">
      <PermissionsMatrixPage />
    </Guard>
  ),
});

function PermissionsMatrixPage() {
  const bi = useBi();
  const fetchRoles = useServerFn(listRoles);
  const { data, isLoading } = useQuery({ queryKey: ["roles"], queryFn: () => fetchRoles() });

  return (
    <div className="pb-24">
      <PageHeader icon="ShieldCheck" title={bi("مصفوفة الصلاحيات", "Permission matrix")} />

      <div className="px-4 py-5 md:px-6">
        {isLoading ? (
          <LoadingState
            label={bi("جارٍ التحميل…", "Loading…")}
            className="border-none bg-transparent"
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(data ?? []).map((role) => (
              <Link
                key={role.id}
                to="/role-permissions/$roleId"
                params={{ roleId: role.id }}
                className="hover-lift group rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-display text-base font-bold text-foreground">{role.name}</p>
                  <span className="grid size-9 place-items-center rounded-xl bg-primary/12 text-primary">
                    <Settings2 className="size-4" />
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {role.description || bi("بدون وصف", "No description")}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

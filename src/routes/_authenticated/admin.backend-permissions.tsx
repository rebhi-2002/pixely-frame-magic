import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { BackendPermissionsPage } from "@/components/admin/backend-permissions-manager";
import { authPageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/admin/backend-permissions")({
  head: () =>
    authPageHead(
      {
        title: "صلاحيات الباك اند | Academia",
        description: "إدارة صلاحيات أنواع المستخدمين الحقيقية على Academia.",
      },
      {
        title: "Backend permissions | Academia",
        description: "Manage real user-type permissions on Academia.",
      },
    ),
  component: () => (
    <Guard pageKey="admin_backend_permissions">
      <BackendPermissionsPage />
    </Guard>
  ),
});

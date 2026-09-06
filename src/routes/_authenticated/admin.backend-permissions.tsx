import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { BackendPermissionsPage } from "@/components/admin/backend-permissions-manager";

export const Route = createFileRoute("/_authenticated/admin/backend-permissions")({
  head: () => ({
    meta: [
      { title: "صلاحيات الباك اند | Academia" },
      { name: "description", content: "إدارة صلاحيات أنواع المستخدمين الحقيقية على Academia." },
      { property: "og:title", content: "صلاحيات الباك اند" },
      {
        property: "og:description",
        content: "إدارة صلاحيات أنواع المستخدمين الحقيقية على Academia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <Guard pageKey="admin_backend_permissions">
      <BackendPermissionsPage />
    </Guard>
  ),
});

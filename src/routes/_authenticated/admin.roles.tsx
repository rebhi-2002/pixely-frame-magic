import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { UserTypesPage } from "@/components/admin/roles-manager";
import { authPageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/admin/roles")({
  head: () =>
    authPageHead(
      { title: "الأدوار والصلاحيات | Academia", description: "إدارة أدوار وصلاحيات Academia." },
      {
        title: "Roles & permissions | Academia",
        description: "Manage Academia roles and permissions.",
      },
    ),
  component: () => (
    <Guard pageKey="admin_roles">
      <UserTypesPage />
    </Guard>
  ),
});

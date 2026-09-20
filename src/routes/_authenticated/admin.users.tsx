import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { UsersPage } from "@/components/admin/users-manager";
import { authPageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/admin/users")({
  head: () =>
    authPageHead(
      { title: "المستخدمون | Academia", description: "إدارة حسابات المستخدمين على Academia." },
      { title: "Users | Academia", description: "Manage user accounts on Academia." },
    ),
  component: () => (
    <Guard pageKey="admin_users">
      <UsersPage />
    </Guard>
  ),
});

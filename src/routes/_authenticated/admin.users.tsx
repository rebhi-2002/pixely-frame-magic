import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { UsersPage } from "@/components/admin/users-manager";

export const Route = createFileRoute("/_authenticated/admin/users")({
  head: () => ({
    meta: [
      { title: "المستخدمون | Academia" },
      { name: "description", content: "إدارة حسابات المستخدمين على Academia." },
      { property: "og:title", content: "المستخدمون" },
      { property: "og:description", content: "إدارة حسابات المستخدمين على Academia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <Guard pageKey="admin_users">
      <UsersPage />
    </Guard>
  ),
});

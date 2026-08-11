import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { UsersPage } from "@/components/admin/users-manager";

export const Route = createFileRoute("/_authenticated/users")({
  head: () => ({
    meta: [
      { title: "المستخدمون | Academia" },
      {
        name: "description",
        content: "قائمة المستخدمين مع فلاتر الحالة والجنس ونوع المستخدم وإدارة كاملة لبياناتهم.",
      },
      { property: "og:title", content: "المستخدمون | Academia" },
      { property: "og:description", content: "إدارة المستخدمين وفلترتهم حسب الحالة والنوع." },
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

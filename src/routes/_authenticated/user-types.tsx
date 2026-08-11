import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { UserTypesPage } from "@/components/admin/roles-manager";

export const Route = createFileRoute("/_authenticated/user-types")({
  head: () => ({
    meta: [
      { title: "أنواع المستخدم | Academia" },
      { name: "description", content: "إدارة أنواع المستخدمين وتحديد شجرة الصلاحيات لكل نوع." },
      { property: "og:title", content: "أنواع المستخدم | Academia" },
      { property: "og:description", content: "إضافة وتعديل أنواع المستخدمين وصلاحياتهم." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <Guard pageKey="admin_roles">
      <UserTypesPage />
    </Guard>
  ),
});

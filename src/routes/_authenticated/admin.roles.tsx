import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { UserTypesPage } from "@/components/admin/roles-manager";

export const Route = createFileRoute("/_authenticated/admin/roles")({
  head: () => ({
    meta: [
      { title: "الأدوار والصلاحيات | Academia" },
      { name: "description", content: "إدارة أدوار وصلاحيات Academia." },
      { property: "og:title", content: "الأدوار والصلاحيات" },
      { property: "og:description", content: "إدارة أدوار وصلاحيات Academia." },
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

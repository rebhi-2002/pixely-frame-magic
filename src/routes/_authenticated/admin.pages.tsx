import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { PagesPage } from "@/components/admin/pages-manager";

export const Route = createFileRoute("/_authenticated/admin/pages")({
  head: () => ({
    meta: [
      { title: "الصفحات | Academia" },
      { name: "description", content: "إدارة صفحات وقوائم النظام على Academia." },
      { property: "og:title", content: "الصفحات" },
      { property: "og:description", content: "إدارة صفحات وقوائم النظام على Academia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <Guard pageKey="admin_pages">
      <PagesPage />
    </Guard>
  ),
});

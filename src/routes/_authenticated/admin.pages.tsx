import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { PagesPage } from "@/components/admin/pages-manager";
import { authPageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/admin/pages")({
  head: () =>
    authPageHead(
      { title: "الصفحات | Academia", description: "إدارة صفحات وقوائم النظام على Academia." },
      { title: "Pages | Academia", description: "Manage system pages and menus on Academia." },
    ),
  component: () => (
    <Guard pageKey="admin_pages">
      <PagesPage />
    </Guard>
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { AdminDashboardPage } from "@/components/admin/admin-dashboard";

export const Route = createFileRoute("/_authenticated/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "إدارة Academia" },
      { name: "description", content: "لوحة تشغيل منصة Academia." },
      { property: "og:title", content: "إدارة Academia" },
      { property: "og:description", content: "لوحة تشغيل منصة Academia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <Guard pageKey="admin_dashboard">
      <AdminDashboardPage />
    </Guard>
  ),
});

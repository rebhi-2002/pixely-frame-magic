import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { AdminDashboardPage } from "@/components/admin/admin-dashboard";
import { authPageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/admin/dashboard")({
  head: () =>
    authPageHead(
      { title: "إدارة Academia", description: "لوحة تشغيل منصة Academia." },
      { title: "Academia admin", description: "Academia platform control panel." },
    ),
  component: () => (
    <Guard pageKey="admin_dashboard">
      <AdminDashboardPage />
    </Guard>
  ),
});

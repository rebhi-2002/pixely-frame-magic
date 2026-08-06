import { createFileRoute } from "@tanstack/react-router";
import { AdminFeaturePage } from "@/components/admin/admin-feature";

export const Route = createFileRoute("/_authenticated/admin/dashboard")({
  head: () => ({ meta: [{ title: "إدارة Academia" }, { name: "description", content: "لوحة تشغيل منصة Academia." }, { property: "og:title", content: "إدارة Academia" }, { property: "og:description", content: "لوحة تشغيل منصة Academia." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: () => <AdminFeaturePage feature="dashboard" />,
});
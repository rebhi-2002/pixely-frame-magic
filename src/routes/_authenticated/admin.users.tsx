import { createFileRoute } from "@tanstack/react-router";
import { AdminFeaturePage } from "@/components/admin/admin-feature";
export const Route = createFileRoute("/_authenticated/admin/users")({
  head: () => ({
    meta: [
      { title: "المستخدمون | Academia" },
      { name: "description", content: "إدارة مستخدمي Academia." },
      { property: "og:title", content: "المستخدمون" },
      { property: "og:description", content: "إدارة مستخدمي Academia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <AdminFeaturePage feature="users" />,
});

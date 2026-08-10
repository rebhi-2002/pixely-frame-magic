import { createFileRoute } from "@tanstack/react-router";
import { AdminFeaturePage } from "@/components/admin/admin-feature";
export const Route = createFileRoute("/_authenticated/admin/curriculum-requests")({
  head: () => ({
    meta: [
      { title: "طلبات المنهاج | Academia" },
      { name: "description", content: "إدارة طلبات منهاج Academia." },
      { property: "og:title", content: "طلبات المنهاج" },
      { property: "og:description", content: "إدارة طلبات منهاج Academia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <AdminFeaturePage feature="curriculum-requests" />,
});

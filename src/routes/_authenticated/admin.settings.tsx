import { createFileRoute } from "@tanstack/react-router";
import { AdminFeaturePage } from "@/components/admin/admin-feature";
export const Route = createFileRoute("/_authenticated/admin/settings")({
  head: () => ({
    meta: [
      { title: "إعدادات المنصة | Academia" },
      { name: "description", content: "إعدادات منصة Academia العامة." },
      { property: "og:title", content: "إعدادات المنصة" },
      { property: "og:description", content: "إعدادات منصة Academia العامة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <AdminFeaturePage feature="settings" />,
});

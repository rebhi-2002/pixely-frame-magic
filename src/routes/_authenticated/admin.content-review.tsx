import { createFileRoute } from "@tanstack/react-router";
import { AdminFeaturePage } from "@/components/admin/admin-feature";
export const Route = createFileRoute("/_authenticated/admin/content-review")({
  head: () => ({
    meta: [
      { title: "مراجعة المحتوى | Academia" },
      { name: "description", content: "مراجعة محتوى Academia التعليمي." },
      { property: "og:title", content: "مراجعة المحتوى" },
      { property: "og:description", content: "مراجعة محتوى Academia التعليمي." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <AdminFeaturePage feature="content-review" />,
});

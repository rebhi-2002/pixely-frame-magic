import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { ContentReviewPage } from "@/components/admin/content-review-manager";
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
  component: () => (
    <Guard pageKey="admin_content_review">
      <ContentReviewPage />
    </Guard>
  ),
});

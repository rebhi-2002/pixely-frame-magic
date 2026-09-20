import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { ContentReviewPage } from "@/components/admin/content-review-manager";
import { authPageHead } from "@/lib/seo";
export const Route = createFileRoute("/_authenticated/admin/content-review")({
  head: () =>
    authPageHead(
      { title: "مراجعة المحتوى | Academia", description: "مراجعة محتوى Academia التعليمي." },
      { title: "Content review | Academia", description: "Review Academia's educational content." },
    ),
  component: () => (
    <Guard pageKey="admin_content_review">
      <ContentReviewPage />
    </Guard>
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { CommunityReportsPage } from "@/components/admin/community-reports-manager";
export const Route = createFileRoute("/_authenticated/admin/community-reports")({
  head: () => ({
    meta: [
      { title: "بلاغات المجتمع | Academia" },
      { name: "description", content: "إدارة بلاغات مجتمعات Academia." },
      { property: "og:title", content: "بلاغات المجتمع" },
      { property: "og:description", content: "إدارة بلاغات مجتمعات Academia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <Guard pageKey="admin_community_reports">
      <CommunityReportsPage />
    </Guard>
  ),
});

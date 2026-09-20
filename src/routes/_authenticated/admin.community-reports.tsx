import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { CommunityReportsPage } from "@/components/admin/community-reports-manager";
import { authPageHead } from "@/lib/seo";
export const Route = createFileRoute("/_authenticated/admin/community-reports")({
  head: () =>
    authPageHead(
      { title: "بلاغات المجتمع | Academia", description: "إدارة بلاغات مجتمعات Academia." },
      { title: "Community reports | Academia", description: "Manage Academia community reports." },
    ),
  component: () => (
    <Guard pageKey="admin_community_reports">
      <CommunityReportsPage />
    </Guard>
  ),
});

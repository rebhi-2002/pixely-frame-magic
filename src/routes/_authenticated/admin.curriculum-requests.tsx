import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { CurriculumRequestsPage } from "@/components/admin/curriculum-requests-manager";
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
  component: () => (
    <Guard pageKey="admin_curriculum_requests">
      <CurriculumRequestsPage />
    </Guard>
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { CurriculumRequestsPage } from "@/components/admin/curriculum-requests-manager";
import { authPageHead } from "@/lib/seo";
export const Route = createFileRoute("/_authenticated/admin/curriculum-requests")({
  head: () =>
    authPageHead(
      { title: "طلبات المنهاج | Academia", description: "إدارة طلبات منهاج Academia." },
      {
        title: "Curriculum requests | Academia",
        description: "Manage Academia curriculum requests.",
      },
    ),
  component: () => (
    <Guard pageKey="admin_curriculum_requests">
      <CurriculumRequestsPage />
    </Guard>
  ),
});

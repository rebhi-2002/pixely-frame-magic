import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { CurriculumPage } from "@/components/admin/curriculum-manager";
import { authPageHead } from "@/lib/seo";
export const Route = createFileRoute("/_authenticated/admin/curriculum")({
  head: () =>
    authPageHead(
      { title: "المنهاج | Academia", description: "هيكل منهاج Academia." },
      { title: "Curriculum | Academia", description: "Academia's curriculum structure." },
    ),
  component: () => (
    <Guard pageKey="admin_curriculum">
      <CurriculumPage />
    </Guard>
  ),
});

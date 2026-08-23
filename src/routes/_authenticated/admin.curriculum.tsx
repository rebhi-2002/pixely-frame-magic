import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { CurriculumPage } from "@/components/admin/curriculum-manager";
export const Route = createFileRoute("/_authenticated/admin/curriculum")({
  head: () => ({
    meta: [
      { title: "المنهاج | Academia" },
      { name: "description", content: "هيكل منهاج Academia." },
      { property: "og:title", content: "المنهاج" },
      { property: "og:description", content: "هيكل منهاج Academia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <Guard pageKey="admin_curriculum">
      <CurriculumPage />
    </Guard>
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { ConstantsPage } from "@/components/admin/constants-manager";

export const Route = createFileRoute("/_authenticated/admin/constants")({
  head: () => ({
    meta: [
      { title: "الثوابت | Academia" },
      { name: "description", content: "إدارة الثوابت والتصنيفات العامة على Academia." },
      { property: "og:title", content: "الثوابت" },
      { property: "og:description", content: "إدارة الثوابت والتصنيفات العامة على Academia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <Guard pageKey="admin_constants">
      <ConstantsPage />
    </Guard>
  ),
});

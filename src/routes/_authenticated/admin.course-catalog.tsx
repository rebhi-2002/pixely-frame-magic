import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { CourseCatalogPage } from "@/components/admin/course-catalog-manager";

export const Route = createFileRoute("/_authenticated/admin/course-catalog")({
  head: () => ({
    meta: [
      { title: "كتالوج الكورسات العام | Academia" },
      { name: "description", content: "إدارة الكورسات المعروضة بصفحة الكورسات العامة." },
      { property: "og:title", content: "كتالوج الكورسات العام" },
      { property: "og:description", content: "إدارة الكورسات المعروضة بصفحة الكورسات العامة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <Guard pageKey="admin_course_catalog">
      <CourseCatalogPage />
    </Guard>
  ),
});

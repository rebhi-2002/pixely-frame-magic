import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { CourseCatalogPage } from "@/components/admin/course-catalog-manager";
import { authPageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/admin/course-catalog")({
  head: () =>
    authPageHead(
      {
        title: "كتالوج الكورسات العام | Academia",
        description: "إدارة الكورسات المعروضة بصفحة الكورسات العامة.",
      },
      {
        title: "Public course catalog | Academia",
        description: "Manage the courses shown on the public courses page.",
      },
    ),
  component: () => (
    <Guard pageKey="admin_course_catalog">
      <CourseCatalogPage />
    </Guard>
  ),
});

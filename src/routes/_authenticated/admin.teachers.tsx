import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { TeacherVerificationPage } from "@/components/admin/teacher-verification-manager";
export const Route = createFileRoute("/_authenticated/admin/teachers")({
  head: () => ({
    meta: [
      { title: "توثيق المعلمين | Academia" },
      { name: "description", content: "مراجعة واعتماد طلبات المعلمين." },
      { property: "og:title", content: "توثيق المعلمين" },
      { property: "og:description", content: "مراجعة واعتماد طلبات المعلمين." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <Guard pageKey="admin_teachers">
      <TeacherVerificationPage />
    </Guard>
  ),
});

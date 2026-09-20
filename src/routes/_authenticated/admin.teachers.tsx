import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { TeacherVerificationPage } from "@/components/admin/teacher-verification-manager";
import { authPageHead } from "@/lib/seo";
export const Route = createFileRoute("/_authenticated/admin/teachers")({
  head: () =>
    authPageHead(
      { title: "توثيق المعلمين | Academia", description: "مراجعة واعتماد طلبات المعلمين." },
      {
        title: "Teacher verification | Academia",
        description: "Review and approve teacher applications.",
      },
    ),
  component: () => (
    <Guard pageKey="admin_teachers">
      <TeacherVerificationPage />
    </Guard>
  ),
});

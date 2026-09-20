import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { ConstantsPage } from "@/components/admin/constants-manager";
import { authPageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/admin/constants")({
  head: () =>
    authPageHead(
      { title: "الثوابت | Academia", description: "إدارة الثوابت والتصنيفات العامة على Academia." },
      {
        title: "Constants | Academia",
        description: "Manage general constants and categories on Academia.",
      },
    ),
  component: () => (
    <Guard pageKey="admin_constants">
      <ConstantsPage />
    </Guard>
  ),
});

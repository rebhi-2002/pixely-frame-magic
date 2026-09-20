import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { SystemModulesPage } from "@/components/admin/modules-manager";
import { authPageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/system-modules")({
  head: () =>
    authPageHead(
      {
        title: "وحدات النظام | Academia",
        description: "تفعيل أو تعطيل وحدات النظام على مستوى كل المستخدمين بضغطة واحدة.",
      },
      {
        title: "System modules | Academia",
        description: "Turn system modules on or off for all users with one click.",
      },
    ),
  component: () => (
    <Guard pageKey="admin_settings">
      <SystemModulesPage />
    </Guard>
  ),
});

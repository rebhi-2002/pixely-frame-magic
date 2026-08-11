import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { SystemModulesPage } from "@/components/admin/modules-manager";

export const Route = createFileRoute("/_authenticated/system-modules")({
  head: () => ({
    meta: [
      { title: "وحدات النظام | Academia" },
      {
        name: "description",
        content: "تفعيل أو تعطيل وحدات النظام على مستوى كل المستخدمين بضغطة واحدة.",
      },
      { property: "og:title", content: "وحدات النظام | Academia" },
      { property: "og:description", content: "التحكم العام بتفعيل وحدات النظام." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <Guard pageKey="admin_settings">
      <SystemModulesPage />
    </Guard>
  ),
});

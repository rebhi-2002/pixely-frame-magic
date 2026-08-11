import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { SystemModulesPage } from "@/components/admin/modules-manager";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  head: () => ({
    meta: [
      { title: "إعدادات المنصة | Academia" },
      { name: "description", content: "تفعيل وتعطيل وحدات المنصة وسياساتها العامة." },
      { property: "og:title", content: "إعدادات المنصة" },
      { property: "og:description", content: "تفعيل وتعطيل وحدات المنصة وسياساتها العامة." },
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

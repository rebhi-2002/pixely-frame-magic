import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { PaymentsPage } from "@/components/admin/payments-manager";
export const Route = createFileRoute("/_authenticated/admin/payments")({
  head: () => ({
    meta: [
      { title: "المدفوعات | Academia" },
      { name: "description", content: "متابعة مدفوعات Academia." },
      { property: "og:title", content: "المدفوعات" },
      { property: "og:description", content: "متابعة مدفوعات Academia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <Guard pageKey="admin_payments">
      <PaymentsPage />
    </Guard>
  ),
});

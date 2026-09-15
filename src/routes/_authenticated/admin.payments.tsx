import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { WalletRequestsPage } from "@/components/admin/wallet-requests-manager";
export const Route = createFileRoute("/_authenticated/admin/payments")({
  head: () => ({
    meta: [
      { title: "طلبات المحفظة | Academia" },
      { name: "description", content: "مراجعة طلبات شحن وسحب المحفظة في Academia." },
      { property: "og:title", content: "طلبات المحفظة" },
      { property: "og:description", content: "مراجعة طلبات شحن وسحب المحفظة في Academia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <Guard pageKey="admin_payments">
      <WalletRequestsPage />
    </Guard>
  ),
});

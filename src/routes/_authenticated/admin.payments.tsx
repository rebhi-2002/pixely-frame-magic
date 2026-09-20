import { createFileRoute } from "@tanstack/react-router";
import { Guard } from "@/components/app/guard";
import { WalletRequestsPage } from "@/components/admin/wallet-requests-manager";
import { authPageHead } from "@/lib/seo";
export const Route = createFileRoute("/_authenticated/admin/payments")({
  head: () =>
    authPageHead(
      {
        title: "طلبات المحفظة | Academia",
        description: "مراجعة طلبات شحن وسحب المحفظة في Academia.",
      },
      {
        title: "Wallet requests | Academia",
        description: "Review wallet top-up and withdrawal requests on Academia.",
      },
    ),
  component: () => (
    <Guard pageKey="admin_payments">
      <WalletRequestsPage />
    </Guard>
  ),
});

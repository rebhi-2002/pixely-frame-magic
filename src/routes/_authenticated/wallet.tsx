import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AppPage, Panel } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WalletBalancePanel } from "@/components/wallet/wallet-balance-panel";
import { submitTopUpRequest } from "@/integrations/backend/wallet";
import { getErrorMessage } from "@/integrations/backend/client";
import { useBi } from "@/lib/bi";

const title = "محفظتي | أكاديميا";
const description = "رصيدك الحالي، سجل حركاتك، وطلب شحن رصيد جديد.";

export const Route = createFileRoute("/_authenticated/wallet")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <Guard pageKey="student_wallet">
      <WalletPage />
    </Guard>
  ),
});

function WalletPage() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState("");
  const [bankReferenceNo, setBankReferenceNo] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const submit = useMutation({
    mutationFn: () => {
      if (!receiptFile)
        throw new Error(bi("أرفق صورة إشعار التحويل", "Attach the transfer receipt"));
      const parsedAmount = Number(amount);
      if (!parsedAmount || parsedAmount <= 0) {
        throw new Error(bi("أدخل مبلغًا صحيحًا", "Enter a valid amount"));
      }
      return submitTopUpRequest({ amount: parsedAmount, bankReferenceNo, receiptFile });
    },
    onSuccess: () => {
      toast.success(
        bi(
          "تم إرسال طلب الشحن — رح يتراجع من الإدارة قريبًا.",
          "Top-up request sent — the admin team will review it soon.",
        ),
      );
      setAmount("");
      setBankReferenceNo("");
      setReceiptFile(null);
      queryClient.invalidateQueries({ queryKey: ["my-wallet"] });
      queryClient.invalidateQueries({ queryKey: ["my-wallet-history"] });
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر إرسال الطلب", "Failed to submit"))),
  });

  return (
    <AppPage title={bi("محفظتي", "My wallet")} icon="Wallet" subtitle={description}>
      <div className="space-y-6">
        <WalletBalancePanel
          actionSlot={
            <Panel title={bi("طلب شحن رصيد", "Submit a top-up request")} icon="Upload">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit.mutate();
                }}
                className="grid gap-4 sm:grid-cols-2"
              >
                <div className="space-y-1.5">
                  <Label htmlFor="amount">{bi("المبلغ", "Amount")}</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bank-ref">
                    {bi("مرجع التحويل البنكي", "Bank reference no.")}
                  </Label>
                  <Input
                    id="bank-ref"
                    value={bankReferenceNo}
                    onChange={(e) => setBankReferenceNo(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="receipt">
                    {bi("صورة إشعار التحويل", "Transfer receipt image")}
                  </Label>
                  <Input
                    id="receipt"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setReceiptFile(e.target.files?.[0] ?? null)}
                  />
                </div>
                <Button type="submit" disabled={submit.isPending} className="sm:col-span-2">
                  {bi("إرسال الطلب", "Submit request")}
                </Button>
              </form>
            </Panel>
          }
        />
      </div>
    </AppPage>
  );
}

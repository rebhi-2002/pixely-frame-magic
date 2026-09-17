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
import { submitWithdrawalRequest } from "@/integrations/backend/wallet";
import { getErrorMessage } from "@/integrations/backend/client";
import { useBi } from "@/lib/bi";

const title = "الأرباح | أكاديميا";
const description = "أرباحك من التدريس، وطلبات سحب رصيدك لحسابك البنكي.";

export const Route = createFileRoute("/_authenticated/teacher/earnings")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <Guard pageKey="teacher_earnings">
      <TeacherEarningsPage />
    </Guard>
  ),
});

function TeacherEarningsPage() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState("");
  const [bankIBAN, setBankIBAN] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");

  const submit = useMutation({
    mutationFn: () => {
      const parsedAmount = Number(amount);
      if (!parsedAmount || parsedAmount <= 0) {
        throw new Error(bi("أدخل مبلغًا صحيحًا", "Enter a valid amount"));
      }
      if (!bankIBAN.trim() || !bankName.trim() || !accountHolderName.trim()) {
        throw new Error(bi("عبّي كل حقول الحساب البنكي", "Fill in all bank account fields"));
      }
      return submitWithdrawalRequest({
        amount: parsedAmount,
        bankIBAN,
        bankName,
        accountHolderName,
      });
    },
    onSuccess: () => {
      toast.success(
        bi(
          "تم إرسال طلب السحب — رح يتراجع من الإدارة قريبًا.",
          "Withdrawal request sent — the admin team will review it soon.",
        ),
      );
      setAmount("");
      queryClient.invalidateQueries({ queryKey: ["my-wallet"] });
      queryClient.invalidateQueries({ queryKey: ["my-wallet-history"] });
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر إرسال الطلب", "Failed to submit"))),
  });

  return (
    <AppPage title={bi("أرباحي", "My earnings")} icon="Wallet" subtitle={description}>
      <div className="space-y-6">
        <WalletBalancePanel
          actionSlot={
            <Panel title={bi("طلب سحب رصيد", "Submit a withdrawal request")} icon="Landmark">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit.mutate();
                }}
                className="grid gap-4 sm:grid-cols-2"
              >
                <div className="space-y-1.5">
                  <Label htmlFor="w-amount">{bi("المبلغ", "Amount")}</Label>
                  <Input
                    id="w-amount"
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="w-bank-name">{bi("اسم البنك", "Bank name")}</Label>
                  <Input
                    id="w-bank-name"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="w-iban">IBAN</Label>
                  <Input
                    id="w-iban"
                    value={bankIBAN}
                    onChange={(e) => setBankIBAN(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="w-holder">{bi("اسم صاحب الحساب", "Account holder name")}</Label>
                  <Input
                    id="w-holder"
                    value={accountHolderName}
                    onChange={(e) => setAccountHolderName(e.target.value)}
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

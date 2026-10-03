import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AppPage, Panel, DataTable, Badge, EmptyState } from "@/components/app/kit";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { Guard } from "@/components/app/guard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WalletBalancePanel } from "@/components/wallet/wallet-balance-panel";
import { getTransactionHistory, submitWithdrawalRequest } from "@/integrations/backend/wallet";
import { getErrorMessage } from "@/integrations/backend/client";
import { useBi } from "@/lib/bi";
import { authPageHead } from "@/lib/seo";
import { EARNINGS_WINDOW_SIZE, WITHDRAWAL_STAGES, pickInstructorCredits } from "@/lib/earnings";
import { qk } from "@/lib/query-keys";

const description = "أرباحك من التدريس، وطلبات سحب رصيدك لحسابك البنكي.";

export const Route = createFileRoute("/_authenticated/teacher/earnings")({
  head: () =>
    authPageHead(
      {
        title: "الأرباح | أكاديميا",
        description: "أرباحك من التدريس، وطلبات سحب رصيدك لحسابك البنكي.",
      },
      {
        title: "Earnings | Academia",
        description: "Your teaching earnings, and your bank withdrawal requests.",
      },
    ),
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

  // W2-01: آخر 50 حركة فقط، والفلترة محلية (لا ملخصات من الباك اند).
  const creditsQuery = useQuery({
    queryKey: qk.teacherEarningsCredits(),
    queryFn: () => getTransactionHistory(0, EARNINGS_WINDOW_SIZE),
    select: (result) => pickInstructorCredits(result.rows),
  });

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
      queryClient.invalidateQueries({ queryKey: qk.myWallet() });
      queryClient.invalidateQueries({ queryKey: qk.myWalletHistory() });
      queryClient.invalidateQueries({ queryKey: qk.teacherEarningsCredits() });
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

        <Panel title={bi("آخر إيداعات الأرباح", "Latest earnings credits")} icon="Coins">
          <p className="mb-3 text-xs text-muted-foreground">
            {bi(
              `من آخر ${EARNINGS_WINDOW_SIZE} حركة في محفظتك — ليست كل الإيداعات ولا إجمالي أرباحك.`,
              `From your last ${EARNINGS_WINDOW_SIZE} wallet transactions — not every credit, and not your total earnings.`,
            )}
          </p>
          {creditsQuery.isError ? (
            <ErrorState
              title={bi("ما قدرنا نحمّل الإيداعات", "Couldn't load earnings credits")}
              description={bi(
                "جرّب مرة ثانية. إذا استمرت المشكلة، تأكد من اتصالك أو ارجع لاحقاً.",
                "Try again. If the problem continues, check your connection or come back later.",
              )}
              action={
                <RetryButton
                  label={bi("إعادة المحاولة", "Try again")}
                  onClick={() => void creditsQuery.refetch()}
                />
              }
            />
          ) : creditsQuery.isLoading ? (
            <LoadingState
              label={bi("جارٍ التحميل…", "Loading…")}
              className="border-none bg-transparent"
            />
          ) : creditsQuery.data?.length ? (
            <DataTable
              caption={bi("إيداعات الأرباح", "Earnings credits")}
              head={[
                bi("المبلغ", "Amount"),
                bi("الحالة", "Status"),
                bi("التاريخ", "Date"),
                bi("الوصف", "Description"),
              ]}
              rows={creditsQuery.data.map((t) => [
                <span key="amount" className="text-success">
                  +{t.amount.toLocaleString()}
                </span>,
                <Badge key="status" tone={creditStatusTone(t.status)}>
                  {creditStatusLabel(t.status, bi)}
                </Badge>,
                new Date(t.createdOn).toLocaleDateString(),
                t.description ?? "—",
              ])}
            />
          ) : (
            <EmptyState
              icon="Coins"
              text={bi(
                `ما في إيداعات أرباح ضمن آخر ${EARNINGS_WINDOW_SIZE} حركة.`,
                `No earnings credits within your last ${EARNINGS_WINDOW_SIZE} transactions.`,
              )}
            />
          )}

          {/* W2-02 (FR-W03b / Q-12): نص توضيحي فقط — بلا نسبة ولا رقم عمولة. */}
          <p className="mt-4 rounded-xl bg-secondary/30 px-4 py-3 text-sm text-muted-foreground">
            {bi(
              "المبلغ المودَع في محفظتك = رسوم الحجز/الكورس − عمولة المنصة، أي أنه صافي بعد العمولة.",
              "The amount credited to your wallet = the booking/course fee − the platform commission, so it's a net amount after commission.",
            )}
          </p>
        </Panel>

        {/* W2-03: مراحل السحب (معلومة عامة) — ما في endpoint لعرض طلباتك الفردية. */}
        <Panel title={bi("مراحل طلب السحب", "Withdrawal request stages")} icon="Route">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            {WITHDRAWAL_STAGES.map((stage, i) => (
              <li key={stage.key} className="flex items-center gap-2">
                <Badge tone={i === WITHDRAWAL_STAGES.length - 1 ? "success" : "primary"}>
                  {bi(stage.ar, stage.en)}
                </Badge>
                {i < WITHDRAWAL_STAGES.length - 1 && (
                  <span aria-hidden="true" className="text-muted-foreground">
                    ←
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs text-muted-foreground">
            {bi(
              "قد يُرفض الطلب من الإدارة. حالة كل طلب فردي غير معروضة هنا لأن المنصة لا توفّر قائمة طلبات سحب للمعلم حالياً.",
              "A request may be rejected by the admin team. Individual request status isn't shown here because the platform doesn't currently provide a list of your withdrawal requests.",
            )}
          </p>
        </Panel>
      </div>
    </AppPage>
  );
}

// WalletTransactionStatus: Pending=1, Accepted=2, Rejected=3, Completed=4, Reversed=5
function creditStatusLabel(status: number, bi: ReturnType<typeof useBi>): string {
  switch (status) {
    case 1:
      return bi("قيد المعالجة", "Pending");
    case 2:
      return bi("مقبول", "Accepted");
    case 3:
      return bi("مرفوض", "Rejected");
    case 4:
      return bi("مكتمل", "Completed");
    case 5:
      return bi("مُرتجع", "Reversed");
    default:
      return "—";
  }
}

function creditStatusTone(status: number): "muted" | "primary" | "success" | "danger" {
  if (status === 4) return "success";
  if (status === 3 || status === 5) return "danger";
  if (status === 1) return "primary";
  return "muted";
}

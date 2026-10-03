import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Panel, StatGrid, DataTable, Badge, EmptyState, Pagination } from "@/components/app/kit";
import {
  getMyWallet,
  getTransactionHistory,
  WalletTransactionType,
} from "@/integrations/backend/wallet";
import { useBi } from "@/lib/bi";
import { LoadingState } from "@/components/app/feedback-states";

type Bi = ReturnType<typeof useBi>;

/** W1-03: شارة اتجاه الحركة (وارد/صادر) — الاتجاه حقل حقيقي بالـDTO (1=In, 2=Out). */
function directionLabel(direction: number, bi: Bi): string {
  if (direction === 1) return bi("وارد", "In");
  if (direction === 2) return bi("صادر", "Out");
  return "—";
}

function transactionTypeLabel(type: number, bi: ReturnType<typeof useBi>): string {
  switch (type) {
    case WalletTransactionType.TopUp:
      return bi("شحن رصيد", "Top-up");
    case WalletTransactionType.Withdrawal:
      return bi("سحب", "Withdrawal");
    case WalletTransactionType.EnrollmentDeduction:
      // Q-19: النص يغطي «اشتراك» (SRS) و«حجز» (مسار الحجز الفعلي) دون ربط بكيان محدد.
      return bi("خصم اشتراك/حجز", "Enrollment/booking charge");
    case WalletTransactionType.InstructorCredit:
      return bi("إيداع أرباح", "Earnings credit");
    default:
      return bi("حركة", "Transaction");
  }
}

/** لوحة عرض المحفظة — الرصيد الحالي + سجل الحركات. مشتركة بين شاشة محفظة
 * الطالب وشاشة أرباح المعلّم؛ زر الإجراء (شحن/سحب) بيمرَّر من الخارج. */
export function WalletBalancePanel({ actionSlot }: { actionSlot?: React.ReactNode }) {
  const bi = useBi();
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10;

  const { data: wallet, isLoading: walletLoading } = useQuery({
    queryKey: ["my-wallet"],
    queryFn: getMyWallet,
  });

  // ترقيم صفحات حقيقي — سجل حركات المحفظة بينمو بدون حد لأي مستخدم نشط
  // بمرور الوقت، فكان جلب 1000 حركة بطلب وحدة خطر حقيقي (راجع
  // full-project-report.md قسم "جداول أدمن" لنفس النمط بمكان تاني).
  const { data: historyResult, isLoading: historyLoading } = useQuery({
    queryKey: ["my-wallet-history", page],
    queryFn: () => getTransactionHistory(page, PAGE_SIZE),
    placeholderData: (prev) => prev,
  });
  const history = historyResult?.rows ?? [];
  const totalCount = historyResult?.totalCount ?? 0;

  return (
    <>
      <StatGrid
        items={[
          {
            label: bi("الرصيد الحالي", "Current balance"),
            value: walletLoading ? "…" : (wallet?.balance ?? 0).toLocaleString(),
            icon: "Wallet",
          },
        ]}
      />

      {actionSlot}

      <Panel title={bi("سجل الحركات", "Transaction history")} icon="History">
        {historyLoading ? (
          <LoadingState
            label={bi("جارٍ تحميل السجل…", "Loading history…")}
            className="border-none bg-transparent"
          />
        ) : !history.length ? (
          <EmptyState icon="Wallet" text={bi("لا يوجد حركات بعد.", "No transactions yet.")} />
        ) : (
          <>
            <DataTable
              caption={bi("سجل حركات المحفظة", "Wallet transaction history")}
              head={[
                bi("النوع", "Type"),
                bi("الوصف", "Description"),
                bi("المبلغ", "Amount"),
                bi("الحالة", "Status"),
                bi("التاريخ", "Date"),
              ]}
              rows={history.map((t) => [
                <span key="type" className="inline-flex flex-wrap items-center gap-1.5">
                  {transactionTypeLabel(t.type, bi)}
                  <Badge tone={t.direction === 1 ? "success" : "muted"}>
                    {directionLabel(t.direction, bi)}
                  </Badge>
                </span>,
                // الوصف نص من الباك اند كما هو — بدون ربطه بحجز/كورس (الـDTO ما فيه معرّف مرتبط).
                t.description?.trim() || "—",
                <span
                  key="amount"
                  className={t.direction === 1 ? "text-success" : "text-destructive"}
                >
                  {t.direction === 1 ? "+" : "-"}
                  {t.amount.toLocaleString()}
                </span>,
                <Badge key="status" tone={statusTone(t.status)}>
                  {statusLabel(t.status, bi)}
                </Badge>,
                new Date(t.createdOn).toLocaleDateString(),
              ])}
            />
            <Pagination
              page={page}
              pageSize={PAGE_SIZE}
              totalCount={totalCount}
              onPageChange={setPage}
              summary={bi(
                `${Math.min(page * PAGE_SIZE + 1, totalCount)}–${Math.min((page + 1) * PAGE_SIZE, totalCount)} من ${totalCount}`,
                `${Math.min(page * PAGE_SIZE + 1, totalCount)}–${Math.min((page + 1) * PAGE_SIZE, totalCount)} of ${totalCount}`,
              )}
              previousLabel={bi("السابق", "Previous")}
              nextLabel={bi("التالي", "Next")}
            />
          </>
        )}
      </Panel>
    </>
  );
}

function statusTone(status: number): "muted" | "primary" | "success" | "danger" {
  // WalletTransactionStatus: Pending=1, Accepted=2, Rejected=3, Completed=4, Reversed=5
  if (status === 4) return "success";
  if (status === 3) return "danger";
  if (status === 1) return "primary";
  return "muted";
}

function statusLabel(status: number, bi: ReturnType<typeof useBi>): string {
  // WalletTransactionStatus: Pending=1, Accepted=2, Rejected=3, Completed=4, Reversed=5
  switch (status) {
    case 1:
      return bi("قيد المراجعة", "Pending");
    case 2:
      return bi("مقبول", "Accepted");
    case 3:
      return bi("مرفوض", "Rejected");
    case 4:
      return bi("مكتمل", "Completed");
    case 5:
      return bi("مُرتجع", "Reversed");
    default:
      return bi("—", "—");
  }
}

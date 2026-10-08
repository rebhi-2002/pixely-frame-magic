// بطاقة دفع الحجز (WP-W1 / W1-01, W1-05) — العقد C-02: props { bookingId }؛ تجلب Student/BookingPayment.
// الخصم من المحفظة يتم بالسيرفر عند قبول المعلم؛ هنا عرض حالة فقط. تنبيه الرصيد من needsTopUp.
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge, Panel } from "@/components/app/kit";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { InsufficientBalanceAlert } from "@/components/wallet/insufficient-balance-alert";
import { getStudentBookingPayment } from "@/integrations/backend/student";
import { useBi } from "@/lib/bi";
import { showTopUpAlert } from "@/lib/booking-detail";
import { paymentStatusLabel, paymentStatusTone } from "@/lib/enums";
import { formatDate, formatMoney } from "@/lib/format";
import { withLoadErrorDetail } from "@/lib/load-error";
import { qk } from "@/lib/query-keys";

export interface BookingPaymentCardProps {
  bookingId: number;
}

export function BookingPaymentCard({ bookingId }: BookingPaymentCardProps) {
  const bi = useBi();
  const lang = bi<"ar" | "en">("ar", "en");
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: qk.studentBookingPayment(bookingId),
    queryFn: () => getStudentBookingPayment(bookingId),
  });
  const p = query.data;

  return (
    <Panel title={bi("الدفع", "Payment")} icon="Wallet">
      {query.isError ? (
        <ErrorState
          title={bi("ما قدرنا نحمّل حالة الدفع", "We couldn't load the payment status")}
          description={withLoadErrorDetail(bi("جرّب مرة ثانية.", "Try again."), query.error, bi)}
          action={
            <RetryButton
              label={bi("إعادة المحاولة", "Try again")}
              onClick={() =>
                void queryClient.invalidateQueries({
                  queryKey: qk.studentBookingPayment(bookingId),
                })
              }
            />
          }
        />
      ) : !p ? (
        <LoadingState
          label={bi("جارٍ التحميل…", "Loading…")}
          className="border-none bg-transparent"
        />
      ) : (
        <div className="space-y-4">
          <dl className="grid gap-4 sm:grid-cols-4">
            <div>
              <dt className="text-xs font-semibold text-muted-foreground">
                {bi("السعر", "Price")}
              </dt>
              <dd className="mt-0.5 text-sm font-medium">{formatMoney(p.price, lang)}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-muted-foreground">
                {bi("حالة الدفع", "Payment status")}
              </dt>
              <dd className="mt-0.5">
                <Badge tone={paymentStatusTone(p.paymentStatus)}>
                  {paymentStatusLabel(p.paymentStatus, bi)}
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-muted-foreground">
                {bi("تاريخ الدفع", "Paid on")}
              </dt>
              <dd className="mt-0.5 text-sm font-medium">
                {p.paidOn ? formatDate(p.paidOn, lang) : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-muted-foreground">
                {bi("رصيد المحفظة", "Wallet balance")}
              </dt>
              <dd className="mt-0.5 text-sm font-medium">{formatMoney(p.walletBalance, lang)}</dd>
            </div>
          </dl>
          {showTopUpAlert(p) ? (
            <InsufficientBalanceAlert required={p.price} balance={p.walletBalance} />
          ) : null}
        </div>
      )}
    </Panel>
  );
}

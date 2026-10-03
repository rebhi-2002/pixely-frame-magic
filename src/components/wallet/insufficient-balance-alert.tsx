// تنبيه الرصيد غير الكافي (WP-W1 / W1-02) — العقد C-03: props { required, balance }.
// يستهلكه WP-S1 وWP-S2. يخفي نفسه لو الرصيد كافٍ أو القيم غير صالحة (لا تنبيه كاذب).
import { Link } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBi } from "@/lib/bi";
import { formatMoney } from "@/lib/format";

export interface InsufficientBalanceAlertProps {
  /** المبلغ المطلوب (مثلاً السعر التقديري للحجز). */
  required: number;
  /** رصيد المحفظة الحالي. */
  balance: number;
}

export function InsufficientBalanceAlert({ required, balance }: InsufficientBalanceAlertProps) {
  const bi = useBi();
  const valid = Number.isFinite(required) && Number.isFinite(balance);
  if (!valid || balance >= required) return null;
  const shortfall = required - balance;

  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3">
        <TriangleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-destructive" />
        <div className="space-y-1 text-sm">
          <p className="font-bold text-foreground">
            {bi("رصيدك غير كافٍ", "Insufficient balance")}
          </p>
          <p className="text-muted-foreground">
            {bi(
              `المطلوب ${formatMoney(required, "ar")} ورصيدك ${formatMoney(balance, "ar")} — ينقصك ${formatMoney(shortfall, "ar")}.`,
              `Required ${formatMoney(required, "en")}, your balance is ${formatMoney(balance, "en")} — you're short by ${formatMoney(shortfall, "en")}.`,
            )}
          </p>
        </div>
      </div>
      <Button asChild size="sm" className="shrink-0">
        <Link to="/wallet">{bi("اشحن رصيدك", "Top up your wallet")}</Link>
      </Button>
    </div>
  );
}

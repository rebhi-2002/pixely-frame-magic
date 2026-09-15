import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check, Loader2, X, ImageIcon } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getErrorMessage } from "@/integrations/backend/client";
import {
  getPendingTopUpRequests,
  getPendingWithdrawalRequests,
  verifyTopUpRequest,
  decideWithdrawalRequest,
  completeWithdrawal,
  receiptImageUrl,
  type PendingTopUpRequestDto,
  type PendingWithdrawalRequestDto,
} from "@/integrations/backend/wallet";
import { useBi } from "@/lib/bi";
import { EmptyState } from "@/components/app/kit";

// ملاحظة: الباك اند حاليًا بيرجّع StudentId/InstructorId (نص) بدون اسم
// المستخدم — راجع تعليق wallet.ts. لهيك بنعرض الـ id هون مؤقتًا.

export function WalletRequestsPage() {
  const bi = useBi();
  return (
    <div className="pb-24">
      <PageHeader title={bi("طلبات المحفظة", "Wallet requests")} icon="Wallet" />
      <div className="space-y-8 p-5">
        <TopUpSection />
        <WithdrawalSection />
      </div>
    </div>
  );
}

function TopUpSection() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const [reviewing, setReviewing] = useState<PendingTopUpRequestDto | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const { data: rows, isLoading } = useQuery({
    queryKey: ["wallet-pending-topups"],
    queryFn: getPendingTopUpRequests,
  });

  const decide = useMutation({
    mutationFn: (input: { requestId: number; approve: boolean; rejectionReason?: string }) =>
      verifyTopUpRequest(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet-pending-topups"] });
      setReviewing(null);
      setRejectionReason("");
      toast.success(bi("تم تنفيذ الإجراء", "Done"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر تنفيذ الإجراء", "Action failed"))),
  });

  return (
    <section>
      <h2 className="mb-3 font-display text-base font-bold text-foreground">
        {bi("طلبات شحن رصيد معلّقة (طلاب)", "Pending top-up requests (students)")}
      </h2>
      <div
        className="overflow-x-auto rounded-2xl bg-card"
        role="region"
        aria-label={bi("طلبات شحن الرصيد", "Top-up requests")}
      >
        {isLoading ? (
          <div className="flex justify-center p-10">
            <Loader2 className="size-5 animate-spin text-primary" />
          </div>
        ) : !rows?.length ? (
          <EmptyState
            icon="Wallet"
            text={bi("لا توجد طلبات شحن معلّقة حاليًا.", "No pending top-up requests right now.")}
          />
        ) : (
          <table className="w-full min-w-3xl text-start text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="px-4 py-3 font-semibold">{bi("الطالب", "Student")}</th>
                <th className="px-4 py-3 font-semibold">{bi("المبلغ", "Amount")}</th>
                <th className="px-4 py-3 font-semibold">{bi("مرجع البنك", "Bank ref.")}</th>
                <th className="px-4 py-3 font-semibold">{bi("الإشعار", "Receipt")}</th>
                <th className="w-40 px-4 py-3 font-semibold">{bi("إجراءات", "Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {r.studentId}
                  </td>
                  <td className="px-4 py-3 font-semibold text-foreground">
                    {r.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.bankReferenceNo}</td>
                  <td className="px-4 py-3">
                    <a
                      href={receiptImageUrl(r.receiptFileUrl)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      <ImageIcon className="size-4" />
                      {bi("عرض", "View")}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        title={bi("قبول", "Approve")}
                        className="text-success"
                        disabled={decide.isPending}
                        onClick={() => decide.mutate({ requestId: r.id, approve: true })}
                      >
                        <Check className="size-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        title={bi("رفض", "Reject")}
                        className="text-destructive"
                        disabled={decide.isPending}
                        onClick={() => setReviewing(r)}
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Dialog open={!!reviewing} onOpenChange={(v) => !v && setReviewing(null)}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>{bi("سبب الرفض", "Rejection reason")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-1.5">
            <Label htmlFor="reject-reason">{bi("السبب (اختياري)", "Reason (optional)")}</Label>
            <Input
              id="reject-reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              variant="destructive"
              disabled={decide.isPending}
              onClick={() =>
                reviewing &&
                decide.mutate({
                  requestId: reviewing.id,
                  approve: false,
                  rejectionReason: rejectionReason || undefined,
                })
              }
            >
              {bi("تأكيد الرفض", "Confirm rejection")}
            </Button>
            <Button variant="outline" onClick={() => setReviewing(null)}>
              {bi("إلغاء", "Cancel")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function WithdrawalSection() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const [reviewing, setReviewing] = useState<PendingWithdrawalRequestDto | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [completing, setCompleting] = useState<PendingWithdrawalRequestDto | null>(null);
  const [transferReference, setTransferReference] = useState("");

  const { data: rows, isLoading } = useQuery({
    queryKey: ["wallet-pending-withdrawals"],
    queryFn: getPendingWithdrawalRequests,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["wallet-pending-withdrawals"] });

  const decide = useMutation({
    mutationFn: (input: { requestId: number; approve: boolean; rejectionReason?: string }) =>
      decideWithdrawalRequest(input),
    onSuccess: () => {
      invalidate();
      setReviewing(null);
      setRejectionReason("");
      toast.success(bi("تم تنفيذ الإجراء", "Done"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر تنفيذ الإجراء", "Action failed"))),
  });

  const complete = useMutation({
    mutationFn: (input: { requestId: number; transferReference: string }) =>
      completeWithdrawal(input),
    onSuccess: () => {
      invalidate();
      setCompleting(null);
      setTransferReference("");
      toast.success(bi("تم تأكيد التحويل وخصم الرصيد", "Transfer confirmed and balance debited"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر تأكيد التحويل", "Failed to confirm"))),
  });

  // ملاحظة: GetPendingWithdrawalRequests بترجع بس الحالة PendingApproval.
  // الطلبات يلي انوافق عليها (ApprovedPendingTransfer) وصارت جاهزة لتأكيد
  // التحويل الفعلي ما إلها endpoint قائمة منفصل بالباك اند حاليًا — أزرار
  // "تأكيد التحويل" هون بتشتغل فقط على الطلب لحظة الموافقة مباشرة بنفس الجلسة.

  return (
    <section>
      <h2 className="mb-3 font-display text-base font-bold text-foreground">
        {bi("طلبات سحب أرباح معلّقة (معلّمون)", "Pending withdrawal requests (teachers)")}
      </h2>
      <div
        className="overflow-x-auto rounded-2xl bg-card"
        role="region"
        aria-label={bi("طلبات السحب", "Withdrawal requests")}
      >
        {isLoading ? (
          <div className="flex justify-center p-10">
            <Loader2 className="size-5 animate-spin text-primary" />
          </div>
        ) : !rows?.length ? (
          <EmptyState
            icon="Wallet"
            text={bi(
              "لا توجد طلبات سحب معلّقة حاليًا.",
              "No pending withdrawal requests right now.",
            )}
          />
        ) : (
          <table className="w-full min-w-3xl text-start text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="px-4 py-3 font-semibold">{bi("المعلّم", "Teacher")}</th>
                <th className="px-4 py-3 font-semibold">{bi("المبلغ", "Amount")}</th>
                <th className="px-4 py-3 font-semibold">{bi("البنك", "Bank")}</th>
                <th className="px-4 py-3 font-semibold">{bi("IBAN", "IBAN")}</th>
                <th className="w-52 px-4 py-3 font-semibold">{bi("إجراءات", "Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {r.instructorId}
                  </td>
                  <td className="px-4 py-3 font-semibold text-foreground">
                    {r.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {r.bankName} — {r.accountHolderName}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {r.bankIBAN}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-success"
                        disabled={decide.isPending}
                        onClick={() => decide.mutate({ requestId: r.id, approve: true })}
                      >
                        <Check className="size-4" />
                        {bi("موافقة", "Approve")}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive"
                        disabled={decide.isPending}
                        onClick={() => setReviewing(r)}
                      >
                        <X className="size-4" />
                        {bi("رفض", "Reject")}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setCompleting(r)}>
                        {bi("تأكيد التحويل", "Confirm transfer")}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Dialog open={!!reviewing} onOpenChange={(v) => !v && setReviewing(null)}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>{bi("سبب الرفض", "Rejection reason")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-1.5">
            <Label htmlFor="wd-reject-reason">{bi("السبب (اختياري)", "Reason (optional)")}</Label>
            <Input
              id="wd-reject-reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              variant="destructive"
              disabled={decide.isPending}
              onClick={() =>
                reviewing &&
                decide.mutate({
                  requestId: reviewing.id,
                  approve: false,
                  rejectionReason: rejectionReason || undefined,
                })
              }
            >
              {bi("تأكيد الرفض", "Confirm rejection")}
            </Button>
            <Button variant="outline" onClick={() => setReviewing(null)}>
              {bi("إلغاء", "Cancel")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!completing} onOpenChange={(v) => !v && setCompleting(null)}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {bi("تأكيد إتمام التحويل البنكي", "Confirm the bank transfer")}
            </DialogTitle>
          </DialogHeader>
          <p className="text-xs text-muted-foreground">
            {bi(
              "استخدم هالخيار بس بعد ما توافق على الطلب وتحوّل المبلغ فعليًا من حساب المنصة البنكي.",
              "Use this only after approving the request and actually transferring the amount from the platform's bank account.",
            )}
          </p>
          <div className="space-y-1.5">
            <Label htmlFor="transfer-ref">{bi("مرجع التحويل البنكي", "Transfer reference")}</Label>
            <Input
              id="transfer-ref"
              value={transferReference}
              onChange={(e) => setTransferReference(e.target.value)}
            />
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              disabled={complete.isPending || !transferReference.trim()}
              onClick={() =>
                completing &&
                complete.mutate({ requestId: completing.id, transferReference })
              }
            >
              {bi("تأكيد", "Confirm")}
            </Button>
            <Button variant="outline" onClick={() => setCompleting(null)}>
              {bi("إلغاء", "Cancel")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

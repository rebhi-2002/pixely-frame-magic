import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { AppPage, StatGrid, Panel, DataTable, Badge, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  deleteEarningTransaction,
  getEarningsSettings,
  listEarningTransactions,
  saveEarningTransaction,
} from "@/lib/teacher-followup.functions";
import type { EarningTransactionRow, TransactionStatus } from "@/lib/teacher-followup-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";

const title = "الأرباح | أكاديميا";
const description = "أرباحك، عمولة المنصة، وطلبات السحب — كل شي واضح بلا مفاجآت.";

export const Route = createFileRoute("/_authenticated/teacher/earnings")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PageRoute,
});

function PageRoute() {
  return (
    <Guard pageKey="teacher_earnings">
      <Body />
    </Guard>
  );
}

const EMPTY_FORM = {
  dateLabel: "",
  description: "",
  amount: "0",
  status: "قيد التنفيذ" as TransactionStatus,
};

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listEarningTransactions);
  const persist = useServerFn(saveEarningTransaction);
  const remove = useServerFn(deleteEarningTransaction);
  const fetchSettings = useServerFn(getEarningsSettings);

  const rowsQuery = useQuery({ queryKey: ["earning-transactions"], queryFn: () => fetchRows() });
  const settingsQuery = useQuery({
    queryKey: ["earnings-settings"],
    queryFn: () => fetchSettings(),
  });

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<EarningTransactionRow | null>(null);

  const isLoading = rowsQuery.isLoading || settingsQuery.isLoading;
  const list = rowsQuery.data ?? [];
  const settings = settingsQuery.data ?? { platformFeePercent: null };
  const stats = useMemo(() => {
    const available = list.filter((r) => r.status === "مؤكد").reduce((s, r) => s + r.amount, 0);
    const pending = list
      .filter((r) => r.status === "قيد التنفيذ" && r.amount > 0)
      .reduce((s, r) => s + r.amount, 0);
    const paidOut = Math.abs(
      list.filter((r) => r.amount < 0 && r.status === "مؤكد").reduce((s, r) => s + r.amount, 0),
    );
    return { available, pending, paidOut };
  }, [list]);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["earning-transactions"] });

  const saveMutation = useMutation({
    mutationFn: () =>
      persist({ data: { ...form, id: editingId ?? undefined, amount: Number(form.amount) || 0 } }),
    onSuccess: () => {
      invalidate();
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) =>
      toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save"))),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      invalidate();
      setPendingDelete(null);
      toast.success(bi("تم الحذف", "Deleted successfully"));
    },
    onError: (e) =>
      toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete"))),
  });

  function openDialog(row: EarningTransactionRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            dateLabel: row.dateLabel,
            description: row.description,
            amount: String(row.amount),
            status: row.status,
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <AppPage
      title={bi("الأرباح", "Earnings")}
      icon="Wallet"
      subtitle={bi(
        description,
        "Your earnings, platform fee and payout requests — all transparent.",
      )}
    >
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <StatGrid
            items={[
              {
                icon: "Wallet",
                label: bi("الرصيد المتاح", "Available"),
                value: bi(`${stats.available} ₪`, `${stats.available} ILS`),
              },
              {
                icon: "Hourglass",
                label: bi("قيد التسوية", "Pending"),
                value: bi(`${stats.pending} ₪`, `${stats.pending} ILS`),
              },
              {
                icon: "BadgePercent",
                label: bi("عمولة المنصة", "Platform fee"),
                value:
                  settings.platformFeePercent != null
                    ? `${settings.platformFeePercent}%`
                    : bi("قيد التحديد", "TBD"),
              },
              {
                icon: "Banknote",
                label: bi("إجمالي مسحوب", "Total paid out"),
                value: bi(`${stats.paidOut} ₪`, `${stats.paidOut} ILS`),
              },
            ]}
          />

          <Panel
            title={bi("آخر الحركات", "Recent transactions")}
            icon="Receipt"
            action={
              can("teacher_earnings", "show_add_form") ? (
                <Button size="sm" onClick={() => openDialog(null)}>
                  <Plus className="size-4" />
                  {bi("إضافة حركة", "Add transaction")}
                </Button>
              ) : undefined
            }
          >
            {list.length ? (
              <DataTable
                head={[
                  bi("التاريخ", "Date"),
                  bi("الوصف", "Description"),
                  bi("المبلغ", "Amount"),
                  bi("الحالة", "Status"),
                  bi("", ""),
                ]}
                rows={list.map((r) => [
                  r.dateLabel,
                  r.description,
                  <span
                    key={`${r.id}-amt`}
                    className={r.amount >= 0 ? "text-success" : "text-destructive"}
                  >
                    {bi(
                      `${r.amount >= 0 ? "+" : ""}${r.amount} ₪`,
                      `${r.amount >= 0 ? "+" : ""}${r.amount} ILS`,
                    )}
                  </span>,
                  <Badge key={r.id} tone={r.status === "مؤكد" ? "success" : "primary"}>
                    {bi(r.status, r.status === "مؤكد" ? "Cleared" : "Processing")}
                  </Badge>,
                  <div key={`${r.id}-actions`} className="flex items-center justify-end gap-1">
                    {can("teacher_earnings", "edit") && (
                      <Button size="icon" variant="ghost" onClick={() => openDialog(r)}>
                        <Pencil className="size-4" />
                      </Button>
                    )}
                    {can("teacher_earnings", "delete") && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => setPendingDelete(r)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>,
                ])}
              />
            ) : (
              <EmptyState icon="Receipt" text={bi("لا حركات بعد.", "No transactions yet.")} />
            )}
          </Panel>
        </>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId
                ? bi("تعديل حركة", "Edit transaction")
                : bi("إضافة حركة", "Add transaction")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="et-desc">{bi("الوصف", "Description")}</Label>
              <Input
                id="et-desc"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="et-date">{bi("التاريخ", "Date")}</Label>
              <Input
                id="et-date"
                value={form.dateLabel}
                onChange={(e) => setForm((f) => ({ ...f, dateLabel: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="et-amount">
                {bi("المبلغ (سالب للسحب)", "Amount (negative for payout)")}
              </Label>
              <Input
                id="et-amount"
                type="number"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>{bi("الحالة", "Status")}</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as TransactionStatus }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="قيد التنفيذ">{bi("قيد التنفيذ", "Processing")}</SelectItem>
                  <SelectItem value="مؤكد">{bi("مؤكد", "Cleared")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !form.description.trim()}
            >
              {bi("حفظ", "Save")}
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {bi("إلغاء", "Cancel")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!pendingDelete} onOpenChange={(v) => !v && setPendingDelete(null)}>
        <AlertDialogContent className="text-start">
          <AlertDialogHeader>
            <AlertDialogTitle>{bi("حذف هذه الحركة؟", "Delete this transaction?")}</AlertDialogTitle>
            <AlertDialogDescription>
              {bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:justify-start">
            <AlertDialogAction
              onClick={() => pendingDelete && deleteMutation.mutate(pendingDelete.id)}
            >
              {bi("حذف", "Delete")}
            </AlertDialogAction>
            <AlertDialogCancel>{bi("إلغاء", "Cancel")}</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppPage>
  );
}

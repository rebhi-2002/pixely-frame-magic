import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Pencil, Plus, RotateCcw, Search, Trash2 } from "lucide-react";
import { PageHeader, Toolbar } from "@/components/admin/page-header";
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
import { deletePayment, listPayments, savePayment } from "@/lib/admin-curriculum.functions";
import type { PaymentRow, PaymentStatus } from "@/lib/admin-curriculum-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";

const STATUSES: PaymentStatus[] = ["ناجحة", "قيد المعالجة", "مستردة", "فاشلة"];

const STATUS_LABEL: Record<PaymentStatus, [string, string]> = {
  ناجحة: ["ناجحة", "Successful"],
  "قيد المعالجة": ["قيد المعالجة", "Processing"],
  مستردة: ["مستردة", "Refunded"],
  فاشلة: ["فاشلة", "Failed"],
};

const STATUS_TONE: Record<PaymentStatus, "success" | "primary" | "danger" | "muted"> = {
  ناجحة: "success",
  "قيد المعالجة": "primary",
  مستردة: "muted",
  فاشلة: "danger",
};

const EMPTY_FORM = { userName: "", amount: "", status: "ناجحة" as PaymentStatus };

export function PaymentsPage() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listPayments);
  const persist = useServerFn(savePayment);
  const remove = useServerFn(deletePayment);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<PaymentRow | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: () => fetchRows(),
  });

  const filtered = useMemo(() => {
    return (rows ?? []).filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (!`${r.userName} ${r.code}`.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [rows, statusFilter, search]);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["payments"] });

  const saveMutation = useMutation({
    mutationFn: () =>
      persist({
        data: {
          id: editingId ?? undefined,
          userName: form.userName,
          amount: Number(form.amount),
          status: form.status,
        },
      }),
    onSuccess: () => {
      invalidate();
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save"))),
  });

  const refundMutation = useMutation({
    mutationFn: (row: PaymentRow) =>
      persist({
        data: { id: row.id, userName: row.userName, amount: row.amount, status: "مستردة" },
      }),
    onSuccess: () => {
      invalidate();
      toast.success(bi("تم استرداد العملية", "Payment refunded"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر التحديث", "Failed to update"))),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      invalidate();
      setPendingDelete(null);
      toast.success(bi("تم الحذف", "Deleted successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete"))),
  });

  function openDialog(row: PaymentRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row ? { userName: row.userName, amount: String(row.amount), status: row.status } : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <div>
      <PageHeader title={bi("المدفوعات", "Payments")} icon="Wallet" />

      <div className="p-5">
        <Toolbar>
          <div className="relative min-w-56 flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={bi("بحث بالمستخدم أو رقم العملية", "Search by user or transaction ID")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ps-9"
            />
          </div>
          <FilterSelect
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder={bi("الحالة", "Status")}
            options={[
              { value: "all", label: bi("كل الحالات", "All statuses") },
              ...STATUSES.map((s) => ({ value: s, label: bi(...STATUS_LABEL[s]) })),
            ]}
          />
          {can("admin_payments", "show_add_form") && (
            <Button className="ms-auto" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة عملية", "Add transaction")}
            </Button>
          )}
        </Toolbar>

        <div className="mt-4 overflow-x-auto rounded-2xl bg-card">
          {isLoading ? (
            <div className="flex justify-center p-10">
              <Loader2 className="size-5 animate-spin text-primary" />
            </div>
          ) : (
            <table className="w-full min-w-3xl text-start text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="w-28 px-4 py-3 font-semibold">{bi("العملية", "Transaction")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("المستخدم", "User")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("القيمة", "Amount")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("الحالة", "Status")}</th>
                  <th className="w-36 px-4 py-3 font-semibold">{bi("إجراءات", "Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.code}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">{r.userName}</td>
                    <td className="px-4 py-3 text-muted-foreground">${r.amount}</td>
                    <td className="px-4 py-3">
                      <StatusBadge tone={STATUS_TONE[r.status]}>
                        {bi(...STATUS_LABEL[r.status])}
                      </StatusBadge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {can("admin_payments", "edit") && r.status !== "مستردة" && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title={bi("استرداد", "Refund")}
                            className="text-muted-foreground"
                            onClick={() => refundMutation.mutate(r)}
                          >
                            <RotateCcw className="size-4" />
                          </Button>
                        )}
                        {can("admin_payments", "edit") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title={bi("تعديل", "Edit")}
                            onClick={() => openDialog(r)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                        )}
                        {can("admin_payments", "delete") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title={bi("حذف", "Delete")}
                            className="text-destructive"
                            onClick={() => setPendingDelete(r)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {!filtered.length && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      {bi("لا توجد نتائج مطابقة.", "No matching results.")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId
                ? bi("تعديل عملية", "Edit transaction")
                : bi("إضافة عملية", "Add transaction")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="pay-user">{bi("المستخدم", "User")}</Label>
              <Input
                id="pay-user"
                value={form.userName}
                onChange={(e) => setForm((f) => ({ ...f, userName: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pay-amount">{bi("القيمة ($)", "Amount ($)")}</Label>
              <Input
                id="pay-amount"
                type="number"
                min={0}
                step="0.01"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{bi("الحالة", "Status")}</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as PaymentStatus }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {bi(...STATUS_LABEL[s])}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !form.userName.trim() || !form.amount}
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
            <AlertDialogTitle>
              {bi(`حذف العملية «${pendingDelete?.code}»؟`, `Delete "${pendingDelete?.code}"?`)}
            </AlertDialogTitle>
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
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-44">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function StatusBadge({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "success" | "primary" | "danger" | "muted";
}) {
  return (
    <span
      className={
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold " +
        (tone === "primary"
          ? "bg-primary/15 text-primary"
          : tone === "success"
            ? "bg-success/15 text-success"
            : tone === "danger"
              ? "bg-destructive/15 text-destructive"
              : "bg-muted text-muted-foreground")
      }
    >
      {children}
    </span>
  );
}

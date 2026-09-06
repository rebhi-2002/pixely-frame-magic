import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Check, Loader2, Pencil, Plus, Search, Trash2, X } from "lucide-react";
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
import {
  deleteCurriculumRequest,
  listCurriculumRequests,
  saveCurriculumRequest,
} from "@/lib/admin-curriculum.functions";
import type {
  CurriculumEntityType,
  CurriculumRequestRow,
  CurriculumRequestStatus,
} from "@/lib/admin-curriculum-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";

const ENTITY_TYPES: CurriculumEntityType[] = ["وحدة", "مادة", "مجموعة", "صف", "كورس"];
const STATUSES: CurriculumRequestStatus[] = [
  "جديد",
  "قيد الدراسة",
  "جاهز للاعتماد",
  "معتمد",
  "مرفوض",
];

const ENTITY_LABEL: Record<CurriculumEntityType, [string, string]> = {
  وحدة: ["وحدة", "Module"],
  مادة: ["مادة", "Subject"],
  مجموعة: ["مجموعة", "Group"],
  صف: ["صف", "Grade"],
  كورس: ["كورس", "Course"],
};

const STATUS_LABEL: Record<CurriculumRequestStatus, [string, string]> = {
  جديد: ["جديد", "New"],
  "قيد الدراسة": ["قيد الدراسة", "In review"],
  "جاهز للاعتماد": ["جاهز للاعتماد", "Ready to approve"],
  معتمد: ["معتمد", "Approved"],
  مرفوض: ["مرفوض", "Rejected"],
};

const STATUS_TONE: Record<CurriculumRequestStatus, "success" | "primary" | "danger" | "muted"> = {
  جديد: "muted",
  "قيد الدراسة": "primary",
  "جاهز للاعتماد": "primary",
  معتمد: "success",
  مرفوض: "danger",
};

const EMPTY_FORM = {
  title: "",
  requesterName: "",
  entityType: "وحدة" as CurriculumEntityType,
  status: "جديد" as CurriculumRequestStatus,
};

export function CurriculumRequestsPage() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listCurriculumRequests);
  const persist = useServerFn(saveCurriculumRequest);
  const remove = useServerFn(deleteCurriculumRequest);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<CurriculumRequestRow | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["curriculum-requests"],
    queryFn: () => fetchRows(),
  });

  const filtered = useMemo(() => {
    return (rows ?? []).filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (!`${r.title} ${r.requesterName}`.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [rows, statusFilter, search]);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["curriculum-requests"] });

  const saveMutation = useMutation({
    mutationFn: () => persist({ data: { ...form, id: editingId ?? undefined } }),
    onSuccess: () => {
      invalidate();
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) =>
      toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save"))),
  });

  const statusMutation = useMutation({
    mutationFn: (vars: { row: CurriculumRequestRow; status: CurriculumRequestStatus }) =>
      persist({
        data: {
          id: vars.row.id,
          title: vars.row.title,
          requesterName: vars.row.requesterName,
          entityType: vars.row.entityType,
          status: vars.status,
        },
      }),
    onSuccess: () => {
      invalidate();
      toast.success(bi("تم تحديث الحالة", "Status updated"));
    },
    onError: (e) =>
      toast.error(getErrorMessage(e, bi("تعذّر التحديث", "Failed to update"))),
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

  function openDialog(row: CurriculumRequestRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            title: row.title,
            requesterName: row.requesterName,
            entityType: row.entityType,
            status: row.status,
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <div>
      <PageHeader title={bi("طلبات المنهاج", "Curriculum requests")} icon="Inbox" />

      <div className="p-5">
        <Toolbar>
          <div className="relative min-w-56 flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={bi("بحث بالعنوان أو مقدّم الطلب", "Search by title or requester")}
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
          {can("admin_curriculum_requests", "show_add_form") && (
            <Button className="ms-auto" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة طلب", "Add request")}
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
                  <th className="px-4 py-3 font-semibold">{bi("الطلب", "Request")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("مقدّم الطلب", "Requester")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("الكيان", "Entity")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("الحالة", "Status")}</th>
                  <th className="w-44 px-4 py-3 font-semibold">{bi("إجراءات", "Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 font-semibold text-foreground">{r.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.requesterName}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {bi(...ENTITY_LABEL[r.entityType])}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge tone={STATUS_TONE[r.status]}>
                        {bi(...STATUS_LABEL[r.status])}
                      </StatusBadge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {can("admin_curriculum_requests", "edit") && r.status !== "معتمد" && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title={bi("اعتماد", "Approve")}
                            className="text-success"
                            onClick={() => statusMutation.mutate({ row: r, status: "معتمد" })}
                          >
                            <Check className="size-4" />
                          </Button>
                        )}
                        {can("admin_curriculum_requests", "edit") && r.status !== "مرفوض" && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title={bi("رفض", "Reject")}
                            className="text-destructive"
                            onClick={() => statusMutation.mutate({ row: r, status: "مرفوض" })}
                          >
                            <X className="size-4" />
                          </Button>
                        )}
                        {can("admin_curriculum_requests", "edit") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title={bi("تعديل", "Edit")}
                            onClick={() => openDialog(r)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                        )}
                        {can("admin_curriculum_requests", "delete") && (
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
              {editingId ? bi("تعديل طلب", "Edit request") : bi("إضافة طلب", "Add request")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="creq-title">{bi("العنوان", "Title")}</Label>
              <Input
                id="creq-title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="creq-requester">{bi("مقدّم الطلب", "Requester")}</Label>
              <Input
                id="creq-requester"
                value={form.requesterName}
                onChange={(e) => setForm((f) => ({ ...f, requesterName: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{bi("الكيان", "Entity")}</Label>
              <Select
                value={form.entityType}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, entityType: v as CurriculumEntityType }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ENTITY_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {bi(...ENTITY_LABEL[t])}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>{bi("الحالة", "Status")}</Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, status: v as CurriculumRequestStatus }))
                }
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
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
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
              {bi(`حذف «${pendingDelete?.title}»؟`, `Delete "${pendingDelete?.title}"?`)}
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

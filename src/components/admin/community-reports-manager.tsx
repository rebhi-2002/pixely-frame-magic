import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Check, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { PageHeader, Toolbar } from "@/components/admin/page-header";
import { Badge as StatusBadge } from "@/components/app/kit";
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
  deleteCommunityReport,
  listCommunityReports,
  saveCommunityReport,
} from "@/lib/admin-moderation.functions";
import type { CommunityReportRow, ReportPriority, ReportStatus } from "@/lib/admin-moderation-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";
import { LoadingState } from "@/components/app/feedback-states";

const PRIORITIES: ReportPriority[] = ["عالية", "متوسطة", "منخفضة"];
const STATUSES: ReportStatus[] = ["مفتوح", "مغلق", "مؤجل"];

const PRIORITY_LABEL: Record<ReportPriority, [string, string]> = {
  عالية: ["عالية", "High"],
  متوسطة: ["متوسطة", "Medium"],
  منخفضة: ["منخفضة", "Low"],
};

const PRIORITY_TONE: Record<ReportPriority, "danger" | "primary" | "muted"> = {
  عالية: "danger",
  متوسطة: "primary",
  منخفضة: "muted",
};

const STATUS_LABEL: Record<ReportStatus, [string, string]> = {
  مفتوح: ["مفتوح", "Open"],
  مغلق: ["مغلق", "Closed"],
  مؤجل: ["مؤجل", "Deferred"],
};

const EMPTY_FORM = {
  community: "",
  reason: "",
  priority: "متوسطة" as ReportPriority,
  status: "مفتوح" as ReportStatus,
};

export function CommunityReportsPage() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listCommunityReports);
  const persist = useServerFn(saveCommunityReport);
  const remove = useServerFn(deleteCommunityReport);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<CommunityReportRow | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["community-reports"],
    queryFn: () => fetchRows(),
  });

  const filtered = useMemo(() => {
    return (rows ?? []).filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (priorityFilter !== "all" && r.priority !== priorityFilter) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (!`${r.community} ${r.reason} ${r.code}`.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [rows, statusFilter, priorityFilter, search]);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["community-reports"] });

  const saveMutation = useMutation({
    mutationFn: () => persist({ data: { ...form, id: editingId ?? undefined } }),
    onSuccess: () => {
      invalidate();
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save"))),
  });

  const resolveMutation = useMutation({
    mutationFn: (row: CommunityReportRow) =>
      persist({
        data: {
          id: row.id,
          community: row.community,
          reason: row.reason,
          priority: row.priority,
          status: "مغلق",
        },
      }),
    onSuccess: () => {
      invalidate();
      toast.success(bi("تم إغلاق البلاغ", "Report closed"));
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

  function openDialog(row: CommunityReportRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            community: row.community,
            reason: row.reason,
            priority: row.priority,
            status: row.status,
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <div>
      <PageHeader title={bi("بلاغات المجتمع", "Community reports")} icon="Flag" />

      <div className="p-5">
        <Toolbar>
          <div className="relative min-w-56 flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={bi(
                "بحث بالمجتمع أو السبب أو الرقم",
                "Search by community, reason, or ID",
              )}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ps-9"
            />
          </div>
          <FilterSelect
            value={priorityFilter}
            onChange={setPriorityFilter}
            placeholder={bi("الأولوية", "Priority")}
            options={[
              { value: "all", label: bi("كل الأولويات", "All priorities") },
              ...PRIORITIES.map((p) => ({ value: p, label: bi(...PRIORITY_LABEL[p]) })),
            ]}
          />
          <FilterSelect
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder={bi("الحالة", "Status")}
            options={[
              { value: "all", label: bi("كل الحالات", "All statuses") },
              ...STATUSES.map((s) => ({ value: s, label: bi(...STATUS_LABEL[s]) })),
            ]}
          />
          {can("admin_community_reports", "show_add_form") && (
            <Button className="ms-auto" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة بلاغ", "Add report")}
            </Button>
          )}
        </Toolbar>

        <div
          className="mt-4 overflow-x-auto rounded-2xl bg-card"
          role="region"
          aria-label={bi("بلاغات المجتمع", "Community reports")}
        >
          {isLoading ? (
            <LoadingState
              label={bi("جارٍ التحميل…", "Loading…")}
              className="border-none bg-transparent"
            />
          ) : (
            <table className="w-full min-w-3xl text-start text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="w-24 px-4 py-3 font-semibold">{bi("الرقم", "ID")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("المجتمع", "Community")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("السبب", "Reason")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("الأولوية", "Priority")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("الحالة", "Status")}</th>
                  <th className="w-36 px-4 py-3 font-semibold">{bi("إجراءات", "Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.code}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">{r.community}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.reason}</td>
                    <td className="px-4 py-3">
                      <StatusBadge tone={PRIORITY_TONE[r.priority]}>
                        {bi(...PRIORITY_LABEL[r.priority])}
                      </StatusBadge>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        tone={
                          r.status === "مغلق"
                            ? "success"
                            : r.status === "مفتوح"
                              ? "danger"
                              : "muted"
                        }
                      >
                        {bi(...STATUS_LABEL[r.status])}
                      </StatusBadge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {can("admin_community_reports", "edit") && r.status !== "مغلق" && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title={bi("إغلاق البلاغ", "Close report")}
                            className="text-success"
                            onClick={() => resolveMutation.mutate(r)}
                          >
                            <Check className="size-4" />
                          </Button>
                        )}
                        {can("admin_community_reports", "edit") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title={bi("تعديل", "Edit")}
                            onClick={() => openDialog(r)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                        )}
                        {can("admin_community_reports", "delete") && (
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
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
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
              {editingId ? bi("تعديل بلاغ", "Edit report") : bi("إضافة بلاغ", "Add report")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="cr-community">{bi("المجتمع", "Community")}</Label>
              <Input
                id="cr-community"
                value={form.community}
                onChange={(e) => setForm((f) => ({ ...f, community: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="cr-reason">{bi("السبب", "Reason")}</Label>
              <Input
                id="cr-reason"
                value={form.reason}
                onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{bi("الأولوية", "Priority")}</Label>
              <Select
                value={form.priority}
                onValueChange={(v) => setForm((f) => ({ ...f, priority: v as ReportPriority }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map((p) => (
                    <SelectItem key={p} value={p}>
                      {bi(...PRIORITY_LABEL[p])}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>{bi("الحالة", "Status")}</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as ReportStatus }))}
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
              {bi(`حذف البلاغ «${pendingDelete?.code}»؟`, `Delete "${pendingDelete?.code}"?`)}
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

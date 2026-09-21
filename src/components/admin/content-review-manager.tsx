import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Check, Pencil, Plus, Search, Trash2, X } from "lucide-react";
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
  deleteContentSubmission,
  listContentSubmissions,
  saveContentSubmission,
} from "@/lib/admin-moderation.functions";
import type { ContentStatus, ContentSubmissionRow, ContentType } from "@/lib/admin-moderation-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";
import { LoadingState } from "@/components/app/feedback-states";

const TYPES: ContentType[] = ["درس", "اختبار", "كورس"];
const STATUSES: ContentStatus[] = ["جديد", "مراجعة ثانية", "جاهز للاعتماد", "معتمد", "مرفوض"];

const TYPE_LABEL: Record<ContentType, [string, string]> = {
  درس: ["درس", "Lesson"],
  اختبار: ["اختبار", "Quiz"],
  كورس: ["كورس", "Course"],
};

const STATUS_LABEL: Record<ContentStatus, [string, string]> = {
  جديد: ["جديد", "New"],
  "مراجعة ثانية": ["مراجعة ثانية", "Second review"],
  "جاهز للاعتماد": ["جاهز للاعتماد", "Ready to approve"],
  معتمد: ["معتمد", "Approved"],
  مرفوض: ["مرفوض", "Rejected"],
};

const STATUS_TONE: Record<ContentStatus, "success" | "primary" | "danger" | "muted"> = {
  جديد: "muted",
  "مراجعة ثانية": "primary",
  "جاهز للاعتماد": "primary",
  معتمد: "success",
  مرفوض: "danger",
};

const EMPTY_FORM = {
  title: "",
  teacherName: "",
  type: "درس" as ContentType,
  status: "جديد" as ContentStatus,
};

export function ContentReviewPage() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listContentSubmissions);
  const persist = useServerFn(saveContentSubmission);
  const remove = useServerFn(deleteContentSubmission);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<ContentSubmissionRow | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["content-submissions"],
    queryFn: () => fetchRows(),
  });

  const filtered = useMemo(() => {
    return (rows ?? []).filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (typeFilter !== "all" && r.type !== typeFilter) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (!`${r.title} ${r.teacherName}`.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [rows, statusFilter, typeFilter, search]);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["content-submissions"] });

  const saveMutation = useMutation({
    mutationFn: () => persist({ data: { ...form, id: editingId ?? undefined } }),
    onSuccess: () => {
      invalidate();
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save"))),
  });

  const statusMutation = useMutation({
    mutationFn: (vars: { row: ContentSubmissionRow; status: ContentStatus }) =>
      persist({ data: { ...vars.row, status: vars.status } }),
    onSuccess: () => {
      invalidate();
      toast.success(bi("تم تحديث الحالة", "Status updated"));
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

  function openDialog(row: ContentSubmissionRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? { title: row.title, teacherName: row.teacherName, type: row.type, status: row.status }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <div>
      <PageHeader title={bi("مراجعة المحتوى", "Content review")} icon="FileSearch" />

      <div className="p-5">
        <Toolbar>
          <div className="relative min-w-56 flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={bi("بحث بالعنوان أو المعلم", "Search by title or teacher")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ps-9"
            />
          </div>
          <FilterSelect
            value={typeFilter}
            onChange={setTypeFilter}
            placeholder={bi("النوع", "Type")}
            options={[
              { value: "all", label: bi("كل الأنواع", "All types") },
              ...TYPES.map((t) => ({ value: t, label: bi(...TYPE_LABEL[t]) })),
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
          {can("admin_content_review", "show_add_form") && (
            <Button className="ms-auto" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة عنصر", "Add item")}
            </Button>
          )}
        </Toolbar>

        <div
          className="mt-4 overflow-x-auto rounded-2xl bg-card"
          role="region"
          aria-label={bi("مراجعة المحتوى", "Content review")}
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
                  <th className="w-14 px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">{bi("المحتوى", "Content")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("المعلم", "Teacher")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("النوع", "Type")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("الحالة", "Status")}</th>
                  <th className="w-44 px-4 py-3 font-semibold">{bi("إجراءات", "Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">{r.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.teacherName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{bi(...TYPE_LABEL[r.type])}</td>
                    <td className="px-4 py-3">
                      <StatusBadge tone={STATUS_TONE[r.status]}>
                        {bi(...STATUS_LABEL[r.status])}
                      </StatusBadge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {can("admin_content_review", "edit") && r.status !== "معتمد" && (
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
                        {can("admin_content_review", "edit") && r.status !== "مرفوض" && (
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
                        {can("admin_content_review", "edit") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title={bi("تعديل", "Edit")}
                            onClick={() => openDialog(r)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                        )}
                        {can("admin_content_review", "delete") && (
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
              {editingId ? bi("تعديل عنصر", "Edit item") : bi("إضافة عنصر", "Add item")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="cs-title">{bi("العنوان", "Title")}</Label>
              <Input
                id="cs-title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cs-teacher">{bi("المعلم", "Teacher")}</Label>
              <Input
                id="cs-teacher"
                value={form.teacherName}
                onChange={(e) => setForm((f) => ({ ...f, teacherName: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{bi("النوع", "Type")}</Label>
              <Select
                value={form.type}
                onValueChange={(v) => setForm((f) => ({ ...f, type: v as ContentType }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {bi(...TYPE_LABEL[t])}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>{bi("الحالة", "Status")}</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as ContentStatus }))}
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

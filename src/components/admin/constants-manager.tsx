import { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { PageHeader, Toolbar } from "@/components/admin/page-header";
import { Pagination } from "@/components/app/kit";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  deleteBackendConstant,
  listBackendConstants,
  loadBackendConstantParents,
  saveBackendConstant,
} from "@/integrations/backend/admin-constants";
import type { ConstantRow } from "@/integrations/backend/admin-constants";
import { getErrorMessage } from "@/integrations/backend/client";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";

const EMPTY_FORM = {
  name: "",
  comment: "",
  icon: "",
  parent_id: null as number | null,
};

export function ConstantsPage() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 20;

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<ConstantRow | null>(null);

  // فلترة/بحث حقيقي من الباك اند بدل جلب 1000 صف وفلترة بالمتصفح — راجع
  // full-project-report.md قسم "جداول أدمن" للتفاصيل والدافع.
  const {
    data: constantsResult,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["constants", { search: debouncedSearch, page }],
    queryFn: () =>
      listBackendConstants({
        searchValue: debouncedSearch.trim(),
        pageSize: PAGE_SIZE,
        skip: page * PAGE_SIZE,
      }),
    placeholderData: (prev) => prev,
  });
  const constants = constantsResult?.rows ?? [];
  const totalCount = constantsResult?.totalCount ?? 0;

  const { data: parents } = useQuery({
    queryKey: ["backend-constant-parents"],
    queryFn: loadBackendConstantParents,
    staleTime: 5 * 60_000,
    retry: false,
  });

  // تحقق حقيقي قبل الإرسال — نفس نمط users-manager.tsx/pages-manager.tsx.
  function validateConstantForm(): string | null {
    if (!form.name.trim()) return bi("الاسم مطلوب", "Name is required");
    return null;
  }

  const saveMutation = useMutation({
    mutationFn: () => saveBackendConstant({ ...form, id: editingId ?? undefined }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["constants"] });
      queryClient.invalidateQueries({ queryKey: ["backend-constant-parents"] });
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save"))),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBackendConstant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["constants"] });
      queryClient.invalidateQueries({ queryKey: ["backend-constant-parents"] });
      setPendingDelete(null);
      toast.success(bi("تم الحذف", "Deleted successfully"));
    },
    // رسالة الباك اند هون مهمة نعرضها كما هي (مو الرسالة العامة) — بترجع
    // "هذا الثابت له عناصر فرعية" لو المستخدم حاول يحذف أب قبل أولاده.
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete"))),
  });

  function openDialog(constant: ConstantRow | null) {
    setEditingId(constant?.id ?? null);
    setForm(
      constant
        ? {
            name: constant.name,
            comment: constant.comment ?? "",
            icon: constant.icon ?? "",
            parent_id: constant.parent_id,
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  // ثابت ما يقدر يختار نفسه كأب — يمنع حلقة مباشرة بالشجرة (فحص الحفدة
  // الأعمق موجود بالباك اند نفسه عند الحذف/الحفظ).
  const parentOptionsForEditing = (parents ?? []).filter((p) => p.id !== editingId);

  return (
    <div>
      <PageHeader title={bi("الثوابت", "Constants")} icon="ListTree" />

      <div className="p-5">
        <Toolbar>
          <div className="relative min-w-56 flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={bi("بحث بالاسم أو الملاحظة", "Search by name or comment")}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              className="ps-9"
            />
          </div>

          {can("admin_constants", "show_add_form") && (
            <Button className="ms-auto" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة ثابت", "Add constant")}
            </Button>
          )}
        </Toolbar>
        <div
          className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground"
          aria-live="polite"
        >
          <span>
            {bi(`${totalCount} نتيجة`, `${totalCount} result${totalCount === 1 ? "" : "s"}`)}
          </span>
        </div>

        <div
          className="mt-4 overflow-x-auto rounded-2xl bg-card"
          role="region"
          aria-label={bi("قائمة الثوابت", "Constants list")}
        >
          {isLoading ? (
            <LoadingState label={bi("عم نحمّل الثوابت…", "Loading constants…")} />
          ) : isError ? (
            <ErrorState
              title={bi("تعذّر تحميل الثوابت", "Couldn't load constants")}
              action={
                <RetryButton
                  label={bi("إعادة المحاولة", "Try again")}
                  onClick={() => void queryClient.invalidateQueries({ queryKey: ["constants"] })}
                />
              }
            />
          ) : (
            <table className="w-full min-w-[700px] text-start text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="w-14 px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">{bi("الاسم", "Name")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("الأب", "Parent")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("ملاحظة", "Comment")}</th>
                  <th className="w-28 px-4 py-3 font-semibold">{bi("إجراءات", "Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {constants.map((c, i) => (
                  <tr key={c.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">{c.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.parent_name ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.comment ?? "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {can("admin_constants", "edit") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title={bi("تعديل", "Edit")}
                            onClick={() => openDialog(c)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                        )}
                        {can("admin_constants", "delete") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title={bi("حذف", "Delete")}
                            className="text-destructive"
                            onClick={() => setPendingDelete(c)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {!constants.length && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      {search.trim()
                        ? bi("لا توجد نتائج مطابقة للبحث.", "No constants match your search.")
                        : bi("لا توجد ثوابت بعد.", "No constants yet.")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

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
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId ? bi("تعديل ثابت", "Edit constant") : bi("إضافة ثابت", "Add constant")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="c-name">{bi("الاسم", "Name")}</Label>
              <Input
                id="c-name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{bi("الأب (اختياري)", "Parent (optional)")}</Label>
              <Select
                value={form.parent_id == null ? "none" : String(form.parent_id)}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, parent_id: v === "none" ? null : Number(v) }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={bi("بدون أب", "No parent")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{bi("بدون أب", "No parent")}</SelectItem>
                  {parentOptionsForEditing.map((p) => (
                    <SelectItem key={p.id} value={String(p.id)}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="c-icon">{bi("أيقونة (اختياري)", "Icon (optional)")}</Label>
              <Input
                id="c-icon"
                value={form.icon}
                onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                placeholder="lucide icon name"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="c-comment">{bi("ملاحظة (اختياري)", "Comment (optional)")}</Label>
              <Textarea
                id="c-comment"
                value={form.comment}
                onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => {
                const error = validateConstantForm();
                if (error) {
                  toast.error(error);
                  return;
                }
                saveMutation.mutate();
              }}
              loading={saveMutation.isPending}
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
              {bi(`حذف «${pendingDelete?.name}»؟`, `Delete "${pendingDelete?.name}"?`)}
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

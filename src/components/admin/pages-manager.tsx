import { useMemo, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { PageHeader, Toolbar } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  deleteBackendPage,
  listBackendPages,
  loadBackendPageOptions,
  saveBackendPage,
} from "@/integrations/backend/admin-pages";
import type { PageRow } from "@/integrations/backend/admin-pages";
import { getErrorMessage } from "@/integrations/backend/client";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";

const EMPTY_FORM = {
  name: "",
  name_en: "",
  link: "",
  icon: "",
  in_menu: true,
  is_active: true,
  is_ajax: false,
  parent_id: null as number | null,
  module_id: null as number | null,
  category_id: null as number | null,
};

export function PagesPage() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<PageRow | null>(null);

  const {
    data: pages,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["backend-pages"],
    queryFn: listBackendPages,
  });
  const { data: options } = useQuery({
    queryKey: ["backend-page-options"],
    queryFn: loadBackendPageOptions,
    staleTime: 5 * 60_000,
    retry: false,
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return pages ?? [];
    return (pages ?? []).filter((p) => {
      const hay = `${p.name} ${p.name_en} ${p.link ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [pages, search]);

  // تحقق حقيقي قبل الإرسال — نفس نمط users-manager.tsx (راجع
  // full-project-report.md لسياق ليش أُضيف).
  function validatePageForm(): string | null {
    if (!form.name.trim()) return bi("الاسم بالعربي مطلوب", "Arabic name is required");
    if (!form.name_en.trim()) return bi("الاسم بالإنجليزي مطلوب", "English name is required");
    if (form.category_id == null) return bi("الفئة مطلوبة", "Category is required");
    return null;
  }

  const saveMutation = useMutation({
    mutationFn: () => saveBackendPage({ ...form, id: editingId ?? undefined }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["backend-pages"] });
      queryClient.invalidateQueries({ queryKey: ["backend-page-options"] });
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save"))),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBackendPage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["backend-pages"] });
      queryClient.invalidateQueries({ queryKey: ["backend-page-options"] });
      setPendingDelete(null);
      toast.success(bi("تم الحذف", "Deleted successfully"));
    },
    // رسالة الباك اند هون مهمة نعرضها كما هي — بترجع "لهذه الصفحة صفحات
    // فرعية" لو المستخدم حاول يحذف صفحة عندها أبناء.
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete"))),
  });

  function openDialog(page: PageRow | null) {
    setEditingId(page?.id ?? null);
    setForm(
      page
        ? {
            name: page.name,
            name_en: page.name_en,
            link: page.link ?? "",
            icon: page.icon ?? "",
            in_menu: page.in_menu,
            is_active: page.is_active,
            is_ajax: page.is_ajax,
            parent_id: page.parent_id,
            module_id: page.module_id,
            category_id: page.category_id,
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  const modules = options?.modules ?? [];
  const categories = options?.categories ?? [];
  // صفحة ما تقدر تختار نفسها كأب — يمنع حلقة مباشرة بالشجرة.
  const parentOptionsForEditing = (options?.parents ?? []).filter((p) => p.id !== editingId);

  return (
    <div>
      <PageHeader title={bi("الصفحات", "Pages")} icon="FileText" />

      <div className="p-5">
        <Toolbar>
          <div className="relative min-w-56 flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={bi("بحث بالاسم أو الرابط", "Search by name or link")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ps-9"
            />
          </div>

          {can("admin_pages", "show_add_form") && (
            <Button className="ms-auto" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة صفحة", "Add page")}
            </Button>
          )}
        </Toolbar>
        <div
          className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground"
          aria-live="polite"
        >
          <span>
            {bi(
              `${filtered.length} نتيجة`,
              `${filtered.length} result${filtered.length === 1 ? "" : "s"}`,
            )}
          </span>
        </div>

        <div
          className="mt-4 overflow-x-auto rounded-2xl bg-card"
          role="region"
          aria-label={bi("قائمة الصفحات", "Pages list")}
        >
          {isLoading ? (
            <LoadingState label={bi("عم نحمّل الصفحات…", "Loading pages…")} />
          ) : isError ? (
            <ErrorState
              title={bi("تعذّر تحميل الصفحات", "Couldn't load pages")}
              action={
                <RetryButton
                  label={bi("إعادة المحاولة", "Try again")}
                  onClick={() =>
                    void queryClient.invalidateQueries({ queryKey: ["backend-pages"] })
                  }
                />
              }
            />
          ) : (
            <table className="w-full min-w-[900px] text-start text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="w-14 px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">{bi("الاسم", "Name")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("الرابط", "Link")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("الوحدة", "Module")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("الأب", "Parent")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("الحالة", "Status")}</th>
                  <th className="w-28 px-4 py-3 font-semibold">{bi("إجراءات", "Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {p.name}
                      <div className="text-xs font-normal text-muted-foreground">{p.name_en}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.link ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.module_name ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.parent_name ?? "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            p.is_active
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {p.is_active ? bi("نشطة", "Active") : bi("غير نشطة", "Inactive")}
                        </span>
                        {p.in_menu && (
                          <span className="rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">
                            {bi("بالقائمة", "In menu")}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {can("admin_pages", "edit") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title={bi("تعديل", "Edit")}
                            onClick={() => openDialog(p)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                        )}
                        {can("admin_pages", "delete") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title={bi("حذف", "Delete")}
                            className="text-destructive"
                            onClick={() => setPendingDelete(p)}
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
                    <td colSpan={7} className="p-8 text-center text-muted-foreground">
                      {search.trim()
                        ? bi("لا توجد نتائج مطابقة للبحث.", "No pages match your search.")
                        : bi("لا توجد صفحات بعد.", "No pages yet.")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId ? bi("تعديل صفحة", "Edit page") : bi("إضافة صفحة", "Add page")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="p-name">{bi("الاسم بالعربي", "Arabic name")}</Label>
              <Input
                id="p-name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-name-en">{bi("الاسم بالإنجليزي", "English name")}</Label>
              <Input
                id="p-name-en"
                value={form.name_en}
                onChange={(e) => setForm((f) => ({ ...f, name_en: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="p-link">{bi("الرابط (اختياري)", "Link (optional)")}</Label>
              <Input
                id="p-link"
                value={form.link}
                onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
                placeholder="/admin/example"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-icon">{bi("أيقونة (اختياري)", "Icon (optional)")}</Label>
              <Input
                id="p-icon"
                value={form.icon}
                onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                placeholder="lucide icon name"
              />
            </div>
            <div className="space-y-1.5">
              <Label>{bi("الفئة", "Category")}</Label>
              <Select
                value={form.category_id == null ? "none" : String(form.category_id)}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, category_id: v === "none" ? null : Number(v) }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={bi("اختر الفئة", "Select category")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none" disabled>
                    {bi("اختر الفئة", "Select category")}
                  </SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>{bi("الوحدة (اختياري)", "Module (optional)")}</Label>
              <Select
                value={form.module_id == null ? "none" : String(form.module_id)}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, module_id: v === "none" ? null : Number(v) }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={bi("بدون وحدة", "No module")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{bi("بدون وحدة", "No module")}</SelectItem>
                  {modules.map((m) => (
                    <SelectItem key={m.id} value={String(m.id)}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>{bi("الصفحة الأب (اختياري)", "Parent page (optional)")}</Label>
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
            <div className="flex items-center gap-3">
              <Switch
                checked={form.is_active}
                onCheckedChange={(v) => setForm((f) => ({ ...f, is_active: v }))}
                id="p-active"
              />
              <Label htmlFor="p-active">{bi("نشطة", "Active")}</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.in_menu}
                onCheckedChange={(v) => setForm((f) => ({ ...f, in_menu: v }))}
                id="p-in-menu"
              />
              <Label htmlFor="p-in-menu">{bi("تظهر بالقائمة الجانبية", "Show in sidebar")}</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.is_ajax}
                onCheckedChange={(v) => setForm((f) => ({ ...f, is_ajax: v }))}
                id="p-ajax"
              />
              <Label htmlFor="p-ajax">{bi("صفحة Ajax", "Ajax page")}</Label>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => {
                const error = validatePageForm();
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

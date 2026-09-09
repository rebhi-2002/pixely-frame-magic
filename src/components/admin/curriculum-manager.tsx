import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { PageHeader, Toolbar } from "@/components/admin/page-header";
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
  deleteCurriculumSubject,
  listCurriculumSubjects,
  saveCurriculumSubject,
} from "@/lib/admin-curriculum.functions";
import type { CurriculumSubjectRow } from "@/lib/admin-curriculum-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";

const EMPTY_FORM = { grade: "", group: "", subject: "", coursesCount: "" };

export function CurriculumPage() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listCurriculumSubjects);
  const persist = useServerFn(saveCurriculumSubject);
  const remove = useServerFn(deleteCurriculumSubject);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<CurriculumSubjectRow | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["curriculum-subjects"],
    queryFn: () => fetchRows(),
  });

  const filtered = useMemo(() => {
    return (rows ?? []).filter((r) => {
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (!`${r.grade} ${r.group} ${r.subject}`.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [rows, search]);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["curriculum-subjects"] });

  const saveMutation = useMutation({
    mutationFn: () =>
      persist({
        data: {
          id: editingId ?? undefined,
          grade: form.grade,
          group: form.group,
          subject: form.subject,
          coursesCount: Number(form.coursesCount) || 0,
        },
      }),
    onSuccess: () => {
      invalidate();
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save"))),
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

  function openDialog(row: CurriculumSubjectRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            grade: row.grade,
            group: row.group,
            subject: row.subject,
            coursesCount: String(row.coursesCount),
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <div>
      <PageHeader title={bi("المنهاج الأكاديمي", "Academic curriculum")} icon="BookMarked" />

      <div className="p-5">
        <Toolbar>
          <div className="relative min-w-56 flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={bi(
                "بحث بالصف أو المجموعة أو المادة",
                "Search by grade, group, or subject",
              )}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ps-9"
            />
          </div>
          {can("admin_curriculum", "show_add_form") && (
            <Button className="ms-auto" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة مادة", "Add subject")}
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
                  <th className="px-4 py-3 font-semibold">{bi("الصف", "Grade")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("المجموعة", "Group")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("المادة", "Subject")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("الكورسات", "Courses")}</th>
                  <th className="w-28 px-4 py-3 font-semibold">{bi("إجراءات", "Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 font-semibold text-foreground">{r.grade}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.group}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.subject}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.coursesCount}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {can("admin_curriculum", "edit") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title={bi("تعديل", "Edit")}
                            onClick={() => openDialog(r)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                        )}
                        {can("admin_curriculum", "delete") && (
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
              {editingId ? bi("تعديل مادة", "Edit subject") : bi("إضافة مادة", "Add subject")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="cur-grade">{bi("الصف", "Grade")}</Label>
              <Input
                id="cur-grade"
                value={form.grade}
                onChange={(e) => setForm((f) => ({ ...f, grade: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cur-group">{bi("المجموعة", "Group")}</Label>
              <Input
                id="cur-group"
                value={form.group}
                onChange={(e) => setForm((f) => ({ ...f, group: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cur-subject">{bi("المادة", "Subject")}</Label>
              <Input
                id="cur-subject"
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cur-count">{bi("عدد الكورسات", "Courses count")}</Label>
              <Input
                id="cur-count"
                type="number"
                min={0}
                value={form.coursesCount}
                onChange={(e) => setForm((f) => ({ ...f, coursesCount: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={
                saveMutation.isPending ||
                !form.grade.trim() ||
                !form.group.trim() ||
                !form.subject.trim()
              }
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
              {bi(`حذف «${pendingDelete?.subject}»؟`, `Delete "${pendingDelete?.subject}"?`)}
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

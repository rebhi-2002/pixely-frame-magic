import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { PageHeader, Toolbar } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { deleteCourse, listPublicCourses, saveCourse } from "@/lib/public-catalog.functions";
import type { PublicCourseRow } from "@/lib/public-catalog-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";

const EMPTY_FORM = {
  titleAr: "",
  titleEn: "",
  teacherAr: "",
  teacherEn: "",
  teacherId: "",
  subjectAr: "",
  subjectEn: "",
  levelAr: "",
  levelEn: "",
  lessons: "0",
  price: "0",
};

export function CourseCatalogPage() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listPublicCourses);
  const persist = useServerFn(saveCourse);
  const remove = useServerFn(deleteCourse);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<PublicCourseRow | null>(null);

  const { data: rows, isLoading } = useQuery({ queryKey: ["public-courses"], queryFn: () => fetchRows() });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["public-courses"] });

  const filtered = useMemo(() => {
    return (rows ?? []).filter((r) => {
      if (!search.trim()) return true;
      const q = search.trim().toLowerCase();
      return `${r.title[0]} ${r.title[1]} ${r.teacher[0]} ${r.teacher[1]}`.toLowerCase().includes(q);
    });
  }, [rows, search]);

  const saveMutation = useMutation({
    mutationFn: () =>
      persist({ data: { ...form, id: editingId ?? undefined, lessons: Number(form.lessons) || 0, price: Number(form.price) || 0 } }),
    onSuccess: () => {
      invalidate();
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : bi("تعذّر الحفظ", "Failed to save")),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      invalidate();
      setPendingDelete(null);
      toast.success(bi("تم الحذف", "Deleted successfully"));
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : bi("تعذّر الحذف", "Failed to delete")),
  });

  function openDialog(row: PublicCourseRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            titleAr: row.title[0],
            titleEn: row.title[1],
            teacherAr: row.teacher[0],
            teacherEn: row.teacher[1],
            teacherId: row.teacherId,
            subjectAr: row.subject[0],
            subjectEn: row.subject[1],
            levelAr: row.level[0],
            levelEn: row.level[1],
            lessons: String(row.lessons),
            price: String(row.price),
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <div>
      <PageHeader title={bi("كتالوج الكورسات العام", "Public course catalog")} icon="Store" />

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
          {can("admin_course_catalog", "show_add_form") && (
            <Button className="ms-auto" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة كورس", "Add course")}
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
                  <th className="px-4 py-3 font-semibold">{bi("الكورس", "Course")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("المعلم", "Teacher")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("المادة", "Subject")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("السعر", "Price")}</th>
                  <th className="w-28 px-4 py-3 font-semibold">{bi("إجراءات", "Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 font-semibold text-foreground">{bi(...r.title)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{bi(...r.teacher)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{bi(...r.subject)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.price === 0 ? bi("مجاني", "Free") : `${r.price} JOD`}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {can("admin_course_catalog", "edit") && (
                          <Button size="icon" variant="ghost" onClick={() => openDialog(r)}>
                            <Pencil className="size-4" />
                          </Button>
                        )}
                        {can("admin_course_catalog", "delete") && (
                          <Button size="icon" variant="ghost" className="text-destructive" onClick={() => setPendingDelete(r)}>
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
        <DialogContent className="max-h-[85vh] overflow-y-auto text-start">
          <DialogHeader>
            <DialogTitle>{editingId ? bi("تعديل كورس", "Edit course") : bi("إضافة كورس", "Add course")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="crs-title-ar">{bi("العنوان (عربي)", "Title (Arabic)")}</Label>
              <Input id="crs-title-ar" value={form.titleAr} onChange={(e) => setForm((f) => ({ ...f, titleAr: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-title-en">{bi("العنوان (إنجليزي)", "Title (English)")}</Label>
              <Input id="crs-title-en" value={form.titleEn} onChange={(e) => setForm((f) => ({ ...f, titleEn: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-teacher-ar">{bi("المعلم (عربي)", "Teacher (Arabic)")}</Label>
              <Input id="crs-teacher-ar" value={form.teacherAr} onChange={(e) => setForm((f) => ({ ...f, teacherAr: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-teacher-en">{bi("المعلم (إنجليزي)", "Teacher (English)")}</Label>
              <Input id="crs-teacher-en" value={form.teacherEn} onChange={(e) => setForm((f) => ({ ...f, teacherEn: e.target.value }))} />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="crs-teacher-id">{bi("معرّف صفحة المعلم", "Teacher page ID")}</Label>
              <Input id="crs-teacher-id" value={form.teacherId} onChange={(e) => setForm((f) => ({ ...f, teacherId: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-subject-ar">{bi("المادة (عربي)", "Subject (Arabic)")}</Label>
              <Input id="crs-subject-ar" value={form.subjectAr} onChange={(e) => setForm((f) => ({ ...f, subjectAr: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-subject-en">{bi("المادة (إنجليزي)", "Subject (English)")}</Label>
              <Input id="crs-subject-en" value={form.subjectEn} onChange={(e) => setForm((f) => ({ ...f, subjectEn: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-level-ar">{bi("المستوى (عربي)", "Level (Arabic)")}</Label>
              <Input id="crs-level-ar" value={form.levelAr} onChange={(e) => setForm((f) => ({ ...f, levelAr: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-level-en">{bi("المستوى (إنجليزي)", "Level (English)")}</Label>
              <Input id="crs-level-en" value={form.levelEn} onChange={(e) => setForm((f) => ({ ...f, levelEn: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-lessons">{bi("عدد الدروس", "Lessons count")}</Label>
              <Input
                id="crs-lessons"
                type="number"
                min={0}
                value={form.lessons}
                onChange={(e) => setForm((f) => ({ ...f, lessons: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-price">{bi("السعر (0 = مجاني)", "Price (0 = free)")}</Label>
              <Input
                id="crs-price"
                type="number"
                min={0}
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !form.titleAr.trim() || !form.titleEn.trim()}
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
            <AlertDialogTitle>{bi(`حذف «${pendingDelete?.title[0]}»؟`, `Delete "${pendingDelete?.title[1]}"?`)}</AlertDialogTitle>
            <AlertDialogDescription>{bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:justify-start">
            <AlertDialogAction onClick={() => pendingDelete && deleteMutation.mutate(pendingDelete.id)}>
              {bi("حذف", "Delete")}
            </AlertDialogAction>
            <AlertDialogCancel>{bi("إلغاء", "Cancel")}</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

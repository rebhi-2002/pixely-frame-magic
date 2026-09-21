import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
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
import { deleteCourse, listPublicCourses, saveCourse } from "@/lib/public-catalog.functions";
import {
  COURSE_FORMAT_LABELS,
  type CourseFormat,
  type PublicCourseRow,
} from "@/lib/public-catalog-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingState } from "@/components/app/feedback-states";

const EMPTY_FORM = {
  titleAr: "",
  titleEn: "",
  descriptionAr: "",
  descriptionEn: "",
  teacherAr: "",
  teacherEn: "",
  teacherId: "",
  subjectAr: "",
  subjectEn: "",
  levelAr: "",
  levelEn: "",
  format: "live_online" as CourseFormat,
  lessons: "0",
  price: "0",
  // اختيارية بقصد — فاضية = محبوسة من العرض بالبطاقة تلقائياً حتى تتوفر
  // بيانات حقيقية (راجع تعليق الشرح داخل courses.tsx وpublic-catalog-data.ts).
  rating: "",
  studentsCount: "",
  durationHours: "",
  tagsAr: "",
  tagsEn: "",
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

  const { data: rows, isLoading } = useQuery({
    queryKey: ["public-courses"],
    queryFn: () => fetchRows(),
  });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["public-courses"] });

  const filtered = useMemo(() => {
    return (rows ?? []).filter((r) => {
      if (!search.trim()) return true;
      const q = search.trim().toLowerCase();
      return `${r.title[0]} ${r.title[1]} ${r.teacher[0]} ${r.teacher[1]}`
        .toLowerCase()
        .includes(q);
    });
  }, [rows, search]);

  const saveMutation = useMutation({
    mutationFn: () =>
      persist({
        data: {
          ...form,
          id: editingId ?? undefined,
          lessons: Number(form.lessons) || 0,
          price: Number(form.price) || 0,
          rating: form.rating.trim() ? Number(form.rating) : undefined,
          studentsCount: form.studentsCount.trim() ? Number(form.studentsCount) : undefined,
          durationHours: form.durationHours.trim() ? Number(form.durationHours) : undefined,
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

  function openDialog(row: PublicCourseRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            titleAr: row.title[0],
            titleEn: row.title[1],
            descriptionAr: row.description[0],
            descriptionEn: row.description[1],
            teacherAr: row.teacher[0],
            teacherEn: row.teacher[1],
            teacherId: row.teacherId,
            subjectAr: row.subject[0],
            subjectEn: row.subject[1],
            levelAr: row.level[0],
            levelEn: row.level[1],
            format: row.format,
            lessons: String(row.lessons),
            price: String(row.price),
            rating: row.rating != null ? String(row.rating) : "",
            studentsCount: row.studentsCount != null ? String(row.studentsCount) : "",
            durationHours: row.durationHours != null ? String(row.durationHours) : "",
            tagsAr: row.tags?.map((t) => t[0]).join(", ") ?? "",
            tagsEn: row.tags?.map((t) => t[1]).join(", ") ?? "",
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

        <div
          className="mt-4 overflow-x-auto rounded-2xl bg-card"
          role="region"
          aria-label={bi("كتالوج الكورسات", "Course catalog")}
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
                  <th className="px-4 py-3 font-semibold">{bi("الكورس", "Course")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("المعلم", "Teacher")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("المادة", "Subject")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("الصيغة", "Format")}</th>
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
                    <td className="px-4 py-3 text-muted-foreground">
                      {bi(...COURSE_FORMAT_LABELS[r.format])}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {r.price === 0 ? bi("مجاني", "Free") : `${r.price} JOD`}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {can("admin_course_catalog", "edit") && (
                          <Button size="icon" variant="ghost" onClick={() => openDialog(r)}>
                            <Pencil className="size-4" />
                          </Button>
                        )}
                        {can("admin_course_catalog", "delete") && (
                          <Button
                            size="icon"
                            variant="ghost"
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
        <DialogContent className="max-h-[85vh] overflow-y-auto text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId ? bi("تعديل كورس", "Edit course") : bi("إضافة كورس", "Add course")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="crs-title-ar">{bi("العنوان (عربي)", "Title (Arabic)")}</Label>
              <Input
                id="crs-title-ar"
                value={form.titleAr}
                onChange={(e) => setForm((f) => ({ ...f, titleAr: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-title-en">{bi("العنوان (إنجليزي)", "Title (English)")}</Label>
              <Input
                id="crs-title-en"
                value={form.titleEn}
                onChange={(e) => setForm((f) => ({ ...f, titleEn: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="crs-desc-ar">
                {bi("وصف قصير (عربي)", "Short description (Arabic)")}
              </Label>
              <Input
                id="crs-desc-ar"
                value={form.descriptionAr}
                onChange={(e) => setForm((f) => ({ ...f, descriptionAr: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="crs-desc-en">
                {bi("وصف قصير (إنجليزي)", "Short description (English)")}
              </Label>
              <Input
                id="crs-desc-en"
                value={form.descriptionEn}
                onChange={(e) => setForm((f) => ({ ...f, descriptionEn: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-teacher-ar">{bi("المعلم (عربي)", "Teacher (Arabic)")}</Label>
              <Input
                id="crs-teacher-ar"
                value={form.teacherAr}
                onChange={(e) => setForm((f) => ({ ...f, teacherAr: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-teacher-en">{bi("المعلم (إنجليزي)", "Teacher (English)")}</Label>
              <Input
                id="crs-teacher-en"
                value={form.teacherEn}
                onChange={(e) => setForm((f) => ({ ...f, teacherEn: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="crs-teacher-id">{bi("معرّف صفحة المعلم", "Teacher page ID")}</Label>
              <Input
                id="crs-teacher-id"
                value={form.teacherId}
                onChange={(e) => setForm((f) => ({ ...f, teacherId: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-subject-ar">{bi("المادة (عربي)", "Subject (Arabic)")}</Label>
              <Input
                id="crs-subject-ar"
                value={form.subjectAr}
                onChange={(e) => setForm((f) => ({ ...f, subjectAr: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-subject-en">{bi("المادة (إنجليزي)", "Subject (English)")}</Label>
              <Input
                id="crs-subject-en"
                value={form.subjectEn}
                onChange={(e) => setForm((f) => ({ ...f, subjectEn: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-level-ar">{bi("المستوى (عربي)", "Level (Arabic)")}</Label>
              <Input
                id="crs-level-ar"
                value={form.levelAr}
                onChange={(e) => setForm((f) => ({ ...f, levelAr: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-level-en">{bi("المستوى (إنجليزي)", "Level (English)")}</Label>
              <Input
                id="crs-level-en"
                value={form.levelEn}
                onChange={(e) => setForm((f) => ({ ...f, levelEn: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-format">{bi("صيغة الكورس", "Course format")}</Label>
              <Select
                value={form.format}
                onValueChange={(v: CourseFormat) => setForm((f) => ({ ...f, format: v }))}
              >
                <SelectTrigger id="crs-format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(COURSE_FORMAT_LABELS) as CourseFormat[]).map((key) => (
                    <SelectItem key={key} value={key}>
                      {bi(...COURSE_FORMAT_LABELS[key])}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

            <div className="sm:col-span-2">
              <p className="text-xs font-semibold text-muted-foreground">
                {bi(
                  "الحقول تحت اختيارية — خليها فاضية لحد ما يصير عندك رقم حقيقي، وما بتظهر بالبطاقة أبداً وهي فاضية.",
                  "Fields below are optional — leave empty until you have a real number; they never show on the card while empty.",
                )}
              </p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-rating">{bi("تقييم (من 5)", "Rating (out of 5)")}</Label>
              <Input
                id="crs-rating"
                type="number"
                min={0}
                max={5}
                step={0.1}
                placeholder={bi("فاضي = ما يظهر", "Empty = hidden")}
                value={form.rating}
                onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-students">
                {bi("عدد الطلاب المشتركين", "Enrolled students")}
              </Label>
              <Input
                id="crs-students"
                type="number"
                min={0}
                placeholder={bi("فاضي = ما يظهر", "Empty = hidden")}
                value={form.studentsCount}
                onChange={(e) => setForm((f) => ({ ...f, studentsCount: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-duration">{bi("مدة الكورس (ساعة)", "Duration (hours)")}</Label>
              <Input
                id="crs-duration"
                type="number"
                min={0}
                placeholder={bi("فاضي = ما يظهر", "Empty = hidden")}
                value={form.durationHours}
                onChange={(e) => setForm((f) => ({ ...f, durationHours: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-tags-ar">{bi("وسوم (عربي)", "Tags (Arabic)")}</Label>
              <Input
                id="crs-tags-ar"
                placeholder={bi("مراجعة نهائية، أسئلة وزارية", "comma, separated")}
                value={form.tagsAr}
                onChange={(e) => setForm((f) => ({ ...f, tagsAr: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-tags-en">{bi("وسوم (إنجليزي)", "Tags (English)")}</Label>
              <Input
                id="crs-tags-en"
                placeholder={bi("بنفس ترتيب وعدد الوسوم العربي", "Same order & count as Arabic")}
                value={form.tagsEn}
                onChange={(e) => setForm((f) => ({ ...f, tagsEn: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={
                saveMutation.isPending ||
                !form.titleAr.trim() ||
                !form.titleEn.trim() ||
                !form.descriptionAr.trim() ||
                !form.descriptionEn.trim()
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
              {bi(`حذف «${pendingDelete?.title[0]}»؟`, `Delete "${pendingDelete?.title[1]}"?`)}
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

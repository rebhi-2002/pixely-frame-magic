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
  deleteTeacherCourse,
  listTeacherCourses,
  saveTeacherCourse,
} from "@/lib/teacher-teaching.functions";
import type { TeacherCourseRow, TeacherCourseStatus } from "@/lib/teacher-teaching-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";

const title = "كورساتي (معلم) | أكاديميا";
const description = "كورساتك المنشورة: الأسعار، المشتركون، والحصص القادمة.";

export const Route = createFileRoute("/_authenticated/teacher/courses")({
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
    <Guard pageKey="teacher_courses">
      <Body />
    </Guard>
  );
}

const EMPTY_FORM = {
  title: "",
  price: "0",
  enrolledCount: "0",
  status: "مسوّدة" as TeacherCourseStatus,
};

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listTeacherCourses);
  const persist = useServerFn(saveTeacherCourse);
  const remove = useServerFn(deleteTeacherCourse);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<TeacherCourseRow | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["teacher-courses"],
    queryFn: () => fetchRows(),
  });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["teacher-courses"] });

  const list = rows ?? [];
  const stats = useMemo(() => {
    const published = list.filter((r) => r.status === "منشور");
    const enrolled = list.reduce((s, r) => s + r.enrolledCount, 0);
    const revenue = list.reduce((s, r) => s + r.price * r.enrolledCount, 0);
    return { published: published.length, enrolled, revenue };
  }, [list]);

  const saveMutation = useMutation({
    mutationFn: () =>
      persist({
        data: {
          ...form,
          id: editingId ?? undefined,
          price: Number(form.price) || 0,
          enrolledCount: Number(form.enrolledCount) || 0,
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

  function openDialog(row: TeacherCourseRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            title: row.title,
            price: String(row.price),
            enrolledCount: String(row.enrolledCount),
            status: row.status,
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <AppPage
      title={bi("كورساتي (معلم)", "My courses (teacher)")}
      icon="BookOpenCheck"
      subtitle={bi(
        description,
        "Your published courses: pricing, enrollments and upcoming sessions.",
      )}
    >
      <StatGrid
        items={[
          {
            icon: "BookOpenCheck",
            label: bi("كورسات منشورة", "Published"),
            value: String(stats.published),
          },
          { icon: "Users", label: bi("مشتركون", "Enrollments"), value: String(stats.enrolled) },
          { icon: "Star", label: bi("التقييم", "Rating"), value: "4.8" },
          {
            icon: "Wallet",
            label: bi("إيراد الشهر", "Monthly revenue"),
            value: bi(`${stats.revenue} ₪`, `${stats.revenue} ILS`),
          },
        ]}
      />

      <Panel
        title={bi("كورساتك", "Your courses")}
        icon="BookOpenCheck"
        action={
          can("teacher_courses", "show_add_form") ? (
            <Button size="sm" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة كورس", "Add course")}
            </Button>
          ) : undefined
        }
      >
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="size-5 animate-spin text-primary" />
          </div>
        ) : list.length ? (
          <DataTable
            head={[
              bi("الكورس", "Course"),
              bi("السعر", "Price"),
              bi("مشتركون", "Enrolled"),
              bi("الحالة", "Status"),
              bi("", ""),
            ]}
            rows={list.map((r) => [
              r.title,
              r.price === 0 ? bi("مجاني", "Free") : bi(`${r.price} ₪`, `${r.price} ILS`),
              String(r.enrolledCount),
              <Badge key={r.id} tone={r.status === "منشور" ? "success" : "primary"}>
                {bi(r.status, r.status === "منشور" ? "Published" : "Draft")}
              </Badge>,
              <div key={`${r.id}-actions`} className="flex items-center justify-end gap-1">
                {can("teacher_courses", "edit") && (
                  <Button size="icon" variant="ghost" onClick={() => openDialog(r)}>
                    <Pencil className="size-4" />
                  </Button>
                )}
                {can("teacher_courses", "delete") && (
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
          <EmptyState icon="BookOpenCheck" text={bi("لا كورسات بعد.", "No courses yet.")} />
        )}
      </Panel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId ? bi("تعديل كورس", "Edit course") : bi("إضافة كورس", "Add course")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="tc-title">{bi("اسم الكورس", "Course title")}</Label>
              <Input
                id="tc-title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tc-price">{bi("السعر (₪)", "Price (ILS)")}</Label>
              <Input
                id="tc-price"
                type="number"
                min={0}
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tc-enrolled">{bi("عدد المشتركين", "Enrolled count")}</Label>
              <Input
                id="tc-enrolled"
                type="number"
                min={0}
                value={form.enrolledCount}
                onChange={(e) => setForm((f) => ({ ...f, enrolledCount: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>{bi("الحالة", "Status")}</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as TeacherCourseStatus }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="مسوّدة">{bi("مسوّدة", "Draft")}</SelectItem>
                  <SelectItem value="منشور">{bi("منشور", "Published")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !form.title.trim()}
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
    </AppPage>
  );
}

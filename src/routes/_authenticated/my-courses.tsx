import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { AppPage, StatGrid, Panel, RowList, EmptyState } from "@/components/app/kit";
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
  deleteEnrollment,
  listEnrollments,
  saveEnrollment,
} from "@/lib/student-learning.functions";
import type { EnrollmentRow, EnrollmentStatus } from "@/lib/student-learning-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";

const title = "كورساتي | أكاديميا";
const description = "الكورسات التي اشتركت فيها فعلياً — تقدّمك، الحصة القادمة، وشهادة الإتمام.";

export const Route = createFileRoute("/_authenticated/my-courses")({
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
    <Guard pageKey="student_my_courses">
      <Body />
    </Guard>
  );
}

const EMPTY_FORM = {
  courseTitle: "",
  teacherName: "",
  progressPercent: "0",
  nextSessionLabel: "",
  status: "قيد الدراسة" as EnrollmentStatus,
};

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listEnrollments);
  const persist = useServerFn(saveEnrollment);
  const remove = useServerFn(deleteEnrollment);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<EnrollmentRow | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["enrollments"],
    queryFn: () => fetchRows(),
  });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["enrollments"] });

  const active = useMemo(() => (rows ?? []).filter((r) => r.status === "قيد الدراسة"), [rows]);
  const completed = useMemo(() => (rows ?? []).filter((r) => r.status === "مكتمل"), [rows]);
  const watchHours = useMemo(
    () => Math.round((rows ?? []).reduce((sum, r) => sum + r.progressPercent, 0) / 10),
    [rows],
  );

  const saveMutation = useMutation({
    mutationFn: () =>
      persist({
        data: {
          ...form,
          id: editingId ?? undefined,
          progressPercent: Number(form.progressPercent) || 0,
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
      toast.success(bi("تمت الإزالة من قائمتك", "Removed from your list"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete"))),
  });

  function openDialog(row: EnrollmentRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            courseTitle: row.courseTitle,
            teacherName: row.teacherName,
            progressPercent: String(row.progressPercent),
            nextSessionLabel: row.nextSessionLabel,
            status: row.status,
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <AppPage
      title={bi("كورساتي", "My courses")}
      icon="BookOpenCheck"
      subtitle={bi(
        description,
        "Courses you actually enrolled in — progress, next session and completion certificate.",
      )}
    >
      <StatGrid
        items={[
          {
            icon: "BookOpenCheck",
            label: bi("كورسات نشطة", "Active courses"),
            value: String(active.length),
          },
          {
            icon: "CheckCircle2",
            label: bi("مكتملة", "Completed"),
            value: String(completed.length),
          },
          { icon: "Timer", label: bi("ساعات مشاهدة", "Watch hours"), value: String(watchHours) },
          { icon: "Award", label: bi("شهادات", "Certificates"), value: String(completed.length) },
        ]}
      />

      <Panel
        title={bi("كورساتك النشطة", "Active courses")}
        icon="BookOpenCheck"
        action={
          can("student_my_courses", "show_add_form") ? (
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
        ) : active.length ? (
          <RowList
            rows={active.map((r) => ({
              title: r.courseTitle + (r.teacherName ? ` — ${r.teacherName}` : ""),
              meta: r.nextSessionLabel,
              value: `${r.progressPercent}%`,
              tone: "primary" as const,
              actions: (
                <div className="flex items-center gap-1">
                  {can("student_my_courses", "edit") && (
                    <Button size="icon" variant="ghost" onClick={() => openDialog(r)}>
                      <Pencil className="size-4" />
                    </Button>
                  )}
                  {can("student_my_courses", "delete") && (
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
              ),
            }))}
          />
        ) : (
          <EmptyState
            icon="BookOpenCheck"
            text={bi(
              "ما في كورسات نشطة — ابدأ بإضافة أول كورس لك.",
              "No active courses — start by adding your first one.",
            )}
          />
        )}
      </Panel>

      <Panel title={bi("كورسات أكملتها", "Completed")} icon="CheckCircle2">
        {completed.length ? (
          <RowList
            to="/my-certificates"
            rows={completed.map((r) => ({
              title: r.courseTitle,
              meta: r.teacherName,
              value: bi("شهادة", "Certificate"),
              tone: "success" as const,
            }))}
          />
        ) : (
          <EmptyState
            icon="Award"
            text={bi(
              "ولا كورس مكتمل بعد — كمّل أول كورس عشان تحصل شهادتك.",
              "No completed courses yet — finish your first one to earn a certificate.",
            )}
          />
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
              <Label htmlFor="enr-title">{bi("اسم الكورس", "Course title")}</Label>
              <Input
                id="enr-title"
                value={form.courseTitle}
                onChange={(e) => setForm((f) => ({ ...f, courseTitle: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="enr-teacher">{bi("المعلم", "Teacher")}</Label>
              <Input
                id="enr-teacher"
                value={form.teacherName}
                onChange={(e) => setForm((f) => ({ ...f, teacherName: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="enr-progress">{bi("نسبة الإنجاز (%)", "Progress (%)")}</Label>
              <Input
                id="enr-progress"
                type="number"
                min={0}
                max={100}
                value={form.progressPercent}
                onChange={(e) => setForm((f) => ({ ...f, progressPercent: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="enr-next">{bi("الحصة القادمة", "Next session")}</Label>
              <Input
                id="enr-next"
                value={form.nextSessionLabel}
                onChange={(e) => setForm((f) => ({ ...f, nextSessionLabel: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{bi("الحالة", "Status")}</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as EnrollmentStatus }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="قيد الدراسة">{bi("قيد الدراسة", "In progress")}</SelectItem>
                  <SelectItem value="مكتمل">{bi("مكتمل", "Completed")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !form.courseTitle.trim()}
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
              {bi(
                `إزالة «${pendingDelete?.courseTitle}»؟`,
                `Remove "${pendingDelete?.courseTitle}"?`,
              )}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:justify-start">
            <AlertDialogAction
              onClick={() => pendingDelete && deleteMutation.mutate(pendingDelete.id)}
            >
              {bi("إزالة", "Remove")}
            </AlertDialogAction>
            <AlertDialogCancel>{bi("إلغاء", "Cancel")}</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppPage>
  );
}

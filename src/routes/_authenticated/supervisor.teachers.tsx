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
  deleteTeacherPerformance,
  listTeacherPerformance,
  saveTeacherPerformance,
} from "@/lib/supervisor-oversight.functions";
import type { TeacherPerfStatus, TeacherPerformanceRow } from "@/lib/supervisor-oversight-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";

const title = "المعلمون | أكاديميا";
const description = "أداء كل معلم: سرعة الرد، زمن التصحيح، وإتقان طلابه.";

export const Route = createFileRoute("/_authenticated/supervisor/teachers")({
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
    <Guard pageKey="supervisor_teachers">
      <Body />
    </Guard>
  );
}

const EMPTY_FORM = {
  teacherName: "",
  subjectName: "",
  studentsCount: "0",
  responseHours: "0",
  gradingDays: "0",
  rating: "5",
  status: "جيد" as TeacherPerfStatus,
};

const STATUS_TONE: Record<TeacherPerfStatus, "success" | "primary" | "danger"> = {
  ممتاز: "success",
  جيد: "primary",
  "تأخر تصحيح": "danger",
};

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listTeacherPerformance);
  const persist = useServerFn(saveTeacherPerformance);
  const remove = useServerFn(deleteTeacherPerformance);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<TeacherPerformanceRow | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["teacher-performance"],
    queryFn: () => fetchRows(),
  });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["teacher-performance"] });

  const list = rows ?? [];
  const stats = useMemo(() => {
    if (!list.length) return { active: 0, avgResponse: 0, avgGrading: 0, avgRating: 0 };
    return {
      active: list.length,
      avgResponse: Math.round(list.reduce((s, r) => s + r.responseHours, 0) / list.length),
      avgGrading: Math.round((list.reduce((s, r) => s + r.gradingDays, 0) / list.length) * 10) / 10,
      avgRating: Math.round((list.reduce((s, r) => s + r.rating, 0) / list.length) * 10) / 10,
    };
  }, [list]);

  const saveMutation = useMutation({
    mutationFn: () =>
      persist({
        data: {
          ...form,
          id: editingId ?? undefined,
          studentsCount: Number(form.studentsCount) || 0,
          responseHours: Number(form.responseHours) || 0,
          gradingDays: Number(form.gradingDays) || 0,
          rating: Number(form.rating) || 0,
        },
      }),
    onSuccess: () => {
      invalidate();
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) =>
      toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save"))),
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

  function openDialog(row: TeacherPerformanceRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            teacherName: row.teacherName,
            subjectName: row.subjectName,
            studentsCount: String(row.studentsCount),
            responseHours: String(row.responseHours),
            gradingDays: String(row.gradingDays),
            rating: String(row.rating),
            status: row.status,
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <AppPage
      title={bi("المعلمون", "Teachers")}
      icon="Presentation"
      subtitle={bi(
        description,
        "Per-teacher performance: response time, grading speed and student mastery.",
      )}
    >
      <StatGrid
        items={[
          {
            icon: "Presentation",
            label: bi("معلمون نشطون", "Active teachers"),
            value: String(stats.active),
          },
          {
            icon: "Clock",
            label: bi("متوسط زمن الرد", "Avg. response"),
            value: bi(`${stats.avgResponse} س`, `${stats.avgResponse}h`),
          },
          {
            icon: "PenSquare",
            label: bi("متوسط زمن التصحيح", "Avg. grading"),
            value: bi(`${stats.avgGrading} يوم`, `${stats.avgGrading}d`),
          },
          {
            icon: "Star",
            label: bi("متوسط التقييم", "Avg. rating"),
            value: String(stats.avgRating),
          },
        ]}
      />

      <Panel
        title={bi("قائمة المعلمين", "Teacher list")}
        icon="Presentation"
        action={
          can("supervisor_teachers", "show_add_form") ? (
            <Button size="sm" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة معلم", "Add teacher")}
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
              bi("المعلم", "Teacher"),
              bi("المادة", "Subject"),
              bi("طلاب", "Students"),
              bi("الحالة", "Status"),
              bi("", ""),
            ]}
            rows={list.map((r) => [
              r.teacherName,
              r.subjectName,
              String(r.studentsCount),
              <Badge key={r.id} tone={STATUS_TONE[r.status]}>
                {bi(
                  r.status,
                  r.status === "ممتاز"
                    ? "Excellent"
                    : r.status === "جيد"
                      ? "Good"
                      : "Grading delay",
                )}
              </Badge>,
              <div key={`${r.id}-actions`} className="flex items-center justify-end gap-1">
                {can("supervisor_teachers", "edit") && (
                  <Button size="icon" variant="ghost" onClick={() => openDialog(r)}>
                    <Pencil className="size-4" />
                  </Button>
                )}
                {can("supervisor_teachers", "delete") && (
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
          <EmptyState icon="Presentation" text={bi("لا معلمون بعد.", "No teachers yet.")} />
        )}
      </Panel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId ? bi("تعديل معلم", "Edit teacher") : bi("إضافة معلم", "Add teacher")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="tp-name">{bi("اسم المعلم", "Teacher name")}</Label>
              <Input
                id="tp-name"
                value={form.teacherName}
                onChange={(e) => setForm((f) => ({ ...f, teacherName: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tp-subject">{bi("المادة", "Subject")}</Label>
              <Input
                id="tp-subject"
                value={form.subjectName}
                onChange={(e) => setForm((f) => ({ ...f, subjectName: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tp-students">{bi("عدد الطلاب", "Students")}</Label>
              <Input
                id="tp-students"
                type="number"
                min={0}
                value={form.studentsCount}
                onChange={(e) => setForm((f) => ({ ...f, studentsCount: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{bi("الحالة", "Status")}</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as TeacherPerfStatus }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ممتاز">{bi("ممتاز", "Excellent")}</SelectItem>
                  <SelectItem value="جيد">{bi("جيد", "Good")}</SelectItem>
                  <SelectItem value="تأخر تصحيح">{bi("تأخر تصحيح", "Grading delay")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tp-response">{bi("زمن الرد (ساعات)", "Response (hours)")}</Label>
              <Input
                id="tp-response"
                type="number"
                min={0}
                value={form.responseHours}
                onChange={(e) => setForm((f) => ({ ...f, responseHours: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tp-grading">{bi("زمن التصحيح (أيام)", "Grading (days)")}</Label>
              <Input
                id="tp-grading"
                type="number"
                min={0}
                step="0.1"
                value={form.gradingDays}
                onChange={(e) => setForm((f) => ({ ...f, gradingDays: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="tp-rating">{bi("التقييم (من 5)", "Rating (out of 5)")}</Label>
              <Input
                id="tp-rating"
                type="number"
                min={0}
                max={5}
                step="0.1"
                value={form.rating}
                onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !form.teacherName.trim()}
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
                `حذف «${pendingDelete?.teacherName}»؟`,
                `Delete "${pendingDelete?.teacherName}"?`,
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
              {bi("حذف", "Delete")}
            </AlertDialogAction>
            <AlertDialogCancel>{bi("إلغاء", "Cancel")}</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppPage>
  );
}

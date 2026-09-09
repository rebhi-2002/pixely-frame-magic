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
  deleteLibrarySubject,
  listLibrarySubjects,
  saveLibrarySubject,
} from "@/lib/student-learning.functions";
import type { LibrarySubjectRow } from "@/lib/student-learning-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";

const title = "المكتبة | أكاديميا";
const description = "مكتبة مرتّبة: فصل ← مادة ← وحدة ← درس، لتتابع تقدّمك بكل مادة بمكان واحد.";

export const Route = createFileRoute("/_authenticated/library")({
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
    <Guard pageKey="student_library">
      <Body />
    </Guard>
  );
}

const EMPTY_FORM = {
  subjectName: "",
  termLabel: "الفصل الأول",
  unitsCount: "0",
  lessonsCount: "0",
  progressPercent: "0",
};

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listLibrarySubjects);
  const persist = useServerFn(saveLibrarySubject);
  const remove = useServerFn(deleteLibrarySubject);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<LibrarySubjectRow | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["library-subjects"],
    queryFn: () => fetchRows(),
  });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["library-subjects"] });

  const stats = useMemo(() => {
    const list = rows ?? [];
    const units = list.reduce((s, r) => s + r.unitsCount, 0);
    const lessons = list.reduce((s, r) => s + r.lessonsCount, 0);
    const completedLessons = Math.round(
      list.reduce((s, r) => s + (r.lessonsCount * r.progressPercent) / 100, 0),
    );
    return { subjects: list.length, units, lessons, completedLessons };
  }, [rows]);

  const continueList = useMemo(
    () => (rows ?? []).filter((r) => r.progressPercent > 0 && r.progressPercent < 100),
    [rows],
  );

  const saveMutation = useMutation({
    mutationFn: () =>
      persist({
        data: {
          ...form,
          id: editingId ?? undefined,
          unitsCount: Number(form.unitsCount) || 0,
          lessonsCount: Number(form.lessonsCount) || 0,
          progressPercent: Number(form.progressPercent) || 0,
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

  function openDialog(row: LibrarySubjectRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            subjectName: row.subjectName,
            termLabel: row.termLabel,
            unitsCount: String(row.unitsCount),
            lessonsCount: String(row.lessonsCount),
            progressPercent: String(row.progressPercent),
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <AppPage
      title={bi("المكتبة", "Library")}
      icon="Library"
      subtitle={bi(
        description,
        "A tidy library: term → subject → unit → lesson, so you can track every subject in one place.",
      )}
    >
      <StatGrid
        items={[
          { icon: "Book", label: bi("مواد", "Subjects"), value: String(stats.subjects) },
          { icon: "Layers", label: bi("وحدات", "Units"), value: String(stats.units) },
          { icon: "FileText", label: bi("دروس", "Lessons"), value: String(stats.lessons) },
          {
            icon: "CheckCircle2",
            label: bi("دروس مكتملة", "Completed"),
            value: String(stats.completedLessons),
          },
        ]}
      />

      <Panel
        title={bi("موادك", "Your subjects")}
        icon="Book"
        action={
          can("student_library", "show_add_form") ? (
            <Button size="sm" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة مادة", "Add subject")}
            </Button>
          ) : undefined
        }
      >
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="size-5 animate-spin text-primary" />
          </div>
        ) : rows?.length ? (
          <RowList
            rows={rows.map((r) => ({
              title: `${r.subjectName} — ${r.termLabel}`,
              meta: bi(
                `${r.unitsCount} وحدات · ${r.lessonsCount} درساً`,
                `${r.unitsCount} units · ${r.lessonsCount} lessons`,
              ),
              value: `${r.progressPercent}%`,
              tone:
                r.progressPercent >= 80
                  ? ("success" as const)
                  : r.progressPercent >= 40
                    ? ("primary" as const)
                    : ("muted" as const),
              actions: (
                <div className="flex items-center gap-1">
                  {can("student_library", "edit") && (
                    <Button size="icon" variant="ghost" onClick={() => openDialog(r)}>
                      <Pencil className="size-4" />
                    </Button>
                  )}
                  {can("student_library", "delete") && (
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
          <EmptyState icon="Book" text={bi("لا مواد بعد.", "No subjects yet.")} />
        )}
      </Panel>

      <Panel title={bi("أكمل من حيث توقفت", "Continue where you left off")} icon="History">
        {continueList.length ? (
          <RowList
            to="/library/lesson/1"
            rows={continueList.map((r) => ({
              title: r.subjectName,
              meta: r.termLabel,
              value: bi("متابعة", "Resume"),
              tone: "primary" as const,
            }))}
          />
        ) : (
          <EmptyState
            icon="History"
            text={bi("لا شي بانتظار المتابعة الآن.", "Nothing to resume right now.")}
          />
        )}
      </Panel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId ? bi("تعديل مادة", "Edit subject") : bi("إضافة مادة", "Add subject")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="lib-subject">{bi("اسم المادة", "Subject name")}</Label>
              <Input
                id="lib-subject"
                value={form.subjectName}
                onChange={(e) => setForm((f) => ({ ...f, subjectName: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lib-term">{bi("الفصل", "Term")}</Label>
              <Input
                id="lib-term"
                value={form.termLabel}
                onChange={(e) => setForm((f) => ({ ...f, termLabel: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lib-progress">{bi("نسبة الإنجاز (%)", "Progress (%)")}</Label>
              <Input
                id="lib-progress"
                type="number"
                min={0}
                max={100}
                value={form.progressPercent}
                onChange={(e) => setForm((f) => ({ ...f, progressPercent: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lib-units">{bi("عدد الوحدات", "Units count")}</Label>
              <Input
                id="lib-units"
                type="number"
                min={0}
                value={form.unitsCount}
                onChange={(e) => setForm((f) => ({ ...f, unitsCount: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lib-lessons">{bi("عدد الدروس", "Lessons count")}</Label>
              <Input
                id="lib-lessons"
                type="number"
                min={0}
                value={form.lessonsCount}
                onChange={(e) => setForm((f) => ({ ...f, lessonsCount: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !form.subjectName.trim()}
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
                `حذف «${pendingDelete?.subjectName}»؟`,
                `Delete "${pendingDelete?.subjectName}"?`,
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

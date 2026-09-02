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
import { deleteQuizItem, listQuizItems, saveQuizItem } from "@/lib/teacher-teaching.functions";
import type { QuizItemRow, QuizStatus } from "@/lib/teacher-teaching-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";

const title = "الاختبارات | أكاديميا";
const description = "بنك أسئلتك واختباراتك: اختيار متعدد، صح/خطأ، ومقالي — مع تصحيح آلي حيث ينفع.";

export const Route = createFileRoute("/_authenticated/teacher/quizzes")({
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
    <Guard pageKey="teacher_quizzes">
      <Body />
    </Guard>
  );
}

const EMPTY_FORM = {
  title: "",
  questionsCount: "10",
  attemptsCount: "0",
  avgScore: "0",
  status: "مسوّدة" as QuizStatus,
};

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listQuizItems);
  const persist = useServerFn(saveQuizItem);
  const remove = useServerFn(deleteQuizItem);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<QuizItemRow | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["teacher-quizzes"],
    queryFn: () => fetchRows(),
  });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["teacher-quizzes"] });

  const list = rows ?? [];
  const stats = useMemo(() => {
    const totalQuestions = list.reduce((s, r) => s + r.questionsCount, 0);
    const totalAttempts = list.reduce((s, r) => s + r.attemptsCount, 0);
    const scored = list.filter((r) => r.attemptsCount > 0);
    const avg = scored.length
      ? Math.round(scored.reduce((s, r) => s + r.avgScore, 0) / scored.length)
      : 0;
    return { quizzes: list.length, totalQuestions, totalAttempts, avg };
  }, [list]);

  const saveMutation = useMutation({
    mutationFn: () =>
      persist({
        data: {
          ...form,
          id: editingId ?? undefined,
          questionsCount: Number(form.questionsCount) || 1,
          attemptsCount: Number(form.attemptsCount) || 0,
          avgScore: Number(form.avgScore) || 0,
        },
      }),
    onSuccess: () => {
      invalidate();
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : bi("تعذّر الحفظ", "Failed to save")),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      invalidate();
      setPendingDelete(null);
      toast.success(bi("تم الحذف", "Deleted successfully"));
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : bi("تعذّر الحذف", "Failed to delete")),
  });

  function openDialog(row: QuizItemRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            title: row.title,
            questionsCount: String(row.questionsCount),
            attemptsCount: String(row.attemptsCount),
            avgScore: String(row.avgScore),
            status: row.status,
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <AppPage
      title={bi("الاختبارات", "Quizzes")}
      icon="ListChecks"
      subtitle={bi(
        description,
        "Your question bank and quizzes: MCQ, true/false and essay — auto-graded where possible.",
      )}
    >
      <StatGrid
        items={[
          { icon: "ListChecks", label: bi("اختبارات", "Quizzes"), value: String(stats.quizzes) },
          {
            icon: "HelpCircle",
            label: bi("أسئلة في البنك", "Questions in bank"),
            value: String(stats.totalQuestions),
          },
          {
            icon: "Users",
            label: bi("محاولات هذا الأسبوع", "Attempts this week"),
            value: String(stats.totalAttempts),
          },
          { icon: "Percent", label: bi("متوسط النتائج", "Average score"), value: `${stats.avg}%` },
        ]}
      />

      <Panel
        title={bi("اختباراتك", "Your quizzes")}
        icon="ListChecks"
        action={
          can("teacher_quizzes", "show_add_form") ? (
            <Button size="sm" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إنشاء اختبار", "Create quiz")}
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
              bi("الاختبار", "Quiz"),
              bi("الأسئلة", "Questions"),
              bi("المحاولات", "Attempts"),
              bi("الحالة", "Status"),
              bi("", ""),
            ]}
            rows={list.map((r) => [
              r.title,
              String(r.questionsCount),
              String(r.attemptsCount),
              <Badge key={r.id} tone={r.status === "نشط" ? "success" : "muted"}>
                {bi(r.status, r.status === "نشط" ? "Live" : "Draft")}
              </Badge>,
              <div key={`${r.id}-actions`} className="flex items-center justify-end gap-1">
                {can("teacher_quizzes", "edit") && (
                  <Button size="icon" variant="ghost" onClick={() => openDialog(r)}>
                    <Pencil className="size-4" />
                  </Button>
                )}
                {can("teacher_quizzes", "delete") && (
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
          <EmptyState icon="ListChecks" text={bi("لا اختبارات بعد.", "No quizzes yet.")} />
        )}
      </Panel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId ? bi("تعديل اختبار", "Edit quiz") : bi("إنشاء اختبار", "Create quiz")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="qz-title">{bi("اسم الاختبار", "Quiz title")}</Label>
              <Input
                id="qz-title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="qz-q">{bi("عدد الأسئلة", "Questions")}</Label>
              <Input
                id="qz-q"
                type="number"
                min={1}
                value={form.questionsCount}
                onChange={(e) => setForm((f) => ({ ...f, questionsCount: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{bi("الحالة", "Status")}</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as QuizStatus }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="مسوّدة">{bi("مسوّدة", "Draft")}</SelectItem>
                  <SelectItem value="نشط">{bi("نشط", "Live")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="qz-attempts">{bi("عدد المحاولات", "Attempts")}</Label>
              <Input
                id="qz-attempts"
                type="number"
                min={0}
                value={form.attemptsCount}
                onChange={(e) => setForm((f) => ({ ...f, attemptsCount: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="qz-avg">{bi("متوسط النتائج (%)", "Average score (%)")}</Label>
              <Input
                id="qz-avg"
                type="number"
                min={0}
                max={100}
                value={form.avgScore}
                onChange={(e) => setForm((f) => ({ ...f, avgScore: e.target.value }))}
              />
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

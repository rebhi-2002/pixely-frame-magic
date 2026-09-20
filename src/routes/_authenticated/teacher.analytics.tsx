import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { AppPage, StatGrid, Panel, RowList, Progress, EmptyState } from "@/components/app/kit";
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
  deleteMissedQuestion,
  listMissedQuestions,
  saveMissedQuestion,
} from "@/lib/teacher-followup.functions";
import { listQuizItems, listTeacherCourses } from "@/lib/teacher-teaching.functions";
import type { MissedPriority, MissedQuestionRow } from "@/lib/teacher-followup-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";
import { authPageHead } from "@/lib/seo";

const description = "أين يتعثّر طلابك بالضبط: أسئلة يخطئ فيها الأكثر، وإتقان كل اختبار.";

export const Route = createFileRoute("/_authenticated/teacher/analytics")({
  head: () =>
    authPageHead(
      {
        title: "التحليلات | أكاديميا",
        description: "أين يتعثّر طلابك بالضبط: أسئلة يخطئ فيها الأكثر، وإتقان كل اختبار.",
      },
      {
        title: "Analytics | Academia",
        description:
          "Exactly where your students struggle: most-missed questions, and mastery per quiz.",
      },
    ),
  component: PageRoute,
});

function PageRoute() {
  return (
    <Guard pageKey="teacher_analytics">
      <Body />
    </Guard>
  );
}

const EMPTY_FORM = { questionTitle: "", wrongPercent: "50", priority: "مراجعة" as MissedPriority };

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchMissed = useServerFn(listMissedQuestions);
  const persist = useServerFn(saveMissedQuestion);
  const remove = useServerFn(deleteMissedQuestion);
  const fetchQuizzes = useServerFn(listQuizItems);
  const fetchCourses = useServerFn(listTeacherCourses);

  const missedQuery = useQuery({ queryKey: ["missed-questions"], queryFn: () => fetchMissed() });
  const quizzesQuery = useQuery({ queryKey: ["teacher-quizzes"], queryFn: () => fetchQuizzes() });
  const coursesQuery = useQuery({ queryKey: ["teacher-courses"], queryFn: () => fetchCourses() });

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<MissedQuestionRow | null>(null);

  const isLoading = missedQuery.isLoading || quizzesQuery.isLoading || coursesQuery.isLoading;
  const missed = useMemo(() => missedQuery.data ?? [], [missedQuery.data]);
  const quizzes = (quizzesQuery.data ?? []).filter((q) => q.attemptsCount > 0);
  const courses = useMemo(() => coursesQuery.data ?? [], [coursesQuery.data]);
  const activeStudents = courses.reduce((s, c) => s + c.enrolledCount, 0);
  const avgMastery = quizzes.length
    ? Math.round(quizzes.reduce((s, q) => s + q.avgScore, 0) / quizzes.length)
    : 0;
  const weakQuizzes = quizzes.filter((q) => q.avgScore < 60).length;

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["missed-questions"] });

  const saveMutation = useMutation({
    mutationFn: () =>
      persist({
        data: { ...form, id: editingId ?? undefined, wrongPercent: Number(form.wrongPercent) || 0 },
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

  function openDialog(row: MissedQuestionRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            questionTitle: row.questionTitle,
            wrongPercent: String(row.wrongPercent),
            priority: row.priority,
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <AppPage
      title={bi("التحليلات", "Analytics")}
      icon="LineChart"
      subtitle={bi(
        description,
        "Exactly where students struggle: most-missed questions and per-quiz mastery.",
      )}
    >
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <StatGrid
            items={[
              {
                icon: "Users",
                label: bi("طلاب نشطون", "Active students"),
                value: String(activeStudents),
              },
              {
                icon: "Percent",
                label: bi("متوسط الإتقان", "Avg. mastery"),
                value: `${avgMastery}%`,
              },
              {
                icon: "ListChecks",
                label: bi("اختبارات مقيّمة", "Scored quizzes"),
                value: String(quizzes.length),
              },
              {
                icon: "AlertTriangle",
                label: bi("اختبارات ضعيفة", "Weak quizzes"),
                value: String(weakQuizzes),
              },
            ]}
          />

          <Panel title={bi("إتقان الاختبارات", "Quiz mastery")} icon="LineChart">
            {quizzes.length ? (
              quizzes.map((q) => <Progress key={q.id} label={q.title} value={q.avgScore} />)
            ) : (
              <EmptyState
                icon="LineChart"
                text={bi("لا اختبارات فيها محاولات بعد.", "No quizzes with attempts yet.")}
              />
            )}
          </Panel>

          <Panel
            title={bi("الأسئلة الأكثر خطأً", "Most-missed questions")}
            icon="XCircle"
            action={
              can("teacher_analytics", "show_add_form") ? (
                <Button size="sm" onClick={() => openDialog(null)}>
                  <Plus className="size-4" />
                  {bi("إضافة سؤال", "Add question")}
                </Button>
              ) : undefined
            }
          >
            {missed.length ? (
              <RowList
                rows={missed.map((m) => ({
                  title: m.questionTitle,
                  meta: bi(`${m.wrongPercent}% أخطأوا`, `${m.wrongPercent}% wrong`),
                  value: bi(m.priority, m.priority === "أولوية" ? "Priority" : "Review"),
                  tone: m.priority === "أولوية" ? ("danger" as const) : ("primary" as const),
                  actions: (
                    <div className="flex items-center gap-1">
                      {can("teacher_analytics", "edit") && (
                        <Button size="icon" variant="ghost" onClick={() => openDialog(m)}>
                          <Pencil className="size-4" />
                        </Button>
                      )}
                      {can("teacher_analytics", "delete") && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive"
                          onClick={() => setPendingDelete(m)}
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
                icon="XCircle"
                text={bi("ولا سؤال مسجّل بعد.", "No questions logged yet.")}
              />
            )}
          </Panel>
        </>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId ? bi("تعديل سؤال", "Edit question") : bi("إضافة سؤال", "Add question")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="mq-title">{bi("السؤال", "Question")}</Label>
              <Input
                id="mq-title"
                value={form.questionTitle}
                onChange={(e) => setForm((f) => ({ ...f, questionTitle: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mq-percent">{bi("نسبة الخطأ (%)", "Wrong (%)")}</Label>
              <Input
                id="mq-percent"
                type="number"
                min={0}
                max={100}
                value={form.wrongPercent}
                onChange={(e) => setForm((f) => ({ ...f, wrongPercent: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{bi("الأولوية", "Priority")}</Label>
              <Select
                value={form.priority}
                onValueChange={(v) => setForm((f) => ({ ...f, priority: v as MissedPriority }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="مراجعة">{bi("مراجعة", "Review")}</SelectItem>
                  <SelectItem value="أولوية">{bi("أولوية", "Priority")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !form.questionTitle.trim()}
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
                `حذف «${pendingDelete?.questionTitle}»؟`,
                `Delete "${pendingDelete?.questionTitle}"?`,
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

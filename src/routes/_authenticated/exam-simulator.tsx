import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import {
  AppPage,
  StatGrid,
  Panel,
  RowList,
  DataTable,
  Badge,
  EmptyState,
} from "@/components/app/kit";
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
  deleteExamAttempt,
  deleteMockExam,
  listExamAttempts,
  listMockExams,
  saveExamAttempt,
  saveMockExam,
} from "@/lib/student-evaluation.functions";
import type { ExamAttemptRow, MockExamRow } from "@/lib/student-evaluation-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";

const title = "محاكي الامتحان | أكاديميا";
const description =
  "امتحان تدريبي بمؤقّت وشكل ورقة حقيقية، وتحليل يكشف نقاط ضعفك قبل الامتحان الحقيقي.";

export const Route = createFileRoute("/_authenticated/exam-simulator")({
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
    <Guard pageKey="student_exam">
      <Body />
    </Guard>
  );
}

const EXAM_EMPTY_FORM = { title: "", questionsCount: "10", minutesLimit: "15" };
const ATTEMPT_EMPTY_FORM = { examTitle: "", dateLabel: "", scorePercent: "0", minutesTaken: "0" };

function scoreTone(score: number): "success" | "primary" | "danger" {
  if (score >= 80) return "success";
  if (score >= 60) return "primary";
  return "danger";
}

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();

  const fetchExams = useServerFn(listMockExams);
  const persistExam = useServerFn(saveMockExam);
  const removeExam = useServerFn(deleteMockExam);
  const fetchAttempts = useServerFn(listExamAttempts);
  const persistAttempt = useServerFn(saveExamAttempt);
  const removeAttempt = useServerFn(deleteExamAttempt);

  const examsQuery = useQuery({ queryKey: ["mock-exams"], queryFn: () => fetchExams() });
  const attemptsQuery = useQuery({ queryKey: ["exam-attempts"], queryFn: () => fetchAttempts() });

  const [examOpen, setExamOpen] = useState(false);
  const [editingExamId, setEditingExamId] = useState<string | null>(null);
  const [examForm, setExamForm] = useState(EXAM_EMPTY_FORM);
  const [pendingDeleteExam, setPendingDeleteExam] = useState<MockExamRow | null>(null);

  const [attemptOpen, setAttemptOpen] = useState(false);
  const [editingAttemptId, setEditingAttemptId] = useState<string | null>(null);
  const [attemptForm, setAttemptForm] = useState(ATTEMPT_EMPTY_FORM);
  const [pendingDeleteAttempt, setPendingDeleteAttempt] = useState<ExamAttemptRow | null>(null);

  const attempts = attemptsQuery.data ?? [];
  const stats = useMemo(() => {
    if (!attempts.length) return { taken: 0, best: 0, avgMinutes: 0 };
    const best = Math.max(...attempts.map((a) => a.scorePercent));
    const avgMinutes = Math.round(
      attempts.reduce((s, a) => s + a.minutesTaken, 0) / attempts.length,
    );
    return { taken: attempts.length, best, avgMinutes };
  }, [attempts]);

  const examSaveMutation = useMutation({
    mutationFn: () =>
      persistExam({
        data: {
          id: editingExamId ?? undefined,
          title: examForm.title,
          questionsCount: Number(examForm.questionsCount) || 1,
          minutesLimit: Number(examForm.minutesLimit) || 1,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mock-exams"] });
      setExamOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) =>
      toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save"))),
  });

  const examDeleteMutation = useMutation({
    mutationFn: (id: string) => removeExam({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mock-exams"] });
      setPendingDeleteExam(null);
      toast.success(bi("تم الحذف", "Deleted successfully"));
    },
    onError: (e) =>
      toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete"))),
  });

  const attemptSaveMutation = useMutation({
    mutationFn: () =>
      persistAttempt({
        data: {
          id: editingAttemptId ?? undefined,
          examTitle: attemptForm.examTitle,
          dateLabel: attemptForm.dateLabel,
          scorePercent: Number(attemptForm.scorePercent) || 0,
          minutesTaken: Number(attemptForm.minutesTaken) || 0,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam-attempts"] });
      setAttemptOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) =>
      toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save"))),
  });

  const attemptDeleteMutation = useMutation({
    mutationFn: (id: string) => removeAttempt({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam-attempts"] });
      setPendingDeleteAttempt(null);
      toast.success(bi("تم الحذف", "Deleted successfully"));
    },
    onError: (e) =>
      toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete"))),
  });

  function startExam(exam: MockExamRow) {
    setEditingAttemptId(null);
    setAttemptForm({
      examTitle: exam.title,
      dateLabel: new Date().toISOString().slice(0, 10),
      scorePercent: "0",
      minutesTaken: "0",
    });
    setAttemptOpen(true);
  }

  function openExamDialog(row: MockExamRow | null) {
    setEditingExamId(row?.id ?? null);
    setExamForm(
      row
        ? {
            title: row.title,
            questionsCount: String(row.questionsCount),
            minutesLimit: String(row.minutesLimit),
          }
        : EXAM_EMPTY_FORM,
    );
    setExamOpen(true);
  }

  function openAttemptDialog(row: ExamAttemptRow | null) {
    setEditingAttemptId(row?.id ?? null);
    setAttemptForm(
      row
        ? {
            examTitle: row.examTitle,
            dateLabel: row.dateLabel,
            scorePercent: String(row.scorePercent),
            minutesTaken: String(row.minutesTaken),
          }
        : ATTEMPT_EMPTY_FORM,
    );
    setAttemptOpen(true);
  }

  return (
    <AppPage
      title={bi("محاكي الامتحان", "Exam simulator")}
      icon="Timer"
      subtitle={bi(
        description,
        "A timed mock exam that looks like the real paper, with analysis that exposes weak spots.",
      )}
    >
      <StatGrid
        items={[
          {
            icon: "FileCheck2",
            label: bi("امتحانات أنهيتها", "Exams taken"),
            value: String(stats.taken),
          },
          { icon: "Percent", label: bi("أفضل نتيجة", "Best score"), value: `${stats.best}%` },
          {
            icon: "Timer",
            label: bi("متوسط الوقت", "Avg. time"),
            value: bi(`${stats.avgMinutes} د`, `${stats.avgMinutes} min`),
          },
          { icon: "Target", label: bi("الهدف", "Target"), value: "90%" },
        ]}
      />

      <Panel
        title={bi("امتحانات جاهزة", "Ready mock exams")}
        icon="FileText"
        action={
          can("student_exam", "show_add_form") ? (
            <Button size="sm" onClick={() => openExamDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة امتحان", "Add exam")}
            </Button>
          ) : undefined
        }
      >
        {examsQuery.isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="size-5 animate-spin text-primary" />
          </div>
        ) : examsQuery.data?.length ? (
          <RowList
            rows={examsQuery.data.map((e) => ({
              title: e.title,
              meta: bi(
                `${e.questionsCount} سؤالاً · ${e.minutesLimit} دقيقة`,
                `${e.questionsCount} questions · ${e.minutesLimit} min`,
              ),
              value: bi("ابدأ", "Start"),
              tone: "primary" as const,
              actions: (
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="outline" onClick={() => startExam(e)}>
                    {bi("ابدأ", "Start")}
                  </Button>
                  {can("student_exam", "edit") && (
                    <Button size="icon" variant="ghost" onClick={() => openExamDialog(e)}>
                      <Pencil className="size-4" />
                    </Button>
                  )}
                  {can("student_exam", "delete") && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => setPendingDeleteExam(e)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>
              ),
            }))}
          />
        ) : (
          <EmptyState icon="FileText" text={bi("لا امتحانات جاهزة بعد.", "No ready exams yet.")} />
        )}
      </Panel>

      <Panel
        title={bi("نتائجك السابقة", "Past results")}
        icon="History"
        action={
          can("student_exam", "show_add_form") ? (
            <Button size="sm" variant="outline" onClick={() => openAttemptDialog(null)}>
              <Plus className="size-4" />
              {bi("تسجيل نتيجة", "Log result")}
            </Button>
          ) : undefined
        }
      >
        {attemptsQuery.isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="size-5 animate-spin text-primary" />
          </div>
        ) : attempts.length ? (
          <DataTable
            head={[
              bi("الامتحان", "Exam"),
              bi("التاريخ", "Date"),
              bi("النتيجة", "Score"),
              bi("الوقت", "Time"),
              bi("", ""),
            ]}
            rows={attempts.map((a) => [
              a.examTitle,
              a.dateLabel,
              <Badge key={a.id} tone={scoreTone(a.scorePercent)}>
                {a.scorePercent}%
              </Badge>,
              bi(`${a.minutesTaken} د`, `${a.minutesTaken} min`),
              <div key={`${a.id}-actions`} className="flex items-center justify-end gap-1">
                {can("student_exam", "edit") && (
                  <Button size="icon" variant="ghost" onClick={() => openAttemptDialog(a)}>
                    <Pencil className="size-4" />
                  </Button>
                )}
                {can("student_exam", "delete") && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => setPendingDeleteAttempt(a)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                )}
              </div>,
            ])}
          />
        ) : (
          <EmptyState
            icon="History"
            text={bi("ما في نتائج مسجّلة بعد.", "No results logged yet.")}
          />
        )}
      </Panel>

      <Dialog open={examOpen} onOpenChange={setExamOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingExamId ? bi("تعديل امتحان", "Edit exam") : bi("إضافة امتحان", "Add exam")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="mex-title">{bi("العنوان", "Title")}</Label>
              <Input
                id="mex-title"
                value={examForm.title}
                onChange={(e) => setExamForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mex-q">{bi("عدد الأسئلة", "Questions")}</Label>
              <Input
                id="mex-q"
                type="number"
                min={1}
                value={examForm.questionsCount}
                onChange={(e) => setExamForm((f) => ({ ...f, questionsCount: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mex-min">{bi("المدة (دقائق)", "Duration (min)")}</Label>
              <Input
                id="mex-min"
                type="number"
                min={1}
                value={examForm.minutesLimit}
                onChange={(e) => setExamForm((f) => ({ ...f, minutesLimit: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => examSaveMutation.mutate()}
              disabled={examSaveMutation.isPending || !examForm.title.trim()}
            >
              {bi("حفظ", "Save")}
            </Button>
            <Button variant="outline" onClick={() => setExamOpen(false)}>
              {bi("إلغاء", "Cancel")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={attemptOpen} onOpenChange={setAttemptOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingAttemptId
                ? bi("تعديل نتيجة", "Edit result")
                : bi("تسجيل نتيجة", "Log result")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="att-title">{bi("الامتحان", "Exam")}</Label>
              <Input
                id="att-title"
                value={attemptForm.examTitle}
                onChange={(e) => setAttemptForm((f) => ({ ...f, examTitle: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="att-date">{bi("التاريخ", "Date")}</Label>
              <Input
                id="att-date"
                value={attemptForm.dateLabel}
                onChange={(e) => setAttemptForm((f) => ({ ...f, dateLabel: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="att-score">{bi("النتيجة (%)", "Score (%)")}</Label>
              <Input
                id="att-score"
                type="number"
                min={0}
                max={100}
                value={attemptForm.scorePercent}
                onChange={(e) => setAttemptForm((f) => ({ ...f, scorePercent: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="att-minutes">
                {bi("الوقت المستغرق (دقيقة)", "Time taken (min)")}
              </Label>
              <Input
                id="att-minutes"
                type="number"
                min={0}
                value={attemptForm.minutesTaken}
                onChange={(e) => setAttemptForm((f) => ({ ...f, minutesTaken: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => attemptSaveMutation.mutate()}
              disabled={attemptSaveMutation.isPending || !attemptForm.examTitle.trim()}
            >
              {bi("حفظ", "Save")}
            </Button>
            <Button variant="outline" onClick={() => setAttemptOpen(false)}>
              {bi("إلغاء", "Cancel")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!pendingDeleteExam}
        onOpenChange={(v) => !v && setPendingDeleteExam(null)}
      >
        <AlertDialogContent className="text-start">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {bi(`حذف «${pendingDeleteExam?.title}»؟`, `Delete "${pendingDeleteExam?.title}"?`)}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:justify-start">
            <AlertDialogAction
              onClick={() => pendingDeleteExam && examDeleteMutation.mutate(pendingDeleteExam.id)}
            >
              {bi("حذف", "Delete")}
            </AlertDialogAction>
            <AlertDialogCancel>{bi("إلغاء", "Cancel")}</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={!!pendingDeleteAttempt}
        onOpenChange={(v) => !v && setPendingDeleteAttempt(null)}
      >
        <AlertDialogContent className="text-start">
          <AlertDialogHeader>
            <AlertDialogTitle>{bi("حذف هذه النتيجة؟", "Delete this result?")}</AlertDialogTitle>
            <AlertDialogDescription>
              {bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:justify-start">
            <AlertDialogAction
              onClick={() =>
                pendingDeleteAttempt && attemptDeleteMutation.mutate(pendingDeleteAttempt.id)
              }
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

import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Pencil, Plus, Settings2, Trash2 } from "lucide-react";
import {
  AppPage,
  StatGrid,
  Panel,
  RowList,
  Progress,
  QuickLinks,
  EmptyState,
} from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { WelcomeBanner } from "@/components/app/welcome-banner";
import { useBi } from "@/lib/bi";
import { TrendChart } from "@/components/app/charts";
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
  deleteUpcomingTask,
  getStudyStats,
  listUpcomingTasks,
  listWeeklyStudyLog,
  saveStudyStats,
  saveUpcomingTask,
  updateWeeklyStudyMinutes,
} from "@/lib/student-learning.functions";
import { listLibrarySubjects } from "@/lib/student-learning.functions";
import type { UpcomingTaskRow, UpcomingTaskType } from "@/lib/student-learning-data";
import { useAccess } from "@/hooks/use-access";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";

const title = "لوحة الطالب | أكاديميا";
const description = "كل دراستك بمكان واحد: تقدّمك اليوم، مهامك القريبة، والمواد التي تحتاج مراجعة.";

export const Route = createFileRoute("/_authenticated/dashboard")({
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
    <Guard pageKey="student_dashboard">
      <Body />
    </Guard>
  );
}

const TASK_EMPTY_FORM = { title: "", whenLabel: "", type: "مراجعة" as UpcomingTaskType };
const TASK_TONE: Record<UpcomingTaskType, "primary" | "muted" | "success"> = {
  امتحان: "primary",
  واجب: "muted",
  مراجعة: "success",
};

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();

  const fetchLog = useServerFn(listWeeklyStudyLog);
  const updateMinutes = useServerFn(updateWeeklyStudyMinutes);
  const fetchTasks = useServerFn(listUpcomingTasks);
  const persistTask = useServerFn(saveUpcomingTask);
  const removeTask = useServerFn(deleteUpcomingTask);
  const fetchStats = useServerFn(getStudyStats);
  const persistStats = useServerFn(saveStudyStats);
  const fetchSubjects = useServerFn(listLibrarySubjects);

  const logQuery = useQuery({ queryKey: ["weekly-study-log"], queryFn: () => fetchLog() });
  const tasksQuery = useQuery({ queryKey: ["upcoming-tasks"], queryFn: () => fetchTasks() });
  const statsQuery = useQuery({ queryKey: ["study-stats"], queryFn: () => fetchStats() });
  const subjectsQuery = useQuery({
    queryKey: ["library-subjects"],
    queryFn: () => fetchSubjects(),
  });

  const [minuteEdit, setMinuteEdit] = useState<{
    dayAr: string;
    dayLabel: [string, string];
    minutes: string;
  } | null>(null);
  const [statsOpen, setStatsOpen] = useState(false);
  const [statsForm, setStatsForm] = useState({ streakDays: "0", achievementPoints: "0" });
  const [taskOpen, setTaskOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [taskForm, setTaskForm] = useState(TASK_EMPTY_FORM);
  const [pendingDeleteTask, setPendingDeleteTask] = useState<UpcomingTaskRow | null>(null);

  const minutesMutation = useMutation({
    mutationFn: (vars: { dayAr: string; minutes: number }) => updateMinutes({ data: vars }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weekly-study-log"] });
      setMinuteEdit(null);
      toast.success(bi("تم التحديث", "Updated"));
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : bi("تعذّر التحديث", "Failed to update")),
  });

  const statsMutation = useMutation({
    mutationFn: () =>
      persistStats({
        data: {
          streakDays: Number(statsForm.streakDays) || 0,
          achievementPoints: Number(statsForm.achievementPoints) || 0,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-stats"] });
      setStatsOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : bi("تعذّر الحفظ", "Failed to save")),
  });

  const taskSaveMutation = useMutation({
    mutationFn: () => persistTask({ data: { ...taskForm, id: editingTaskId ?? undefined } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["upcoming-tasks"] });
      setTaskOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : bi("تعذّر الحفظ", "Failed to save")),
  });

  const taskDeleteMutation = useMutation({
    mutationFn: (id: string) => removeTask({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["upcoming-tasks"] });
      setPendingDeleteTask(null);
      toast.success(bi("تم الحذف", "Deleted successfully"));
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : bi("تعذّر الحذف", "Failed to delete")),
  });

  const isLoading =
    logQuery.isLoading || tasksQuery.isLoading || statsQuery.isLoading || subjectsQuery.isLoading;
  const hasError = logQuery.error || tasksQuery.error || statsQuery.error || subjectsQuery.error;
  const log = logQuery.data ?? [];
  const tasks = tasksQuery.data ?? [];
  const stats = statsQuery.data ?? { streakDays: 0, achievementPoints: 0 };
  const subjects = subjectsQuery.data ?? [];
  const minutesToday = log.length ? log[log.length - 1].minutes : 0;
  const tasksDoneLabel = `${subjects.filter((s) => s.progressPercent >= 100).length}/${subjects.length || 0}`;

  function openTaskDialog(row: UpcomingTaskRow | null) {
    setEditingTaskId(row?.id ?? null);
    setTaskForm(
      row ? { title: row.title, whenLabel: row.whenLabel, type: row.type } : TASK_EMPTY_FORM,
    );
    setTaskOpen(true);
  }

  function openStatsDialog() {
    setStatsForm({
      streakDays: String(stats.streakDays),
      achievementPoints: String(stats.achievementPoints),
    });
    setStatsOpen(true);
  }

  return (
    <AppPage
      title={bi("لوحة الطالب", "Student dashboard")}
      icon="LayoutDashboard"
      subtitle={bi(
        description,
        "Everything in one place: today's progress, upcoming tasks, and subjects that need review.",
      )}
    >
      <WelcomeBanner
        subtitle={[
          "خطتك اليوم جاهزة — راجع مهامك القريبة وكمّل سلسلة أيامك المتتالية.",
          "Your plan for today is ready — check upcoming tasks and keep your streak going.",
        ]}
        tip={[
          `${stats.streakDays} يوم متتالي 🔥 — لا تكسر السلسلة اليوم`,
          `${stats.streakDays}-day streak 🔥 — don't break it today`,
        ]}
        action={
          <Button asChild size="sm">
            <Link to="/library">{bi("افتح مكتبتك", "Open your library")}</Link>
          </Button>
        }
      />

      {isLoading ? (
        <LoadingState label={bi("عم نجهّز لوحتك…", "Preparing your dashboard…")} />
      ) : hasError ? (
        <ErrorState
          title={bi("ما قدرنا نحمّل اللوحة", "We couldn't load the dashboard")}
          description={bi(
            "جرّب التحديث مرة ثانية. إذا استمرت المشكلة، تأكد من اتصالك أو ارجع لاحقاً.",
            "Try again. If the problem continues, check your connection or come back later.",
          )}
          action={
            <RetryButton
              label={bi("إعادة المحاولة", "Try again")}
              onClick={() => void queryClient.invalidateQueries()}
            />
          }
        />
      ) : (
        <>
          <StatGrid
            items={[
              {
                icon: "Flame",
                label: bi("أيام متتالية", "Streak days"),
                value: String(stats.streakDays),
              },
              {
                icon: "Timer",
                label: bi("دقائق دراسة اليوم", "Minutes studied today"),
                value: String(minutesToday),
              },
              {
                icon: "ListChecks",
                label: bi("مواد مكتملة", "Subjects done"),
                value: tasksDoneLabel,
              },
              {
                icon: "Trophy",
                label: bi("نقاط الإنجاز", "Achievement points"),
                value: String(stats.achievementPoints),
              },
            ]}
          />

          {can("student_dashboard", "edit") && (
            <div className="-mt-2 flex justify-end">
              <Button size="sm" variant="outline" onClick={openStatsDialog}>
                <Settings2 className="size-4" />
                {bi("تعديل إحصاءاتي", "Edit my stats")}
              </Button>
            </div>
          )}

          <Panel title={bi("ابدأ الآن", "Start now")} icon="Zap">
            <QuickLinks
              items={[
                { to: "/library", label: bi("المكتبة", "Library"), icon: "Library" },
                {
                  to: "/exam-simulator",
                  label: bi("محاكي امتحان", "Exam simulator"),
                  icon: "Timer",
                },
                {
                  to: "/mistakes-bank",
                  label: bi("بنك الأخطاء", "Mistakes bank"),
                  icon: "XCircle",
                },
                { to: "/flashcards", label: bi("بطاقات مراجعة", "Flashcards"), icon: "Layers" },
                { to: "/schedule", label: bi("جدولي", "My schedule"), icon: "CalendarDays" },
                { to: "/my-courses", label: bi("كورساتي", "My courses"), icon: "BookOpenCheck" },
              ]}
            />
          </Panel>

          <Panel title={bi("دقائق الدراسة الأسبوعية", "Weekly study minutes")} icon="ChartSpline">
            <TrendChart data={log.map((d) => ({ label: bi(...d.day), value: d.minutes }))} />
            {can("student_dashboard", "edit") && (
              <div className="mt-3 flex flex-wrap gap-2">
                {log.map((d) => (
                  <button
                    key={d.day[0]}
                    type="button"
                    onClick={() =>
                      setMinuteEdit({
                        dayAr: d.day[0],
                        dayLabel: d.day,
                        minutes: String(d.minutes),
                      })
                    }
                    className="rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    {bi(...d.day)}: {d.minutes} <Pencil className="ms-1 inline size-3" />
                  </button>
                ))}
              </div>
            )}
          </Panel>

          <Panel title={bi("إتقان المواد", "Subject mastery")} icon="LineChart">
            {subjects.length ? (
              subjects.map((s) => (
                <Progress key={s.id} label={s.subjectName} value={s.progressPercent} />
              ))
            ) : (
              <EmptyState
                icon="LineChart"
                text={bi(
                  "أضف مواد بالمكتبة عشان تظهر هون.",
                  "Add subjects in the library to see them here.",
                )}
              />
            )}
          </Panel>

          <Panel
            title={bi("قريباً", "Coming up")}
            icon="CalendarClock"
            action={
              can("student_dashboard", "show_add_form") ? (
                <Button size="sm" onClick={() => openTaskDialog(null)}>
                  <Plus className="size-4" />
                  {bi("إضافة مهمة", "Add task")}
                </Button>
              ) : undefined
            }
          >
            {tasks.length ? (
              <RowList
                rows={tasks.map((t) => ({
                  title: t.title,
                  meta: t.whenLabel,
                  value: t.type,
                  tone: TASK_TONE[t.type],
                  actions: (
                    <div className="flex items-center gap-1">
                      {can("student_dashboard", "edit") && (
                        <Button size="icon" variant="ghost" onClick={() => openTaskDialog(t)}>
                          <Pencil className="size-4" />
                        </Button>
                      )}
                      {can("student_dashboard", "delete") && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive"
                          onClick={() => setPendingDeleteTask(t)}
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
                icon="CalendarClock"
                text={bi("ولا مهمة قادمة حالياً 🎉", "No upcoming tasks right now 🎉")}
              />
            )}
          </Panel>
        </>
      )}

      <Dialog open={!!minuteEdit} onOpenChange={(v) => !v && setMinuteEdit(null)}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>{minuteEdit ? bi(...minuteEdit.dayLabel) : ""}</DialogTitle>
          </DialogHeader>
          <div className="space-y-1.5">
            <Label htmlFor="minutes">{bi("دقائق الدراسة", "Study minutes")}</Label>
            <Input
              id="minutes"
              type="number"
              min={0}
              value={minuteEdit?.minutes ?? ""}
              onChange={(e) => setMinuteEdit((m) => (m ? { ...m, minutes: e.target.value } : m))}
            />
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() =>
                minuteEdit &&
                minutesMutation.mutate({
                  dayAr: minuteEdit.dayAr,
                  minutes: Number(minuteEdit.minutes) || 0,
                })
              }
              disabled={minutesMutation.isPending}
            >
              {bi("حفظ", "Save")}
            </Button>
            <Button variant="outline" onClick={() => setMinuteEdit(null)}>
              {bi("إلغاء", "Cancel")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={statsOpen} onOpenChange={setStatsOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>{bi("تعديل إحصاءاتي", "Edit my stats")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="streak">{bi("أيام متتالية", "Streak days")}</Label>
              <Input
                id="streak"
                type="number"
                min={0}
                value={statsForm.streakDays}
                onChange={(e) => setStatsForm((f) => ({ ...f, streakDays: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="points">{bi("نقاط الإنجاز", "Achievement points")}</Label>
              <Input
                id="points"
                type="number"
                min={0}
                value={statsForm.achievementPoints}
                onChange={(e) => setStatsForm((f) => ({ ...f, achievementPoints: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button onClick={() => statsMutation.mutate()} disabled={statsMutation.isPending}>
              {bi("حفظ", "Save")}
            </Button>
            <Button variant="outline" onClick={() => setStatsOpen(false)}>
              {bi("إلغاء", "Cancel")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={taskOpen} onOpenChange={setTaskOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingTaskId ? bi("تعديل مهمة", "Edit task") : bi("إضافة مهمة", "Add task")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="task-title">{bi("العنوان", "Title")}</Label>
              <Input
                id="task-title"
                value={taskForm.title}
                onChange={(e) => setTaskForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="task-when">{bi("الموعد", "When")}</Label>
              <Input
                id="task-when"
                value={taskForm.whenLabel}
                onChange={(e) => setTaskForm((f) => ({ ...f, whenLabel: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{bi("النوع", "Type")}</Label>
              <Select
                value={taskForm.type}
                onValueChange={(v) => setTaskForm((f) => ({ ...f, type: v as UpcomingTaskType }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="امتحان">{bi("امتحان", "Quiz")}</SelectItem>
                  <SelectItem value="واجب">{bi("واجب", "Homework")}</SelectItem>
                  <SelectItem value="مراجعة">{bi("مراجعة", "Review")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => taskSaveMutation.mutate()}
              disabled={taskSaveMutation.isPending || !taskForm.title.trim()}
            >
              {bi("حفظ", "Save")}
            </Button>
            <Button variant="outline" onClick={() => setTaskOpen(false)}>
              {bi("إلغاء", "Cancel")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!pendingDeleteTask}
        onOpenChange={(v) => !v && setPendingDeleteTask(null)}
      >
        <AlertDialogContent className="text-start">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {bi(`حذف «${pendingDeleteTask?.title}»؟`, `Delete "${pendingDeleteTask?.title}"?`)}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:justify-start">
            <AlertDialogAction
              onClick={() => pendingDeleteTask && taskDeleteMutation.mutate(pendingDeleteTask.id)}
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

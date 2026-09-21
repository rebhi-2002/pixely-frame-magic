import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
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
import { deleteMistake, listMistakes, saveMistake } from "@/lib/student-evaluation.functions";
import type { MistakeRow, MistakeStatus } from "@/lib/student-evaluation-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";
import { authPageHead } from "@/lib/seo";
import { LoadingState } from "@/components/app/feedback-states";

const description = "سجّل الأسئلة يلي بتخطئ فيها بنفسك، وتابع تكرارها لحد ما تتقنها.";

export const Route = createFileRoute("/_authenticated/mistakes-bank")({
  head: () =>
    authPageHead(
      {
        title: "بنك الأخطاء | أكاديميا",
        description: "سجّل الأسئلة يلي بتخطئ فيها بنفسك، وتابع تكرارها لحد ما تتقنها.",
      },
      {
        title: "My mistake bank | Academia",
        description:
          "Log the questions you get wrong yourself, and track repeats until you master them.",
      },
    ),
  component: PageRoute,
});

function PageRoute() {
  return (
    <Guard pageKey="student_mistakes">
      <Body />
    </Guard>
  );
}

const EMPTY_FORM = {
  questionTitle: "",
  subjectName: "",
  wrongCount: "1",
  status: "أولوية" as MistakeStatus,
};
const STATUS_TONE: Record<MistakeStatus, "danger" | "primary" | "success"> = {
  أولوية: "danger",
  مراجعة: "primary",
  مُتقن: "success",
};

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listMistakes);
  const persist = useServerFn(saveMistake);
  const remove = useServerFn(deleteMistake);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<MistakeRow | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["mistakes"],
    queryFn: () => fetchRows(),
  });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["mistakes"] });

  const list = useMemo(() => rows ?? [], [rows]);
  const stats = useMemo(() => {
    const open_ = list.filter((r) => r.status !== "مُتقن").length;
    const rotation = list.filter((r) => r.status === "مراجعة").length;
    const mastered = list.filter((r) => r.status === "مُتقن").length;
    return { open: open_, rotation, mastered };
  }, [list]);

  const bySubject = useMemo(() => {
    const totals = new Map<string, number>();
    for (const r of list) totals.set(r.subjectName, (totals.get(r.subjectName) ?? 0) + 1);
    const grand = list.length || 1;
    return Array.from(totals.entries())
      .map(([subject, count]) => ({ subject, percent: Math.round((count / grand) * 100) }))
      .sort((a, b) => b.percent - a.percent);
  }, [list]);

  const mostRepeated = useMemo(
    () => [...list].sort((a, b) => b.wrongCount - a.wrongCount).slice(0, 5),
    [list],
  );

  const saveMutation = useMutation({
    mutationFn: () =>
      persist({
        data: { ...form, id: editingId ?? undefined, wrongCount: Number(form.wrongCount) || 1 },
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

  function openDialog(row: MistakeRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            questionTitle: row.questionTitle,
            subjectName: row.subjectName,
            wrongCount: String(row.wrongCount),
            status: row.status,
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <AppPage
      title={bi("بنك الأخطاء", "Mistakes bank")}
      icon="XCircle"
      subtitle={bi(
        description,
        "Log the questions you get wrong yourself, and track them until you master them.",
      )}
    >
      <StatGrid
        items={[
          {
            icon: "XCircle",
            label: bi("أخطاء مفتوحة", "Open mistakes"),
            value: String(stats.open),
          },
          {
            icon: "RefreshCw",
            label: bi("قيد التكرار", "In rotation"),
            value: String(stats.rotation),
          },
          { icon: "CheckCircle2", label: bi("أُتقنت", "Mastered"), value: String(stats.mastered) },
          { icon: "Layers", label: bi("الإجمالي", "Total"), value: String(list.length) },
        ]}
      />

      <Panel
        title={bi("الأكثر تكراراً", "Most repeated")}
        icon="XCircle"
        action={
          can("student_mistakes", "show_add_form") ? (
            <Button size="sm" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة خطأ", "Add mistake")}
            </Button>
          ) : undefined
        }
      >
        {isLoading ? (
          <LoadingState
            label={bi("جارٍ التحميل…", "Loading…")}
            className="border-none bg-transparent"
          />
        ) : mostRepeated.length ? (
          <RowList
            rows={mostRepeated.map((r) => ({
              title: r.questionTitle,
              meta: bi(
                `${r.subjectName} · أخطأت ${r.wrongCount} مرات`,
                `${r.subjectName} · wrong ${r.wrongCount} times`,
              ),
              value: bi(
                r.status,
                r.status === "أولوية" ? "Priority" : r.status === "مراجعة" ? "Review" : "Mastered",
              ),
              tone: STATUS_TONE[r.status],
              actions: (
                <div className="flex items-center gap-1">
                  {can("student_mistakes", "edit") && (
                    <Button size="icon" variant="ghost" onClick={() => openDialog(r)}>
                      <Pencil className="size-4" />
                    </Button>
                  )}
                  {can("student_mistakes", "delete") && (
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
            icon="CheckCircle2"
            text={bi("ولا خطأ مسجّل — استمر هيك! 🎉", "No mistakes logged — keep it up! 🎉")}
          />
        )}
      </Panel>

      <Panel title={bi("توزيع الأخطاء بالمواد", "Mistakes by subject")} icon="PieChart">
        {bySubject.length ? (
          bySubject.map((s) => <Progress key={s.subject} label={s.subject} value={s.percent} />)
        ) : (
          <EmptyState icon="PieChart" text={bi("لا بيانات كافية بعد.", "Not enough data yet.")} />
        )}
      </Panel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId ? bi("تعديل خطأ", "Edit mistake") : bi("إضافة خطأ", "Add mistake")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="mis-q">{bi("السؤال", "Question")}</Label>
              <Input
                id="mis-q"
                value={form.questionTitle}
                onChange={(e) => setForm((f) => ({ ...f, questionTitle: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mis-subject">{bi("المادة", "Subject")}</Label>
              <Input
                id="mis-subject"
                value={form.subjectName}
                onChange={(e) => setForm((f) => ({ ...f, subjectName: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mis-count">{bi("عدد مرات الخطأ", "Times wrong")}</Label>
              <Input
                id="mis-count"
                type="number"
                min={1}
                value={form.wrongCount}
                onChange={(e) => setForm((f) => ({ ...f, wrongCount: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>{bi("الحالة", "Status")}</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as MistakeStatus }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="أولوية">{bi("أولوية", "Priority")}</SelectItem>
                  <SelectItem value="مراجعة">{bi("مراجعة", "Review")}</SelectItem>
                  <SelectItem value="مُتقن">{bi("مُتقن", "Mastered")}</SelectItem>
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

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
  deleteCommunityQuestion,
  getCommunityStats,
  listCommunityQuestions,
  saveCommunityQuestion,
} from "@/lib/student-social.functions";
import type { CommunityQuestionRow, QuestionStatus } from "@/lib/student-social-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";

const title = "أسئلتي | أكاديميا";
const description = "سجّل أسئلتك بكل مادة، وتابع حالتها لحد ما توصلك إجابة.";

export const Route = createFileRoute("/_authenticated/community")({
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
    <Guard pageKey="student_community">
      <Body />
    </Guard>
  );
}

const EMPTY_FORM = {
  questionTitle: "",
  subjectName: "",
  answersCount: "0",
  status: "مفتوح" as QuestionStatus,
};
const STATUS_TONE: Record<QuestionStatus, "success" | "primary" | "muted"> = {
  "إجابة معلم": "success",
  مفتوح: "primary",
  مُغلق: "muted",
};

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchQuestions = useServerFn(listCommunityQuestions);
  const persist = useServerFn(saveCommunityQuestion);
  const remove = useServerFn(deleteCommunityQuestion);
  const fetchStats = useServerFn(getCommunityStats);

  const questionsQuery = useQuery({
    queryKey: ["community-questions"],
    queryFn: () => fetchQuestions(),
  });
  const statsQuery = useQuery({ queryKey: ["community-stats"], queryFn: () => fetchStats() });

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<CommunityQuestionRow | null>(null);

  const questions = useMemo(() => questionsQuery.data ?? [], [questionsQuery.data]);
  const stats = statsQuery.data ?? { memberCount: 0, reputation: 0 };
  const verifiedCount = questions.filter((q) => q.status === "إجابة معلم").length;
  const isLoading = questionsQuery.isLoading || statsQuery.isLoading;

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["community-questions"] });

  const saveMutation = useMutation({
    mutationFn: () =>
      persist({
        data: { ...form, id: editingId ?? undefined, answersCount: Number(form.answersCount) || 0 },
      }),
    onSuccess: () => {
      invalidate();
      setOpen(false);
      toast.success(bi("تم النشر", "Posted successfully"));
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

  function openDialog(row: CommunityQuestionRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            questionTitle: row.questionTitle,
            subjectName: row.subjectName,
            answersCount: String(row.answersCount),
            status: row.status,
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <AppPage
      title={bi("أسئلتي", "My questions")}
      icon="MessagesSquare"
      subtitle={bi(
        description,
        "Log your questions per subject, and track their status until answered.",
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
                icon: "MessagesSquare",
                label: bi("أسئلة", "Questions"),
                value: String(questions.length),
              },
              {
                icon: "CheckCheck",
                label: bi("إجابات معلم", "Teacher answers"),
                value: String(verifiedCount),
              },
              {
                icon: "Users",
                label: bi("أعضاء مادّتك", "Members"),
                value: String(stats.memberCount),
              },
              {
                icon: "Star",
                label: bi("سمعتك", "Your reputation"),
                value: String(stats.reputation),
              },
            ]}
          />

          <Panel
            title={bi("أحدث الأسئلة", "Latest questions")}
            icon="MessagesSquare"
            action={
              can("student_community", "show_add_form") ? (
                <Button size="sm" onClick={() => openDialog(null)}>
                  <Plus className="size-4" />
                  {bi("اسأل سؤالاً", "Ask a question")}
                </Button>
              ) : undefined
            }
          >
            {questions.length ? (
              <RowList
                rows={questions.map((q) => ({
                  title: q.questionTitle,
                  meta: bi(
                    `${q.subjectName} · ${q.answersCount} إجابات`,
                    `${q.subjectName} · ${q.answersCount} answers`,
                  ),
                  value: bi(
                    q.status,
                    q.status === "إجابة معلم"
                      ? "Teacher answer"
                      : q.status === "مفتوح"
                        ? "Open"
                        : "Closed",
                  ),
                  tone: STATUS_TONE[q.status],
                  actions: (
                    <div className="flex items-center gap-1">
                      {can("student_community", "edit") && (
                        <Button size="icon" variant="ghost" onClick={() => openDialog(q)}>
                          <Pencil className="size-4" />
                        </Button>
                      )}
                      {can("student_community", "delete") && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive"
                          onClick={() => setPendingDelete(q)}
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
                icon="MessagesSquare"
                text={bi(
                  "لا أسئلة بعد — كن أول من يسأل.",
                  "No questions yet — be the first to ask.",
                )}
              />
            )}
          </Panel>
        </>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId ? bi("تعديل سؤال", "Edit question") : bi("اسأل سؤالاً", "Ask a question")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="cq-title">{bi("سؤالك", "Your question")}</Label>
              <Input
                id="cq-title"
                value={form.questionTitle}
                onChange={(e) => setForm((f) => ({ ...f, questionTitle: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cq-subject">{bi("المادة", "Subject")}</Label>
              <Input
                id="cq-subject"
                value={form.subjectName}
                onChange={(e) => setForm((f) => ({ ...f, subjectName: e.target.value }))}
              />
            </div>
            {editingId && (
              <div className="space-y-1.5">
                <Label>{bi("الحالة", "Status")}</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) => setForm((f) => ({ ...f, status: v as QuestionStatus }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="مفتوح">{bi("مفتوح", "Open")}</SelectItem>
                    <SelectItem value="إجابة معلم">
                      {bi("إجابة معلم", "Teacher answered")}
                    </SelectItem>
                    <SelectItem value="مُغلق">{bi("مُغلق", "Closed")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !form.questionTitle.trim()}
            >
              {bi("نشر", "Post")}
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
            <AlertDialogTitle>{bi("حذف هذا السؤال؟", "Delete this question?")}</AlertDialogTitle>
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

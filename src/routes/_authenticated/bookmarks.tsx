import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
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
import { deleteBookmark, listBookmarks, saveBookmark } from "@/lib/student-social.functions";
import type { BookmarkRow, BookmarkType } from "@/lib/student-social-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";
import { authPageHead } from "@/lib/seo";
import { LoadingState } from "@/components/app/feedback-states";

const description = "كل ما حفظته: دروس، أسئلة، ونقاشات — بمكان واحد للرجوع السريع.";

export const Route = createFileRoute("/_authenticated/bookmarks")({
  head: () =>
    authPageHead(
      {
        title: "المحفوظات | أكاديميا",
        description: "كل ما حفظته: دروس، أسئلة، ونقاشات — بمكان واحد للرجوع السريع.",
      },
      {
        title: "Bookmarks | Academia",
        description:
          "Everything you saved: lessons, questions, and discussions — in one place for quick access.",
      },
    ),
  component: PageRoute,
});

function PageRoute() {
  return (
    <Guard pageKey="student_bookmarks">
      <Body />
    </Guard>
  );
}

const EMPTY_FORM = { itemTitle: "", subjectName: "", type: "درس" as BookmarkType };
const TYPE_TONE: Record<BookmarkType, "primary" | "muted" | "success"> = {
  درس: "primary",
  سؤال: "muted",
  نقاش: "success",
};

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listBookmarks);
  const persist = useServerFn(saveBookmark);
  const remove = useServerFn(deleteBookmark);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<BookmarkRow | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => fetchRows(),
  });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["bookmarks"] });

  const list = useMemo(() => rows ?? [], [rows]);
  const stats = useMemo(
    () => ({
      total: list.length,
      lessons: list.filter((r) => r.type === "درس").length,
      questions: list.filter((r) => r.type === "سؤال").length,
      threads: list.filter((r) => r.type === "نقاش").length,
    }),
    [list],
  );

  const saveMutation = useMutation({
    mutationFn: () => persist({ data: { ...form, id: editingId ?? undefined } }),
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
      toast.success(bi("تمت الإزالة", "Removed"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete"))),
  });

  function openDialog(row: BookmarkRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row ? { itemTitle: row.itemTitle, subjectName: row.subjectName, type: row.type } : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <AppPage
      title={bi("المحفوظات", "Bookmarks")}
      icon="Bookmark"
      subtitle={bi(
        description,
        "Everything you saved: lessons, questions and threads — in one quick-access place.",
      )}
    >
      <StatGrid
        items={[
          {
            icon: "Bookmark",
            label: bi("عناصر محفوظة", "Saved items"),
            value: String(stats.total),
          },
          { icon: "FileText", label: bi("دروس", "Lessons"), value: String(stats.lessons) },
          { icon: "HelpCircle", label: bi("أسئلة", "Questions"), value: String(stats.questions) },
          { icon: "MessagesSquare", label: bi("نقاشات", "Threads"), value: String(stats.threads) },
        ]}
      />

      <Panel
        title={bi("محفوظاتك", "Your bookmarks")}
        icon="Bookmark"
        action={
          can("student_bookmarks", "show_add_form") ? (
            <Button size="sm" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة عنصر", "Add item")}
            </Button>
          ) : undefined
        }
      >
        {isLoading ? (
          <LoadingState
            label={bi("جارٍ التحميل…", "Loading…")}
            className="border-none bg-transparent"
          />
        ) : list.length ? (
          <RowList
            rows={list.map((r) => ({
              title: r.itemTitle,
              meta: r.subjectName,
              value: bi(
                r.type,
                r.type === "درس" ? "Lesson" : r.type === "سؤال" ? "Question" : "Thread",
              ),
              tone: TYPE_TONE[r.type],
              actions: (
                <div className="flex items-center gap-1">
                  {can("student_bookmarks", "edit") && (
                    <Button size="icon" variant="ghost" onClick={() => openDialog(r)}>
                      <Pencil className="size-4" />
                    </Button>
                  )}
                  {can("student_bookmarks", "delete") && (
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
          <EmptyState icon="Bookmark" text={bi("لا محفوظات بعد.", "No bookmarks yet.")} />
        )}
      </Panel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId ? bi("تعديل عنصر", "Edit item") : bi("إضافة عنصر", "Add item")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="bm-title">{bi("العنوان", "Title")}</Label>
              <Input
                id="bm-title"
                value={form.itemTitle}
                onChange={(e) => setForm((f) => ({ ...f, itemTitle: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bm-subject">{bi("المادة", "Subject")}</Label>
              <Input
                id="bm-subject"
                value={form.subjectName}
                onChange={(e) => setForm((f) => ({ ...f, subjectName: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{bi("النوع", "Type")}</Label>
              <Select
                value={form.type}
                onValueChange={(v) => setForm((f) => ({ ...f, type: v as BookmarkType }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="درس">{bi("درس", "Lesson")}</SelectItem>
                  <SelectItem value="سؤال">{bi("سؤال", "Question")}</SelectItem>
                  <SelectItem value="نقاش">{bi("نقاش", "Thread")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !form.itemTitle.trim()}
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
              {bi(`إزالة «${pendingDelete?.itemTitle}»؟`, `Remove "${pendingDelete?.itemTitle}"?`)}
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

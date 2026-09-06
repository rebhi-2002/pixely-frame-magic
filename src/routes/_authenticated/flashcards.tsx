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
  deleteFlashcardDeck,
  listFlashcardDecks,
  saveFlashcardDeck,
} from "@/lib/student-learning.functions";
import type { FlashcardDeckRow } from "@/lib/student-learning-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";

const title = "البطاقات | أكاديميا";
const description =
  "مراجعة متباعدة (Spaced repetition): البطاقة ترجع لك في الوقت الذي تنساها فيه بالضبط.";

export const Route = createFileRoute("/_authenticated/flashcards")({
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
    <Guard pageKey="student_flashcards">
      <Body />
    </Guard>
  );
}

const EMPTY_FORM = { deckName: "", totalCards: "0", dueCards: "0", masteredCards: "0" };

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listFlashcardDecks);
  const persist = useServerFn(saveFlashcardDeck);
  const remove = useServerFn(deleteFlashcardDeck);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<FlashcardDeckRow | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["flashcard-decks"],
    queryFn: () => fetchRows(),
  });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["flashcard-decks"] });

  const stats = useMemo(() => {
    const list = rows ?? [];
    const due = list.reduce((s, r) => s + r.dueCards, 0);
    const mastered = list.reduce((s, r) => s + r.masteredCards, 0);
    const total = list.reduce((s, r) => s + r.totalCards, 0);
    const accuracy = total > 0 ? Math.round((mastered / total) * 100) : 0;
    return { due, mastered, accuracy };
  }, [rows]);

  const saveMutation = useMutation({
    mutationFn: () =>
      persist({
        data: {
          ...form,
          id: editingId ?? undefined,
          totalCards: Number(form.totalCards) || 0,
          dueCards: Number(form.dueCards) || 0,
          masteredCards: Number(form.masteredCards) || 0,
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

  function openDialog(row: FlashcardDeckRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            deckName: row.deckName,
            totalCards: String(row.totalCards),
            dueCards: String(row.dueCards),
            masteredCards: String(row.masteredCards),
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <AppPage
      title={bi("البطاقات", "Flashcards")}
      icon="Layers"
      subtitle={bi(
        description,
        "Spaced repetition: each card returns exactly when you're about to forget it.",
      )}
    >
      <StatGrid
        items={[
          { icon: "Layers", label: bi("بطاقات اليوم", "Due today"), value: String(stats.due) },
          {
            icon: "CheckCircle2",
            label: bi("بطاقات مُتقنة", "Mastered"),
            value: String(stats.mastered),
          },
          {
            icon: "Percent",
            label: bi("دقّة التذكّر", "Recall accuracy"),
            value: `${stats.accuracy}%`,
          },
          {
            icon: "Library",
            label: bi("عدد المجموعات", "Decks"),
            value: String(rows?.length ?? 0),
          },
        ]}
      />

      <Panel
        title={bi("مجموعاتك", "Your decks")}
        icon="Layers"
        action={
          can("student_flashcards", "show_add_form") ? (
            <Button size="sm" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة مجموعة", "Add deck")}
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
              title: r.deckName,
              meta: bi(
                `${r.totalCards} بطاقة · ${r.dueCards} مستحقة`,
                `${r.totalCards} cards · ${r.dueCards} due`,
              ),
              value: bi("ابدأ", "Start"),
              tone: "primary" as const,
              actions: (
                <div className="flex items-center gap-1">
                  {can("student_flashcards", "edit") && (
                    <Button size="icon" variant="ghost" onClick={() => openDialog(r)}>
                      <Pencil className="size-4" />
                    </Button>
                  )}
                  {can("student_flashcards", "delete") && (
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
          <EmptyState icon="Layers" text={bi("لا مجموعات بعد.", "No decks yet.")} />
        )}
      </Panel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId ? bi("تعديل مجموعة", "Edit deck") : bi("إضافة مجموعة", "Add deck")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="deck-name">{bi("اسم المجموعة", "Deck name")}</Label>
              <Input
                id="deck-name"
                value={form.deckName}
                onChange={(e) => setForm((f) => ({ ...f, deckName: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="deck-total">{bi("إجمالي البطاقات", "Total cards")}</Label>
              <Input
                id="deck-total"
                type="number"
                min={0}
                value={form.totalCards}
                onChange={(e) => setForm((f) => ({ ...f, totalCards: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="deck-due">{bi("مستحقة اليوم", "Due today")}</Label>
              <Input
                id="deck-due"
                type="number"
                min={0}
                value={form.dueCards}
                onChange={(e) => setForm((f) => ({ ...f, dueCards: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="deck-mastered">{bi("بطاقات مُتقنة", "Mastered cards")}</Label>
              <Input
                id="deck-mastered"
                type="number"
                min={0}
                value={form.masteredCards}
                onChange={(e) => setForm((f) => ({ ...f, masteredCards: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !form.deckName.trim()}
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
              {bi(`حذف «${pendingDelete?.deckName}»؟`, `Delete "${pendingDelete?.deckName}"?`)}
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

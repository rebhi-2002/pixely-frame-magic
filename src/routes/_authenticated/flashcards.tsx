import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Loader2, Pencil, Plus, RotateCw, Trash2 } from "lucide-react";
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
const description = "دفتر متابعة مجموعات بطاقاتك: كم بطاقة عندك، كم مستحقة، وكم أتقنتها.";

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
  const [studyDeck, setStudyDeck] = useState<FlashcardDeckRow | null>(null);
  const [studyIndex, setStudyIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["flashcard-decks"],
    queryFn: () => fetchRows(),
  });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["flashcard-decks"] });

  const stats = useMemo(() => {
    const list = useMemo(() => rows ?? [], [rows]);
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

  function startStudy(row: FlashcardDeckRow) {
    setStudyDeck(row);
    setStudyIndex(0);
    setFlipped(false);
  }

  const currentCard = studyDeck?.cards?.[studyIndex];

  function goToCard(delta: number) {
    if (!studyDeck?.cards) return;
    const next = studyIndex + delta;
    if (next < 0 || next >= studyDeck.cards.length) return;
    setStudyIndex(next);
    setFlipped(false);
  }

  function markMastered() {
    if (!studyDeck) return;
    const nextDue = Math.max(0, studyDeck.dueCards - 1);
    const nextMastered = studyDeck.masteredCards + 1;
    persist({
      data: {
        id: studyDeck.id,
        deckName: studyDeck.deckName,
        totalCards: studyDeck.totalCards,
        dueCards: nextDue,
        masteredCards: nextMastered,
      },
    }).then(() => {
      invalidate();
      setStudyDeck((d) => (d ? { ...d, dueCards: nextDue, masteredCards: nextMastered } : d));
    });
    if (studyDeck.cards && studyIndex < studyDeck.cards.length - 1) {
      goToCard(1);
    } else {
      toast.success(bi("خلّصت مراجعة هالمجموعة 🎉", "You finished reviewing this deck 🎉"));
      setStudyDeck(null);
    }
  }

  return (
    <AppPage
      title={bi("البطاقات", "Flashcards")}
      icon="Layers"
      subtitle={bi(
        description,
        "A tracker for your card decks: how many cards, how many due, how many mastered.",
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
              actions: (
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="secondary" onClick={() => startStudy(r)}>
                    {bi("ابدأ", "Start")}
                  </Button>
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

      {/* وضع المراجعة التفاعلي — قلب بطاقة حقيقي بالمتصفح، مع تحديث فعلي
          لعدد "المُتقنة/المستحقة" عبر نفس دالة الحفظ الموجودة. البطاقات
          نفسها بيانات مثال مؤقتة (راجع تعليق student-learning-data.ts). */}
      <Dialog open={!!studyDeck} onOpenChange={(v) => !v && setStudyDeck(null)}>
        <DialogContent className="text-start sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{studyDeck?.deckName}</DialogTitle>
          </DialogHeader>

          {currentCard ? (
            <div className="space-y-4">
              <p className="text-center text-xs text-muted-foreground">
                {bi(
                  `بطاقة ${studyIndex + 1} من ${studyDeck?.cards?.length}`,
                  `Card ${studyIndex + 1} of ${studyDeck?.cards?.length}`,
                )}
              </p>

              <button
                type="button"
                onClick={() => setFlipped((f) => !f)}
                className="flex min-h-40 w-full items-center justify-center rounded-2xl border border-border bg-card p-6 text-center shadow-elevation-2 transition-all duration-200"
              >
                <span
                  key={flipped ? "back" : "front"}
                  className="animate-in fade-in zoom-in-95 font-display text-lg font-bold text-foreground duration-200"
                >
                  {flipped ? currentCard.back : currentCard.front}
                </span>
              </button>

              <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <RotateCw className="size-3.5" />
                {bi("دوس على البطاقة تشوف الجواب", "Tap the card to see the answer")}
              </p>

              <div className="flex items-center justify-between gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => goToCard(-1)}
                  disabled={studyIndex === 0}
                >
                  <ChevronRight className="size-4" />
                </Button>
                <Button onClick={markMastered} className="flex-1">
                  {bi("أتقنتها ✓", "Got it ✓")}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => goToCard(1)}
                  disabled={!studyDeck?.cards || studyIndex >= studyDeck.cards.length - 1}
                >
                  <ChevronLeft className="size-4" />
                </Button>
              </div>
            </div>
          ) : (
            <EmptyState
              icon="Layers"
              text={bi(
                "هذي المجموعة عدّاد بس، ما إلها بطاقات فعلية بعد. جرّب «رياضيات — مشتقات» كمثال.",
                "This deck is a counter only — no real cards yet. Try “Math — derivatives” as an example.",
              )}
            />
          )}

          <DialogFooter className="sm:justify-start">
            <Button variant="outline" onClick={() => setStudyDeck(null)}>
              {bi("إغلاق", "Close")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppPage>
  );
}

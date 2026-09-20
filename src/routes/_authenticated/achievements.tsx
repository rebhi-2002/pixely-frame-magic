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
import { Switch } from "@/components/ui/switch";
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
import { deleteBadge, listBadges, saveBadge } from "@/lib/student-evaluation.functions";
import { getStudyStats, listLibrarySubjects } from "@/lib/student-learning.functions";
import type { BadgeRow } from "@/lib/student-evaluation-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";
import { authPageHead } from "@/lib/seo";

const description = "تقدّمك يُقاس بالإتقان لا بالساعات: شارات، سلاسل أيام، ونسب إتقان لكل مادة.";

export const Route = createFileRoute("/_authenticated/achievements")({
  head: () =>
    authPageHead(
      {
        title: "الإنجاز | أكاديميا",
        description: "تقدّمك يُقاس بالإتقان لا بالساعات: شارات، سلاسل أيام، ونسب إتقان لكل مادة.",
      },
      {
        title: "Achievements | Academia",
        description:
          "Your progress is measured by mastery, not hours: badges, day streaks, and mastery rates per subject.",
      },
    ),
  component: PageRoute,
});

function PageRoute() {
  return (
    <Guard pageKey="student_achievements">
      <Body />
    </Guard>
  );
}

const EMPTY_FORM = { title: "", subtitle: "", unlocked: false };

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchBadges = useServerFn(listBadges);
  const persist = useServerFn(saveBadge);
  const remove = useServerFn(deleteBadge);
  const fetchStats = useServerFn(getStudyStats);
  const fetchSubjects = useServerFn(listLibrarySubjects);

  const badgesQuery = useQuery({ queryKey: ["badges"], queryFn: () => fetchBadges() });
  const statsQuery = useQuery({ queryKey: ["study-stats"], queryFn: () => fetchStats() });
  const subjectsQuery = useQuery({
    queryKey: ["library-subjects"],
    queryFn: () => fetchSubjects(),
  });

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<BadgeRow | null>(null);

  const isLoading = badgesQuery.isLoading || statsQuery.isLoading || subjectsQuery.isLoading;
  const badges = useMemo(() => badgesQuery.data ?? [], [badgesQuery.data]);
  const stats = statsQuery.data ?? { streakDays: 0, achievementPoints: 0, longestStreak: 0 };
  const subjects = useMemo(() => subjectsQuery.data ?? [], [subjectsQuery.data]);
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["badges"] });

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
      toast.success(bi("تم الحذف", "Deleted successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete"))),
  });

  function openDialog(row: BadgeRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row ? { title: row.title, subtitle: row.subtitle, unlocked: row.unlocked } : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <AppPage
      title={bi("الإنجاز", "Achievements")}
      icon="Trophy"
      subtitle={bi(
        description,
        "Progress measured by mastery, not hours: badges, streaks and per-subject mastery.",
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
                icon: "Trophy",
                label: bi("نقاط الإنجاز", "Points"),
                value: String(stats.achievementPoints),
              },
              {
                icon: "Medal",
                label: bi("شارات مفتوحة", "Unlocked badges"),
                value: `${unlockedCount}/${badges.length}`,
              },
              {
                icon: "Flame",
                label: bi("أطول سلسلة", "Longest streak"),
                value: String(stats.longestStreak),
              },
              {
                icon: "Flame",
                label: bi("السلسلة الحالية", "Current streak"),
                value: String(stats.streakDays),
              },
            ]}
          />

          <Panel
            title={bi("شاراتك", "Your badges")}
            icon="Medal"
            action={
              can("student_achievements", "show_add_form") ? (
                <Button size="sm" onClick={() => openDialog(null)}>
                  <Plus className="size-4" />
                  {bi("إضافة شارة", "Add badge")}
                </Button>
              ) : undefined
            }
          >
            {badges.length ? (
              <RowList
                rows={badges.map((b) => ({
                  title: b.title,
                  meta: b.subtitle,
                  value: bi(b.unlocked ? "مفتوحة" : "قريباً", b.unlocked ? "Unlocked" : "Almost"),
                  tone: b.unlocked ? ("success" as const) : ("primary" as const),
                  actions: (
                    <div className="flex items-center gap-1">
                      {can("student_achievements", "edit") && (
                        <Button size="icon" variant="ghost" onClick={() => openDialog(b)}>
                          <Pencil className="size-4" />
                        </Button>
                      )}
                      {can("student_achievements", "delete") && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive"
                          onClick={() => setPendingDelete(b)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>
                  ),
                }))}
              />
            ) : (
              <EmptyState icon="Medal" text={bi("لا شارات بعد.", "No badges yet.")} />
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
        </>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId ? bi("تعديل شارة", "Edit badge") : bi("إضافة شارة", "Add badge")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="bdg-title">{bi("العنوان", "Title")}</Label>
              <Input
                id="bdg-title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="bdg-subtitle">{bi("الوصف", "Subtitle")}</Label>
              <Input
                id="bdg-subtitle"
                value={form.subtitle}
                onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
              />
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <Switch
                id="bdg-unlocked"
                checked={form.unlocked}
                onCheckedChange={(v) => setForm((f) => ({ ...f, unlocked: v }))}
              />
              <Label htmlFor="bdg-unlocked">{bi("مفتوحة", "Unlocked")}</Label>
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

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
  deleteReferral,
  getReferralLink,
  listReferrals,
  saveReferral,
} from "@/lib/student-social.functions";
import type { ReferralRow, ReferralStatus } from "@/lib/student-social-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";

const title = "الإحالات | أكاديميا";
const description = "ادعُ أصدقاءك برابطك الخاص، وتابع كم صديق سجّل فعلياً ومكافآتك.";

export const Route = createFileRoute("/_authenticated/referrals")({
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
    <Guard pageKey="student_referrals">
      <Body />
    </Guard>
  );
}

const EMPTY_FORM = { friendName: "", dateLabel: "", status: "معلّق" as ReferralStatus };

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listReferrals);
  const persist = useServerFn(saveReferral);
  const remove = useServerFn(deleteReferral);
  const fetchLink = useServerFn(getReferralLink);

  const rowsQuery = useQuery({ queryKey: ["referrals"], queryFn: () => fetchRows() });
  const linkQuery = useQuery({ queryKey: ["referral-link"], queryFn: () => fetchLink() });

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<ReferralRow | null>(null);

  const list = rowsQuery.data ?? [];
  const isLoading = rowsQuery.isLoading || linkQuery.isLoading;
  const stats = useMemo(() => {
    const rewarded = list.filter((r) => r.status === "مكافأة").length;
    return { sent: list.length, joined: rewarded, months: rewarded };
  }, [list]);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["referrals"] });

  const saveMutation = useMutation({
    mutationFn: () => persist({ data: { ...form, id: editingId ?? undefined } }),
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

  function openDialog(row: ReferralRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? { friendName: row.friendName, dateLabel: row.dateLabel, status: row.status }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <AppPage
      title={bi("الإحالات", "Referrals")}
      icon="Gift"
      subtitle={bi(
        description,
        "Invite friends with your own link, and track who joined and what you earned.",
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
                icon: "Link",
                label: bi("رابطك", "Your link"),
                value: `acadimia/r/${linkQuery.data?.code ?? "—"}`,
              },
              {
                icon: "UserPlus",
                label: bi("دعوات مُرسلة", "Invites sent"),
                value: String(stats.sent),
              },
              {
                icon: "CheckCircle2",
                label: bi("سجّلوا فعلياً", "Joined"),
                value: String(stats.joined),
              },
              {
                icon: "Gift",
                label: bi("مكافآتك", "Rewards"),
                value: bi(`${stats.months} شهور`, `${stats.months} months`),
              },
            ]}
          />

          <Panel
            title={bi("من دعوتهم", "People you invited")}
            icon="Users"
            action={
              can("student_referrals", "show_add_form") ? (
                <Button size="sm" onClick={() => openDialog(null)}>
                  <Plus className="size-4" />
                  {bi("إضافة دعوة", "Add invite")}
                </Button>
              ) : undefined
            }
          >
            {list.length ? (
              <RowList
                rows={list.map((r) => ({
                  title: r.friendName,
                  meta:
                    r.status === "مكافأة"
                      ? bi(`سجّل ${r.dateLabel}`, `Joined ${r.dateLabel}`)
                      : bi("الدعوة مفتوحة", "Invite pending"),
                  value: bi(r.status, r.status === "مكافأة" ? "Rewarded" : "Pending"),
                  tone: r.status === "مكافأة" ? ("success" as const) : ("muted" as const),
                  actions: (
                    <div className="flex items-center gap-1">
                      {can("student_referrals", "edit") && (
                        <Button size="icon" variant="ghost" onClick={() => openDialog(r)}>
                          <Pencil className="size-4" />
                        </Button>
                      )}
                      {can("student_referrals", "delete") && (
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
                icon="Users"
                text={bi(
                  "لسا ما دعوت حد — شارك رابطك!",
                  "You haven't invited anyone yet — share your link!",
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
              {editingId ? bi("تعديل دعوة", "Edit invite") : bi("إضافة دعوة", "Add invite")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="ref-name">{bi("اسم الصديق", "Friend's name")}</Label>
              <Input
                id="ref-name"
                value={form.friendName}
                onChange={(e) => setForm((f) => ({ ...f, friendName: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ref-date">{bi("تاريخ التسجيل", "Join date")}</Label>
              <Input
                id="ref-date"
                value={form.dateLabel}
                onChange={(e) => setForm((f) => ({ ...f, dateLabel: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{bi("الحالة", "Status")}</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as ReferralStatus }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="معلّق">{bi("معلّق", "Pending")}</SelectItem>
                  <SelectItem value="مكافأة">{bi("مكافأة", "Rewarded")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !form.friendName.trim()}
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
              {bi(`حذف «${pendingDelete?.friendName}»؟`, `Delete "${pendingDelete?.friendName}"?`)}
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

import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Plus, UserMinus } from "lucide-react";
import { AppPage, StatGrid, Panel, RowList, QuickLinks, EmptyState } from "@/components/app/kit";
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
import {
  addLinkedChild,
  getParentNotificationPrefs,
  listLinkedChildren,
  saveParentNotificationPrefs,
  unlinkChild,
} from "@/lib/account-pages.functions";
import type { LinkedChildRow } from "@/lib/account-pages-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";
import { authPageHead } from "@/lib/seo";
import { LoadingState } from "@/components/app/feedback-states";

const description = "الأبناء المرتبطون بحسابك، فك الربط، وتفضيلات الإشعارات والتقارير.";

export const Route = createFileRoute("/_authenticated/parent/settings")({
  head: () =>
    authPageHead(
      {
        title: "إعدادات ولي الأمر | أكاديميا",
        description: "الأبناء المرتبطون بحسابك، فك الربط، وتفضيلات الإشعارات والتقارير.",
      },
      {
        title: "Parent settings | Academia",
        description:
          "Children linked to your account, unlinking, and notification/report preferences.",
      },
    ),
  component: PageRoute,
});

function PageRoute() {
  return (
    <Guard pageKey="parent_settings">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchChildren = useServerFn(listLinkedChildren);
  const addChild = useServerFn(addLinkedChild);
  const removeChild = useServerFn(unlinkChild);
  const fetchPrefs = useServerFn(getParentNotificationPrefs);
  const persistPrefs = useServerFn(saveParentNotificationPrefs);

  const childrenQuery = useQuery({ queryKey: ["linked-children"], queryFn: () => fetchChildren() });
  const prefsQuery = useQuery({
    queryKey: ["parent-notification-prefs"],
    queryFn: () => fetchPrefs(),
  });

  const [addOpen, setAddOpen] = useState(false);
  const [childForm, setChildForm] = useState({ childName: "", gradeLabel: "" });
  const [pendingUnlink, setPendingUnlink] = useState<LinkedChildRow | null>(null);

  const isLoading = childrenQuery.isLoading || prefsQuery.isLoading;
  const children = useMemo(() => childrenQuery.data ?? [], [childrenQuery.data]);
  const prefs = prefsQuery.data ?? {
    weeklyReport: true,
    masteryAlert: true,
    teacherMessages: true,
  };

  const addMutation = useMutation({
    mutationFn: () => addChild({ data: childForm }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["linked-children"] });
      setAddOpen(false);
      setChildForm({ childName: "", gradeLabel: "" });
      toast.success(bi("تم الربط", "Linked successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الربط", "Failed to link"))),
  });

  const unlinkMutation = useMutation({
    mutationFn: (id: string) => removeChild({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["linked-children"] });
      setPendingUnlink(null);
      toast.success(bi("تم فك الربط", "Unlinked successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر فك الربط", "Failed to unlink"))),
  });

  const prefsMutation = useMutation({
    mutationFn: (next: typeof prefs) => persistPrefs({ data: next }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parent-notification-prefs"] });
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save"))),
  });

  return (
    <AppPage
      title={bi("إعدادات ولي الأمر", "Parent settings")}
      icon="Settings"
      subtitle={bi(description, "Linked children, unlinking, and notification/report preferences.")}
    >
      {isLoading ? (
        <LoadingState
          label={bi("جارٍ التحميل…", "Loading…")}
          className="border-none bg-transparent"
        />
      ) : (
        <>
          <StatGrid
            items={[
              {
                icon: "Users",
                label: bi("أبناء مرتبطون", "Linked children"),
                value: String(children.length),
              },
              {
                icon: "Mail",
                label: bi("تقرير أسبوعي", "Weekly report"),
                value: bi(
                  prefs.weeklyReport ? "مفعّل" : "متوقّف",
                  prefs.weeklyReport ? "On" : "Off",
                ),
              },
              {
                icon: "BellRing",
                label: bi("تنبيهات فورية", "Instant alerts"),
                value: bi(
                  prefs.masteryAlert ? "مفعّلة" : "متوقّفة",
                  prefs.masteryAlert ? "On" : "Off",
                ),
              },
              {
                icon: "ShieldCheck",
                label: bi("حالة الحساب", "Account status"),
                value: bi("موثّق", "Verified"),
              },
            ]}
          />

          <Panel
            title={bi("الأبناء المرتبطون", "Linked children")}
            icon="Users"
            action={
              can("parent_settings", "show_add_form") ? (
                <Button size="sm" onClick={() => setAddOpen(true)}>
                  <Plus className="size-4" />
                  {bi("ربط ابن", "Link child")}
                </Button>
              ) : undefined
            }
          >
            {children.length ? (
              <RowList
                rows={children.map((c) => ({
                  title: bi(`${c.childName} — ${c.gradeLabel}`, `${c.childName} — ${c.gradeLabel}`),
                  meta: bi(`ارتبط ${c.linkedDateLabel}`, `Linked ${c.linkedDateLabel}`),
                  tone: "primary" as const,
                  actions: can("parent_settings", "delete") ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive"
                      onClick={() => setPendingUnlink(c)}
                    >
                      <UserMinus className="size-4" />
                      {bi("فك الربط", "Unlink")}
                    </Button>
                  ) : undefined,
                }))}
              />
            ) : (
              <EmptyState icon="Users" text={bi("ولا ابن مرتبط بعد.", "No linked children yet.")} />
            )}
          </Panel>

          <Panel title={bi("الإشعارات", "Notifications")} icon="BellRing">
            <RowList
              rows={[
                {
                  title: bi("تقرير أسبوعي بالإيميل", "Weekly email report"),
                  meta: bi("كل أحد 8:00", "Every Sunday 8:00"),
                  value: bi(
                    prefs.weeklyReport ? "مفعّل" : "متوقّف",
                    prefs.weeklyReport ? "On" : "Off",
                  ),
                  tone: prefs.weeklyReport ? "success" : "muted",
                  actions: can("parent_settings", "edit") ? (
                    <Switch
                      checked={prefs.weeklyReport}
                      onCheckedChange={(v) => prefsMutation.mutate({ ...prefs, weeklyReport: v })}
                    />
                  ) : undefined,
                },
                {
                  title: bi("تنبيه تراجع الإتقان", "Mastery drop alert"),
                  meta: bi("فوري", "Instant"),
                  value: bi(
                    prefs.masteryAlert ? "مفعّل" : "متوقّف",
                    prefs.masteryAlert ? "On" : "Off",
                  ),
                  tone: prefs.masteryAlert ? "success" : "muted",
                  actions: can("parent_settings", "edit") ? (
                    <Switch
                      checked={prefs.masteryAlert}
                      onCheckedChange={(v) => prefsMutation.mutate({ ...prefs, masteryAlert: v })}
                    />
                  ) : undefined,
                },
                {
                  title: bi("رسائل المعلمين", "Teacher messages"),
                  meta: bi("ملخّص يومي", "Daily digest"),
                  value: bi(
                    prefs.teacherMessages ? "مفعّل" : "متوقّف",
                    prefs.teacherMessages ? "On" : "Off",
                  ),
                  tone: prefs.teacherMessages ? "success" : "muted",
                  actions: can("parent_settings", "edit") ? (
                    <Switch
                      checked={prefs.teacherMessages}
                      onCheckedChange={(v) =>
                        prefsMutation.mutate({ ...prefs, teacherMessages: v })
                      }
                    />
                  ) : undefined,
                },
              ]}
            />
          </Panel>

          <Panel title={bi("روابط سريعة", "Quick links")} icon="Settings">
            <QuickLinks
              items={[
                {
                  to: "/parent/report",
                  label: bi("تقرير الابن", "Child report"),
                  icon: "FileBarChart",
                },
                { to: "/notifications", label: bi("الإشعارات", "Notifications"), icon: "Bell" },
                { to: "/settings", label: bi("اللغة والثيم", "Language & theme"), icon: "Palette" },
              ]}
            />
          </Panel>
        </>
      )}

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>{bi("ربط ابن جديد", "Link a new child")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="lc-name">{bi("اسم الابن", "Child's name")}</Label>
              <Input
                id="lc-name"
                value={childForm.childName}
                onChange={(e) => setChildForm((f) => ({ ...f, childName: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lc-grade">{bi("الصف", "Grade")}</Label>
              <Input
                id="lc-grade"
                value={childForm.gradeLabel}
                onChange={(e) => setChildForm((f) => ({ ...f, gradeLabel: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => addMutation.mutate()}
              disabled={
                addMutation.isPending || !childForm.childName.trim() || !childForm.gradeLabel.trim()
              }
            >
              {bi("ربط", "Link")}
            </Button>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              {bi("إلغاء", "Cancel")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!pendingUnlink} onOpenChange={(v) => !v && setPendingUnlink(null)}>
        <AlertDialogContent className="text-start">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {bi(
                `فك الربط مع «${pendingUnlink?.childName}»؟`,
                `Unlink "${pendingUnlink?.childName}"?`,
              )}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:justify-start">
            <AlertDialogAction
              onClick={() => pendingUnlink && unlinkMutation.mutate(pendingUnlink.id)}
            >
              {bi("فك الربط", "Unlink")}
            </AlertDialogAction>
            <AlertDialogCancel>{bi("إلغاء", "Cancel")}</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppPage>
  );
}

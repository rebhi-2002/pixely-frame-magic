import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Pencil } from "lucide-react";
import { AppPage, StatGrid, Panel, RowList, QuickLinks } from "@/components/app/kit";
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
import { getTeacherSettings, saveTeacherSettings } from "@/lib/account-pages.functions";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";

const title = "إعدادات المعلم | أكاديميا";
const description = "التسعير، أوقات التوفّر، بيانات الدفع، وتفضيلات الإشعارات.";

export const Route = createFileRoute("/_authenticated/teacher/settings")({
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
    <Guard pageKey="teacher_settings">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchSettings = useServerFn(getTeacherSettings);
  const persist = useServerFn(saveTeacherSettings);

  const { data: settings, isLoading } = useQuery({
    queryKey: ["teacher-settings"],
    queryFn: () => fetchSettings(),
  });

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    privateSessionPrice: "0",
    availabilityLabel: "",
    payoutMethodLabel: "",
    notifyNewQuestion: true,
  });

  const saveMutation = useMutation({
    mutationFn: () =>
      persist({ data: { ...form, privateSessionPrice: Number(form.privateSessionPrice) || 0 } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-settings"] });
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : bi("تعذّر الحفظ", "Failed to save")),
  });

  function openDialog() {
    if (!settings) return;
    setForm({
      privateSessionPrice: String(settings.privateSessionPrice),
      availabilityLabel: settings.availabilityLabel,
      payoutMethodLabel: settings.payoutMethodLabel,
      notifyNewQuestion: settings.notifyNewQuestion,
    });
    setOpen(true);
  }

  return (
    <AppPage
      title={bi("إعدادات المعلم", "Teacher settings")}
      icon="Settings"
      subtitle={bi(
        description,
        "Pricing, availability, payout details and notification preferences.",
      )}
    >
      {isLoading || !settings ? (
        <div className="flex justify-center py-10">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <StatGrid
            items={[
              {
                icon: "BadgePercent",
                label: bi("سعر الحصة الخاصة", "Private session"),
                value: bi(
                  `${settings.privateSessionPrice} ₪`,
                  `${settings.privateSessionPrice} ILS`,
                ),
              },
              {
                icon: "CalendarClock",
                label: bi("أوقات التوفّر", "Availability"),
                value: settings.availabilityLabel,
              },
              {
                icon: "Banknote",
                label: bi("طريقة السحب", "Payout method"),
                value: settings.payoutMethodLabel,
              },
              {
                icon: "BellRing",
                label: bi("إشعار سؤال جديد", "New question alert"),
                value: bi(
                  settings.notifyNewQuestion ? "مفعّل" : "متوقّف",
                  settings.notifyNewQuestion ? "On" : "Off",
                ),
              },
            ]}
          />

          <Panel
            title={bi("الإعدادات", "Settings")}
            icon="Settings"
            action={
              can("teacher_settings", "edit") ? (
                <Button size="sm" variant="outline" onClick={openDialog}>
                  <Pencil className="size-4" />
                  {bi("تعديل", "Edit")}
                </Button>
              ) : undefined
            }
          >
            <RowList
              rows={[
                {
                  title: bi("سعر الحصة الخاصة", "Private session price"),
                  meta: bi(
                    `${settings.privateSessionPrice} ₪ / ساعة`,
                    `${settings.privateSessionPrice} ILS / hour`,
                  ),
                  tone: "primary",
                },
                {
                  title: bi("أوقات التوفّر", "Availability"),
                  meta: settings.availabilityLabel,
                  tone: "primary",
                },
                {
                  title: bi("بيانات الحوالة", "Bank details"),
                  meta: settings.payoutMethodLabel,
                  tone: "primary",
                },
                {
                  title: bi("إشعار سؤال جديد", "New question alert"),
                  meta: bi("فوري", "Instant"),
                  value: bi(
                    settings.notifyNewQuestion ? "مفعّل" : "متوقّف",
                    settings.notifyNewQuestion ? "On" : "Off",
                  ),
                  tone: settings.notifyNewQuestion ? "success" : "muted",
                },
              ]}
            />
          </Panel>

          <Panel title={bi("روابط سريعة", "Quick links")} icon="Settings">
            <QuickLinks
              items={[
                {
                  to: "/teacher/profile/edit",
                  label: bi("ملفي العام", "Public profile"),
                  icon: "UserCog",
                },
                { to: "/teacher/earnings", label: bi("الأرباح", "Earnings"), icon: "Wallet" },
                { to: "/settings", label: bi("اللغة والثيم", "Language & theme"), icon: "Palette" },
              ]}
            />
          </Panel>
        </>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>{bi("تعديل الإعدادات", "Edit settings")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="ts-price">
                {bi("سعر الحصة الخاصة (₪)", "Private session (ILS)")}
              </Label>
              <Input
                id="ts-price"
                type="number"
                min={0}
                value={form.privateSessionPrice}
                onChange={(e) => setForm((f) => ({ ...f, privateSessionPrice: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ts-payout">{bi("طريقة السحب", "Payout method")}</Label>
              <Input
                id="ts-payout"
                value={form.payoutMethodLabel}
                onChange={(e) => setForm((f) => ({ ...f, payoutMethodLabel: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="ts-availability">{bi("أوقات التوفّر", "Availability")}</Label>
              <Input
                id="ts-availability"
                value={form.availabilityLabel}
                onChange={(e) => setForm((f) => ({ ...f, availabilityLabel: e.target.value }))}
              />
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <Switch
                id="ts-notify"
                checked={form.notifyNewQuestion}
                onCheckedChange={(v) => setForm((f) => ({ ...f, notifyNewQuestion: v }))}
              />
              <Label htmlFor="ts-notify">
                {bi("تنبيه فوري بسؤال جديد", "Instant new-question alert")}
              </Label>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
              {bi("حفظ", "Save")}
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {bi("إلغاء", "Cancel")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppPage>
  );
}

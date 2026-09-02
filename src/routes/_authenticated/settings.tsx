import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { LogOut, Palette, Pencil, ShieldCheck, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/admin/page-header";
import { usePreferences } from "@/components/providers/preferences-provider";
import { useSignOut, SignOutOverlay } from "@/hooks/use-sign-out";
import { useAccess, useInvalidateAccess } from "@/hooks/use-access";
import { Guard } from "@/components/app/guard";
import { ROLE_NAME_EN } from "@/lib/rbac-types";
import { useBi } from "@/lib/bi";
import { updateOwnProfile } from "@/lib/rbac.functions";
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

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({
    meta: [
      { title: "الإعدادات | أكاديميا" },
      { name: "description", content: "اللغة، الثيم، وبيانات حسابك في أكاديميا." },
      { property: "og:title", content: "الإعدادات | أكاديميا" },
      { property: "og:description", content: "تفضيلاتك تُحفظ على جهازك وعلى حسابك معاً." },
    ],
  }),
  component: () => (
    <Guard pageKey="account_settings">
      <SettingsPage />
    </Guard>
  ),
});

const THEMES = ["light", "dark", "auto"] as const;
const LOCALES = ["ar", "en"] as const;

function SettingsPage() {
  const { t } = useTranslation();
  const bi = useBi();
  const invalidateAccess = useInvalidateAccess();
  const { access, can } = useAccess();
  const { signOut, pending: signingOut } = useSignOut("/login");
  const { theme, setTheme, locale, setLocale } = usePreferences();
  const updateProfile = useServerFn(updateOwnProfile);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ full_name: "", email: "" });

  const saveMutation = useMutation({
    mutationFn: () => updateProfile({ data: form }),
    onSuccess: () => {
      invalidateAccess();
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : bi("تعذّر الحفظ", "Failed to save")),
  });

  function openDialog() {
    setForm({ full_name: access?.profile?.full_name ?? "", email: access?.profile?.email ?? "" });
    setOpen(true);
  }

  return (
    <div>
      <SignOutOverlay pending={signingOut} />
      <PageHeader title={t("settings.h1")} icon="Settings" />
      <div className="mx-auto max-w-3xl px-5 py-6">
        <p className="text-sm text-muted-foreground">{t("settings.sub")}</p>

        <section className="shadow-elevation-1 mt-6 rounded-2xl border border-border bg-card p-6">
          <h2 className="inline-flex items-center gap-2 font-bold text-foreground">
            <Palette className="size-4 text-primary" />
            {t("settings.langThemeTab")}
          </h2>

          <div className="mt-5">
            <p className="text-sm font-semibold text-foreground">{t("settings.theme")}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {THEMES.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTheme(value)}
                  className={`rounded-lg border px-3.5 py-2 text-xs font-bold transition-colors ${
                    theme === value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(`common.theme.${value}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-foreground">{t("settings.language")}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {LOCALES.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setLocale(value)}
                  className={`rounded-lg border px-3.5 py-2 text-xs font-bold transition-colors ${
                    locale === value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(`common.language.${value}`)}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="shadow-elevation-1 mt-4 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="inline-flex items-center gap-2 font-bold text-foreground">
              <UserRound className="size-4 text-primary" />
              {t("settings.account")}
            </h2>
            {can("account_settings", "edit_profile") && (
              <Button size="sm" variant="outline" onClick={openDialog}>
                <Pencil className="size-4" />
                {bi("تعديل", "Edit")}
              </Button>
            )}
          </div>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">{t("settings.name")}</dt>
              <dd className="font-semibold text-foreground">{access?.profile?.full_name ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">{t("settings.email")}</dt>
              <dd className="font-semibold text-foreground">{access?.profile?.email ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">{t("settings.role")}</dt>
              <dd className="font-semibold text-foreground">
                {access?.profile?.role_name
                  ? bi(
                      access.profile.role_name,
                      ROLE_NAME_EN[access.profile.role_name] ?? access.profile.role_name,
                    )
                  : "—"}
              </dd>
            </div>
          </dl>
        </section>

        <section className="shadow-elevation-1 mt-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="inline-flex items-center gap-2 font-bold text-foreground">
            <ShieldCheck className="size-4 text-primary" />
            {t("settings.security")}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">{t("settings.idleNote")}</p>
          <button
            type="button"
            onClick={() => void signOut()}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
          >
            <LogOut className="size-4" />
            {t(signingOut ? "common.signingOut" : "settings.signOut")}
          </button>
        </section>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>{bi("تعديل بيانات الحساب", "Edit account details")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="acc-name">{t("settings.name")}</Label>
              <Input
                id="acc-name"
                value={form.full_name}
                onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="acc-email">{t("settings.email")}</Label>
              <Input
                id="acc-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !form.full_name.trim()}
            >
              {bi("حفظ", "Save")}
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {bi("إلغاء", "Cancel")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

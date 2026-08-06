import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, AuthField } from "@/components/site/auth-shell";
import { currentUserHome } from "@/lib/session-home";

const title = "تعيين كلمة مرور جديدة | أكاديميا";
const description = "اختر كلمة مرور جديدة لحسابك في أكاديميا.";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [ready, setReady] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  // رابط الاستعادة يُنشئ جلسة recovery؛ بدونها الرابط منتهٍ أو غير صالح.
  useEffect(() => {
    let active = true;
    const check = async () => {
      const hash = window.location.hash;
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      setReady(Boolean(data.session) || hash.includes("type=recovery"));
    };
    void check();
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) {
      toast.error(t("authPages.signup.passwordHint"));
      return;
    }
    if (password !== confirm) {
      toast.error(t("authPages.reset.mismatch"));
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(t("authPages.reset.success"));
    navigate({ href: (await currentUserHome()) ?? "/dashboard", replace: true });
  }

  return (
    <AuthShell
      icon={<ShieldCheck className="size-5" />}
      title={t("authPages.reset.h1")}
      subtitle={ready === false ? t("authPages.reset.invalid") : t("authPages.reset.sub")}
    >
      {ready === false ? (
        <Link
          to="/forgot-password"
          className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {t("authPages.reset.requestNew")}
        </Link>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <AuthField
            id="password"
            label={t("authPages.reset.password")}
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
          />
          <AuthField
            id="confirm"
            label={t("authPages.reset.confirm")}
            type="password"
            value={confirm}
            onChange={setConfirm}
            autoComplete="new-password"
          />
          <button
            type="submit"
            disabled={loading || ready === null}
            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? t("common.loading") : t("authPages.reset.submit")}
          </button>
        </form>
      )}
    </AuthShell>
  );
}

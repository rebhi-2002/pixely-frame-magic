import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
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

  // إعادة تعيين كلمة المرور غير متاحة بعد على الباك اند الجديد (لا يوجد
  // تدفّق recovery حالياً) — راجع src/routes/forgot-password.tsx.
  useEffect(() => {
    setReady(false);
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
    setLoading(false);
    toast.error("إعادة تعيين كلمة المرور غير متاحة حالياً — قيد الربط مع الباك اند الجديد.");
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

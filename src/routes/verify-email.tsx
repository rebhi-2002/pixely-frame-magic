import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { MailCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, AuthField } from "@/components/site/auth-shell";

const title = "تفعيل الحساب | أكاديميا";
const description = "فعّل حسابك في أكاديميا من الرابط المرسل إلى بريدك.";

export const Route = createFileRoute("/verify-email")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({
    email: typeof search.email === "string" ? search.email : undefined,
  }),
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
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const { t } = useTranslation();
  const { email: initialEmail } = Route.useSearch();
  const [email, setEmail] = useState(initialEmail ?? "");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email_confirmed_at) setVerified(true);
      if (data.user?.email && !initialEmail) setEmail(data.user.email);
    });
  }, [initialEmail]);

  async function resend() {
    const parsed = z.string().trim().email().safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: parsed.data,
      options: { emailRedirectTo: `${window.location.origin}/verify-email` },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(t("authPages.verify.resent"));
  }

  return (
    <AuthShell
      icon={<MailCheck className="size-5" />}
      title={t("authPages.verify.h1")}
      subtitle={verified ? t("authPages.verify.verified") : t("authPages.verify.sub")}
    >
      {verified ? (
        <Link
          to="/dashboard"
          className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {t("authPages.verify.goDashboard")}
        </Link>
      ) : (
        <div className="space-y-4">
          <AuthField
            id="email"
            label={t("authPages.verify.emailPlaceholder")}
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
          />
          <button
            type="button"
            onClick={resend}
            disabled={loading}
            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? t("common.loading") : t("authPages.verify.resend")}
          </button>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-muted-foreground">
        <Link to="/login" className="font-bold text-primary hover:underline">
          {t("authPages.verify.back")}
        </Link>
      </p>
    </AuthShell>
  );
}

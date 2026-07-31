import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { KeyRound, MailCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, AuthField } from "@/components/site/auth-shell";

const title = "استعادة كلمة المرور | أكاديميا";
const description = "أرسل رابط استعادة كلمة المرور إلى بريدك الإلكتروني.";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = z.string().trim().email().safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    await supabase.auth.resetPasswordForEmail(parsed.data, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    setSent(true);
    toast.success(t("authPages.forgot.sent"));
  }

  return (
    <AuthShell
      icon={sent ? <MailCheck className="size-5" /> : <KeyRound className="size-5" />}
      title={t("authPages.forgot.h1")}
      subtitle={sent ? t("authPages.forgot.sent") : t("authPages.forgot.sub")}
    >
      {!sent && (
        <form onSubmit={submit} className="space-y-4">
          <AuthField
            id="email"
            label={t("authPages.forgot.email")}
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? t("common.loading") : t("authPages.forgot.submit")}
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-xs text-muted-foreground">
        <Link to="/login" className="font-bold text-primary hover:underline">
          {t("authPages.forgot.back")}
        </Link>
      </p>
    </AuthShell>
  );
}

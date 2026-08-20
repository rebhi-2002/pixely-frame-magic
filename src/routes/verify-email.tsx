import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { MailCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AuthShell, AuthField } from "@/components/site/auth-shell";
import { currentUserHome } from "@/lib/session-home";

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
  const navigate = useNavigate();
  const { email: initialEmail } = Route.useSearch();
  const [email, setEmail] = useState(initialEmail ?? "");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // تفعيل البريد غير مطلوب حالياً — التسجيل بالكامل موقوف مؤقتاً (راجع
    // src/routes/signup.tsx) لحد ما يضيف الباك اند الجديد endpoints له.
  }, [initialEmail]);

  async function resend() {
    const parsed = z.string().trim().email().safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    setLoading(false);
    toast.error("إعادة إرسال رابط التفعيل غير متاح حالياً — قيد الربط مع الباك اند الجديد.");
  }

  return (
    <AuthShell
      icon={<MailCheck className="size-5" />}
      title={t("authPages.verify.h1")}
      subtitle={verified ? t("authPages.verify.verified") : t("authPages.verify.sub")}
    >
      {verified ? (
        <button
          type="button"
          onClick={async () =>
            navigate({ href: (await currentUserHome()) ?? "/dashboard", replace: true })
          }
          className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {t("authPages.verify.goDashboard")}
        </button>
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

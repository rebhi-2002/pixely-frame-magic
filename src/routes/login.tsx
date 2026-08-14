import { useState } from "react";
import { createFileRoute, useNavigate, Link, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { AuthShell, AuthField } from "@/components/site/auth-shell";
import { currentUserHome } from "@/lib/session-home";
import { ensureDemoAccount } from "@/lib/demo-auth.functions";
import { useServerFn } from "@tanstack/react-start";

/* أزرار دخول سريعة للاختبار فقط — تُحذف قبل النشر النهائي. */
const DEMO_ROLES = [
  { role: "admin", label: "أدمن" },
  { role: "supervisor", label: "مشرف" },
  { role: "teacher", label: "معلم" },
  { role: "parent", label: "ولي أمر" },
  { role: "student", label: "طالب" },
] as const;

const title = "تسجيل الدخول | Academia";
const description = "سجّل الدخول إلى حسابك في Academia وتابع دراستك من حيث توقفت.";

export const Route = createFileRoute("/login")({
  ssr: false,
  beforeLoad: async () => {
    /* المستخدم المسجّل يعود للموقع العام لا للوحة التحكم مباشرة */
    if (await currentUserHome()) throw redirect({ to: "/" });
  },
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
  component: LoginPage,
});

const schema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6),
});

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [demoBusy, setDemoBusy] = useState<string | null>(null);
  const prepareDemo = useServerFn(ensureDemoAccount);

  async function quickLogin(role: (typeof DEMO_ROLES)[number]["role"]) {
    setDemoBusy(role);
    try {
      const creds = await prepareDemo({ data: { role } });
      const { error } = await supabase.auth.signInWithPassword(creds);
      if (error) throw error;
      toast.success(t("authPages.login.success"));
      navigate({ to: "/", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذّر الدخول التجريبي");
    } finally {
      setDemoBusy(null);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword(parsed.data);
      if (error) throw error;
      toast.success(t("authPages.login.success"));
      navigate({ to: "/", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "…");
    } finally {
      setLoading(false);
    }
  }

  async function google() {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setLoading(false);
      toast.error(result.error.message ?? "Google");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/", replace: true });
  }

  return (
    <AuthShell
      icon={<LogIn className="size-5" />}
      title={t("authPages.login.h1")}
      subtitle={t("authPages.login.sub")}
    >
      <form onSubmit={submit} className="space-y-4">
        <AuthField
          id="email"
          label={t("authPages.login.email")}
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
        />
        <AuthField
          id="password"
          label={t("authPages.login.password")}
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
        />
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-xs font-semibold text-primary hover:underline"
          >
            {t("authPages.login.forgot")}
          </Link>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading ? t("common.loading") : t("authPages.login.submit")}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">{t("authPages.login.or")}</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button"
        onClick={google}
        disabled={loading}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary disabled:opacity-60"
      >
        {t("authPages.login.google")}
      </button>

      <div className="mt-6 rounded-2xl border border-dashed border-border bg-secondary/40 p-3">
        <p className="mb-2 text-center text-xs font-bold text-muted-foreground">
          دخول سريع للاختبار (مؤقت)
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {DEMO_ROLES.map((d) => (
            <button
              key={d.role}
              type="button"
              disabled={loading || demoBusy !== null}
              onClick={() => quickLogin(d.role)}
              className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:border-primary/60 hover:text-primary disabled:opacity-60"
            >
              {demoBusy === d.role ? "…" : d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-1.5 text-center text-xs text-muted-foreground">
        <p>
          {t("authPages.login.noAccount")}{" "}
          <Link to="/signup" className="font-bold text-primary hover:underline">
            {t("authPages.login.signupLink")}
          </Link>
        </p>
        <p>
          {t("authPages.login.teacherHint")}{" "}
          <Link to="/teacher/register" className="font-bold text-primary hover:underline">
            {t("authPages.login.teacherLink")}
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}

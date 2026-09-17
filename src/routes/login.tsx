import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { useState } from "react";
import { createFileRoute, useNavigate, Link, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";
import { login, loginAsDemo, getStoredProfile } from "@/integrations/backend/auth";
import { getErrorMessage } from "@/integrations/backend/client";
import { AuthShell, AuthField } from "@/components/site/auth-shell";
import { currentUserHome } from "@/lib/session-home";
import { USERS } from "@/lib/rbac-static-data";
import { roleHome, useBi } from "@/lib/bi";
import { Button } from "@/components/ui/button";
import { trackEvent, identifyUser } from "@/lib/analytics";
import { setMonitoringUser } from "@/lib/monitoring";
import { env } from "@/lib/env";

/* أزرار دخول سريع محلية بالكامل (بدون أي نداء شبكة) للتجربة أثناء التطوير
   فقط — تُحذف قبل النشر النهائي. راجع src/integrations/backend/auth.ts. */
const DEMO_USERS = USERS.filter((u) => u.id !== "u-admin");
const demoEnabled = env.ENABLE_DEMO_LOGIN;

const title = "تسجيل الدخول | Academia";
const description = "سجّل الدخول إلى حسابك في Academia وتابع دراستك من حيث توقفت.";

export const Route = createFileRoute("/login")({
  ssr: false,
  beforeLoad: async () => {
    /* المستخدم المسجّل يعود للموقع العام لا للوحة التحكم مباشرة */
    if (await currentUserHome()) throw redirect({ to: "/" });
  },
  head: (ctx) => createSeoHead("/login", localeFromSearch(ctx.match.search)),
  component: LoginPage,
});

const schema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6),
});

function LoginPage() {
  const { t } = useTranslation();
  const bi = useBi();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);

  function quickLogin(userId: string) {
    const user = USERS.find((u) => u.id === userId);
    loginAsDemo(userId);
    toast.success(t("authPages.login.success"));
    navigate({ href: roleHome(user?.role_name, user?.role_id === "r-admin"), replace: true });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerError(null);
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      const nextErrors: { email?: string; password?: string } = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if ((field === "email" || field === "password") && !nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      }
      setErrors(nextErrors);
      toast.error(bi("راجع الحقول المظللة", "Check the highlighted fields"));
      return;
    }
    setLoading(true);
    trackEvent("login_attempt");
    try {
      await login(parsed.data.email, parsed.data.password);
      const profile = getStoredProfile();
      if (profile) {
        identifyUser(profile.id, { roleName: profile.roleName });
        setMonitoringUser({ id: profile.id, email: profile.email });
      }
      trackEvent("login_success", { roleId: profile?.roleId ?? null });
      if (profile && profile.roleId == null) {
        // فشل تحديد نوع الحساب (راجع فتح Console — رح تلاقي تفاصيل الخطأ
        // بـ "fetchUserType failed"). بنكمل تسجيل الدخول بس بنحذّر المستخدم
        // بدل ما نوجّهه بصمت لمساحة غلط.
        toast.warning(
          bi(
            "تم الدخول، لكن تعذّر تحديد نوع حسابك بدقة — إذا انتقلت لمساحة غير متوقعة تواصل مع الدعم.",
            "You're signed in, but we couldn't determine your account type precisely — if you land in an unexpected space, contact support.",
          ),
        );
      }
      toast.success(t("authPages.login.success"));
      // roleId=1 ("مدير النظام") هو الوحيد المتاح فعليًا على الباك اند حاليًا؛
      // أي نوع تاني (أو لو تعذّر جلب النوع) بيرجع لصفحة طالب افتراضية —
      // راجع fetchUserType بملف auth.ts.
      navigate({ href: roleHome(profile?.roleName ?? null, profile?.roleId === 1), replace: true });
    } catch (err) {
      const message = getErrorMessage(err, bi("تعذّر تسجيل الدخول", "Sign in failed"));
      trackEvent("login_failed", { message });
      setServerError(message);
    } finally {
      setLoading(false);
    }
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
          error={errors.email}
        />
        <AuthField
          id="password"
          label={t("authPages.login.password")}
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          error={errors.password}
        />
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-xs font-semibold text-primary hover:underline"
          >
            {t("authPages.login.forgot")}
          </Link>
        </div>
        {serverError && (
          <div
            role="alert"
            className="rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm font-semibold text-destructive"
          >
            {serverError}
          </div>
        )}
        <Button type="submit" loading={loading} className="w-full">
          {t("authPages.login.submit")}
        </Button>
      </form>

      {demoEnabled && (
        <div className="mt-6 rounded-2xl border border-dashed border-border bg-secondary/40 p-3">
          <p className="mb-2 text-center text-xs font-bold text-muted-foreground">
            {bi(
              "دخول سريع للتجربة (محلي بالكامل — مؤقت)",
              "Quick test login (fully local — temporary)",
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => quickLogin("u-admin")}
              className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:border-primary/60 hover:text-primary disabled:opacity-60"
            >
              {bi("أدمن", "Admin")}
            </button>
            {DEMO_USERS.map((u) => (
              <button
                key={u.id}
                type="button"
                disabled={loading}
                onClick={() => quickLogin(u.id)}
                className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:border-primary/60 hover:text-primary disabled:opacity-60"
              >
                {u.role_name}
              </button>
            ))}
          </div>
        </div>
      )}

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

import { useState } from "react";
import { createFileRoute, useNavigate, Link, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { GraduationCap, UserRound, Users, ArrowLeft, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, AuthField } from "@/components/site/auth-shell";
import { currentUserHome } from "@/lib/session-home";

const title = "إنشاء حساب | أكاديميا";
const description = "أنشئ حسابك في أكاديميا واختر دورك: طالب، ولي أمر، أو معلّم.";

export const Route = createFileRoute("/signup")({
  ssr: false,
  beforeLoad: async () => {
    if (await currentUserHome()) throw redirect({ to: "/" });
  },
  validateSearch: (search: Record<string, unknown>): { invite?: string } =>
    typeof search.invite === "string" ? { invite: search.invite } : {},

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
  component: SignupPage,
});

type RoleKey = "student" | "parent";

const schema = z.object({
  fullName: z.string().trim().min(2),
  email: z.string().trim().email(),
  password: z.string().min(6),
});

function SignupPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [role, setRole] = useState<RoleKey | null>(null);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ fullName, email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-email`,
          data: { full_name: parsed.data.fullName, requested_role: role },
        },
      });
      if (error) throw error;
      toast.success(t("authPages.signup.success"));
      navigate({ to: "/verify-email", search: { email: parsed.data.email } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "…");
    } finally {
      setLoading(false);
    }
  }

  if (!role) {
    return (
      <AuthShell title={t("authPages.signup.h1")} subtitle={t("authPages.signup.sub")} wide>
        <div className="grid gap-3">
          <RoleCard
            icon={<GraduationCap className="size-5" />}
            title={t("authPages.signup.roles.student.t")}
            text={t("authPages.signup.roles.student.d")}
            onClick={() => setRole("student")}
          />
          <RoleCard
            icon={<Users className="size-5" />}
            title={t("authPages.signup.roles.parent.t")}
            text={t("authPages.signup.roles.parent.d")}
            onClick={() => setRole("parent")}
          />
          <Link
            to="/teacher/register"
            className="flex items-start gap-3 rounded-2xl border border-border bg-background p-4 text-start transition-colors hover:border-primary/50"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-info/12 text-info">
              <UserRound className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-bold text-foreground">
                {t("authPages.signup.roles.teacher.t")}
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {t("authPages.signup.roles.teacher.d")}
              </span>
            </span>
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {t("authPages.signup.haveAccount")}{" "}
          <Link to="/login" className="font-bold text-primary hover:underline">
            {t("authPages.signup.loginLink")}
          </Link>
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      icon={role === "student" ? <GraduationCap className="size-5" /> : <Users className="size-5" />}
      title={t("authPages.signup.h1")}
      subtitle={`${t("authPages.signup.chosen")}: ${t(`authPages.signup.roles.${role}.t`)}`}
    >
      <button
        type="button"
        onClick={() => setRole(null)}
        className="mb-5 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5 rtl:rotate-180" />
        {t("authPages.signup.change")}
      </button>

      <form onSubmit={submit} className="space-y-4">
        <AuthField
          id="name"
          label={t("authPages.signup.fullName")}
          value={fullName}
          onChange={setFullName}
          autoComplete="name"
        />
        <AuthField
          id="email"
          label={t("authPages.signup.email")}
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
        />
        <AuthField
          id="password"
          label={t("authPages.signup.password")}
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          hint={t("authPages.signup.passwordHint")}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading ? t("common.loading") : t("authPages.signup.submit")}
        </button>
        <p className="text-center text-xs text-muted-foreground">{t("authPages.signup.terms")}</p>
      </form>

      <div className="mt-6 space-y-1.5 text-center text-xs text-muted-foreground">
        <p>
          {t("authPages.signup.teacherHint")}{" "}
          <Link to="/teacher/register" className="font-bold text-primary hover:underline">
            {t("authPages.signup.teacherLink")}
          </Link>
        </p>
        <p>
          {t("authPages.signup.haveAccount")}{" "}
          <Link to="/login" className="font-bold text-primary hover:underline">
            {t("authPages.signup.loginLink")}
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}

function RoleCard({
  icon,
  title,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-start gap-3 rounded-2xl border border-border bg-background p-4 text-start transition-colors hover:border-primary/50"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-bold text-foreground">{title}</span>
        <span className="mt-1 block text-sm text-muted-foreground">{text}</span>
      </span>
      <Check className="mt-1 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
}

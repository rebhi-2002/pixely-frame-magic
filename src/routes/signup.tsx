import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate, Link, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { GraduationCap, UserRound, Users, ArrowLeft, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AuthShell, AuthField } from "@/components/site/auth-shell";
import { currentUserHome } from "@/lib/session-home";
import { FeatureStatus } from "@/components/app/feedback-states";
import { Button } from "@/components/ui/button";
import { genderNameEn } from "@/lib/gender";
import { roleHome, useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";
import { register, getStoredProfile, loadRegistrationOptions } from "@/integrations/backend/auth";
import { trackEvent, identifyUser } from "@/lib/analytics";
import { setMonitoringUser } from "@/lib/monitoring";
import { env } from "@/lib/env";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const signupEnabled = env.ENABLE_SIGNUP;

// أسماء أنواع المستخدمين متل ما هي مزروعة فعليًا بالباك اند (UserSeed.cs) —
// بنستخدمها لمطابقة الدور المختار بالواجهة (طالب/ولي أمر) مع الـ id الصحيح
// بدل ما نثبّت الأرقام 3/5 مباشرة بالكود.
const BACKEND_ROLE_NAME: Record<RoleKey, string> = {
  student: "الطالب",
  parent: "ولي الامر",
};

export const Route = createFileRoute("/signup")({
  ssr: false,
  beforeLoad: async () => {
    if (await currentUserHome()) throw redirect({ to: "/" });
  },
  validateSearch: (search: Record<string, unknown>): { invite?: string } =>
    typeof search.invite === "string" ? { invite: search.invite } : {},

  head: (ctx) => createSeoHead("/signup", localeFromSearch(ctx.match.search)),
  component: SignupPage,
});

type RoleKey = "student" | "parent";

// قواعد كلمة المرور مطابقة لإعدادات Identity بالباك اند (Program.cs): 8 أحرف
// على الأقل + رقم واحد على الأقل. كان الفرونت يقبل 6 فيرفضها الباك اند برسالة
// إنجليزية تقنية بعد ما المستخدم يكون ضغط "إنشاء حساب".
function buildSchema(bi: ReturnType<typeof useBi>) {
  return z.object({
    fullName: z.string().trim().min(2, bi("الاسم قصير جدًا", "Name is too short")),
    email: z.string().trim().email(bi("البريد الإلكتروني غير صالح", "Invalid email address")),
    phoneNumber: z.string().trim().min(7, bi("رقم الهاتف غير صالح", "Invalid phone number")),
    password: z
      .string()
      .min(
        8,
        bi("كلمة المرور يجب أن تكون 8 أحرف على الأقل", "Password must be at least 8 characters"),
      )
      .regex(
        /\d/,
        bi(
          "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل",
          "Password must contain at least one digit",
        ),
      ),
  });
}

function SignupPage() {
  const { t } = useTranslation();
  const bi = useBi();
  const navigate = useNavigate();
  const [role, setRole] = useState<RoleKey | null>(null);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [genderId, setGenderId] = useState<number | null>(null);

  // الجنس ونوع المستخدم لازم يجيوا من الباك اند (نفس مصدر شاشة الأدمن) —
  // القيم مش ثابتة بالكود لأنها ممكن تختلف بين البيئات.
  const {
    data: options,
    isLoading: optionsLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["signup-options"],
    queryFn: loadRegistrationOptions,
    enabled: signupEnabled,
    retry: 1,
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = buildSchema(bi).safeParse({ fullName, email, phoneNumber, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    if (password !== confirmPassword) {
      toast.error(bi("كلمتا المرور غير متطابقتين", "Passwords don't match"));
      return;
    }
    if (genderId == null) {
      toast.error(bi("الجنس مطلوب", "Gender is required"));
      return;
    }
    if (!role) return;

    const roleName = BACKEND_ROLE_NAME[role];
    // مطابقة بالاسم فقط: مطابقة بالـid كانت خطرة لأن أرقام أنواع المستخدمين بقاعدة
    // البيانات ممكن تختلف عن الثوابت بالكود (UserSeed.cs بيزرع الطالب=2/المعلم=3)
    // فكان ممكن مستخدم يسجّل كطالب وينحفظ معلّم. الأفضل رسالة خطأ من نوع غلط.
    const userType = options?.roles.find((r) => r.name === roleName);
    if (!userType) {
      toast.error(
        bi(
          "تعذّر تحديد نوع الحساب — حاول تحديث الصفحة.",
          "Couldn't determine the account type — try refreshing the page.",
        ),
      );
      return;
    }

    setLoading(true);
    trackEvent("signup_attempt", { role });
    try {
      await register({
        name: parsed.data.fullName,
        email: parsed.data.email,
        phoneNumber: parsed.data.phoneNumber,
        password: parsed.data.password,
        confirmPassword: parsed.data.password,
        genderId,
        userTypeId: userType.id,
      });
      const profile = getStoredProfile();
      if (profile) {
        identifyUser(profile.id, { roleName: profile.roleName });
        setMonitoringUser({ id: profile.id, email: profile.email });
      }
      trackEvent("signup_success", { role });
      toast.success(bi("تم إنشاء الحساب بنجاح", "Account created successfully"));
      navigate({ href: roleHome(profile?.roleName ?? roleName), replace: true });
    } catch (err) {
      trackEvent("signup_failed", { role });
      toast.error(getErrorMessage(err, bi("تعذّر إنشاء الحساب", "Failed to create account")));
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
      icon={
        role === "student" ? <GraduationCap className="size-5" /> : <Users className="size-5" />
      }
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

      {!signupEnabled ? (
        <FeatureStatus
          title={bi("التسجيل قيد التجهيز", "Sign-up is being prepared")}
          description={bi(
            "تسجيل الدخول يعمل حاليًا. سنفعّل إنشاء الحسابات بعد اكتمال مسار التسجيل في الباك إند.",
            "Sign-in is available now. Account creation will open when the backend registration flow is ready.",
          )}
          action={
            <Button asChild variant="outline">
              <Link to="/login">{bi("الذهاب لتسجيل الدخول", "Go to sign in")}</Link>
            </Button>
          }
        />
      ) : (
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
            id="phone"
            label={bi("رقم الهاتف", "Phone number")}
            type="tel"
            value={phoneNumber}
            onChange={setPhoneNumber}
            autoComplete="tel"
          />
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">{bi("الجنس", "Gender")}</label>
            <Select
              value={genderId != null ? String(genderId) : undefined}
              onValueChange={(v) => setGenderId(Number(v))}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    optionsLoading
                      ? bi("جارٍ التحميل…", "Loading…")
                      : bi("اختر الجنس", "Select gender")
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {(options?.genders ?? []).map((g) => (
                  <SelectItem key={g.id} value={String(g.id)}>
                    {bi(g.name, genderNameEn(g))}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isError && (
              <p className="text-xs text-destructive">
                {bi("تعذّر تحميل قائمة الجنس.", "Couldn't load the gender list.")}{" "}
                <button type="button" className="font-bold underline" onClick={() => refetch()}>
                  {bi("إعادة المحاولة", "Retry")}
                </button>
              </p>
            )}
          </div>
          <AuthField
            id="password"
            label={t("authPages.signup.password")}
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            hint={t("authPages.signup.passwordHint")}
          />
          <AuthField
            id="confirm-password"
            label={bi("تأكيد كلمة المرور", "Confirm password")}
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            autoComplete="new-password"
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
      )}

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

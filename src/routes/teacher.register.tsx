import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate, Link, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { BadgeCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AuthShell, AuthField } from "@/components/site/auth-shell";
import { currentUserHome } from "@/lib/session-home";
import { getErrorMessage } from "@/integrations/backend/client";
import { register, getStoredProfile, loadRegistrationOptions } from "@/integrations/backend/auth";
import { genderNameEn } from "@/lib/gender";
import { roleHome, useBi } from "@/lib/bi";
import { trackEvent, identifyUser } from "@/lib/analytics";
import { setMonitoringUser } from "@/lib/monitoring";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/teacher/register")({
  ssr: false,
  beforeLoad: async () => {
    if (await currentUserHome()) throw redirect({ to: "/" });
  },
  head: (ctx) => createSeoHead("/teacher/register", localeFromSearch(ctx.match.search)),
  component: TeacherRegisterPage,
});

// نفس حقول /api/Auth/Register بالضبط — الباك اند حاليًا ما بيدعم أي حقل
// إضافي لملف المعلّم (لا مادة، لا خبرة، لا نبذة، لا رفع وثيقة توثيق)، فما
// منجمعهم بالنموذج حتى ما نوهم المستخدم إنهم بينحفظوا.
// قواعد كلمة المرور مطابقة لإعدادات Identity بالباك اند: 8 أحرف على الأقل + رقم.
function buildSchema(bi: ReturnType<typeof useBi>) {
  return z.object({
    fullName: z.string().trim().min(2, bi("الاسم قصير جدًا", "Name is too short")),
    email: z.string().trim().email(bi("البريد الإلكتروني غير صالح", "Invalid email address")),
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
    phone: z
      .string()
      .trim()
      .min(6, bi("رقم الهاتف غير صالح", "Invalid phone number"))
      .max(30, bi("رقم الهاتف غير صالح", "Invalid phone number")),
  });
}

// اسم نوع "المعلم" متل ما هو مزروع فعليًا بالباك اند (UserSeed.cs).
const TEACHER_ROLE_NAME = "المعلم";

function TeacherRegisterPage() {
  const { t } = useTranslation();
  const bi = useBi();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [genderId, setGenderId] = useState<number | null>(null);

  const {
    data: options,
    isLoading: optionsLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["signup-options"],
    queryFn: loadRegistrationOptions,
    retry: 1,
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = buildSchema(bi).safeParse({ fullName, email, password, phone });
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
    // مطابقة بالاسم فقط (راجع التعليق بـsignup.tsx: المطابقة بالـid خطرة لو اختلفت
    // أرقام الأنواع بقاعدة البيانات عن ثوابت الكود).
    const userType = options?.roles.find((r) => r.name === TEACHER_ROLE_NAME);
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
    trackEvent("signup_attempt", { role: "teacher" });
    try {
      await register({
        name: parsed.data.fullName,
        email: parsed.data.email,
        phoneNumber: parsed.data.phone,
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
      trackEvent("signup_success", { role: "teacher" });
      toast.success(bi("تم إنشاء حساب المعلّم بنجاح", "Teacher account created successfully"));
      navigate({ href: roleHome(profile?.roleName ?? TEACHER_ROLE_NAME), replace: true });
    } catch (err) {
      trackEvent("signup_failed", { role: "teacher" });
      toast.error(getErrorMessage(err, bi("تعذّر إنشاء الحساب", "Failed to create account")));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      icon={<BadgeCheck className="size-5" />}
      title={t("authPages.teacherRegister.h1")}
      subtitle={t("authPages.teacherRegister.sub")}
      wide
    >
      <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        <AuthField
          id="name"
          label={t("authPages.teacherRegister.fullName")}
          value={fullName}
          onChange={setFullName}
          autoComplete="name"
        />
        <AuthField
          id="phone"
          label={t("authPages.teacherRegister.phone")}
          value={phone}
          onChange={setPhone}
          autoComplete="tel"
        />
        <AuthField
          id="email"
          label={t("authPages.teacherRegister.email")}
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
        />
        <AuthField
          id="password"
          label={t("authPages.teacherRegister.password")}
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          hint={bi(
            "8 أحرف على الأقل، وتحتوي على رقم واحد على الأقل.",
            "At least 8 characters, including at least one digit.",
          )}
        />
        <AuthField
          id="confirm-password"
          label={bi("تأكيد كلمة المرور", "Confirm password")}
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          autoComplete="new-password"
        />
        <div className="space-y-1.5 sm:col-span-2">
          <label className="block text-sm font-semibold text-foreground">
            {bi("الجنس", "Gender")}
          </label>
          <Select
            value={genderId != null ? String(genderId) : undefined}
            onValueChange={(v) => setGenderId(Number(v))}
          >
            <SelectTrigger className="w-full sm:w-1/2">
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

        <button
          type="submit"
          disabled={loading}
          className="sm:col-span-2 w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading ? t("common.loading") : t("authPages.teacherRegister.submit")}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        <Link to="/signup" className="font-bold text-primary hover:underline">
          {t("authPages.teacherRegister.back")}
        </Link>
      </p>
    </AuthShell>
  );
}

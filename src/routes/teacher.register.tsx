import { useState } from "react";
import { createFileRoute, useNavigate, Link, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { BadgeCheck, UploadCloud } from "lucide-react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, AuthField } from "@/components/site/auth-shell";
import { currentUserHome } from "@/lib/session-home";

const title = "تسجيل معلّم | أكاديميا";
const description = "سجّل كمعلّم في أكاديميا وارفع وثيقة التوثيق لمراجعة فريق الإشراف.";

export const Route = createFileRoute("/teacher/register")({
  ssr: false,
  beforeLoad: async () => {
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
  component: TeacherRegisterPage,
});

const schema = z.object({
  fullName: z.string().trim().min(2),
  email: z.string().trim().email(),
  password: z.string().min(6),
  phone: z.string().trim().min(6).max(30),
  subject: z.string().trim().min(2).max(60),
  experience: z.string().trim().max(3),
  bio: z.string().trim().max(600),
});

function TeacherRegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [docName, setDocName] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ fullName, email, password, phone, subject, experience, bio });
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
          data: {
            full_name: parsed.data.fullName,
            requested_role: "teacher",
            phone: parsed.data.phone,
            subject: parsed.data.subject,
            experience_years: parsed.data.experience,
            bio: parsed.data.bio,
            verification_document: docName || null,
            verification_status: "pending",
          },
        },
      });
      if (error) throw error;
      toast.success(t("authPages.teacherRegister.pending"));
      navigate({ to: "/verify-email", search: { email: parsed.data.email } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "…");
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
        <AuthField id="name" label={t("authPages.teacherRegister.fullName")} value={fullName} onChange={setFullName} autoComplete="name" />
        <AuthField id="phone" label={t("authPages.teacherRegister.phone")} value={phone} onChange={setPhone} autoComplete="tel" />
        <AuthField id="email" label={t("authPages.teacherRegister.email")} type="email" value={email} onChange={setEmail} autoComplete="email" />
        <AuthField id="password" label={t("authPages.teacherRegister.password")} type="password" value={password} onChange={setPassword} autoComplete="new-password" />
        <AuthField id="subject" label={t("authPages.teacherRegister.subject")} value={subject} onChange={setSubject} />
        <AuthField id="experience" label={t("authPages.teacherRegister.experience")} value={experience} onChange={setExperience} />

        <div className="space-y-1.5 sm:col-span-2">
          <label htmlFor="bio" className="block text-sm font-semibold text-foreground">
            {t("authPages.teacherRegister.bio")}
          </label>
          <textarea
            id="bio"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder={t("authPages.teacherRegister.bioPlaceholder")}
            className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <span className="block text-sm font-semibold text-foreground">
            {t("authPages.teacherRegister.document")}
          </span>
          <label
            htmlFor="doc"
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-input bg-background px-3.5 py-4 text-sm text-muted-foreground transition-colors hover:border-primary"
          >
            <UploadCloud className="size-5 shrink-0 text-primary" />
            <span className="min-w-0 truncate">{docName || t("authPages.teacherRegister.documentHint")}</span>
          </label>
          <input
            id="doc"
            type="file"
            accept="image/*,application/pdf"
            className="sr-only"
            onChange={(e) => setDocName(e.target.files?.[0]?.name ?? "")}
          />
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

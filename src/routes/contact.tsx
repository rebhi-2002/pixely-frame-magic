import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Headset, Mail, MessageSquareText, Send } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { Reveal } from "@/components/ui/reveal";

const title = "تواصل معنا | أكاديميا";
const description = "عندك سؤال، اقتراح، أو بدك تعمل شراكة مدرسية؟ فريق أكاديميا جاهز يسمعك.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ContactPage,
});

const TOPIC_KEYS = ["student", "teacher", "school", "press", "other"] as const;

const schema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  topic: z.enum(TOPIC_KEYS),
  message: z.string().trim().min(10),
});

function ContactPage() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<(typeof TOPIC_KEYS)[number]>("student");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse({ name, email, topic, message });
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        next[field] = t(`contact.errors.${field}`);
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSending(true);
    // ملاحظة تطوير: نموذج واجهة كامل وجاهز للإنتاج. الربط الفعلي بالبريد/التخزين
    // (Supabase Edge Function أو خدمة بريد مثل Resend) يُنفَّذ عند توصيل الـ backend.
    window.setTimeout(() => {
      setSending(false);
      setDone(true);
      toast.success(t("contact.success.title"));
    }, 600);
  }

  return (
    <PublicLayout>
      <section className="surface-mesh border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
            <MessageSquareText className="size-6" />
          </span>
          <h1 className="mt-5 text-4xl font-bold text-foreground">{t("contact.h1")}</h1>
          <p className="mt-3 max-w-xl text-lg text-muted-foreground">{t("contact.sub")}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-5 py-16 lg:grid-cols-[1.3fr_0.9fr]">
        <Reveal>
          <div className="shadow-elevation-1 rounded-2xl border border-border bg-card p-6 sm:p-8">
            {done ? (
              <div className="flex flex-col items-center py-10 text-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-success/12 text-success">
                  <Send className="size-6" />
                </span>
                <h2 className="mt-5 text-xl font-bold text-foreground">
                  {t("contact.success.title")}
                </h2>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  {t("contact.success.sub")}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setDone(false);
                    setName("");
                    setEmail("");
                    setMessage("");
                    setTopic("student");
                  }}
                  className="hover-press mt-6 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-bold text-foreground hover:bg-secondary"
                >
                  {t("contact.success.again")}
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-foreground"
                    >
                      {t("contact.form.name")}
                    </label>
                    <input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-foreground"
                    >
                      {t("contact.form.email")}
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="topic"
                    className="mb-2 block text-sm font-semibold text-foreground"
                  >
                    {t("contact.form.topic")}
                  </label>
                  <select
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value as (typeof TOPIC_KEYS)[number])}
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary"
                  >
                    {TOPIC_KEYS.map((k) => (
                      <option key={k} value={k}>
                        {t(`contact.form.topics.${k}`)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-foreground"
                  >
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("contact.form.messagePlaceholder")}
                    className="w-full resize-none rounded-xl border border-border bg-background p-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-shine hover-press inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground disabled:opacity-60 sm:w-auto"
                >
                  <Send className="size-4" />
                  {sending ? t("contact.form.sending") : t("contact.form.submit")}
                </button>
              </form>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="space-y-4">
            <div className="shadow-elevation-1 rounded-2xl border border-border bg-card p-6">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <Mail className="size-5" />
              </span>
              <h2 className="mt-3 text-sm font-bold text-foreground">
                {t("contact.sidebar.emailTitle")}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">{t("contact.sidebar.emailSub")}</p>
              <a
                href="mailto:support@academia.app"
                className="mt-3 inline-block text-sm font-bold text-primary hover:underline"
                dir="ltr"
              >
                support@academia.app
              </a>
            </div>

            <div className="shadow-elevation-1 rounded-2xl border border-border bg-card p-6">
              <span className="flex size-10 items-center justify-center rounded-xl bg-success/12 text-success">
                <Clock className="size-5" />
              </span>
              <h2 className="mt-3 text-sm font-bold text-foreground">
                {t("contact.sidebar.responseTitle")}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("contact.sidebar.responseSub")}
              </p>
            </div>

            <div className="shadow-elevation-1 rounded-2xl border border-border bg-card p-6">
              <span className="flex size-10 items-center justify-center rounded-xl bg-info/12 text-info">
                <Headset className="size-5" />
              </span>
              <h2 className="mt-3 text-sm font-bold text-foreground">
                {t("contact.sidebar.helpTitle")}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">{t("contact.sidebar.helpSub")}</p>
              <Link
                to="/help"
                className="mt-3 inline-block text-sm font-bold text-primary hover:underline"
              >
                {t("contact.sidebar.helpCta")}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </PublicLayout>
  );
}

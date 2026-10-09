import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Headset, Mail, Send } from "lucide-react";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/site/page-header";
import { PublicLayout } from "@/components/site/public-layout";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: (ctx) => createSeoHead("/contact", localeFromSearch(ctx.match.search)),
  component: ContactPage,
});

const TOPIC_KEYS = ["student", "teacher", "school", "press", "other"] as const;

/* دورة اللوحة 14: ذهبي / سماوي / صدأ */
const TILES = [
  "bg-[var(--brand)] text-[var(--ink)]",
  "bg-[var(--accent-2)] text-white",
  "bg-primary text-primary-foreground",
] as const;
const TOP_BORDERS = [
  "border-t-[var(--brand)]",
  "border-t-[var(--accent-2)]",
  "border-t-primary",
] as const;
const TILE_FRAME =
  "flex shrink-0 items-center justify-center border-2 border-[var(--border-strong)] shadow-[2px_2px_0_0_var(--shadow-brutal-color)]";
const FIELD =
  "w-full rounded-xl border-2 border-[var(--border-strong)] bg-background text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary";

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
    // الباك اند ما عنده endpoint للتواصل (لا Contact ولا Email بـSwagger) — فنفتح
    // تطبيق البريد عند المستخدم برسالة جاهزة بدل إرسال وهمي يوهمه إنها وصلت.
    const subject = encodeURIComponent(`[${t(`contact.form.topics.${topic}`)}] ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:support@academia.app?subject=${subject}&body=${body}`;
    setSending(false);
    setDone(true);
  }

  return (
    <PublicLayout>
      <PageHeader title={t("contact.h1")} highlight={t("contact.h1Hl")} sub={t("contact.sub")} />

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="rounded-2xl border-2 border-t-[8px] border-[var(--border-strong)] border-t-primary bg-card p-6 shadow-[var(--shadow-brutal)] sm:p-8">
          {done ? (
            <div className="flex flex-col items-center py-10 text-center">
              <span className={cn(TILE_FRAME, "size-14 rounded-2xl", TILES[0])}>
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
                className={buttonVariants({
                  variant: "outline",
                  className: "mt-6 h-auto px-5 py-2.5 text-sm",
                })}
              >
                {t("contact.success.again")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
                <div className="space-y-5">
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
                      aria-invalid={!!errors.name}
                      className={cn(FIELD, "h-12 px-4")}
                    />
                    {errors.name && (
                      <p role="alert" className="mt-1.5 text-xs text-destructive">
                        {errors.name}
                      </p>
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
                      aria-invalid={!!errors.email}
                      className={cn(FIELD, "h-12 px-4")}
                    />
                    {errors.email && (
                      <p role="alert" className="mt-1.5 text-xs text-destructive">
                        {errors.email}
                      </p>
                    )}
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
                      className={cn(FIELD, "h-12 px-3")}
                    >
                      {TOPIC_KEYS.map((k) => (
                        <option key={k} value={k}>
                          {t(`contact.form.topics.${k}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-foreground"
                  >
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    id="message"
                    rows={8}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("contact.form.messagePlaceholder")}
                    aria-invalid={!!errors.message}
                    className={cn(FIELD, "min-h-40 flex-1 resize-none p-4")}
                  />
                  {errors.message && (
                    <p role="alert" className="mt-1.5 text-xs text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={sending}
                className={buttonVariants({
                  variant: "default",
                  className:
                    "mt-6 h-auto w-full gap-2 px-8 py-3.5 text-sm disabled:opacity-60 sm:w-auto",
                })}
              >
                <Send className="size-4 rtl:-scale-x-100" />
                {sending ? t("contact.form.sending") : t("contact.form.submit")}
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="text-2xl font-extrabold text-foreground">{t("contact.otherTitle")}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              Icon: Mail,
              title: t("contact.sidebar.emailTitle"),
              sub: t("contact.sidebar.emailSub"),
              action: (
                <a
                  href="mailto:support@academia.app"
                  className="mt-3 inline-block text-sm font-bold text-primary hover:underline"
                  dir="ltr"
                >
                  support@academia.app
                </a>
              ),
            },
            {
              Icon: Clock,
              title: t("contact.sidebar.responseTitle"),
              sub: t("contact.sidebar.responseSub"),
              action: null,
            },
            {
              Icon: Headset,
              title: t("contact.sidebar.helpTitle"),
              sub: t("contact.sidebar.helpSub"),
              action: (
                <Link
                  to="/help"
                  className="mt-3 inline-block text-sm font-bold text-primary hover:underline"
                >
                  {t("contact.sidebar.helpCta")}
                </Link>
              ),
            },
          ].map(({ Icon, title, sub, action }, i) => (
            <article
              key={title}
              className={cn(
                "h-full rounded-2xl border-2 border-t-[8px] border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)]",
                TOP_BORDERS[i % TOP_BORDERS.length],
              )}
            >
              <span className={cn(TILE_FRAME, "size-11 rounded-xl", TILES[i % TILES.length])}>
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 font-bold text-foreground">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{sub}</p>
              {action}
            </article>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}

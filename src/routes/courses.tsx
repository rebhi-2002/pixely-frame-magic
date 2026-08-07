import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Search, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "الكورسات | أكاديميا" },
      {
        name: "description",
        content: "تصفّح كورسات المعلّمين المعتمدين في أكاديميا حسب المادة والمستوى قبل إنشاء حسابك.",
      },
      { property: "og:title", content: "الكورسات | أكاديميا" },
      {
        property: "og:description",
        content: "كورسات من معلّمين موثّقين — تصفّحها بدون حساب، وسجّل عند الاشتراك.",
      },
    ],
  }),
  component: CoursesPage,
});

export type CourseItem = {
  id: string;
  title: string;
  teacher: string;
  teacherId: string;
  subject: string;
  lessons: string;
  price: string;
  level: string;
};

function CoursesPage() {
  const { t } = useTranslation();
  const items = t("courses.items", { returnObjects: true }) as CourseItem[];
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState<string>("__all");
  const { isSignedIn } = useSession();

  const subjects = useMemo(() => Array.from(new Set(items.map((i) => i.subject))), [items]);

  const filtered = items.filter((i) => {
    const q = query.trim();
    const matchQuery = !q || i.title.includes(q) || i.teacher.includes(q);
    const matchSubject = subject === "__all" || i.subject === subject;
    return matchQuery && matchSubject;
  });

  return (
    <PublicLayout>
      <section className="surface-grid border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">{t("courses.h1")}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{t("courses.sub")}</p>

          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("courses.searchPlaceholder")}
                aria-label={t("courses.searchPlaceholder")}
                className="h-11 w-full rounded-xl border border-border bg-card ps-9 pe-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {["__all", ...subjects].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSubject(s)}
                  className={`hover-press rounded-lg border px-3 py-2 text-xs font-bold ${
                    subject === s
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s === "__all" ? t("courses.all") : s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div key={`${subject}-${filtered.length}`} className="panel-swap">
        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            {t("courses.empty")}
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <article
                key={c.id}
                className="hover-lift flex flex-col rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-primary/12 px-2.5 py-1 text-xs font-bold text-primary">
                    {c.subject}
                  </span>
                  <span className="text-xs text-muted-foreground">{c.level}</span>
                </div>
                <h2 className="mt-4 text-base font-bold text-foreground">{c.title}</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {t("courses.byTeacher")}:{" "}
                  <Link
                    to="/teacher/$id"
                    params={{ id: c.teacherId }}
                    className="font-semibold text-primary hover:underline"
                  >
                    {c.teacher}
                  </Link>
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen className="size-4" />
                    {c.lessons} {t("courses.lessons")}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="size-4 text-primary" />
                    {c.price === "0" ? t("courses.free") : `${c.price} JOD`}
                  </span>
                </div>
                <Link
                  to={isSignedIn ? "/my-courses" : "/signup"}
                  className="hover-press mt-5 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90"
                >
                  {t(isSignedIn ? "courses.open" : "courses.enroll")}
                </Link>
              </article>
            ))}
          </div>
        )}
        </div>
      </section>
    </PublicLayout>
  );
}

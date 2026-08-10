import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, BookOpen, Star, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { SessionCta } from "@/components/site/session-cta";
import type { CourseItem } from "./courses";

export const Route = createFileRoute("/teacher/$id")({
  head: () => ({
    meta: [
      { title: "ملف المعلّم | أكاديميا" },
      {
        name: "description",
        content: "تعرّف على المعلّم، كورساته، وتقييمات طلابه على أكاديميا.",
      },
      { property: "og:title", content: "ملف المعلّم | أكاديميا" },
      { property: "og:description", content: "كورسات المعلّم وآراء طلابه على منصة أكاديميا." },
    ],
  }),
  component: TeacherProfilePage,
});

function TeacherProfilePage() {
  const { id } = Route.useParams();
  const { t } = useTranslation();
  const items = t("courses.items", { returnObjects: true }) as CourseItem[];
  const courses = items.filter((c) => c.teacherId === id);
  const reviews = t("teacherProfile.reviews", { returnObjects: true }) as {
    n: string;
    d: string;
  }[];

  if (courses.length === 0) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-3xl px-5 py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground">{t("teacherProfile.notFound")}</h1>
          <Link
            to="/courses"
            className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            {t("nav.courses")}
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const teacher = courses[0].teacher;
  const lessons = courses.reduce((sum, c) => sum + Number(c.lessons), 0);

  return (
    <PublicLayout>
      <section className="surface-grid border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/15 font-display text-2xl font-bold text-primary">
              {teacher.slice(2, 4)}
            </span>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{teacher}</h1>
              <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-success">
                <BadgeCheck className="size-4" />
                {t("teacherProfile.verified")}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Stat
              icon={<Users className="size-4" />}
              value="1,240"
              label={t("teacherProfile.students")}
            />
            <Stat
              icon={<BookOpen className="size-4" />}
              value={String(courses.length)}
              label={t("teacherProfile.courses")}
            />
            <Stat
              icon={<Star className="size-4" />}
              value="4.8"
              label={t("teacherProfile.rating")}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14">
        <h2 className="text-xl font-bold text-foreground">{t("teacherProfile.aboutTitle")}</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{t("teacherProfile.about")}</p>

        <h2 className="mt-12 text-xl font-bold text-foreground">
          {t("teacherProfile.coursesTitle")}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {lessons} {t("courses.lessons")}
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {courses.map((c) => (
            <article key={c.id} className="rounded-2xl border border-border bg-card p-6">
              <span className="rounded-lg bg-primary/12 px-2.5 py-1 text-xs font-bold text-primary">
                {c.subject}
              </span>
              <h3 className="mt-3 font-bold text-foreground">{c.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {c.lessons} {t("courses.lessons")} —{" "}
                {c.price === "0" ? t("courses.free") : `${c.price} JOD`}
              </p>
            </article>
          ))}
        </div>

        <h2 className="mt-12 text-xl font-bold text-foreground">
          {t("teacherProfile.reviewsTitle")}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {reviews.map((r) => (
            <blockquote key={r.n} className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm leading-relaxed text-foreground">{r.d}</p>
              <footer className="mt-3 text-xs text-muted-foreground">{r.n}</footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-12 text-center">
          <SessionCta
            to="/signup"
            label={t("teacherProfile.cta")}
            className="glow-primary inline-flex rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          />
        </div>
      </section>
    </PublicLayout>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <span className="inline-flex items-center gap-1.5 text-muted-foreground">{icon}</span>
      <p className="font-display mt-1 text-2xl font-bold text-primary">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { BookOpen, Clock, Search, Star, Users, Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { PhotoAvatar } from "@/components/site/photo-avatar";
import { useSession } from "@/hooks/use-session";
import { useBi } from "@/lib/bi";
import { listPublicCourses } from "@/lib/public-catalog.functions";
import { courseCoverPath, teacherPhotoPath } from "@/lib/public-catalog-data";

export const Route = createFileRoute("/courses")({
  head: (ctx) => createSeoHead("/courses", localeFromSearch(ctx.match.search)),
  component: CoursesPage,
});

// شريط لوني علوي حسب المادة — يكسر تكرار البطاقات البيضاء المتطابقة،
// ويعطي تصنيف بصري سريع بدون الحاجة لصورة غلاف حقيقية غير متوفرة بعد.
const SUBJECT_ACCENTS = [
  "bg-primary",
  "bg-success",
  "bg-info",
  "bg-destructive/70",
  "bg-secondary-foreground/60",
] as const;

function subjectAccent(subject: string) {
  let hash = 0;
  for (let i = 0; i < subject.length; i++) hash = (hash * 31 + subject.charCodeAt(i)) >>> 0;
  return SUBJECT_ACCENTS[hash % SUBJECT_ACCENTS.length];
}

/**
 * غلاف الكورس: يحاول عرض صورة حقيقية، ولو غير موجودة بعد يظهر تدرّج لوني
 * حسب المادة + أول حرف من عنوانها — بديل صادق (مش placeholder عام بلا معنى)
 * لحد ما تتوفر صور غلاف حقيقية بنفس المسار (courseCoverPath).
 */
function CourseCover({ src, subject, accent }: { src: string; subject: string; accent: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`flex h-28 w-full items-center justify-center ${accent}/15`}>
        <span className={`font-display text-3xl font-bold opacity-40 ${accent.replace("bg-", "text-")}`}>
          {subject.charAt(0)}
        </span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      onError={() => setFailed(true)}
      className="h-28 w-full object-cover"
    />
  );
}

function CoursesPage() {
  const { t } = useTranslation();
  const bi = useBi();
  const { isSignedIn } = useSession();
  const fetchCourses = useServerFn(listPublicCourses);
  const { data: rows, isLoading } = useQuery({
    queryKey: ["public-courses"],
    queryFn: () => fetchCourses(),
  });

  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState<string>("__all");

  const items = rows ?? [];
  const subjects = useMemo(
    () => Array.from(new Set(items.map((i) => bi(...i.subject)))),
    [items, bi],
  );

  const filtered = items.filter((i) => {
    const q = query.trim();
    const title = bi(...i.title);
    const teacher = bi(...i.teacher);
    const subjectLabel = bi(...i.subject);
    const matchQuery = !q || title.includes(q) || teacher.includes(q);
    const matchSubject = subject === "__all" || subjectLabel === subject;
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
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {/* هيكل تحميل (Skeleton) بنفس أبعاد البطاقة الحقيقية تمامًا —
                يمنع "قفزة" بالتخطيط لما توصل البيانات، ويحس المستخدم
                بسرعة أعلى من دوّارة وحيدة بنص الشاشة. */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="h-28 w-full bg-secondary" />
                <div className="space-y-3 p-6">
                  <div className="flex items-center justify-between">
                    <div className="h-5 w-16 rounded bg-secondary" />
                    <div className="h-4 w-12 rounded bg-secondary" />
                  </div>
                  <div className="h-5 w-4/5 rounded bg-secondary" />
                  <div className="h-4 w-full rounded bg-secondary" />
                  <div className="h-4 w-2/3 rounded bg-secondary" />
                  <div className="flex items-center gap-2 pt-1">
                    <div className="size-7 rounded-full bg-secondary" />
                    <div className="h-4 w-24 rounded bg-secondary" />
                  </div>
                  <div className="h-10 w-full rounded-xl bg-secondary" />
                </div>
              </div>
            ))}
          </div>
        ) : (
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
                    className="hover-lift shadow-elevation-1 flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
                  >
                    <CourseCover
                      src={courseCoverPath(c.id)}
                      subject={bi(...c.subject)}
                      accent={subjectAccent(bi(...c.subject))}
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between">
                        <span className="rounded-lg bg-primary/12 px-2.5 py-1 text-xs font-bold text-primary">
                          {bi(...c.subject)}
                        </span>
                        <span className="text-xs text-muted-foreground">{bi(...c.level)}</span>
                      </div>
                      <h2 className="mt-4 text-base font-bold text-foreground">{bi(...c.title)}</h2>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {bi(...c.description)}
                      </p>

                      {c.tags && c.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {c.tags.map((tag) => (
                            <span
                              key={bi(...tag)}
                              className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
                            >
                              {bi(...tag)}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-3 flex items-center gap-2.5">
                        <PhotoAvatar
                          src={teacherPhotoPath(c.teacherId)}
                          className="size-7"
                          iconClassName="size-3.5"
                        />
                        <Link
                          to="/teacher/$id"
                          params={{ id: c.teacherId }}
                          className="text-sm font-semibold text-primary hover:underline"
                        >
                          {bi(...c.teacher)}
                        </Link>
                        {typeof c.rating === "number" && (
                          <span className="ms-auto inline-flex items-center gap-1 text-xs font-bold text-foreground">
                            <Star className="size-3.5 fill-primary text-primary" />
                            {c.rating.toFixed(1)}
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <BookOpen className="size-4" />
                          {c.lessons} {t("courses.lessons")}
                        </span>
                        {typeof c.durationHours === "number" && (
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="size-4" />
                            {c.durationHours} {t("courses.hours")}
                          </span>
                        )}
                        {typeof c.studentsCount === "number" && (
                          <span className="inline-flex items-center gap-1.5">
                            <Users className="size-4" />
                            {c.studentsCount}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5">
                          <Wallet className="size-4 text-primary" />
                          {c.price === 0 ? t("courses.free") : `${c.price} JOD`}
                        </span>
                      </div>
                      <Link
                        to={isSignedIn ? "/my-courses" : "/signup"}
                        className="hover-press mt-5 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90"
                      >
                        {t(isSignedIn ? "courses.open" : "courses.enroll")}
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </PublicLayout>
  );
}

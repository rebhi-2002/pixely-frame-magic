import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Clock,
  MapPin,
  Radio,
  Search,
  Sparkles,
  Star,
  Users,
  Wallet,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { PhotoAvatar } from "@/components/site/photo-avatar";
import { ErrorState, RetryButton } from "@/components/app/feedback-states";
import { useSession } from "@/hooks/use-session";
import { useBi } from "@/lib/bi";
import {
  listAllPublishedCourses,
  type BackendCourseDeliveryType,
} from "@/integrations/backend/courses";

// الباك اند (CourseDeliveryType) بيدعم أونلاين/وجاهي بس — "مسجّل مسبقًا" مش موجودة
// كقيمة، فما منعرضها هون (بتنضاف لما الباك اند يدعمها).
const DELIVERY_ICON: Record<BackendCourseDeliveryType, typeof Radio> = { 1: MapPin, 2: Radio };
const DELIVERY_LABEL: Record<BackendCourseDeliveryType, [string, string]> = {
  1: ["وجاهي", "On-site"],
  2: ["أونلاين", "Online"],
};

export const Route = createFileRoute("/courses")({
  head: (ctx) => createSeoHead("/courses", localeFromSearch(ctx.match.search)),
  component: CoursesPage,
});

// شريط لوني علوي حسب المادة — يكسر تكرار البطاقات البيضاء المتطابقة،
// ويعطي تصنيف بصري سريع. الغلاف تدرّج لوني + أول حرف (بدل صورة): الباك اند ما
// عنده حقل صورة غلاف للكورس، وصور محلية بمسار id كانت رح تطابق كورسات مختلفة.
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

function CourseCover({ subject, accent }: { subject: string; accent: string }) {
  return (
    <div className={`flex h-28 w-full items-center justify-center ${accent}/15`}>
      <span
        className={`font-display text-3xl font-bold opacity-40 ${accent.replace("bg-", "text-")}`}
      >
        {subject ? subject.charAt(0) : "؟"}
      </span>
    </div>
  );
}

function CoursesPage() {
  const { t } = useTranslation();
  const bi = useBi();
  const { isSignedIn } = useSession();
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["published-courses"],
    queryFn: () => listAllPublishedCourses(),
    retry: 1,
  });

  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState<string>("__all");
  const [level, setLevel] = useState<string>("__all");

  const items = useMemo(() => data?.items ?? [], [data]);
  // المادة (Subject) اختيارية بالكورس؛ لو غايبة منستخدم فئة الكورس كبديل تصنيفي حقيقي.
  const subjectOf = (c: (typeof items)[number]) => c.subjectName ?? c.categoryName ?? "";
  const subjects = useMemo(
    () =>
      Array.from(new Set(items.map((c) => c.subjectName ?? c.categoryName ?? "").filter(Boolean))),
    [items],
  );
  // الفرع/المستوى (علمي، أدبي…): Course ما بيرجّعه بالباك اند حاليًا فالقائمة فاضية دايمًا
  // وقسم الفلتر بيختفي تلقائيًا (شرط levels.length > 0 تحت) لحد ما يتوفر — بدون حذف المنطق.
  const levels = useMemo(
    () => Array.from(new Set(items.map((c) => c.level).filter((l): l is string => !!l))),
    [items],
  );

  const filtered = items.filter((c) => {
    const q = query.trim();
    const matchQuery =
      !q ||
      c.title.includes(q) ||
      (c.description ?? "").includes(q) ||
      (c.teacherName ?? "").includes(q);
    const matchSubject = subject === "__all" || subjectOf(c) === subject;
    const matchLevel = level === "__all" || c.level === level;
    return matchQuery && matchSubject && matchLevel;
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
            {subjects.length > 0 && (
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
            )}
          </div>

          {levels.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground">
                {t("courses.branchLabel")}
              </span>
              {["__all", ...levels].map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(l)}
                  className={`hover-press rounded-lg border px-3 py-1.5 text-xs font-bold ${
                    level === l
                      ? "border-primary bg-primary/12 text-primary"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l === "__all" ? t("courses.all") : l}
                </button>
              ))}
            </div>
          )}
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
        ) : isError ? (
          // خطأ اتصال حقيقي بالباك اند (سيرفر واقع، مشكلة شبكة...) — رسالة صادقة مع إعادة
          // محاولة، مش بيانات وهمية بديلة ومش شاشة فاضية.
          <ErrorState
            className="mx-auto max-w-lg p-10"
            title={bi("ما قدرنا نحمّل الكورسات", "Couldn't load courses")}
            description={bi(
              "ممكن في مشكلة اتصال مؤقتة بالخادم. جرّب تاني بعد شوي.",
              "There might be a temporary server connection issue. Please try again shortly.",
            )}
            action={
              <RetryButton
                label={bi("إعادة المحاولة", "Retry")}
                onClick={() => refetch()}
                loading={isFetching}
              />
            }
          />
        ) : (
          <div key={`${subject}-${level}-${filtered.length}`} className="panel-swap">
            {items.length === 0 ? (
              // لا يوجد أي كورس منشور بعد بكل الكتالوج — حالة مختلفة عن "لا نتائج
              // لبحثك" تحت: صادقة وواضحة (بطاقة بحدود متقطّعة + أيقونة، بدون بيانات وهمية).
              <div className="mx-auto flex max-w-lg flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles aria-hidden="true" className="size-6" />
                </span>
                <h2 className="text-base font-bold text-foreground">
                  {t("courses.emptyCatalogTitle")}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t("courses.emptyCatalogBody")}
                </p>
              </div>
            ) : filtered.length === 0 ? (
              <p className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
                {t("courses.empty")}
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((c) => {
                  const subjectName = subjectOf(c);
                  const DeliveryIcon = DELIVERY_ICON[c.deliveryType] ?? Radio;
                  const deliveryLabel = DELIVERY_LABEL[c.deliveryType];
                  return (
                    <article
                      key={c.id}
                      className="hover-lift shadow-elevation-1 flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
                    >
                      <CourseCover subject={subjectName} accent={subjectAccent(subjectName)} />
                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center justify-between">
                          {subjectName && (
                            <span className="rounded-lg bg-primary/12 px-2.5 py-1 text-xs font-bold text-primary">
                              {subjectName}
                            </span>
                          )}
                          {c.level && (
                            <span className="text-xs text-muted-foreground">{c.level}</span>
                          )}
                        </div>
                        {deliveryLabel && (
                          <div className="mt-2 flex items-center">
                            <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2 py-1 text-micro font-bold text-secondary-foreground">
                              <DeliveryIcon className="size-3.5" />
                              {bi(...deliveryLabel)}
                            </span>
                          </div>
                        )}
                        <Link
                          to="/course/$id"
                          params={{ id: String(c.id) }}
                          className="mt-4 block text-base font-bold text-foreground hover:text-primary"
                        >
                          {c.title}
                        </Link>
                        {c.description && (
                          <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                            {c.description}
                          </p>
                        )}

                        {c.tags && c.tags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {c.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-secondary px-2 py-0.5 text-micro font-medium text-secondary-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-3 flex items-center gap-2.5">
                          {/* صورة المعلم: CourseListItemDto ما فيه profileImage — الأيقونة البديلة
                              أصدق من صورة محلية بمسار id قد تطابق معلمًا مختلفًا. */}
                          <PhotoAvatar className="size-7" iconClassName="size-3.5" />
                          <Link
                            to="/teacher/$id"
                            params={{ id: String(c.teacherId) }}
                            className="text-sm font-semibold text-primary hover:underline"
                          >
                            {c.teacherName || bi("معلّم", "Teacher")}
                          </Link>
                          {typeof c.rating === "number" && (
                            <span className="ms-auto inline-flex items-center gap-1 text-xs font-bold text-foreground">
                              <Star className="size-3.5 fill-primary text-primary" />
                              {c.rating.toFixed(1)}
                            </span>
                          )}
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                          {typeof c.lessonsCount === "number" && (
                            <span className="inline-flex items-center gap-1.5">
                              <BookOpen className="size-4" />
                              {c.lessonsCount} {t("courses.lessons")}
                            </span>
                          )}
                          {typeof c.durationHours === "number" && (
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="size-4" />
                              {c.durationHours} {t("courses.hours")}
                            </span>
                          )}
                          {typeof c.studentsCount === "number" ? (
                            <span className="inline-flex items-center gap-1.5">
                              <Users className="size-4" />
                              {c.studentsCount}
                            </span>
                          ) : (
                            c.maxStudents > 0 && (
                              <span className="inline-flex items-center gap-1.5">
                                <Users className="size-4" />
                                {bi(`حتى ${c.maxStudents} طلاب`, `Up to ${c.maxStudents} students`)}
                              </span>
                            )
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
                  );
                })}
              </div>
            )}
            {data?.truncated && (
              <p className="mt-6 text-center text-xs text-muted-foreground">
                {bi(
                  `يعرض أول ${items.length} من ${data.totalCount} كورس.`,
                  `Showing the first ${items.length} of ${data.totalCount} courses.`,
                )}
              </p>
            )}
          </div>
        )}
      </section>
    </PublicLayout>
  );
}

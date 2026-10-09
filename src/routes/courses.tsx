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
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";
import { PublicLayout } from "@/components/site/public-layout";
import { PageHeader } from "@/components/site/page-header";
import { PhotoAvatar } from "@/components/site/photo-avatar";
import { ErrorState, RetryButton } from "@/components/app/feedback-states";
import { useSession } from "@/hooks/use-session";
import { useBi } from "@/lib/bi";
import { formatMoney } from "@/lib/format";
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

// لون المادة من لوحة 14 (ذهبي/أزرق/صدئي) — ثابت للمادة نفسها (hash)، بلا معنى سوى
// التمييز البصري. شريط علوي سميك + مربع بالحرف الأول؛ الباك اند ما عنده صورة غلاف
// للكورس، فبلا غلاف فارغ يستهلك ربع البطاقة.
const SUBJECT_ACCENTS = [
  { border: "border-t-[var(--brand)]", tile: "bg-[var(--brand)] text-[var(--ink)]" },
  { border: "border-t-[var(--accent-2)]", tile: "bg-[var(--accent-2)] text-white" },
  { border: "border-t-primary", tile: "bg-primary text-primary-foreground" },
] as const;

function subjectAccent(subject: string) {
  let hash = 0;
  for (let i = 0; i < subject.length; i++) hash = (hash * 31 + subject.charCodeAt(i)) >>> 0;
  return SUBJECT_ACCENTS[hash % SUBJECT_ACCENTS.length];
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
      <PageHeader title={t("courses.h1")} highlight={t("courses.h1Hl")} sub={t("courses.sub")}>
        <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("courses.searchPlaceholder")}
              aria-label={t("courses.searchPlaceholder")}
              className="h-11 w-full rounded-xl border-2 border-[var(--border-strong)] bg-background ps-9 pe-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />
          </div>
          {subjects.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {["__all", ...subjects].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSubject(s)}
                  className={cn(
                    "rounded-lg border-2 px-3 py-2 text-xs font-semibold transition-colors",
                    subject === s
                      ? "border-[var(--border-strong)] bg-primary text-primary-foreground"
                      : "border-[var(--border-strong)] bg-background text-muted-foreground hover:text-foreground",
                  )}
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
                className={cn(
                  "rounded-lg border-2 px-3 py-1.5 text-xs font-semibold transition-colors",
                  level === l
                    ? "border-[var(--border-strong)] bg-primary/12 text-primary"
                    : "border-[var(--border-strong)] bg-background text-muted-foreground hover:text-foreground",
                )}
              >
                {l === "__all" ? t("courses.all") : l}
              </button>
            ))}
          </div>
        )}
      </PageHeader>

      <section className="mx-auto max-w-6xl px-5 py-14">
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {/* هيكل تحميل (Skeleton) بنفس أبعاد البطاقة الحقيقية تمامًا —
                يمنع "قفزة" بالتخطيط لما توصل البيانات، ويحس المستخدم
                بسرعة أعلى من دوّارة وحيدة بنص الشاشة. */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border-2 border-[var(--border-strong)] bg-card"
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
        ) : isError && items.length === 0 ? (
          // خطأ اتصال حقيقي بالباك اند (سيرفر واقع، مشكلة شبكة...) — رسالة صادقة مع إعادة
          // محاولة، مش بيانات وهمية بديلة ومش شاشة فاضية. بس isError لحالها ما بتكفي:
          // refetch خلفي فاشل بعد نجاح أول تحميل بيخلّي isError=true بس items لسا فيها
          // نتائج قديمة صحيحة — ما منستبدلها بشاشة خطأ كاملة لمجرد هفوة شبكة عابرة.
          <ErrorState
            className="mx-auto max-w-lg p-10"
            title={bi("تعذّر تحميل الكورسات", "Couldn't load courses")}
            description={bi(
              "ربما هناك مشكلة اتصال مؤقتة بالخادم. حاول مرة أخرى بعد قليل.",
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
              // لبحثك" تحت: صادقة وواضحة (بطاقة بحدّ حبر + أيقونة ذهبية، بدون بيانات وهمية).
              <div className="mx-auto flex max-w-lg flex-col items-center justify-center gap-3 rounded-2xl border-2 border-[var(--border-strong)] bg-card p-10 text-center shadow-[var(--shadow-brutal)]">
                <span className="flex size-12 items-center justify-center rounded-xl border-2 border-[var(--border-strong)] bg-[var(--brand)] text-[var(--ink)] shadow-[2px_2px_0_0_var(--shadow-brutal-color)]">
                  <Sparkles aria-hidden="true" className="size-6" />
                </span>
                <h2 className="text-base font-extrabold text-foreground">
                  {t("courses.emptyCatalogTitle")}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t("courses.emptyCatalogBody")}
                </p>
              </div>
            ) : filtered.length === 0 ? (
              <p className="rounded-2xl border-2 border-[var(--border-strong)] bg-card p-8 text-center text-sm text-muted-foreground shadow-[var(--shadow-brutal)]">
                {t("courses.empty")}
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((c) => {
                  const subjectName = subjectOf(c);
                  const DeliveryIcon = DELIVERY_ICON[c.deliveryType] ?? Radio;
                  const deliveryLabel = DELIVERY_LABEL[c.deliveryType];
                  const accent = subjectAccent(subjectName);
                  return (
                    <article
                      key={c.id}
                      className={cn(
                        "flex flex-col rounded-2xl border-2 border-t-[8px] border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)]",
                        accent.border,
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "grid size-10 shrink-0 place-items-center rounded-xl border-2 border-[var(--border-strong)] font-display text-lg font-bold shadow-[2px_2px_0_0_var(--shadow-brutal-color)]",
                            accent.tile,
                          )}
                        >
                          {subjectName ? subjectName.charAt(0) : "؟"}
                        </span>
                        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1.5">
                          {subjectName && (
                            <span className="rounded-full border-2 border-[var(--border-strong)] bg-background px-3 py-0.5 text-xs font-bold text-foreground">
                              {subjectName}
                            </span>
                          )}
                          {c.level && (
                            <span className="text-xs text-muted-foreground">{c.level}</span>
                          )}
                        </div>
                        {deliveryLabel && (
                          <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                            <DeliveryIcon className="size-3.5" />
                            {bi(...deliveryLabel)}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-4">
                        <Link
                          to="/course/$id"
                          params={{ id: String(c.id) }}
                          className="block text-base font-extrabold text-foreground hover:text-primary"
                        >
                          {c.title}
                        </Link>
                      </h3>
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
                          <span className="ms-auto inline-flex items-center gap-1 text-xs font-semibold text-foreground">
                            <Star className="size-3.5 fill-primary text-primary" />
                            {c.rating.toFixed(1)}
                          </span>
                        )}
                      </div>

                      <div className="mt-auto pt-4">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
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
                        </div>
                        {/* السعر المعلن = أهم معلومة للقرار، فيأخذ صفه ووزنه. */}
                        <p className="mt-3 flex items-center gap-2 text-lg font-extrabold text-foreground">
                          <Wallet aria-hidden="true" className="size-5 text-primary" />
                          {c.price === 0
                            ? t("courses.free")
                            : formatMoney(c.price, bi<"ar" | "en">("ar", "en"))}
                        </p>
                        <Link
                          to={isSignedIn ? "/my-courses" : "/signup"}
                          className={buttonVariants({
                            variant: "default",
                            className: "mt-4 h-auto w-full px-4 py-2.5 text-sm",
                          })}
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

import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Award, MapPin, Radio, Search, Sparkles, Star, Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { PhotoAvatar } from "@/components/site/photo-avatar";
import { ErrorState, RetryButton } from "@/components/app/feedback-states";
import { Button } from "@/components/ui/button";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useBi } from "@/lib/bi";
import { searchTeachers, type TeacherProfileRow } from "@/integrations/backend/teachers";

export const Route = createFileRoute("/teachers")({
  head: (ctx) => createSeoHead("/teachers", localeFromSearch(ctx.match.search)),
  component: TeachersDirectoryPage,
});

type DeliveryFilter = "__all" | "online" | "inperson";

const PAGE_SIZE = 24;

/** سعر الساعة المناسب لفلتر الصيغة: أونلاين → سعر الأونلاين، وجاهي → سعر الوجاهي، الكل → المتوفر. */
function hourlyPrice(teacher: TeacherProfileRow, delivery: DeliveryFilter): number | null {
  const online = teacher.hourlyPriceOnline ?? null;
  const inPerson = teacher.hourlyPriceInPerson ?? null;
  if (delivery === "online") return online;
  if (delivery === "inperson") return inPerson;
  return online ?? inPerson;
}

function TeacherCard({
  teacher,
  delivery,
}: {
  teacher: TeacherProfileRow;
  delivery: DeliveryFilter;
}) {
  const { t } = useTranslation();
  const bi = useBi();
  const price = hourlyPrice(teacher, delivery);

  return (
    <article className="hover-lift shadow-elevation-1 flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start gap-3">
        <PhotoAvatar src={teacher.profileImage} className="size-14 rounded-2xl" />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-bold text-foreground">
            {teacher.name || bi("معلّم", "Teacher")}
          </h2>
          {typeof teacher.averageRating === "number" && teacher.ratingCount > 0 ? (
            <p className="mt-0.5 inline-flex items-center gap-1 text-xs font-bold text-foreground">
              <Star className="size-3.5 fill-primary text-primary" />
              {teacher.averageRating.toFixed(1)}
              <span className="font-normal text-muted-foreground">({teacher.ratingCount})</span>
            </p>
          ) : (
            <p className="mt-0.5 text-xs text-muted-foreground">
              {bi("لا تقييمات بعد", "No ratings yet")}
            </p>
          )}
        </div>
      </div>

      {teacher.bio && (
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {teacher.bio}
        </p>
      )}

      {teacher.subjects.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {teacher.subjects.slice(0, 4).map((s) => (
            <span
              key={s}
              className="rounded-lg bg-primary/12 px-2.5 py-1 text-xs font-bold text-primary"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {teacher.supportsOnline && (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2 py-1 text-micro font-bold text-secondary-foreground">
            <Radio className="size-3.5" />
            {bi("أونلاين", "Online")}
          </span>
        )}
        {teacher.supportsInPerson && (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2 py-1 text-micro font-bold text-secondary-foreground">
            <MapPin className="size-3.5" />
            {bi("وجاهي", "In-person")}
          </span>
        )}
        {teacher.experienceYears > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2 py-1 text-micro font-bold text-secondary-foreground">
            <Award className="size-3.5" />
            {bi(`${teacher.experienceYears} سنة خبرة`, `${teacher.experienceYears} yrs experience`)}
          </span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between pt-5">
        {price != null ? (
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground">
            <Wallet className="size-4 text-primary" />
            {price} JOD
            <span className="text-xs font-normal text-muted-foreground">
              {t("teachersDirectory.perHour")}
            </span>
          </span>
        ) : (
          <span />
        )}
        <Link
          to="/teacher/$id"
          params={{ id: String(teacher.id) }}
          className="hover-press rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:opacity-90"
        >
          {t("teachersDirectory.viewProfile")}
        </Link>
      </div>
    </article>
  );
}

function TeachersDirectoryPage() {
  const { t } = useTranslation();
  const bi = useBi();

  const [query, setQuery] = useState("");
  const [delivery, setDelivery] = useState<DeliveryFilter>("__all");
  const [limit, setLimit] = useState(PAGE_SIZE);
  // بحث الباك اند بيصير بكل تغيير بالفلتر — نؤخّر نص البحث عشان ما يُرسل طلب بكل ضغطة زر.
  const keyword = useDebouncedValue(query.trim(), 400);

  const filter = useMemo(
    () => ({
      keyword: keyword || undefined,
      online: delivery === "online" ? true : undefined,
      inPerson: delivery === "inperson" ? true : undefined,
      skip: 0,
      pageSize: limit,
    }),
    [keyword, delivery, limit],
  );

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["backend-teachers-search", filter],
    queryFn: () => searchTeachers(filter),
    placeholderData: keepPreviousData,
    retry: 1,
  });

  const teachers = data?.data ?? [];
  const total = data?.totalCount ?? teachers.length;
  const hasMore = total > teachers.length;
  const isFiltering = !!keyword || delivery !== "__all";

  // أي تغيير بالبحث/الصيغة يرجّع العدّاد للصفحة الأولى.
  const changeDelivery = (next: DeliveryFilter) => {
    setDelivery(next);
    setLimit(PAGE_SIZE);
  };
  const changeQuery = (next: string) => {
    setQuery(next);
    setLimit(PAGE_SIZE);
  };

  return (
    <PublicLayout>
      <section className="surface-grid border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">
            {t("teachersDirectory.h1")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("teachersDirectory.sub")}
          </p>

          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => changeQuery(e.target.value)}
                placeholder={t("teachersDirectory.searchPlaceholder")}
                aria-label={t("teachersDirectory.searchPlaceholder")}
                className="h-11 w-full rounded-xl border border-border bg-card ps-9 pe-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["__all", "online", "inperson"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => changeDelivery(d)}
                  className={`hover-press rounded-lg border px-3 py-2 text-xs font-bold ${
                    delivery === d
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {d === "__all"
                    ? t("courses.all")
                    : d === "online"
                      ? t("teachersDirectory.onlineOnly")
                      : t("teachersDirectory.inPersonOnly")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse space-y-3 rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="size-14 rounded-2xl bg-secondary" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-2/3 rounded bg-secondary" />
                    <div className="h-3 w-1/3 rounded bg-secondary" />
                  </div>
                </div>
                <div className="h-4 w-full rounded bg-secondary" />
                <div className="h-9 w-28 rounded-xl bg-secondary" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <ErrorState
            className="mx-auto max-w-lg p-10"
            title={bi("ما قدرنا نحمّل المعلمين", "Couldn't load teachers")}
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
        ) : teachers.length === 0 ? (
          <div className="mx-auto flex max-w-lg flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles aria-hidden="true" className="size-6" />
            </span>
            <h2 className="text-base font-bold text-foreground">
              {isFiltering
                ? t("teachersDirectory.empty")
                : t("teachersDirectory.emptyDirectoryTitle")}
            </h2>
            {!isFiltering && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("teachersDirectory.emptyDirectoryBody")}
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {teachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} delivery={delivery} />
              ))}
            </div>
            {hasMore && (
              <div className="mt-8 flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLimit((n) => n + PAGE_SIZE)}
                  loading={isFetching}
                >
                  {bi("عرض المزيد", "Show more")}
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </PublicLayout>
  );
}

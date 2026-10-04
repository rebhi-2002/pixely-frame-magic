import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  Award,
  ChevronDown,
  MapPin,
  Radio,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Wallet,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { PhotoAvatar } from "@/components/site/photo-avatar";
import { ErrorState, RetryButton } from "@/components/app/feedback-states";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
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
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border-2 border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)]",
      )}
    >
      <div className="flex items-start gap-3">
        <PhotoAvatar
          src={teacher.profileImage}
          className="size-14 rounded-2xl border-2 border-[var(--border-strong)]"
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-foreground">
            {teacher.name || bi("معلّم", "Teacher")}
          </h3>
          {typeof teacher.averageRating === "number" && teacher.ratingCount > 0 ? (
            <p className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-foreground">
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
              className="rounded-lg border border-[var(--border-strong)]/40 bg-primary/12 px-2.5 py-1 text-xs font-semibold text-primary"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {teacher.supportsOnline && (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2 py-1 text-micro font-semibold text-secondary-foreground">
            <Radio className="size-3.5" />
            {bi("أونلاين", "Online")}
          </span>
        )}
        {teacher.supportsInPerson && (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2 py-1 text-micro font-semibold text-secondary-foreground">
            <MapPin className="size-3.5" />
            {bi("وجاهي", "In-person")}
          </span>
        )}
        {teacher.experienceYears > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2 py-1 text-micro font-semibold text-secondary-foreground">
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
          className={buttonVariants({ variant: "default", className: "h-auto px-4 py-2 text-sm" })}
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

  // فلاتر FR-T02 الإضافية — كل حقل هون موجود فعليًا بـTeacherSearchFilter
  // (مطابق للـbackend DTO، راجع تعليق أول teachers.ts)، فبنرسلها للباك اند
  // مباشرة بدل فلترة محلية بعد الصفحة (كان بيكسر pagination/total الحقيقيين).
  // ⚠️ subjectId/gradeId استُبعدوا عمدًا: ما في endpoint حاليًا يرجّع قائمة
  // المواد/الصفوف الحقيقية بأرقامها (IDs)، وTeacherProfileRow بيرجّع أسماء
  // نصّية بس (subjects: string[])، فما في طريقة نربط اسم باسم رقم صحيح بدون
  // تخمين — تخمين الـID بيكسر الفلترة بصمت أو يعرض نتائج غلط. لازم endpoint
  // حقيقي (مثلاً Subject/GetAll، Grade/GetAll) قبل ما نضيفهم.
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [minRating, setMinRating] = useState<number | undefined>(undefined);
  const [minExperience, setMinExperience] = useState<number | undefined>(undefined);
  const [availableDay, setAvailableDay] = useState<number | undefined>(undefined);
  const [languageInput, setLanguageInput] = useState("");
  const language = useDebouncedValue(languageInput.trim(), 400);
  const minPrice = useDebouncedValue(minPriceInput.trim(), 400);
  const maxPrice = useDebouncedValue(maxPriceInput.trim(), 400);

  const hasAdvancedFilters =
    minPriceInput !== "" ||
    maxPriceInput !== "" ||
    minRating != null ||
    minExperience != null ||
    availableDay != null ||
    languageInput !== "";

  const filter = useMemo(
    () => ({
      keyword: keyword || undefined,
      online: delivery === "online" ? true : undefined,
      inPerson: delivery === "inperson" ? true : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minRating,
      minExperienceYears: minExperience,
      availableDay,
      language: language || undefined,
      skip: 0,
      pageSize: limit,
    }),
    [
      keyword,
      delivery,
      minPrice,
      maxPrice,
      minRating,
      minExperience,
      availableDay,
      language,
      limit,
    ],
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
  const isFiltering = !!keyword || delivery !== "__all" || hasAdvancedFilters;

  // أي تغيير بالبحث/الصيغة يرجّع العدّاد للصفحة الأولى.
  const changeDelivery = (next: DeliveryFilter) => {
    setDelivery(next);
    setLimit(PAGE_SIZE);
  };

  const changeMinPrice = (next: string) => {
    setMinPriceInput(next);
    setLimit(PAGE_SIZE);
  };
  const changeMaxPrice = (next: string) => {
    setMaxPriceInput(next);
    setLimit(PAGE_SIZE);
  };
  const changeMinRating = (next: number | undefined) => {
    setMinRating(next);
    setLimit(PAGE_SIZE);
  };
  const changeMinExperience = (next: number | undefined) => {
    setMinExperience(next);
    setLimit(PAGE_SIZE);
  };
  const changeAvailableDay = (next: number | undefined) => {
    setAvailableDay(next);
    setLimit(PAGE_SIZE);
  };
  const changeLanguage = (next: string) => {
    setLanguageInput(next);
    setLimit(PAGE_SIZE);
  };
  const resetAdvancedFilters = () => {
    setMinPriceInput("");
    setMaxPriceInput("");
    setMinRating(undefined);
    setMinExperience(undefined);
    setAvailableDay(undefined);
    setLanguageInput("");
    setLimit(PAGE_SIZE);
  };

  const changeQuery = (next: string) => {
    setQuery(next);
    setLimit(PAGE_SIZE);
  };

  return (
    <PublicLayout>
      <section className="border-b-2 border-[var(--border-strong)] bg-card">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h1 className="text-4xl font-extrabold text-foreground md:text-5xl">
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
                className="h-11 w-full rounded-xl border-2 border-[var(--border-strong)] bg-background ps-9 pe-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["__all", "online", "inperson"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => changeDelivery(d)}
                  className={cn(
                    "rounded-lg border-2 px-3 py-2 text-xs font-bold transition-colors",
                    delivery === d
                      ? "border-[var(--border-strong)] bg-primary text-primary-foreground"
                      : "border-[var(--border-strong)] bg-background text-muted-foreground hover:text-foreground",
                  )}
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

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[var(--border-strong)] bg-background px-3 py-2 text-xs font-bold text-foreground hover:bg-secondary"
            >
              <SlidersHorizontal className="size-3.5" />
              {t("teachersDirectory.filters.toggle")}
              <ChevronDown
                className={cn("size-3.5 transition-transform", filtersOpen && "rotate-180")}
              />
            </button>
            {hasAdvancedFilters && (
              <button
                type="button"
                onClick={resetAdvancedFilters}
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-bold text-muted-foreground hover:text-destructive"
              >
                <RotateCcw className="size-3.5" />
                {t("teachersDirectory.filters.reset")}
              </button>
            )}
          </div>
          {filtersOpen && (
            <div className="mt-3 grid gap-4 rounded-2xl border-2 border-[var(--border-strong)] bg-background p-5 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="text-xs font-bold text-foreground">
                  {t("teachersDirectory.filters.priceLabel")}
                </label>
                <div className="mt-1.5 flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={minPriceInput}
                    onChange={(e) => changeMinPrice(e.target.value)}
                    placeholder={t("teachersDirectory.filters.priceFrom")}
                    aria-label={t("teachersDirectory.filters.priceFrom")}
                    className="h-10 w-full min-w-0 rounded-lg border-2 border-[var(--border-strong)] bg-card px-2.5 text-sm text-foreground outline-none focus:border-primary"
                  />
                  <span className="text-xs text-muted-foreground">—</span>
                  <input
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={maxPriceInput}
                    onChange={(e) => changeMaxPrice(e.target.value)}
                    placeholder={t("teachersDirectory.filters.priceTo")}
                    aria-label={t("teachersDirectory.filters.priceTo")}
                    className="h-10 w-full min-w-0 rounded-lg border-2 border-[var(--border-strong)] bg-card px-2.5 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-foreground">
                  {t("teachersDirectory.filters.ratingLabel")}
                </label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {[undefined, 3, 4, 4.5].map((r) => (
                    <button
                      key={r ?? "any"}
                      type="button"
                      onClick={() => changeMinRating(r)}
                      className={cn(
                        "rounded-lg border-2 px-2.5 py-1.5 text-xs font-bold transition-colors",
                        minRating === r
                          ? "border-[var(--border-strong)] bg-primary text-primary-foreground"
                          : "border-[var(--border-strong)] bg-card text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {r == null ? (
                        t("teachersDirectory.filters.ratingAny")
                      ) : (
                        <span className="inline-flex items-center gap-1">
                          <Star className="size-3 fill-current" />
                          {r}+
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-foreground">
                  {t("teachersDirectory.filters.experienceLabel")}
                </label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {[undefined, 1, 3, 5].map((y) => (
                    <button
                      key={y ?? "any"}
                      type="button"
                      onClick={() => changeMinExperience(y)}
                      className={cn(
                        "rounded-lg border-2 px-2.5 py-1.5 text-xs font-bold transition-colors",
                        minExperience === y
                          ? "border-[var(--border-strong)] bg-primary text-primary-foreground"
                          : "border-[var(--border-strong)] bg-card text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {y == null ? t("teachersDirectory.filters.experienceAny") : `${y}+`}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-foreground">
                  {t("teachersDirectory.filters.dayLabel")}
                </label>
                <select
                  value={availableDay ?? "__any"}
                  onChange={(e) =>
                    changeAvailableDay(
                      e.target.value === "__any" ? undefined : Number(e.target.value),
                    )
                  }
                  className="mt-1.5 h-10 w-full rounded-lg border-2 border-[var(--border-strong)] bg-card px-2.5 text-sm text-foreground outline-none focus:border-primary"
                >
                  <option value="__any">{t("teachersDirectory.filters.dayAny")}</option>
                  {(t("teachersDirectory.filters.days", { returnObjects: true }) as string[]).map(
                    (label, i) => (
                      <option key={i} value={i}>
                        {label}
                      </option>
                    ),
                  )}
                </select>
              </div>
              <div className="sm:col-span-2 lg:col-span-4">
                <label className="text-xs font-bold text-foreground">
                  {t("teachersDirectory.filters.languageLabel")}
                </label>
                <input
                  value={languageInput}
                  onChange={(e) => changeLanguage(e.target.value)}
                  placeholder={t("teachersDirectory.filters.languagePlaceholder")}
                  className="mt-1.5 h-10 w-full max-w-xs rounded-lg border-2 border-[var(--border-strong)] bg-card px-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse space-y-3 rounded-2xl border-2 border-[var(--border-strong)] bg-card p-6"
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
        ) : isError && teachers.length === 0 ? (
          // isError لحالها ما بتكفي: refetch خلفي فاشل (رجوع فوكس/إعادة اتصال)
          // بعد نجاح أول تحميل بيخلّي isError=true بس teachers لسا فيها نتائج
          // قديمة صحيحة — نفس مبدأ إصلاح TeacherPreview بالرئيسية. نعرض شاشة
          // الخطأ بس لو ما عنا نتائج أصلًا نعرضها.
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
          <div className="mx-auto flex max-w-lg flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[var(--border-strong)] bg-card p-10 text-center">
            <span className="flex size-12 items-center justify-center rounded-full border-2 border-[var(--border-strong)] bg-primary/10 text-primary">
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

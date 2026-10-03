import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Award, BookOpen, Calendar, Clock3, MapPin, Radio, Star } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { PhotoAvatar } from "@/components/site/photo-avatar";
import { SessionCta } from "@/components/site/session-cta";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { useBi } from "@/lib/bi";
import { useSession } from "@/hooks/use-session";
import { BOOKING_FLOW_ENABLED } from "@/lib/booking-slots";
import { buttonVariants } from "@/components/ui/button-variants";
import { getTeacherAvailability, getTeacherPublicProfile } from "@/integrations/backend/teachers";
import { coursesOfTeacher, listAllPublishedCourses } from "@/integrations/backend/courses";

export const Route = createFileRoute("/teacher/$id")({
  head: (ctx) => {
    const { params } = ctx;
    return createSeoHead(
      `/teacher/${encodeURIComponent(params.id)}`,
      localeFromSearch(ctx.match.search),
    );
  },
  component: TeacherProfilePage,
});

// DayOfWeek بترميز .NET: 0=الأحد...6=السبت (راجع تعليق teachers.ts).
const DAY_NAMES: [string, string][] = [
  ["الأحد", "Sunday"],
  ["الاثنين", "Monday"],
  ["الثلاثاء", "Tuesday"],
  ["الأربعاء", "Wednesday"],
  ["الخميس", "Thursday"],
  ["الجمعة", "Friday"],
  ["السبت", "Saturday"],
];

/** "14:30:00" → "14:30" (لو الشكل غير متوقّع منرجّعه كما هو بدل ما نكسر العرض). */
function shortTime(time: string): string {
  const match = /^(\d{1,2}:\d{2})/.exec(time);
  return match ? match[1] : time;
}

function TeacherProfilePage() {
  const { id } = Route.useParams();
  const { session } = useSession();
  // الحجز للطالب فقط (Q-07)؛ الزائر مسموح له يشوف الزر وبيتحوّل لتسجيل الدخول.
  const canBook = !session || session.roleKey === "student";
  const { t } = useTranslation();
  const bi = useBi();

  // معرّف المعلم رقمي بالباك اند. أي شي تاني (مثلًا روابط قديمة بشكل sami-khalil) = غير موجود
  // مباشرة، بدون طلب شبكة.
  const teacherId = Number(id);
  const validId = Number.isInteger(teacherId) && teacherId > 0;

  const {
    data: teacher,
    isLoading: teacherLoading,
    isError: teacherError,
    isFetching: teacherFetching,
    refetch: refetchTeacher,
  } = useQuery({
    queryKey: ["backend-teacher-profile", teacherId],
    queryFn: () => getTeacherPublicProfile(teacherId),
    enabled: validId,
    retry: 1,
  });

  // GetPublished ما بيدعم فلتر المعلم (مطلوب موثّق للباك اند) — منستخدم نفس كتالوج /courses
  // المُخزَّن مؤقتًا ونفلتره هون.
  const {
    data: catalog,
    isLoading: coursesLoading,
    isError: coursesError,
    isFetching: coursesFetching,
    refetch: refetchCourses,
  } = useQuery({
    queryKey: ["published-courses"],
    queryFn: () => listAllPublishedCourses(),
    enabled: validId && !!teacher,
    retry: 1,
  });
  const courses = useMemo(
    () => coursesOfTeacher(catalog?.items ?? [], teacherId),
    [catalog, teacherId],
  );

  // جدول التوفّر الأسبوعي — للعرض فقط بهالجولة (بدون حجز؛ المرحلة 2). بيانات عامة بلا حساب.
  const { data: availability } = useQuery({
    queryKey: ["backend-teacher-availability", teacherId],
    queryFn: () => getTeacherAvailability(teacherId),
    enabled: validId && !!teacher,
    retry: 1,
  });
  const slotsByDay = useMemo(() => {
    const grouped = new Map<number, typeof availability>();
    for (const slot of availability ?? []) {
      grouped.set(slot.dayOfWeek, [...(grouped.get(slot.dayOfWeek) ?? []), slot]);
    }
    return grouped;
  }, [availability]);

  if (!validId || (!teacherLoading && !teacherError && !teacher)) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-3xl px-5 py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground">{t("teacherProfile.notFound")}</h1>
          <Link
            to="/courses"
            className={buttonVariants({
              variant: "default",
              className: "mt-6 h-auto px-6 py-3 text-sm",
            })}
          >
            {t("nav.courses")}
          </Link>
        </div>
      </PublicLayout>
    );
  }

  if (teacherLoading) {
    return (
      <PublicLayout>
        <LoadingState
          label={bi("جارٍ التحميل…", "Loading…")}
          className="border-none bg-transparent"
        />
      </PublicLayout>
    );
  }

  if (teacherError || !teacher) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-lg px-5 py-24">
          <ErrorState
            title={bi("ما قدرنا نحمّل الصفحة", "Couldn't load this page")}
            description={bi(
              "ممكن في مشكلة اتصال مؤقتة. جرّب تاني بعد شوي.",
              "There might be a temporary connection issue. Please try again shortly.",
            )}
            action={
              <RetryButton
                label={bi("إعادة المحاولة", "Retry")}
                onClick={() => refetchTeacher()}
                loading={teacherFetching}
              />
            }
          />
        </div>
      </PublicLayout>
    );
  }

  const hasRating = typeof teacher.averageRating === "number" && teacher.ratingCount > 0;
  const hasPrices = teacher.hourlyPriceOnline != null || teacher.hourlyPriceInPerson != null;
  const hasDetails =
    !!teacher.qualifications ||
    !!teacher.languages ||
    !!teacher.serviceArea ||
    teacher.supportsOnline ||
    teacher.supportsInPerson ||
    hasPrices;

  return (
    <PublicLayout>
      <section className="border-b-2 border-[var(--border-strong)] bg-card">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <div className="flex flex-wrap items-center gap-4">
            <PhotoAvatar
              src={teacher.profileImage}
              className="size-16 rounded-2xl border-2 border-[var(--border-strong)]"
            />
            <h1 className="text-3xl font-extrabold text-foreground">
              {teacher.name || bi("معلّم", "Teacher")}
            </h1>
          </div>

          {/* FR-T05/T06 (WP-S1 / S1-06): رابط الحجز جاهز بالكود لكنه مغلق بعلم BOOKING_FLOW_ENABLED (lib/booking-slots.ts)
              لحد ما يكتمل إرسال الحجز (S1-05) وربط قوائم المادة/الصف (S1-03/Q-04). وهو مغلق: زر معطَّل صريح
              بدل ربطه بوظيفة غير مكتملة — حالة صادقة واضحة، لا خداع. الرابط للطالب فقط (Q-07)، والزائر يُحوَّل لتسجيل الدخول. */}
          {BOOKING_FLOW_ENABLED && canBook ? (
            <Link
              to="/book/$teacherId"
              params={{ teacherId: id }}
              className={buttonVariants({ className: "mt-6 h-auto gap-2 px-6 py-3 text-sm" })}
            >
              <Clock3 className="size-4" />
              {bi("احجز حصة", "Book a session")}
            </Link>
          ) : (
            <button
              type="button"
              disabled
              aria-disabled="true"
              title={bi("الحجز المباشر غير متاح بعد", "Direct booking isn't available yet")}
              className={buttonVariants({
                variant: "soft",
                className: "mt-6 h-auto cursor-not-allowed gap-2 px-6 py-3 text-sm opacity-70",
              })}
            >
              <Clock3 className="size-4" />
              {bi("الحجز المباشر قريباً", "Direct booking coming soon")}
            </button>
          )}

          {/* أرقام حقيقية بس. لا "موثّق" ولا "4.8" ولا "1,240 طالب" ثابتة لكل معلم كما كان قبل:
              الباك اند ما عنده علم توثيق ولا عدد طلاب للمعلم، ولو ما في تقييمات منعرض
              "لا تقييمات بعد" بصدق (راجع docs/operations/2026-09-21-teachers-courses-real-backend-connection.md). */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Stat
              icon={<BookOpen className="size-4" />}
              value={coursesLoading ? "…" : coursesError ? "—" : String(courses.length)}
              label={t("teacherProfile.courses")}
            />
            {hasRating ? (
              <Stat
                icon={<Star className="size-4" />}
                value={(teacher.averageRating as number).toFixed(1)}
                label={`${t("teacherProfile.rating")} (${teacher.ratingCount})`}
              />
            ) : (
              <Stat
                icon={<Star className="size-4" />}
                value="—"
                label={bi("لا تقييمات بعد", "No ratings yet")}
              />
            )}
            {teacher.experienceYears > 0 && (
              <Stat
                icon={<Award className="size-4" />}
                value={String(teacher.experienceYears)}
                label={bi("سنوات الخبرة", "Years of experience")}
              />
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14">
        {teacher.bio && (
          <>
            <h2 className="text-xl font-extrabold text-foreground">
              {t("teacherProfile.aboutTitle")}
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{teacher.bio}</p>
          </>
        )}

        {(teacher.subjects.length > 0 || teacher.grades.length > 0) && (
          <div className="mt-6 flex flex-wrap gap-2">
            {[...teacher.subjects, ...teacher.grades].map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-[var(--border-strong)]/40 bg-primary/12 px-2.5 py-1 text-xs font-semibold text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {hasDetails && (
          <dl className="mt-8 grid gap-4 rounded-2xl border-2 border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)] sm:grid-cols-2">
            {teacher.qualifications && (
              <div>
                <dt className="text-xs font-semibold text-muted-foreground">
                  {bi("المؤهلات", "Qualifications")}
                </dt>
                <dd className="mt-1 text-sm text-foreground">{teacher.qualifications}</dd>
              </div>
            )}
            {teacher.languages && (
              <div>
                <dt className="text-xs font-semibold text-muted-foreground">
                  {bi("اللغات", "Languages")}
                </dt>
                <dd className="mt-1 text-sm text-foreground">{teacher.languages}</dd>
              </div>
            )}
            {teacher.serviceArea && (
              <div>
                <dt className="text-xs font-semibold text-muted-foreground">
                  {bi("منطقة الخدمة", "Service area")}
                </dt>
                <dd className="mt-1 text-sm text-foreground">{teacher.serviceArea}</dd>
              </div>
            )}
            {(teacher.supportsOnline || teacher.supportsInPerson) && (
              <div>
                <dt className="text-xs font-semibold text-muted-foreground">
                  {bi("صيغة التدريس", "Teaching format")}
                </dt>
                <dd className="mt-1 flex flex-wrap gap-2">
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
                </dd>
              </div>
            )}
            {hasPrices && (
              <div>
                <dt className="text-xs font-semibold text-muted-foreground">
                  {bi("سعر الساعة", "Hourly rate")}
                </dt>
                <dd className="mt-1 space-y-0.5 text-sm text-foreground">
                  {teacher.hourlyPriceOnline != null && (
                    <p>
                      {bi("أونلاين", "Online")}: {teacher.hourlyPriceOnline} JOD
                    </p>
                  )}
                  {teacher.hourlyPriceInPerson != null && (
                    <p>
                      {bi("وجاهي", "In-person")}: {teacher.hourlyPriceInPerson} JOD
                    </p>
                  )}
                </dd>
              </div>
            )}
          </dl>
        )}

        {slotsByDay.size > 0 && (
          <>
            <h2 className="mt-12 text-xl font-extrabold text-foreground">
              {bi("أوقات التوفّر", "Availability")}
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {DAY_NAMES.map(([dayAr, dayEn], dayOfWeek) => {
                const slots = slotsByDay.get(dayOfWeek);
                if (!slots || slots.length === 0) return null;
                return (
                  <div
                    key={dayOfWeek}
                    className="rounded-xl border-2 border-[var(--border-strong)] bg-card p-4"
                  >
                    <p className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground">
                      <Calendar className="size-4 text-primary" />
                      {bi(dayAr, dayEn)}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {slots.map((slot) => (
                        <li
                          key={slot.id}
                          className="flex items-center justify-between text-xs text-muted-foreground"
                        >
                          <span>
                            {shortTime(slot.startTime)}–{shortTime(slot.endTime)}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            {slot.teachingMode === 2 ? (
                              <Radio className="size-3.5" />
                            ) : (
                              <MapPin className="size-3.5" />
                            )}
                            {slot.teachingMode === 2
                              ? bi("أونلاين", "Online")
                              : bi("وجاهي", "In-person")}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <h2 className="mt-12 text-xl font-extrabold text-foreground">
          {t("teacherProfile.coursesTitle")}
        </h2>
        {coursesLoading ? (
          <LoadingState
            label={bi("جارٍ تحميل الكورسات…", "Loading courses…")}
            className="mt-6 min-h-24 border-none bg-transparent"
          />
        ) : coursesError ? (
          <ErrorState
            className="mt-6 min-h-24"
            title={bi("ما قدرنا نحمّل الكورسات", "Couldn't load courses")}
            description={bi("جرّب تاني بعد شوي.", "Please try again shortly.")}
            action={
              <RetryButton
                label={bi("إعادة المحاولة", "Retry")}
                onClick={() => refetchCourses()}
                loading={coursesFetching}
              />
            }
          />
        ) : courses.length === 0 ? (
          <p className="mt-6 rounded-2xl border-2 border-dashed border-[var(--border-strong)]/60 bg-card p-6 text-center text-sm text-muted-foreground">
            {bi(
              "ما في كورسات منشورة لهذا المعلّم بعد.",
              "No published courses from this teacher yet.",
            )}
          </p>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {courses.map((c) => (
              <article
                key={c.id}
                className="rounded-2xl border-2 border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)]"
              >
                {(c.subjectName ?? c.categoryName) && (
                  <span className="rounded-lg border border-[var(--border-strong)]/40 bg-primary/12 px-2.5 py-1 text-xs font-semibold text-primary">
                    {c.subjectName ?? c.categoryName}
                  </span>
                )}
                <Link
                  to="/course/$id"
                  params={{ id: String(c.id) }}
                  className="mt-3 block font-bold text-foreground hover:text-primary"
                >
                  {c.title}
                </Link>
                {c.description && (
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                    {c.description}
                  </p>
                )}
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {c.price === 0 ? t("courses.free") : `${c.price} JOD`}
                </p>
              </article>
            ))}
          </div>
        )}
        {catalog?.truncated && (
          <p className="mt-3 text-xs text-muted-foreground">
            {bi(
              "قد تكون هناك كورسات إضافية لم تُحمَّل بعد.",
              "There may be additional courses that haven't loaded yet.",
            )}
          </p>
        )}

        {/* آراء نصّية: الباك اند فيه تقييم إجمالي (TeacherRating) بس، مفيش endpoint يرجّع نصوص
            التقييمات — حالة صادقة بدل بيانات وهمية. */}
        <h2 className="mt-12 text-xl font-extrabold text-foreground">
          {t("teacherProfile.reviewsTitle")}
        </h2>
        <p className="mt-6 rounded-2xl border-2 border-dashed border-[var(--border-strong)]/60 bg-card p-6 text-center text-sm text-muted-foreground">
          {t("teacherProfile.reviewsEmpty")}
        </p>

        <div className="mt-12 text-center">
          <SessionCta
            to="/signup"
            label={t("teacherProfile.cta")}
            className={buttonVariants({
              variant: "default",
              className: "h-auto px-7 py-3.5 text-sm",
            })}
          />
        </div>
      </section>
    </PublicLayout>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl border-2 border-[var(--border-strong)] bg-card p-5 shadow-[var(--shadow-brutal)]">
      <span className="inline-flex items-center gap-1.5 text-muted-foreground">{icon}</span>
      <p className="font-display mt-1 text-2xl font-bold text-primary">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

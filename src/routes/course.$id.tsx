import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, MapPin, Radio, Star, Users, Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { PhotoAvatar } from "@/components/site/photo-avatar";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { useSession } from "@/hooks/use-session";
import { useBi } from "@/lib/bi";
import {
  getPublishedCourse,
  type BackendCourseDeliveryType,
} from "@/integrations/backend/courses";

export const Route = createFileRoute("/course/$id")({
  head: (ctx) => {
    const { params } = ctx;
    return createSeoHead(
      `/course/${encodeURIComponent(params.id)}`,
      localeFromSearch(ctx.match.search),
    );
  },
  component: CourseDetailPage,
});

const DELIVERY_ICON: Record<BackendCourseDeliveryType, typeof Radio> = { 1: MapPin, 2: Radio };
const DELIVERY_LABEL: Record<BackendCourseDeliveryType, [string, string]> = {
  1: ["وجاهي", "On-site"],
  2: ["أونلاين", "Online"],
};

function CourseDetailPage() {
  const { id } = Route.useParams();
  const { t } = useTranslation();
  const bi = useBi();
  const { isSignedIn } = useSession();

  const courseId = Number(id);
  const validId = Number.isInteger(courseId) && courseId > 0;

  const {
    data: course,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["published-course", courseId],
    queryFn: () => getPublishedCourse(courseId),
    enabled: validId,
    retry: 1,
  });

  if (!validId || (!isLoading && !isError && !course)) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-3xl px-5 py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground">{t("courseDetail.notFound")}</h1>
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

  if (isLoading) {
    return (
      <PublicLayout>
        <LoadingState
          label={bi("جارٍ التحميل…", "Loading…")}
          className="border-none bg-transparent"
        />
      </PublicLayout>
    );
  }

  if (isError || !course) {
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
                onClick={() => refetch()}
                loading={isFetching}
              />
            }
          />
        </div>
      </PublicLayout>
    );
  }

  const subjectName = course.subjectName ?? course.categoryName ?? "";
  const DeliveryIcon = DELIVERY_ICON[course.deliveryType] ?? Radio;
  const deliveryLabel = DELIVERY_LABEL[course.deliveryType];

  return (
    <PublicLayout>
      <section className="surface-grid border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-16">
          <div className="flex flex-wrap items-center gap-2">
            {subjectName && (
              <span className="rounded-lg bg-primary/12 px-2.5 py-1 text-xs font-bold text-primary">
                {subjectName}
              </span>
            )}
            {course.level && (
              <span className="text-xs text-muted-foreground">{course.level}</span>
            )}
            {deliveryLabel && (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2 py-1 text-micro font-bold text-secondary-foreground">
                <DeliveryIcon className="size-3.5" />
                {bi(...deliveryLabel)}
              </span>
            )}
          </div>
          <h1 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">{course.title}</h1>

          <div className="mt-5 flex items-center gap-2.5">
            <PhotoAvatar className="size-9" iconClassName="size-4" />
            <Link
              to="/teacher/$id"
              params={{ id: String(course.teacherId) }}
              className="text-sm font-semibold text-primary hover:underline"
            >
              {course.teacherName || bi("معلّم", "Teacher")}
            </Link>
            {typeof course.rating === "number" && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-foreground">
                <Star className="size-3.5 fill-primary text-primary" />
                {course.rating.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14">
        <div className="grid gap-8 md:grid-cols-[1fr_18rem]">
          <div>
            {course.description && (
              <>
                <h2 className="text-lg font-bold text-foreground">
                  {t("courseDetail.aboutTitle")}
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{course.description}</p>
              </>
            )}

            {course.tags && course.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-1.5">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-secondary px-2 py-0.5 text-micro font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {typeof course.lessonsCount === "number" && (
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="size-4" />
                  {course.lessonsCount} {t("courses.lessons")}
                </span>
              )}
              {typeof course.studentsCount === "number" ? (
                <span className="inline-flex items-center gap-1.5">
                  <Users className="size-4" />
                  {course.studentsCount}
                </span>
              ) : (
                course.maxStudents > 0 && (
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-4" />
                    {bi(`حتى ${course.maxStudents} طلاب`, `Up to ${course.maxStudents} students`)}
                  </span>
                )
              )}
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-card p-6">
            <p className="inline-flex items-center gap-1.5 text-2xl font-bold text-foreground">
              <Wallet className="size-5 text-primary" />
              {course.price === 0 ? t("courses.free") : `${course.price} JOD`}
            </p>
            <Link
              to={isSignedIn ? "/my-courses" : "/signup"}
              className="hover-press mt-5 flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90"
            >
              {t(isSignedIn ? "courses.open" : "courses.enroll")}
            </Link>
          </aside>
        </div>
      </section>
    </PublicLayout>
  );
}

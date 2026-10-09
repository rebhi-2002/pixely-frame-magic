// كورساتي (معلم) — WP-T1 / T1-01 (+T1-02 أزرار الإنشاء). Course/GetAll → {totalCount,data: CourseListItemDto[]}.
// Q-01: GetAll يفلتر كورسات المعلم لحسابات المعلمين (تحليل كود الباك اند — لم يُجرَّب حيًا): نعرض الرد كما هو
// ولا نفلتر محليًا (لا teacherId معروف). أول تشغيل حيّ بحساب معلم يؤكد.
import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppPage, Badge, DataTable, EmptyState, Panel } from "@/components/app/kit";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { Guard } from "@/components/app/guard";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { listMyCourses, PUBLISHED_PAGE_SIZE } from "@/integrations/backend/courses";
import { useBi } from "@/lib/bi";
import { courseStatusLabel, courseStatusTone, deliveryTypeLabel } from "@/lib/enums";
import { formatMoney } from "@/lib/format";
import { withLoadErrorDetail } from "@/lib/load-error";
import { qk } from "@/lib/query-keys";
import { authPageHead } from "@/lib/seo";
import { sortCoursesForTeacher } from "@/lib/teacher-courses";

const description = "إنشاء وإدارة كورساتك الخاصة.";

export const Route = createFileRoute("/_authenticated/teacher/courses")({
  head: () =>
    authPageHead(
      { title: "كورساتي (معلم) | أكاديميا", description },
      {
        title: "My courses (teacher) | Academia",
        description: "Create and manage your own courses.",
      },
    ),
  component: () => (
    <Guard pageKey="teacher_courses">
      <Body />
    </Guard>
  ),
});

function Body() {
  const bi = useBi();
  const lang = bi<"ar" | "en">("ar", "en");
  const query = useQuery({
    queryKey: qk.teacherCourses(),
    queryFn: () =>
      listMyCourses({
        pageSize: PUBLISHED_PAGE_SIZE,
        sortColumn: "Id",
        sortColumnDirection: "desc",
      }),
  });
  const rows = query.data ? sortCoursesForTeacher(query.data.data) : null;

  return (
    <AppPage
      title={bi("كورساتي", "My courses")}
      icon="BookOpen"
      subtitle={bi(description, "Create and manage your own courses.")}
      actions={
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm">
            <Link to="/teacher/course/$id" params={{ id: "new" }} search={{ type: 1 }}>
              {bi("إنشاء كورس حضوري", "Create an in-person course")}
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link to="/teacher/course/$id" params={{ id: "new" }} search={{ type: 2 }}>
              {bi("إنشاء كورس أونلاين", "Create an online course")}
            </Link>
          </Button>
        </div>
      }
    >
      <Panel title={bi("قائمة الكورسات", "Course list")} icon="BookOpen">
        {query.isError ? (
          <ErrorState
            title={bi("ما قدرنا نحمّل كورساتك", "We couldn't load your courses")}
            description={withLoadErrorDetail(
              bi(
                "جرّب مرة ثانية. إذا استمرت المشكلة، تأكد من اتصالك أو ارجع لاحقاً.",
                "Try again. If the problem continues, check your connection or come back later.",
              ),
              query.error,
              bi,
            )}
            action={
              <RetryButton
                label={bi("إعادة المحاولة", "Try again")}
                onClick={() => void query.refetch()}
              />
            }
          />
        ) : !rows ? (
          <LoadingState
            label={bi("جارٍ التحميل…", "Loading…")}
            className="border-none bg-transparent"
          />
        ) : rows.length === 0 ? (
          <EmptyState
            icon="BookOpen"
            title={bi("لا توجد كورسات بعد", "No courses yet")}
            description={bi(
              "أنشئ كورسك الأول من الأزرار أعلاه.",
              "Create your first course using the buttons above.",
            )}
          />
        ) : (
          <>
            <DataTable
              caption={bi("كورساتي", "My courses")}
              head={[
                bi("العنوان", "Title"),
                bi("النوع", "Type"),
                bi("المادة", "Subject"),
                bi("السعر", "Price"),
                bi("السعة", "Capacity"),
                bi("الحالة", "Status"),
                "",
              ]}
              rows={rows.map((c) => [
                <Link
                  key={`t-${c.id}`}
                  to="/teacher/course/$id"
                  params={{ id: String(c.id) }}
                  className="font-semibold text-foreground underline-offset-4 hover:underline"
                >
                  {c.title}
                </Link>,
                deliveryTypeLabel(c.deliveryType, bi),
                c.subjectName ?? "—",
                formatMoney(c.price, lang),
                String(c.maxStudents),
                <Badge key={`s-${c.id}`} tone={courseStatusTone(c.status)}>
                  {courseStatusLabel(c.status, bi)}
                </Badge>,
                <Link
                  key={`m-${c.id}`}
                  to="/teacher/course/$id"
                  params={{ id: String(c.id) }}
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  {bi("إدارة", "Manage")}
                </Link>,
              ])}
            />
            {query.data && query.data.totalCount > rows.length && (
              <p role="status" className="mt-3 text-xs text-muted-foreground">
                {bi(
                  `يعرض أول ${rows.length} من ${query.data.totalCount} كورسًا.`,
                  `Showing the first ${rows.length} of ${query.data.totalCount} courses.`,
                )}
              </p>
            )}
          </>
        )}
      </Panel>
    </AppPage>
  );
}

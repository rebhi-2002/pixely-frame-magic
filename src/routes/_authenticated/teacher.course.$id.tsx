// WP-T1 / T1-07 (نسخة بلا JSON): shell شاشة الكورس. العقد C-17/C-18: Guard teacher_courses، والمسار /teacher/course/$id.
// - /teacher/course/new?type=1|2 → نموذج الإنشاء (CourseDetailsTab بلا كورس) — لا يحتاج أي بيانات من الباك اند.
// - /teacher/course/{id} → يجلب الكورس (Course/GetMineById) ويمرّره للتبويبات حسب العقد C-01، بدون قراءة أي حقل منه
//   (شكل الرد غير موثّق — J-05). التبويبات نفسها بتفعّل ميزاتها كل ما انربطت البيانات.
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AppPage, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { CourseDetailsTab } from "@/components/teacher/course-details-tab";
import { deliveryTypeFromParam } from "@/components/teacher/course-form-schema";
import { GroupConfigTab } from "@/components/teacher/group-config-tab";
import { GroupStudentsTab } from "@/components/teacher/group-students-tab";
import { LessonsTab } from "@/components/teacher/lessons-tab";
import { buttonVariants } from "@/components/ui/button-variants";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { getMyCourse } from "@/integrations/backend/courses";
import { useBi } from "@/lib/bi";
import { withLoadErrorDetail } from "@/lib/load-error";
import { qk } from "@/lib/query-keys";
import { authPageHead } from "@/lib/seo";

const TABS = ["details", "group", "students", "lessons"] as const;
type CourseTab = (typeof TABS)[number];

// T1-02: نوع الكورس عند الإنشاء (/teacher/course/new?type=1|2) — 1 حضوري، 2 أونلاين.
// أي قيمة غير صالحة بتتجاهلها الصفحة (undefined) بدل ما تكسر التنقّل. tab: التبويب الحالي (?tab=).
const searchSchema = z.object({
  type: z
    .preprocess(
      (v) => (typeof v === "string" ? Number(v) : v),
      z.union([z.literal(1), z.literal(2)]),
    )
    .optional()
    .catch(undefined),
  tab: z.enum(TABS).optional().catch(undefined),
});

export const Route = createFileRoute("/_authenticated/teacher/course/$id")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () =>
    authPageHead(
      { title: "الكورس | أكاديميا", description: "إدارة الكورس: التفاصيل والمجموعة والطلاب والدروس." },
      {
        title: "Course | Academia",
        description: "Manage the course: details, group, students and lessons.",
      },
    ),
  component: () => (
    <Guard pageKey="teacher_courses">
      <Body />
    </Guard>
  ),
});

function BackToCourses() {
  const bi = useBi();
  return (
    <Link to="/teacher/courses" className={buttonVariants({ variant: "outline", size: "sm" })}>
      {bi("كورساتي", "My courses")}
    </Link>
  );
}

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { id } = Route.useParams();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const isNew = id === "new";
  const courseId = Number(id);
  const validId = Number.isInteger(courseId) && courseId > 0;

  const courseQuery = useQuery({
    queryKey: qk.teacherCourse(courseId),
    queryFn: () => getMyCourse(courseId),
    enabled: !isNew && validId,
  });

  if (isNew) {
    return (
      <AppPage
        title={bi("كورس جديد", "New course")}
        icon="BookOpen"
        actions={<BackToCourses />}
      >
        <CourseDetailsTab
          course={null}
          defaultDeliveryType={deliveryTypeFromParam(search.type)}
          onChanged={() => undefined}
        />
      </AppPage>
    );
  }

  const title = bi("الكورس", "Course");

  if (!validId) {
    return (
      <AppPage title={title} icon="BookOpen" actions={<BackToCourses />}>
        <EmptyState
          icon="SearchX"
          title={bi("الكورس غير موجود", "Course not found")}
          description={bi("رابط الكورس غير صالح.", "The course link isn't valid.")}
        />
      </AppPage>
    );
  }

  if (courseQuery.isError) {
    return (
      <AppPage title={title} icon="BookOpen" actions={<BackToCourses />}>
        <ErrorState
          title={bi("ما قدرنا نحمّل الكورس", "We couldn't load the course")}
          description={withLoadErrorDetail(
            bi(
              "جرّب التحديث مرة ثانية. إذا استمرت المشكلة، تأكد من اتصالك أو ارجع لاحقاً.",
              "Try again. If the problem continues, check your connection or come back later.",
            ),
            courseQuery.error,
            bi,
          )}
          action={
            <RetryButton
              label={bi("إعادة المحاولة", "Try again")}
              onClick={() => void courseQuery.refetch()}
            />
          }
        />
      </AppPage>
    );
  }

  if (courseQuery.isLoading) {
    return (
      <AppPage title={title} icon="BookOpen" actions={<BackToCourses />}>
        <LoadingState label={bi("جارٍ التحميل…", "Loading…")} className="border-none bg-transparent" />
      </AppPage>
    );
  }

  const course = courseQuery.data;
  if (!course) {
    return (
      <AppPage title={title} icon="BookOpen" actions={<BackToCourses />}>
        <EmptyState
          icon="SearchX"
          title={bi("الكورس غير موجود", "Course not found")}
          description={bi("ما لقينا هذا الكورس ضمن كورساتك.", "We couldn't find this course among yours.")}
        />
      </AppPage>
    );
  }

  const tab: CourseTab = search.tab ?? "details";
  const onChanged = () => void queryClient.invalidateQueries({ queryKey: qk.teacherCourse(courseId) });

  return (
    <AppPage title={title} icon="BookOpen" actions={<BackToCourses />}>
      <SegmentedTabs
        ariaLabel={bi("أقسام الكورس", "Course sections")}
        value={tab}
        onChange={(next) =>
          void navigate({
            search: (previous) => ({ ...previous, tab: next as CourseTab }),
            replace: true,
          })
        }
        items={[
          { value: "details", label: bi("التفاصيل", "Details") },
          { value: "group", label: bi("المجموعة", "Group") },
          { value: "students", label: bi("الطلاب", "Students") },
          { value: "lessons", label: bi("الدروس", "Lessons") },
        ]}
      />
      {tab === "details" && <CourseDetailsTab course={course} onChanged={onChanged} />}
      {tab === "group" && <GroupConfigTab course={course} onChanged={onChanged} />}
      {tab === "students" && <GroupStudentsTab course={course} onChanged={onChanged} />}
      {tab === "lessons" && <LessonsTab course={course} onChanged={onChanged} />}
    </AppPage>
  );
}

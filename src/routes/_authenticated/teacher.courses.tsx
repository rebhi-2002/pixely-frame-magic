import { createFileRoute } from "@tanstack/react-router";
import { AppPage, StatGrid, Panel, RowList, Progress, DataTable, QuickLinks, Badge, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";

const title = "كورساتي (معلم) | أكاديميا";
const description = "كورساتك المنشورة: الأسعار، المشتركون، والحصص القادمة.";

export const Route = createFileRoute("/_authenticated/teacher/courses")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PageRoute,
});

function PageRoute() {
  return (
    <Guard pageKey="teacher_courses">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("كورساتي (معلم)", "My courses (teacher)")}
      icon="BookOpenCheck"
      subtitle={bi("كورساتك المنشورة: الأسعار، المشتركون، والحصص القادمة.", "Your published courses: pricing, enrollments and upcoming sessions.")}
    >
      <StatGrid
        items={[
          {{ icon: "BookOpenCheck", label: bi("كورسات منشورة", "Published"), value: "4" }},
          {{ icon: "Users", label: bi("مشتركون", "Enrollments"), value: "218" }},
          {{ icon: "Star", label: bi("التقييم", "Rating"), value: "4.8" }},
          {{ icon: "Wallet", label: bi("إيراد الشهر", "Monthly revenue"), value: "820 د.أ" }},
        ]}
      />
      <Panel title={bi("كورساتك", "Your courses")} icon="BookOpenCheck">
        <DataTable
          head={[bi("الكورس", "Course"), bi("السعر", "Price"), bi("مشتركون", "Enrolled"), bi("الحالة", "Status")]}
          rows={[
            [bi("تفاضل وتكامل — الوزاري", "Calculus — ministry"), bi("45 د.أ", "45 JOD"), "96", <Badge tone="success">{bi("منشور", "Published")}</Badge>],
            [bi("مراجعة ليلة الامتحان", "Exam-night review"), bi("15 د.أ", "15 JOD"), "74", <Badge tone="success">{bi("منشور", "Published")}</Badge>],
            [bi("أساسيات الجبر", "Algebra basics"), bi("مجاني", "Free"), "48", <Badge tone="primary">{bi("مسوّدة", "Draft")}</Badge>],
          ]}
        />
      </Panel>
    </AppPage>
  );
}

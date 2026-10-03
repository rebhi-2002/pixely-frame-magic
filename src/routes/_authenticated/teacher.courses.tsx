import { Link, createFileRoute } from "@tanstack/react-router";
import { AppPage, EmptyState } from "@/components/app/kit";
import { Button } from "@/components/ui/button";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";
import { authPageHead } from "@/lib/seo";

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
  return (
    <AppPage
      title={bi("كورساتي", "My courses")}
      icon="BookOpen"
      subtitle={bi(description, description)}
    >
      {/* T1-02: بدء إنشاء كورس — نوع الكورس بيروح كـsearch param (1 حضوري، 2 أونلاين). */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/teacher/course/$id" params={{ id: "new" }} search={{ type: 1 }}>
            {bi("إنشاء كورس حضوري", "Create an in-person course")}
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/teacher/course/$id" params={{ id: "new" }} search={{ type: 2 }}>
            {bi("إنشاء كورس أونلاين", "Create an online course")}
          </Link>
        </Button>
      </div>

      {/* قائمة كورسات المعلم تنتظر حسم مصدرها (Q-01) — لا نعرض قائمة قبل التأكد أنها كورساته فقط. */}
      <EmptyState
        icon="BookOpen"
        title={bi("قائمة كورساتك قريبًا", "Your course list is coming soon")}
        description={bi(
          "يمكنك إنشاء كورس جديد من الأزرار أعلاه. عرض قائمة كورساتك ينتظر تأكيد مصدر البيانات من فريق المنصّة.",
          "You can create a new course using the buttons above. Showing your course list is waiting for the data source to be confirmed by the platform team.",
        )}
      />
    </AppPage>
  );
}

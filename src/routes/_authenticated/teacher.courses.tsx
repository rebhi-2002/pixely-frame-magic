import { createFileRoute } from "@tanstack/react-router";
import { AppPage, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";
import { authPageHead } from "@/lib/seo";

const description = "إنشاء وإدارة كورساتك الخاصة — قيد التطوير.";

export const Route = createFileRoute("/_authenticated/teacher/courses")({
  head: () =>
    authPageHead(
      { title: "كورساتي (معلم) | أكاديميا", description },
      {
        title: "My courses (teacher) | Academia",
        description: "Create and manage your own courses — under development.",
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
      <EmptyState
        icon="Construction"
        title={bi("قيد التطوير", "Under development")}
        description={bi(
          "هاي الصفحة الوحيدة يلي ما فيها ولا جزء ممكن يشتغل حالياً — السبب مختلف عن باقي الصفحات: ما في أي endpoint بالباك اند يخلّي معلم مسجّل دخول يعرف رقم ملفه الخاص (Teacher.Id)، فما فينا حتى نجيب «كورساتي» بدون ما نخمّن. لما يضاف مسار ربط حساب المعلم بملفه (P1-1) ومصدر مواد/صفوف حقيقي (P1-3)، هاي أول صفحة رح نبنيها فوراً.",
          "This is the one page with genuinely nothing buildable right now — for a different reason than the others: there's no backend endpoint that lets a logged-in teacher discover their own Teacher.Id, so we can't even fetch \"my courses\" without guessing. Once the teacher-to-account link (P1-1) and a real subject/grade data source (P1-3) ship, this is the first page we'll build.",
        )}
      />
    </AppPage>
  );
}

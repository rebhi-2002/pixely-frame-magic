import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AppPage, StatGrid, Panel, RowList, QuickLinks, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { WelcomeBanner } from "@/components/app/welcome-banner";
import { OnboardingChecklist } from "@/components/app/onboarding-checklist";
import { getStoredUserId, wasJustRegistered } from "@/integrations/backend/auth";
import { useBi } from "@/lib/bi";
import { ComparisonChart } from "@/components/app/charts";
import { authPageHead } from "@/lib/seo";
import {
  listContentItems,
  listOpenClassQuestions,
  listQuizItems,
  listTeacherCourses,
} from "@/lib/teacher-teaching.functions";
import { LoadingState } from "@/components/app/feedback-states";

const description = "صفوفك اليوم: ما يحتاج تصحيحاً، أسئلة تنتظر جوابك، وأداء طلابك.";

export const Route = createFileRoute("/_authenticated/teacher/dashboard")({
  head: () =>
    authPageHead(
      {
        title: "لوحة المعلم | أكاديميا",
        description: "صفوفك اليوم: ما يحتاج تصحيحاً، أسئلة تنتظر جوابك، وأداء طلابك.",
      },
      {
        title: "Teacher dashboard | Academia",
        description:
          "Today's classes: what needs grading, questions awaiting your answer, and your students' performance.",
      },
    ),
  component: PageRoute,
});

function PageRoute() {
  return (
    <Guard pageKey="teacher_dashboard">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  const userId = getStoredUserId();

  const fetchCourses = useServerFn(listTeacherCourses);
  const fetchContent = useServerFn(listContentItems);
  const fetchQuizzes = useServerFn(listQuizItems);
  const fetchQuestions = useServerFn(listOpenClassQuestions);

  const coursesQuery = useQuery({ queryKey: ["teacher-courses"], queryFn: () => fetchCourses() });
  const contentQuery = useQuery({ queryKey: ["teacher-content"], queryFn: () => fetchContent() });
  const quizzesQuery = useQuery({ queryKey: ["teacher-quizzes"], queryFn: () => fetchQuizzes() });
  const questionsQuery = useQuery({
    queryKey: ["open-class-questions"],
    queryFn: () => fetchQuestions(),
  });

  const isLoading =
    coursesQuery.isLoading ||
    contentQuery.isLoading ||
    quizzesQuery.isLoading ||
    questionsQuery.isLoading;
  const courses = useMemo(() => coursesQuery.data ?? [], [coursesQuery.data]);
  const content = useMemo(() => contentQuery.data ?? [], [contentQuery.data]);
  const quizzes = useMemo(() => quizzesQuery.data ?? [], [quizzesQuery.data]);
  const openQuestions = useMemo(() => questionsQuery.data ?? [], [questionsQuery.data]);
  const enrolled = courses.reduce((s, c) => s + c.enrolledCount, 0);
  const revenue = courses.reduce((s, c) => s + c.price * c.enrolledCount, 0);
  const pendingContent = content.filter((c) => c.status === "قيد المراجعة");

  const bySubject = useMemo(() => {
    const totals = new Map<string, number>();
    for (const c of content)
      totals.set(c.subjectName, (totals.get(c.subjectName) ?? 0) + c.viewsCount);
    return Array.from(totals.entries()).map(([label, value]) => ({ label, value }));
  }, [content]);

  const tasks: {
    title: [string, string];
    meta: [string, string];
    tone: "danger" | "primary" | "muted";
  }[] = [];
  for (const c of pendingContent) {
    tasks.push({
      title: [`«${c.title}» بانتظار مراجعة المحتوى`, `"${c.title}" pending content review`],
      meta: [c.subjectName, c.subjectName],
      tone: "muted",
    });
  }
  for (const q of openQuestions) {
    tasks.push({
      title: [`سؤال بلا جواب: ${q.questionTitle}`, `Unanswered: ${q.questionTitle}`],
      meta: [q.subjectName, q.subjectName],
      tone: "primary",
    });
  }

  return (
    <AppPage
      title={bi("لوحة المعلم", "Teacher dashboard")}
      icon="LayoutDashboard"
      subtitle={bi(
        description,
        "Your classes today: what needs grading, questions awaiting you, and student performance.",
      )}
    >
      <WelcomeBanner
        subtitle={[
          "عندك أسئلة بانتظار الرد ومحتوى بانتظار المراجعة — خلّي صفوفك بأفضل حال.",
          "You have questions waiting and content pending review — keep your classes running smoothly.",
        ]}
        tip={[
          `${openQuestions.length} أسئلة جديدة بمجتمع الصف`,
          `${openQuestions.length} new questions in the class community`,
        ]}
      />

      {userId && (
        <OnboardingChecklist
          userId={userId}
          roleKey="teacher"
          showInitially={wasJustRegistered()}
        />
      )}

      {isLoading ? (
        <LoadingState
          label={bi("جارٍ التحميل…", "Loading…")}
          className="border-none bg-transparent"
        />
      ) : (
        <>
          <StatGrid
            items={[
              { icon: "Users", label: bi("طلابك", "Students"), value: String(enrolled) },
              {
                icon: "ListChecks",
                label: bi("اختبارات نشطة", "Live quizzes"),
                value: String(quizzes.filter((q) => q.status === "نشط").length),
              },
              {
                icon: "MessagesSquare",
                label: bi("أسئلة بلا جواب", "Unanswered questions"),
                value: String(openQuestions.length),
              },
              {
                icon: "Wallet",
                label: bi("أرباح الشهر", "This month"),
                value: bi(`${revenue} ₪`, `${revenue} ILS`),
              },
            ]}
          />

          <Panel
            title={bi("مشاهدات المحتوى بالمادة", "Content views by subject")}
            icon="ChartSpline"
          >
            {bySubject.length ? (
              <ComparisonChart data={bySubject} />
            ) : (
              <EmptyState
                icon="ChartSpline"
                text={bi("أضف محتوى عشان تظهر البيانات هون.", "Add content to see data here.")}
              />
            )}
          </Panel>

          <Panel title={bi("إجراءات سريعة", "Quick actions")} icon="Zap">
            <QuickLinks
              items={[
                {
                  to: "/teacher/content",
                  label: bi("إضافة محتوى", "Add content"),
                  icon: "FileStack",
                },
                {
                  to: "/teacher/quizzes",
                  label: bi("إنشاء اختبار", "Create quiz"),
                  icon: "ListChecks",
                },
                {
                  to: "/teacher/grading",
                  label: bi("ابدأ التصحيح", "Start grading"),
                  icon: "PenSquare",
                },
                {
                  to: "/teacher/community",
                  label: bi("مجتمع الصف", "Class community"),
                  icon: "MessagesSquare",
                },
                {
                  to: "/teacher/analytics",
                  label: bi("التحليلات", "Analytics"),
                  icon: "LineChart",
                },
                { to: "/teacher/earnings", label: bi("الأرباح", "Earnings"), icon: "Wallet" },
              ]}
            />
          </Panel>

          <Panel title={bi("يحتاج انتباهك", "Needs your attention")} icon="Bell">
            {tasks.length ? (
              <RowList
                rows={tasks.map((t) => ({
                  title: bi(...t.title),
                  meta: bi(...t.meta),
                  value: bi("متابعة", "Follow up"),
                  tone: t.tone,
                }))}
              />
            ) : (
              <EmptyState
                icon="Bell"
                text={bi("ولا شي بانتظارك الآن 🎉", "Nothing needs your attention right now 🎉")}
              />
            )}
          </Panel>
        </>
      )}
    </AppPage>
  );
}

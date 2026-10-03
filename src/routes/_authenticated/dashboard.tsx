import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AppPage, StatGrid, Panel, RowList, EmptyState, QuickLinks } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { WelcomeBanner } from "@/components/app/welcome-banner";
import { OnboardingChecklist } from "@/components/app/onboarding-checklist";
import { wasJustRegistered } from "@/integrations/backend/auth";
import { getStudentDashboard } from "@/integrations/backend/student";
import { useSession } from "@/hooks/use-session";
import { useBi } from "@/lib/bi";
import { authPageHead } from "@/lib/seo";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";

const description = "كورساتك الحالية، جدولك القادم، ومحفظتك — بلمحة واحدة.";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () =>
    authPageHead(
      { title: "لوحة الطالب | أكاديميا", description },
      {
        title: "Student dashboard | Academia",
        description: "Your active courses, upcoming schedule, and wallet — at a glance.",
      },
    ),
  component: () => (
    <Guard pageKey="student_dashboard">
      <Body />
    </Guard>
  ),
});

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { session } = useSession();
  const justRegistered = wasJustRegistered();

  const {
    data: dashboard,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["student-dashboard"],
    queryFn: getStudentDashboard,
  });

  if (isError) {
    return (
      <AppPage title={bi("لوحة الطالب", "Student dashboard")} icon="LayoutDashboard">
        <ErrorState
          title={bi("ما قدرنا نحمّل اللوحة", "We couldn't load the dashboard")}
          description={bi(
            "جرّب التحديث مرة ثانية. إذا استمرت المشكلة، تأكد من اتصالك أو ارجع لاحقاً.",
            "Try again. If the problem continues, check your connection or come back later.",
          )}
          action={
            <RetryButton
              label={bi("إعادة المحاولة", "Try again")}
              onClick={() => void queryClient.invalidateQueries()}
            />
          }
        />
      </AppPage>
    );
  }

  if (isLoading || !dashboard) {
    return (
      <AppPage title={bi("لوحة الطالب", "Student dashboard")} icon="LayoutDashboard">
        <LoadingState
          label={bi("جارٍ التحميل…", "Loading…")}
          className="border-none bg-transparent"
        />
      </AppPage>
    );
  }

  return (
    <AppPage
      title={bi("لوحة الطالب", "Student dashboard")}
      icon="LayoutDashboard"
      subtitle={bi(
        description,
        "Your active courses, upcoming schedule, and wallet — at a glance.",
      )}
    >
      {justRegistered && session && (
        <OnboardingChecklist
          userId={session.userId}
          roleKey={session.roleKey}
          showInitially={justRegistered}
          walletBalance={dashboard.walletBalance}
        />
      )}

      <WelcomeBanner
        subtitle={[`أهلاً ${dashboard.studentName} 👋`, `Welcome ${dashboard.studentName} 👋`]}
      />

      {!dashboard.hasStudentProfile && (
        <EmptyState
          icon="UserCog"
          title={bi(
            "حسابك لسا مش مربوط بملف طالب",
            "Your account isn't linked to a student profile yet",
          )}
          description={bi(
            "بمجرد ما يربط الإدمن حسابك بملف طالب، رح تظهر كورساتك وحضورك ونتائجك هون تلقائياً.",
            "Once an admin links your account to a student profile, your courses, attendance, and results will appear here automatically.",
          )}
        />
      )}

      <StatGrid
        items={[
          {
            icon: "BookOpen",
            label: bi("كورسات فعّالة", "Active courses"),
            value: String(dashboard.activeCourses.length),
          },
          {
            icon: "Clock",
            label: bi("طلبات معلّقة", "Pending requests"),
            value: String(dashboard.pendingRequestsCount),
          },
          {
            icon: "CheckCircle2",
            label: bi("حجوزات مؤكّدة", "Confirmed bookings"),
            value: String(dashboard.confirmedBookingsCount),
          },
          {
            icon: "Wallet",
            label: bi("رصيد المحفظة", "Wallet balance"),
            value: `${dashboard.walletBalance} ₪`,
          },
        ]}
      />

      <Panel title={bi("الجدول القادم", "Upcoming schedule")} icon="Calendar">
        {dashboard.upcomingSchedule.length ? (
          <RowList
            rows={dashboard.upcomingSchedule.map((s) => ({
              title: s.topic,
              meta: bi(
                `${s.teacherName ?? ""} — ${new Date(s.date).toLocaleDateString()}`,
                `${s.teacherName ?? ""} — ${new Date(s.date).toLocaleDateString()}`,
              ),
              value: s.startTime.slice(0, 5),
              tone: s.canJoin ? "success" : "muted",
            }))}
          />
        ) : (
          <EmptyState
            icon="Calendar"
            text={bi("لا يوجد جدول قادم حالياً.", "No upcoming schedule right now.")}
          />
        )}
      </Panel>

      <Panel title={bi("كورساتي الفعّالة", "My active courses")} icon="BookOpen">
        {dashboard.activeCourses.length ? (
          <RowList
            rows={dashboard.activeCourses.map((c) => ({
              title: c.courseTitle ?? bi("بدون اسم", "Untitled"),
              meta: c.teacherName ?? "",
              value: c.groupName ?? "",
              tone: "primary",
            }))}
          />
        ) : (
          <EmptyState
            icon="BookOpen"
            text={bi("لا يوجد كورسات فعّالة بعد.", "No active courses yet.")}
          />
        )}
      </Panel>

      <QuickLinks
        items={[
          { icon: "BookOpen", label: bi("كورساتي", "My courses"), to: "/my-courses" },
          { icon: "Calendar", label: bi("الجدول الكامل", "Full schedule"), to: "/schedule" },
          { icon: "Wallet", label: bi("محفظتي", "My wallet"), to: "/wallet" },
          { icon: "CalendarCheck", label: bi("سجل الحضور", "Attendance"), to: "/attendance" },
          {
            icon: "ClipboardCheck",
            label: bi("نتائج الامتحانات", "Exam results"),
            to: "/exam-results",
          },
          {
            icon: "TrendingUp",
            label: bi("التقدم الأكاديمي", "Academic progress"),
            to: "/progress",
          },
          { icon: "Bell", label: bi("الإشعارات", "Notifications"), to: "/notifications" },
        ]}
      />
    </AppPage>
  );
}

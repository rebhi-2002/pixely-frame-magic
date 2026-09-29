import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AppPage, Panel, DataTable, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { WelcomeBanner } from "@/components/app/welcome-banner";
import { getStudentSchedule } from "@/integrations/backend/student";
import { useBi } from "@/lib/bi";
import { authPageHead } from "@/lib/seo";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";

const description = "جدولك الأسبوعي — دروس المجموعات وحجوزاتك الفردية.";

export const Route = createFileRoute("/_authenticated/schedule")({
  head: () =>
    authPageHead(
      { title: "الجدول | أكاديميا", description },
      {
        title: "Schedule | Academia",
        description: "Your weekly schedule — group lessons and your one-on-one bookings.",
      },
    ),
  component: () => (
    <Guard pageKey="student_schedule">
      <Body />
    </Guard>
  ),
});

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["student-schedule"],
    queryFn: () => getStudentSchedule(),
  });

  if (isError) {
    return (
      <AppPage title={bi("الجدول", "Schedule")} icon="Calendar">
        <ErrorState
          title={bi("ما قدرنا نحمّل الجدول", "We couldn't load the schedule")}
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

  if (isLoading) {
    return (
      <AppPage title={bi("الجدول", "Schedule")} icon="Calendar">
        <LoadingState label={bi("جارٍ التحميل…", "Loading…")} className="border-none bg-transparent" />
      </AppPage>
    );
  }

  return (
    <AppPage
      title={bi("الجدول", "Schedule")}
      icon="Calendar"
      subtitle={bi(description, "Your weekly schedule — group lessons and your one-on-one bookings.")}
    >
      <WelcomeBanner subtitle={[bi("كل دروسك وحجوزاتك القادمة بمكان واحد.", "All your upcoming lessons and bookings in one place.")]} />

      <Panel title={bi("الجدول القادم", "Upcoming schedule")} icon="Calendar">
        {data?.length ? (
          <DataTable
            head={[
              bi("الموضوع", "Topic"),
              bi("المعلم", "Teacher"),
              bi("التاريخ", "Date"),
              bi("الوقت", "Time"),
              bi("الحالة", "Status"),
            ]}
            rows={data.map((s) => [
              s.topic,
              s.teacherName ?? "—",
              new Date(s.date).toLocaleDateString(),
              s.startTime.slice(0, 5),
              s.status,
            ])}
          />
        ) : (
          <EmptyState icon="Calendar" text={bi("لا يوجد جدول قادم حالياً.", "No upcoming schedule right now.")} />
        )}
      </Panel>
    </AppPage>
  );
}

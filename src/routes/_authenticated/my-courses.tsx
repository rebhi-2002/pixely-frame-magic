import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AppPage, Panel, RowList, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { WelcomeBanner } from "@/components/app/welcome-banner";
import { getStudentMyBookings, getStudentMyRequests } from "@/integrations/backend/student";
import { useBi } from "@/lib/bi";
import { authPageHead } from "@/lib/seo";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";

const description = "كل الدروس والحجوزات المؤكّدة، والطلبات بانتظار موافقة المعلم.";

export const Route = createFileRoute("/_authenticated/my-courses")({
  head: () =>
    authPageHead(
      { title: "كورساتي | أكاديميا", description },
      {
        title: "My courses | Academia",
        description:
          "All your confirmed lessons and bookings, and requests awaiting a teacher's approval.",
      },
    ),
  component: () => (
    <Guard pageKey="student_my_courses">
      <Body />
    </Guard>
  ),
});

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();

  const bookings = useQuery({ queryKey: ["student-my-bookings"], queryFn: getStudentMyBookings });
  const requests = useQuery({
    queryKey: ["student-my-requests"],
    queryFn: () => getStudentMyRequests(),
  });

  const isLoading = bookings.isLoading || requests.isLoading;
  const isError = bookings.isError || requests.isError;

  if (isError) {
    return (
      <AppPage title={bi("كورساتي", "My courses")} icon="BookOpen">
        <ErrorState
          title={bi("ما قدرنا نحمّل كورساتك", "We couldn't load your courses")}
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
      <AppPage title={bi("كورساتي", "My courses")} icon="BookOpen">
        <LoadingState
          label={bi("جارٍ التحميل…", "Loading…")}
          className="border-none bg-transparent"
        />
      </AppPage>
    );
  }

  return (
    <AppPage
      title={bi("كورساتي", "My courses")}
      icon="BookOpen"
      subtitle={bi(
        description,
        "All your confirmed lessons and bookings, and requests awaiting approval.",
      )}
    >
      <WelcomeBanner
        subtitle={["متابعة دروسك وحجوزاتك.", "Keep track of your lessons and bookings."]}
      />

      <Panel
        title={bi("الدروس والحجوزات المؤكّدة", "Confirmed lessons & bookings")}
        icon="CheckCircle2"
      >
        {bookings.data?.length ? (
          <RowList
            rows={bookings.data.map((b) => ({
              title: b.topic,
              meta: bi(
                `${b.teacherName ?? ""} — ${new Date(b.date).toLocaleDateString()} ${b.startTime.slice(0, 5)}`,
                `${b.teacherName ?? ""} — ${new Date(b.date).toLocaleDateString()} ${b.startTime.slice(0, 5)}`,
              ),
              value: b.status,
              tone: b.canJoin ? "success" : "primary",
            }))}
          />
        ) : (
          <EmptyState
            icon="BookOpen"
            text={bi("لا يوجد دروس أو حجوزات مؤكّدة بعد.", "No confirmed lessons or bookings yet.")}
          />
        )}
      </Panel>

      <Panel title={bi("طلبات بانتظار الموافقة", "Requests awaiting approval")} icon="Clock">
        {requests.data?.length ? (
          <RowList
            rows={requests.data.map((r) => ({
              title: r.topic,
              meta: r.teacherName ?? "",
              value: r.status,
              tone: "muted",
            }))}
          />
        ) : (
          <EmptyState
            icon="Clock"
            text={bi("لا يوجد طلبات معلّقة حالياً.", "No pending requests right now.")}
          />
        )}
      </Panel>
    </AppPage>
  );
}

// لوحة الحجوزات المؤكّدة (العقد C-09) — props {} وتجلب بياناتها بنفسها.
// أُعيد تركيبها بـWP-00 / 00-16 من صفحة my-courses.tsx؛ WP-S2 / S2-04: كل صف رابط لصفحة التفاصيل.
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Panel, EmptyState } from "@/components/app/kit";
import { ScheduleRow } from "@/components/student/my-courses/schedule-row";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { getStudentMyBookings } from "@/integrations/backend/student";
import { useBi } from "@/lib/bi";
import { withLoadErrorDetail } from "@/lib/load-error";
import { qk } from "@/lib/query-keys";

export function ConfirmedBookingsPanel() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const bookings = useQuery({ queryKey: qk.studentMyBookings(), queryFn: getStudentMyBookings });

  return (
    <Panel
      title={bi("الدروس والحجوزات المؤكّدة", "Confirmed lessons & bookings")}
      icon="CheckCircle2"
    >
      {bookings.isError ? (
        <ErrorState
          title={bi("ما قدرنا نحمّل كورساتك", "We couldn't load your courses")}
          description={withLoadErrorDetail(
            bi(
              "جرّب التحديث مرة ثانية. إذا استمرت المشكلة، تأكد من اتصالك أو ارجع لاحقاً.",
              "Try again. If the problem continues, check your connection or come back later.",
            ),
            bookings.error,
            bi,
          )}
          action={
            <RetryButton
              label={bi("إعادة المحاولة", "Try again")}
              onClick={() =>
                void queryClient.invalidateQueries({ queryKey: qk.studentMyBookings() })
              }
            />
          }
        />
      ) : bookings.isLoading ? (
        <LoadingState
          label={bi("جارٍ التحميل…", "Loading…")}
          className="border-none bg-transparent"
        />
      ) : bookings.data?.length ? (
        <ul className="divide-y divide-border">
          {bookings.data.map((b) => (
            <li key={`${b.kind}-${b.id}`}>
              <ScheduleRow
                item={b}
                meta={`${b.teacherName ?? ""} — ${new Date(b.date).toLocaleDateString()} ${b.startTime.slice(0, 5)}`}
                value={b.status}
                tone={b.canJoin ? "success" : "primary"}
              />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          icon="BookOpen"
          text={bi("لا يوجد دروس أو حجوزات مؤكّدة بعد.", "No confirmed lessons or bookings yet.")}
        />
      )}
    </Panel>
  );
}

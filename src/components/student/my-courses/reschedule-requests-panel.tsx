// لوحة طلبات إعادة الجدولة (WP-S3 / S3-02) — العقد C-07: props {} (تجلب بياناتها بنفسها).
// Student/MyRescheduleRequests → StudentRescheduleRequest[]. كل طلب رابط لصفحة الحجز.
import { Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge, EmptyState, Panel } from "@/components/app/kit";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { getMyRescheduleRequests } from "@/integrations/backend/student";
import { useBi } from "@/lib/bi";
import { rescheduleStatusLabel, rescheduleStatusTone } from "@/lib/enums";
import { formatDate, formatTime } from "@/lib/format";
import { withLoadErrorDetail } from "@/lib/load-error";
import { qk } from "@/lib/query-keys";
import { sortRequestsNewestFirst, visibleRejectionReason } from "@/lib/reschedule-requests";

export function RescheduleRequestsPanel() {
  const bi = useBi();
  const lang = bi<"ar" | "en">("ar", "en");
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: qk.studentRescheduleRequests(),
    queryFn: getMyRescheduleRequests,
  });

  return (
    <Panel title={bi("طلبات إعادة الجدولة", "Reschedule requests")} icon="CalendarClock">
      {query.isError ? (
        <ErrorState
          title={bi(
            "ما قدرنا نحمّل طلبات إعادة الجدولة",
            "We couldn't load your reschedule requests",
          )}
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
              onClick={() =>
                void queryClient.invalidateQueries({ queryKey: qk.studentRescheduleRequests() })
              }
            />
          }
        />
      ) : query.isLoading || !query.data ? (
        <LoadingState
          label={bi("جارٍ التحميل…", "Loading…")}
          className="border-none bg-transparent"
        />
      ) : query.data.length ? (
        <ul className="divide-y divide-border">
          {sortRequestsNewestFirst(query.data).map((r) => {
            const reason = visibleRejectionReason(r);
            return (
              <li key={r.id}>
                <Link
                  to="/booking/$id"
                  params={{ id: String(r.bookingId) }}
                  className="block rounded-xl px-2 py-3 transition-colors hover:bg-accent/40"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {r.teacherName ?? bi("حجز", "Booking")} #{r.bookingId}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {formatDate(r.originalDate, lang)} {formatTime(r.originalStartTime)} →{" "}
                        {formatDate(r.proposedDate, lang)} {formatTime(r.proposedStartTime)}
                      </p>
                      {reason && (
                        <p className="mt-0.5 text-xs text-destructive">
                          {bi("سبب الرفض", "Rejection reason")}: {reason}
                        </p>
                      )}
                    </div>
                    <Badge tone={rescheduleStatusTone(r.status)}>
                      {rescheduleStatusLabel(r.status, bi)}
                    </Badge>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyState
          icon="CalendarClock"
          text={bi("لا توجد طلبات إعادة جدولة.", "No reschedule requests.")}
        />
      )}
    </Panel>
  );
}

// لوحة الطلبات بانتظار الموافقة (العقد C-09) — props {} وتجلب بياناتها بنفسها.
// WP-S2 / S2-04: كل صف رابط لصفحة التفاصيل + سجل الطلبات المرفوضة/الملغاة تحت القائمة.
// السجل بيجي من Student/MyRequests بفلتر حالة (3=مرفوض، 4=ملغى) — طلب موثّق بـSwagger، ونوع الصف DTO معروف بالكود.
// ما منفترض أن الاستدعاء بلا حالة يرجّع «المعلّقة فقط»؛ لو رجّع كل الحالات منستبعد من السجل أي id موجود أصلاً بالقائمة الرئيسية.
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Panel, EmptyState } from "@/components/app/kit";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { ScheduleRow } from "@/components/student/my-courses/schedule-row";
import { getStudentMyRequests } from "@/integrations/backend/student";
import { useBi } from "@/lib/bi";
import { BookingStatus } from "@/lib/enums";
import { qk } from "@/lib/query-keys";

export function PendingRequestsPanel() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const requests = useQuery({
    queryKey: qk.studentMyRequests(),
    queryFn: () => getStudentMyRequests(),
  });
  const rejected = useQuery({
    queryKey: qk.studentMyRequests(BookingStatus.Rejected),
    queryFn: () => getStudentMyRequests(BookingStatus.Rejected),
  });
  const cancelled = useQuery({
    queryKey: qk.studentMyRequests(BookingStatus.Cancelled),
    queryFn: () => getStudentMyRequests(BookingStatus.Cancelled),
  });

  const mainIds = new Set((requests.data ?? []).map((r) => `${r.kind}-${r.id}`));
  const history = [
    ...(rejected.data ?? []).map((r) => ({ row: r, tone: "danger" as const })),
    ...(cancelled.data ?? []).map((r) => ({ row: r, tone: "muted" as const })),
  ].filter(({ row }) => !mainIds.has(`${row.kind}-${row.id}`));
  const historyFailed = rejected.isError || cancelled.isError;

  return (
    <Panel title={bi("طلبات بانتظار الموافقة", "Requests awaiting approval")} icon="Clock">
      {requests.isError ? (
        <ErrorState
          title={bi("ما قدرنا نحمّل كورساتك", "We couldn't load your courses")}
          description={bi(
            "جرّب التحديث مرة ثانية. إذا استمرت المشكلة، تأكد من اتصالك أو ارجع لاحقاً.",
            "Try again. If the problem continues, check your connection or come back later.",
          )}
          action={
            <RetryButton
              label={bi("إعادة المحاولة", "Try again")}
              onClick={() =>
                void queryClient.invalidateQueries({ queryKey: qk.studentMyRequests() })
              }
            />
          }
        />
      ) : requests.isLoading ? (
        <LoadingState
          label={bi("جارٍ التحميل…", "Loading…")}
          className="border-none bg-transparent"
        />
      ) : requests.data?.length ? (
        <ul className="divide-y divide-border">
          {requests.data.map((r) => (
            <li key={`${r.kind}-${r.id}`}>
              <ScheduleRow item={r} meta={r.teacherName ?? ""} value={r.status} tone="muted" />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          icon="Clock"
          text={bi("لا يوجد طلبات معلّقة حالياً.", "No pending requests right now.")}
        />
      )}

      {history.length > 0 && (
        <div className="mt-5 border-t border-border pt-4">
          <h3 className="mb-2 text-sm font-bold text-foreground">
            {bi("سجل الطلبات المرفوضة والملغاة", "Rejected & cancelled requests")}
          </h3>
          <ul className="divide-y divide-border">
            {history.map(({ row, tone }) => (
              <li key={`h-${row.kind}-${row.id}`}>
                <ScheduleRow
                  item={row}
                  meta={row.teacherName ?? ""}
                  value={row.status}
                  tone={tone}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {historyFailed && (
        <p role="status" className="mt-3 text-xs text-muted-foreground">
          {bi(
            "تعذّر تحميل سجل الطلبات المرفوضة/الملغاة حالياً.",
            "Couldn't load the rejected/cancelled requests history right now.",
          )}
        </p>
      )}
    </Panel>
  );
}

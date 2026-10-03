// بطاقة نسبة الحضور (WP-S7 / S7-02) — المصدر Student/Progress (النوع بالكود؛ يُتحقق بعينة J-04).
// بتستخدم منطق WP-S9 النقي (lib/progress.ts): نسبة ناقصة = «—» وشرح، مش 0% مضلل. ما بنحسب النسبة محليًا.
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Panel, StatGrid } from "@/components/app/kit";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { getStudentProgress } from "@/integrations/backend/student";
import { useBi } from "@/lib/bi";
import { buildProgressView, percentText } from "@/lib/progress";
import { qk } from "@/lib/query-keys";

export function AttendanceRateCard() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const progress = useQuery({ queryKey: qk.studentProgress(), queryFn: getStudentProgress });

  return (
    <Panel title={bi("نسبة الحضور", "Attendance rate")} icon="CalendarCheck">
      {progress.isError ? (
        <ErrorState
          title={bi("ما قدرنا نحمّل نسبة الحضور", "We couldn't load your attendance rate")}
          description={bi(
            "جرّب التحديث مرة ثانية. إذا استمرت المشكلة، تأكد من اتصالك أو ارجع لاحقاً.",
            "Try again. If the problem continues, check your connection or come back later.",
          )}
          action={
            <RetryButton
              label={bi("إعادة المحاولة", "Try again")}
              onClick={() => void queryClient.invalidateQueries({ queryKey: qk.studentProgress() })}
            />
          }
        />
      ) : progress.isLoading ? (
        <LoadingState
          label={bi("جارٍ التحميل…", "Loading…")}
          className="border-none bg-transparent"
        />
      ) : (
        (() => {
          const { attendance } = buildProgressView(progress.data);
          return (
            <div className="space-y-3">
              <StatGrid
                items={[
                  {
                    icon: "Percent",
                    label: bi("نسبة الحضور", "Attendance rate"),
                    value: percentText(attendance),
                  },
                  {
                    icon: "CalendarCheck",
                    label: bi("الجلسات المسجّلة", "Recorded sessions"),
                    value: String(attendance.samples),
                  },
                ]}
              />
              {attendance.state === "unavailable" && (
                <p role="status" className="text-xs text-muted-foreground">
                  {bi(
                    "لا توجد سجلات حضور كافية لحساب النسبة بعد.",
                    "There aren't enough attendance records to calculate a rate yet.",
                  )}
                </p>
              )}
            </div>
          );
        })()
      )}
    </Panel>
  );
}

// سجل الحضور (WP-S7 / S7-01, S7-03, S7-04, S7-05) — Student/Attendance → StudentAttendance (كائن).
// الأرقام كلها من الباك اند (لا نعيد حساب النسبة). أبقِ الـGuard ومفتاح الصلاحية student_attendance.
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppPage, Badge, DataTable, EmptyState, Panel, StatGrid } from "@/components/app/kit";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { Guard } from "@/components/app/guard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getStudentAttendance,
  getStudentDashboard,
  type StudentAttendance,
} from "@/integrations/backend/student";
import {
  attendanceCounters,
  attendanceRateText,
  hasAttendanceData,
  isRangeInverted,
  rangeToFilter,
  sortRecordsNewestFirst,
} from "@/lib/attendance-view";
import { useBi } from "@/lib/bi";
import { attendanceStatusLabel, attendanceStatusTone } from "@/lib/enums";
import { formatDate } from "@/lib/format";
import { withLoadErrorDetail } from "@/lib/load-error";
import { qk } from "@/lib/query-keys";
import { authPageHead } from "@/lib/seo";

const description = "حالة حضورك في كل جلسة، مع إحصاءات الحاضر والغائب والمتأخر والمعذور.";

export const Route = createFileRoute("/_authenticated/attendance")({
  head: () =>
    authPageHead(
      { title: "سجل الحضور | أكاديميا", description },
      {
        title: "Attendance | Academia",
        description:
          "Your attendance for every session, with present, absent, late and excused counts.",
      },
    ),
  component: () => (
    <Guard pageKey="student_attendance">
      <Body />
    </Guard>
  ),
});

const SELECT_CLASS =
  "h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring";

function Body() {
  const bi = useBi();
  const lang = bi<"ar" | "en">("ar", "en");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [courseId, setCourseId] = useState("");
  const range = { from, to };
  const rangeInvalid = isRangeInverted(range);
  const hasFilters = Boolean(from || to || courseId);
  const filter = rangeToFilter(range);
  const courseIdNum = courseId ? Number(courseId) : undefined;

  // قائمة الكورسات للفلتر من لوحة الطالب؛ لو فشلت نخفي الفلتر فقط (الصفحة تبقى تعمل).
  const dashboard = useQuery({ queryKey: qk.studentDashboard(), queryFn: getStudentDashboard });
  const courseOptions = (dashboard.data?.activeCourses ?? []).filter(
    (c): c is typeof c & { courseId: number } => c.courseId !== null,
  );
  const uniqueCourses = Array.from(
    new Map(courseOptions.map((c) => [c.courseId, c.courseTitle ?? `#${c.courseId}`])),
  );

  const query = useQuery({
    queryKey: qk.studentAttendance(filter.from, filter.to, courseIdNum),
    queryFn: () => getStudentAttendance({ ...filter, courseId: courseIdNum }),
    enabled: !rangeInvalid,
    placeholderData: (previous: StudentAttendance | undefined) => previous,
  });
  const data = query.data;

  return (
    <AppPage
      title={bi("سجل الحضور", "Attendance")}
      icon="CalendarCheck"
      subtitle={bi(
        description,
        "Your attendance for every session, with present, absent, late and excused counts.",
      )}
    >
      <Panel title={bi("تصفية السجل", "Filter records")} icon="Filter">
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="space-y-1.5">
            <Label htmlFor="att-from">{bi("من تاريخ", "From")}</Label>
            <Input
              id="att-from"
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="att-to">{bi("إلى تاريخ", "To")}</Label>
            <Input id="att-to" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          {uniqueCourses.length > 0 && (
            <div className="space-y-1.5">
              <Label htmlFor="att-course">{bi("الكورس", "Course")}</Label>
              <select
                id="att-course"
                className={SELECT_CLASS}
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              >
                <option value="">{bi("كل الكورسات", "All courses")}</option>
                {uniqueCourses.map(([id, title]) => (
                  <option key={id} value={String(id)}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex items-end">
            <Button
              type="button"
              variant="outline"
              disabled={!hasFilters}
              onClick={() => {
                setFrom("");
                setTo("");
                setCourseId("");
              }}
            >
              {bi("إعادة ضبط", "Reset")}
            </Button>
          </div>
        </div>
        {rangeInvalid && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {bi(
              "تاريخ البداية بعد تاريخ النهاية — عدّل المدى.",
              "The start date is after the end date — adjust the range.",
            )}
          </p>
        )}
      </Panel>

      {query.isError ? (
        <ErrorState
          title={bi("ما قدرنا نحمّل سجل الحضور", "We couldn't load your attendance")}
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
              onClick={() => void query.refetch()}
            />
          }
        />
      ) : !data ? (
        rangeInvalid ? null : (
          <LoadingState label={bi("جارٍ التحميل…", "Loading…")} />
        )
      ) : !hasAttendanceData(data) ? (
        <EmptyState
          icon="CalendarCheck"
          title={
            hasFilters
              ? bi("لا توجد سجلات مطابقة", "No matching records")
              : bi("لا يوجد سجل حضور بعد", "No attendance records yet")
          }
          description={
            hasFilters
              ? bi(
                  "غيّر المدى أو الكورس لعرض سجلات أخرى.",
                  "Change the range or course to see other records.",
                )
              : bi(
                  "ستظهر حالة كل جلسة هنا بعد أن يسجّل المعلم الحضور.",
                  "Each session's status will appear here once your teacher records attendance.",
                )
          }
        />
      ) : (
        <>
          <StatGrid
            items={[
              {
                icon: "Percent",
                label: bi("نسبة الحضور", "Attendance rate"),
                value: attendanceRateText(data.attendanceRatePercent),
              },
              {
                icon: "CalendarCheck",
                label: bi("إجمالي الجلسات", "Total sessions"),
                value: String(data.totalSessions),
              },
              ...attendanceCounters(data, bi)
                .slice(0, 2)
                .map((c) => ({
                  icon: c.key === "present" ? "CheckCircle2" : "XCircle",
                  label: c.label,
                  value: String(c.count),
                })),
            ]}
          />
          <p className="text-xs text-muted-foreground">
            {bi("متأخر", "Late")}: {data.late} · {bi("معذور", "Excused")}: {data.excused}
          </p>
          <Panel title={bi("سجل الجلسات", "Session log")} icon="ListChecks">
            {data.records.length ? (
              <DataTable
                caption={bi("سجل الحضور", "Attendance log")}
                head={[
                  bi("التاريخ", "Date"),
                  bi("الكورس", "Course"),
                  bi("المجموعة", "Group"),
                  bi("الحالة", "Status"),
                  bi("ملاحظات", "Notes"),
                ]}
                rows={sortRecordsNewestFirst(data.records).map((r, i) => [
                  formatDate(r.sessionDate, lang),
                  r.courseTitle ?? "—",
                  r.groupName || "—",
                  <Badge key={`s-${i}`} tone={attendanceStatusTone(r.status)}>
                    {attendanceStatusLabel(r.status, bi)}
                  </Badge>,
                  r.notes?.trim() || "—",
                ])}
              />
            ) : (
              <EmptyState
                icon="ListChecks"
                text={bi(
                  "لا توجد جلسات تفصيلية لهذه التصفية.",
                  "No detailed sessions for this filter.",
                )}
              />
            )}
          </Panel>
        </>
      )}
    </AppPage>
  );
}

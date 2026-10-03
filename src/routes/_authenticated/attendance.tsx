// WP-S7: S7-02 (بطاقة نسبة الحضور) منفّذة؛ السجل التفصيلي S7-01 ينتظر عينة JSON (J-04). أبقِ الـGuard ومفتاح الصلاحية كما هما
// (العقد C-17/C-18). ممنوع إضافة مفاتيح PAGES جديدة أو تعديل routeTree.gen.ts.
import { createFileRoute } from "@tanstack/react-router";
import { AppPage, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { AttendanceRateCard } from "@/components/student/attendance-rate-card";
import { useBi } from "@/lib/bi";
import { authPageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/attendance")({
  head: () =>
    authPageHead(
      { title: "سجل الحضور | أكاديميا", description: "سجل الحضور — قيد البناء." },
      { title: "Attendance | Academia", description: "Attendance — under construction." },
    ),
  component: () => (
    <Guard pageKey="student_attendance">
      <Body />
    </Guard>
  ),
});

function Body() {
  const bi = useBi();
  return (
    <AppPage title={bi("سجل الحضور", "Attendance")} icon="CalendarCheck">
      <AttendanceRateCard />
      {/* السجل التفصيلي (S7-01) ينتظر عينة JSON لـStudent/Attendance (J-04). */}
      <EmptyState
        icon="Construction"
        title={bi("السجل التفصيلي قيد البناء", "Detailed record under construction")}
        description={bi(
          "قائمة حالة كل درس (حاضر/غائب/متأخر/معذور) ستظهر هنا قريبًا (WP-S7).",
          "The per-lesson status list (present/absent/late/excused) will appear here soon (WP-S7).",
        )}
      />
    </AppPage>
  );
}

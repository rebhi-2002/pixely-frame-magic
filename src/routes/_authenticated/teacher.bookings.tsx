// طلبات الحجز للمعلم (WP-T5 / T5-01, T5-04, T5-05, T5-06).
// Booking/TeacherBookings?status → TeacherBookingRow[] (= BookingDto) و Booking/TeacherRescheduleRequests → RescheduleRequestDto[].
// قبول/رفض (DecideBookingDialog)، إنهاء (CompleteBookingDialog)، قرار إعادة الجدولة (DecideRescheduleDialog).
// ⚠️ لو الباك اند يرجّع 500 (B-6) تظهر حالة خطأ برمز الاستجابة مع زر إعادة المحاولة.
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppPage, Badge, DataTable, EmptyState, Panel } from "@/components/app/kit";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { Guard } from "@/components/app/guard";
import { CompleteBookingDialog } from "@/components/teacher/complete-booking-dialog";
import { DecideBookingDialog } from "@/components/teacher/decide-booking-dialog";
import { DecideRescheduleDialog } from "@/components/teacher/decide-reschedule-dialog";
import { Button } from "@/components/ui/button";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import {
  listTeacherBookings,
  listTeacherRescheduleRequests,
} from "@/integrations/backend/bookings";
import { useBi } from "@/lib/bi";
import type { DecisionKind } from "@/lib/booking-decision";
import {
  bookingStatusLabel,
  bookingStatusTone,
  deliveryTypeLabel,
  rescheduleStatusLabel,
  rescheduleStatusTone,
} from "@/lib/enums";
import { formatDate, formatMoney, formatTime } from "@/lib/format";
import { withLoadErrorDetail } from "@/lib/load-error";
import { qk } from "@/lib/query-keys";
import { authPageHead } from "@/lib/seo";
import {
  bookingTabStatus,
  canDecideReschedule,
  sortByCreatedNewest,
  teacherBookingActions,
  type BookingTab,
} from "@/lib/teacher-bookings";

export const Route = createFileRoute("/_authenticated/teacher/bookings")({
  head: () =>
    authPageHead(
      {
        title: "طلبات الحجز | أكاديميا",
        description: "اقبل أو ارفض طلبات الحجز وأنهِ الحصص وقرّر في طلبات إعادة الجدولة.",
      },
      {
        title: "Booking requests | Academia",
        description:
          "Accept or reject booking requests, complete sessions and decide on reschedule requests.",
      },
    ),
  component: () => (
    <Guard pageKey="teacher_bookings">
      <Body />
    </Guard>
  ),
});

type Section = "bookings" | "reschedule";
type RescheduleTab = "all" | "pending";

function Body() {
  const bi = useBi();
  const [section, setSection] = useState<Section>("bookings");

  return (
    <AppPage
      title={bi("طلبات الحجز", "Booking requests")}
      icon="CalendarCheck"
      subtitle={bi(
        "تابع طلبات الطلاب، وقرّر بالقبول أو الرفض، وأنهِ الحصص المؤكّدة.",
        "Follow student requests, accept or reject them, and complete confirmed sessions.",
      )}
    >
      <SegmentedTabs
        ariaLabel={bi("أقسام الصفحة", "Page sections")}
        value={section}
        onChange={(v) => setSection(v as Section)}
        items={[
          { value: "bookings", label: bi("الحجوزات", "Bookings") },
          { value: "reschedule", label: bi("طلبات إعادة الجدولة", "Reschedule requests") },
        ]}
      />
      {section === "bookings" ? <BookingsSection /> : <RescheduleSection />}
    </AppPage>
  );
}

function BookingsSection() {
  const bi = useBi();
  const lang = bi<"ar" | "en">("ar", "en");
  const [tab, setTab] = useState<BookingTab>("pending");
  const [decide, setDecide] = useState<{ id: number; kind: DecisionKind } | null>(null);
  const [completeId, setCompleteId] = useState<number | null>(null);
  const status = bookingTabStatus(tab);

  const query = useQuery({
    queryKey: qk.teacherBookings(status),
    queryFn: () => listTeacherBookings(status),
  });

  return (
    <>
      <SegmentedTabs
        ariaLabel={bi("تصفية الحجوزات", "Filter bookings")}
        value={tab}
        onChange={(v) => setTab(v as BookingTab)}
        items={[
          { value: "pending", label: bi("بانتظار القرار", "Pending") },
          { value: "confirmed", label: bi("مؤكّدة", "Confirmed") },
          { value: "completed", label: bi("مكتملة", "Completed") },
          { value: "all", label: bi("الكل", "All") },
        ]}
      />
      <Panel title={bi("الحجوزات", "Bookings")} icon="ClipboardList">
        {query.isError ? (
          <ErrorState
            title={bi("ما قدرنا نحمّل الحجوزات", "We couldn't load the bookings")}
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
        ) : !query.data ? (
          <LoadingState
            label={bi("جارٍ التحميل…", "Loading…")}
            className="border-none bg-transparent"
          />
        ) : query.data.length === 0 ? (
          <EmptyState
            icon="ClipboardList"
            text={bi("لا توجد حجوزات في هذا التبويب.", "No bookings in this tab.")}
          />
        ) : (
          <DataTable
            caption={bi("حجوزات المعلم", "Teacher bookings")}
            head={[
              bi("الطالب", "Student"),
              bi("المادة", "Subject"),
              bi("النوع", "Type"),
              bi("التاريخ", "Date"),
              bi("الوقت", "Time"),
              bi("المدة", "Duration"),
              bi("السعر", "Price"),
              bi("الحالة", "Status"),
              "",
            ]}
            rows={sortByCreatedNewest(query.data).map((b) => {
              const a = teacherBookingActions(b);
              return [
                b.studentName ?? "—",
                b.subjectName ?? "—",
                deliveryTypeLabel(b.teachingMode, bi),
                formatDate(b.date, lang),
                formatTime(b.startTime),
                b.durationMinutes > 0
                  ? bi(`${b.durationMinutes} د`, `${b.durationMinutes} min`)
                  : "—",
                formatMoney(b.price, lang),
                <Badge key={`s-${b.id}`} tone={bookingStatusTone(b.status)}>
                  {bookingStatusLabel(b.status, bi)}
                </Badge>,
                <div key={`a-${b.id}`} className="flex flex-wrap gap-1.5">
                  {a.accept && (
                    <Button size="sm" onClick={() => setDecide({ id: b.id, kind: "accept" })}>
                      {bi("قبول", "Accept")}
                    </Button>
                  )}
                  {a.reject && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDecide({ id: b.id, kind: "reject" })}
                    >
                      {bi("رفض", "Reject")}
                    </Button>
                  )}
                  {a.complete && (
                    <Button size="sm" variant="outline" onClick={() => setCompleteId(b.id)}>
                      {bi("إنهاء الحصة", "Complete")}
                    </Button>
                  )}
                </div>,
              ];
            })}
          />
        )}
      </Panel>

      <DecideBookingDialog
        bookingId={decide?.id}
        decision={decide?.kind ?? "accept"}
        open={decide !== null}
        onOpenChange={(o) => {
          if (!o) setDecide(null);
        }}
      />
      <CompleteBookingDialog
        bookingId={completeId}
        open={completeId !== null}
        onOpenChange={(o) => {
          if (!o) setCompleteId(null);
        }}
      />
    </>
  );
}

function RescheduleSection() {
  const bi = useBi();
  const lang = bi<"ar" | "en">("ar", "en");
  const [tab, setTab] = useState<RescheduleTab>("pending");
  const [decide, setDecide] = useState<{ id: number; kind: DecisionKind } | null>(null);
  const status = tab === "pending" ? (1 as const) : undefined;

  const query = useQuery({
    queryKey: qk.teacherRescheduleRequests(status),
    queryFn: () => listTeacherRescheduleRequests(status),
  });

  return (
    <>
      <SegmentedTabs
        ariaLabel={bi("تصفية طلبات إعادة الجدولة", "Filter reschedule requests")}
        value={tab}
        onChange={(v) => setTab(v as RescheduleTab)}
        items={[
          { value: "pending", label: bi("بانتظار القرار", "Pending") },
          { value: "all", label: bi("الكل", "All") },
        ]}
      />
      <Panel title={bi("طلبات إعادة الجدولة", "Reschedule requests")} icon="CalendarClock">
        {query.isError ? (
          <ErrorState
            title={bi(
              "ما قدرنا نحمّل طلبات إعادة الجدولة",
              "We couldn't load the reschedule requests",
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
                onClick={() => void query.refetch()}
              />
            }
          />
        ) : !query.data ? (
          <LoadingState
            label={bi("جارٍ التحميل…", "Loading…")}
            className="border-none bg-transparent"
          />
        ) : query.data.length === 0 ? (
          <EmptyState
            icon="CalendarClock"
            text={bi("لا توجد طلبات إعادة جدولة.", "No reschedule requests.")}
          />
        ) : (
          <DataTable
            caption={bi("طلبات إعادة الجدولة", "Reschedule requests")}
            head={[
              bi("الطالب", "Student"),
              bi("الموعد الحالي", "Current time"),
              bi("الموعد المقترح", "Proposed time"),
              bi("ملاحظة", "Note"),
              bi("الحالة", "Status"),
              "",
            ]}
            rows={sortByCreatedNewest(query.data).map((r) => [
              r.studentName ?? "—",
              `${formatDate(r.originalDate, lang)} ${formatTime(r.originalStartTime)}`,
              `${formatDate(r.proposedDate, lang)} ${formatTime(r.proposedStartTime)}`,
              r.note?.trim() || "—",
              <Badge key={`s-${r.id}`} tone={rescheduleStatusTone(r.status)}>
                {rescheduleStatusLabel(r.status, bi)}
              </Badge>,
              canDecideReschedule(r) ? (
                <div key={`a-${r.id}`} className="flex flex-wrap gap-1.5">
                  <Button size="sm" onClick={() => setDecide({ id: r.id, kind: "accept" })}>
                    {bi("موافقة", "Approve")}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDecide({ id: r.id, kind: "reject" })}
                  >
                    {bi("رفض", "Reject")}
                  </Button>
                </div>
              ) : (
                ""
              ),
            ])}
          />
        )}
      </Panel>

      <DecideRescheduleDialog
        requestId={decide?.id}
        decision={decide?.kind ?? "accept"}
        open={decide !== null}
        onOpenChange={(o) => {
          if (!o) setDecide(null);
        }}
      />
    </>
  );
}

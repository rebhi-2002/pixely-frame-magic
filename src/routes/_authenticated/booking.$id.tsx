// تفاصيل الحجز (WP-S2 / S2-01, S2-02, S2-05 + S4-02/03 + S3) — Student/GetBooking → StudentBookingDetail (= BookingDto).
// يجمع: بيانات الحجز + بطاقة الدفع + إلغاء/إعادة جدولة/تقييم حسب lib/booking-rules (الباك اند مرجع نهائي).
import { useState, type ReactNode } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppPage, Badge, EmptyState, Panel } from "@/components/app/kit";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { Guard } from "@/components/app/guard";
import { BookingPaymentCard } from "@/components/student/booking-payment-card";
import { CancelBookingDialog } from "@/components/student/cancel-booking-dialog";
import { RateBookingDialog } from "@/components/student/rate-booking-dialog";
import { RescheduleDialog } from "@/components/student/reschedule-dialog";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { getStudentBooking } from "@/integrations/backend/student";
import { useBi } from "@/lib/bi";
import { bookingActions, bookingNotice } from "@/lib/booking-detail";
import { bookingStatusLabel, bookingStatusTone, deliveryTypeLabel } from "@/lib/enums";
import { dayName, formatDate, formatMoney, formatTime } from "@/lib/format";
import { withLoadErrorDetail } from "@/lib/load-error";
import { qk } from "@/lib/query-keys";
import { parsePositiveInt } from "@/lib/route-id";
import { authPageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/booking/$id")({
  head: () =>
    authPageHead(
      { title: "تفاصيل الحجز | أكاديميا", description: "حالة حجزك ودفعه وإجراءاته." },
      {
        title: "Booking details | Academia",
        description: "Your booking status, payment and actions.",
      },
    ),
  component: () => (
    <Guard pageKey="student_my_courses">
      <Body />
    </Guard>
  ),
});

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-foreground">{children}</dd>
    </div>
  );
}

function Body() {
  const bi = useBi();
  const lang = bi<"ar" | "en">("ar", "en");
  const { id: rawId } = Route.useParams();
  const id = parsePositiveInt(rawId);
  const [dialog, setDialog] = useState<"cancel" | "reschedule" | "rate" | null>(null);

  const query = useQuery({
    queryKey: qk.studentBooking(id ?? 0),
    queryFn: () => getStudentBooking(id as number),
    enabled: id !== null,
  });

  const back = (
    <Link to="/my-courses" className={buttonVariants({ variant: "outline", size: "sm" })}>
      {bi("العودة لكورساتي", "Back to my courses")}
    </Link>
  );

  return (
    <AppPage title={bi("تفاصيل الحجز", "Booking details")} icon="ClipboardList" actions={back}>
      {id === null ? (
        <EmptyState
          icon="SearchX"
          title={bi("الحجز غير موجود", "Booking not found")}
          description={bi("الرابط غير صحيح.", "The link is not valid.")}
        />
      ) : query.isError ? (
        <ErrorState
          title={bi("ما قدرنا نحمّل الحجز", "We couldn't load the booking")}
          description={withLoadErrorDetail(
            bi(
              "جرّب مرة ثانية. إذا استمرت المشكلة، تأكد أن الحجز يخصّك أو ارجع لاحقاً.",
              "Try again. If the problem continues, make sure the booking is yours or come back later.",
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
        <LoadingState label={bi("جارٍ التحميل…", "Loading…")} />
      ) : (
        (() => {
          const b = query.data;
          const actions = bookingActions(b);
          const notice = bookingNotice(b);
          return (
            <div className="space-y-6">
              {notice && (
                <div
                  role="alert"
                  className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm"
                >
                  <p className="font-bold text-destructive">
                    {notice.kind === "rejected"
                      ? bi("رفض المعلم هذا الحجز", "The teacher rejected this booking")
                      : bi("تم إلغاء هذا الحجز", "This booking was cancelled")}
                  </p>
                  {notice.reason && <p className="mt-1 text-foreground">{notice.reason}</p>}
                </div>
              )}

              <Panel
                title={b.subjectName ?? bi("حجز حصة", "Lesson booking")}
                icon="ClipboardList"
                action={
                  <Badge tone={bookingStatusTone(b.status)}>
                    {bookingStatusLabel(b.status, bi)}
                  </Badge>
                }
              >
                <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Field label={bi("المعلم", "Teacher")}>{b.teacherName ?? "—"}</Field>
                  <Field label={bi("المادة", "Subject")}>{b.subjectName ?? "—"}</Field>
                  <Field label={bi("نوع الحصة", "Session type")}>
                    {deliveryTypeLabel(b.teachingMode, bi)}
                  </Field>
                  <Field label={bi("اليوم", "Day")}>{dayName(b.date, lang)}</Field>
                  <Field label={bi("التاريخ", "Date")}>{formatDate(b.date, lang)}</Field>
                  <Field label={bi("الوقت", "Time")}>{formatTime(b.startTime)}</Field>
                  <Field label={bi("المدة", "Duration")}>
                    {b.durationMinutes > 0
                      ? bi(`${b.durationMinutes} دقيقة`, `${b.durationMinutes} min`)
                      : "—"}
                  </Field>
                  <Field label={bi("السعر", "Price")}>{formatMoney(b.price, lang)}</Field>
                  <Field label={bi("تاريخ الطلب", "Requested on")}>
                    {formatDate(b.createdOn, lang)}
                  </Field>
                </dl>
                {b.studentNote?.trim() && (
                  <p className="mt-4 whitespace-pre-line rounded-xl bg-muted/50 p-3 text-sm text-foreground">
                    <span className="block text-xs font-semibold text-muted-foreground">
                      {bi("ملاحظتك", "Your note")}
                    </span>
                    {b.studentNote}
                  </p>
                )}
              </Panel>

              <BookingPaymentCard bookingId={b.id} />

              {(actions.cancel || actions.reschedule || actions.rate) && (
                <Panel title={bi("الإجراءات", "Actions")} icon="MousePointerClick">
                  <div className="flex flex-wrap gap-2">
                    {actions.reschedule && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setDialog("reschedule")}
                      >
                        {bi("طلب إعادة جدولة", "Request reschedule")}
                      </Button>
                    )}
                    {actions.cancel && (
                      <Button type="button" variant="outline" onClick={() => setDialog("cancel")}>
                        {bi("إلغاء الحجز", "Cancel booking")}
                      </Button>
                    )}
                    {actions.rate && (
                      <Button type="button" onClick={() => setDialog("rate")}>
                        {bi("تقييم المعلم", "Rate the teacher")}
                      </Button>
                    )}
                  </div>
                </Panel>
              )}

              <CancelBookingDialog
                booking={b}
                open={dialog === "cancel"}
                onOpenChange={(o) => setDialog(o ? "cancel" : null)}
              />
              <RescheduleDialog
                booking={b}
                open={dialog === "reschedule"}
                onOpenChange={(o) => setDialog(o ? "reschedule" : null)}
              />
              <RateBookingDialog
                booking={b}
                open={dialog === "rate"}
                onOpenChange={(o) => setDialog(o ? "rate" : null)}
              />
            </div>
          );
        })()
      )}
    </AppPage>
  );
}

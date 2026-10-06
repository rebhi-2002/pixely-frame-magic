// شاشة حجز حصة (WP-S1): S1-01 تحميل المعلم والتوفّر، S1-02 اختيار الوضع/التاريخ/الوقت/المدة، S1-04 تقدير السعر وفحص
// الرصيد، S1-05 إرسال الحجز (Booking/Submit)، S1-07 ملاحظة الطالب والتحقق.
// S1-03 (اختيار المادة/الصف) أُلغيت: كود الباك اند يؤكد أن BookingInputDto.SubjectId/GradeId اختياريان (nullable).
// السعر يُحسب بالباك اند من سعر المعلم؛ ما بنرسل سعرًا. أي رفض (تعارض، توفّر، رصيد…) بيُعرض برسالته داخل الشاشة.
import { useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AppPage, EmptyState, Panel } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { BookingSlotPicker } from "@/components/student/booking-slot-picker";
import { InsufficientBalanceAlert } from "@/components/wallet/insufficient-balance-alert";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitBooking } from "@/integrations/backend/bookings";
import { getErrorMessage } from "@/integrations/backend/client";
import { assertOk, getReturnId } from "@/integrations/backend/op-result";
import { getTeacherAvailability, getTeacherPublicProfile } from "@/integrations/backend/teachers";
import { getMyWallet } from "@/integrations/backend/wallet";
import { useBi } from "@/lib/bi";
import {
  BOOKING_FLOW_ENABLED,
  DURATION_OPTIONS,
  MAX_NOTE_LENGTH,
  estimatePrice,
  hourlyPriceFor,
  supportedModes,
  todayLocalIso,
  validateBookingDraft,
  type BookingDraftError,
} from "@/lib/booking-slots";
import { DeliveryType, deliveryTypeLabel, type Bi } from "@/lib/enums";
import { formatMoney } from "@/lib/format";
import { invalidateBookingQueries, qk } from "@/lib/query-keys";
import { withLoadErrorDetail } from "@/lib/load-error";
import { authPageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/book/$teacherId")({
  head: () =>
    authPageHead(
      { title: "حجز حصة | أكاديميا", description: "احجز حصة مع معلمك." },
      { title: "Book a session | Academia", description: "Book a session with your teacher." },
    ),
  component: () => (
    <Guard pageKey="student_my_courses">
      <Body />
    </Guard>
  ),
});

const SELECT_CLASS =
  "h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring";

function draftErrorText(code: BookingDraftError, bi: Bi): string | null {
  switch (code) {
    case "past":
      return bi(
        "هذا الموعد مرّ — اختر وقتًا بالمستقبل",
        "That time has passed — pick a future time",
      );
    case "unavailable":
      return bi(
        "هذا الوقت خارج أوقات توفّر المعلم لهذا اليوم",
        "That time is outside the teacher's availability for this day",
      );
    case "duration":
      return bi("المدة غير صالحة", "Invalid duration");
    case "note":
      return bi(
        `الملاحظة طويلة (الحد ${MAX_NOTE_LENGTH} حرفًا)`,
        `The note is too long (max ${MAX_NOTE_LENGTH} characters)`,
      );
    // mode/date/time = حقول لسا ما انملت — ما بنعرضلها رسالة خطأ استباقية.
    default:
      return null;
  }
}

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { teacherId: rawId } = Route.useParams();
  const teacherId = Number(rawId);
  const validId = Number.isInteger(teacherId) && teacherId > 0;

  const [modeChoice, setModeChoice] = useState<DeliveryType | null>(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState<number>(60);
  const [note, setNote] = useState("");

  const teacherQuery = useQuery({
    queryKey: qk.backendTeacherProfile(teacherId),
    queryFn: () => getTeacherPublicProfile(teacherId),
    enabled: validId,
  });
  const availabilityQuery = useQuery({
    queryKey: qk.backendTeacherAvailability(teacherId),
    queryFn: () => getTeacherAvailability(teacherId),
    enabled: validId,
  });
  const walletQuery = useQuery({ queryKey: qk.myWallet(), queryFn: getMyWallet });
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  // الإرسال: القيم تُمرَّر وقت الضغط (mutate(variables)) لأن mode/draft تُحسب بعد الـearly returns.
  const submit = useMutation({
    mutationFn: async (draft: { mode: DeliveryType; date: string; startTime: string; durationMinutes: number; note: string }) => {
      const result = await submitBooking({
        teacherId,
        teachingMode: draft.mode,
        date: draft.date,
        startTime: draft.startTime,
        durationMinutes: draft.durationMinutes,
        studentNote: draft.note.trim() || null,
      });
      assertOk(result, "تعذّر إرسال طلب الحجز", "Couldn't send the booking request");
      return getReturnId(result);
    },
    onSuccess: (bookingId: number | null) => {
      invalidateBookingQueries(queryClient, bookingId ?? undefined, teacherId);
      toast.success(
        bi(
          "تم إرسال طلب الحجز — بانتظار موافقة المعلم.",
          "Booking request sent — awaiting the teacher's approval.",
        ),
      );
      void navigate({ to: "/my-courses" });
    },
    onError: (e: unknown) =>
      setSubmitError(getErrorMessage(e, bi("تعذّر إرسال طلب الحجز", "Couldn't send the booking request"))),
  });

  const title = bi("حجز حصة", "Book a session");

  if (!validId) {
    return (
      <AppPage title={title} icon="CalendarClock">
        <EmptyState
          icon="SearchX"
          title={bi("المعلم غير موجود", "Teacher not found")}
          description={bi("رابط المعلم غير صالح.", "The teacher link isn't valid.")}
        />
      </AppPage>
    );
  }

  if (teacherQuery.isError || availabilityQuery.isError) {
    return (
      <AppPage title={title} icon="CalendarClock">
        <ErrorState
          title={bi("ما قدرنا نحمّل بيانات المعلم", "We couldn't load the teacher's details")}
          description={bi(
            "جرّب التحديث مرة ثانية. إذا استمرت المشكلة، تأكد من اتصالك أو ارجع لاحقاً.",
            "Try again. If the problem continues, check your connection or come back later.",
          )}
          action={
            <RetryButton
              label={bi("إعادة المحاولة", "Try again")}
              onClick={() => {
                void queryClient.invalidateQueries({
                  queryKey: qk.backendTeacherProfile(teacherId),
                });
                void queryClient.invalidateQueries({
                  queryKey: qk.backendTeacherAvailability(teacherId),
                });
              }}
            />
          }
        />
      </AppPage>
    );
  }

  if (teacherQuery.isLoading || availabilityQuery.isLoading) {
    return (
      <AppPage title={title} icon="CalendarClock">
        <LoadingState
          label={bi("جارٍ التحميل…", "Loading…")}
          className="border-none bg-transparent"
        />
      </AppPage>
    );
  }

  const teacher = teacherQuery.data;
  if (!teacher) {
    return (
      <AppPage title={title} icon="CalendarClock">
        <EmptyState
          icon="SearchX"
          title={bi("المعلم غير موجود", "Teacher not found")}
          description={bi("ما لقينا هذا المعلم.", "We couldn't find this teacher.")}
        />
      </AppPage>
    );
  }

  const slots = availabilityQuery.data ?? [];
  const modes = supportedModes(teacher);
  const mode = modeChoice ?? modes[0] ?? null;
  const teacherName = teacher.name || bi("معلّم", "Teacher");

  const errors = validateBookingDraft(
    { mode, date, startTime, durationMinutes: duration, note },
    slots,
  );
  const messages = errors
    .map((code) => draftErrorText(code, bi))
    .filter((text): text is string => text !== null && Boolean(date));

  // S1-04: سعر تقديري (سعر الساعة × المدة). لو المعلم ما حدّد سعرًا لهذا الوضع منقول ذلك بصدق ولا نخمّن.
  const estimate = mode ? estimatePrice(hourlyPriceFor(teacher, mode), duration) : null;
  const balance = walletQuery.data?.balance;

  return (
    <AppPage
      title={bi(`حجز حصة مع ${teacherName}`, `Book a session with ${teacherName}`)}
      icon="CalendarClock"
      actions={
        <Link
          to="/teacher/$id"
          params={{ id: String(teacher.id) }}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          {bi("ملف المعلم", "Teacher profile")}
        </Link>
      }
    >
      {!BOOKING_FLOW_ENABLED && (
        <p
          role="note"
          className="rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm text-muted-foreground"
        >
          {bi(
            "إرسال طلب الحجز غير مفعّل بعد: اختيار المادة والصف وإرسال الطلب قيد الربط مع النظام. يمكنك الآن استعراض الأوقات المتاحة وتقدير السعر.",
            "Sending a booking request isn't enabled yet: subject/grade selection and submission are still being connected. You can browse available times and estimate the price now.",
          )}
        </p>
      )}

      {modes.length === 0 ? (
        <EmptyState
          icon="CalendarX"
          text={bi(
            "هذا المعلم لم يحدّد حضوري/أونلاين بعد، فلا يمكن الحجز معه حاليًا.",
            "This teacher hasn't set in-person/online yet, so booking isn't possible right now.",
          )}
        />
      ) : slots.length === 0 ? (
        <EmptyState
          icon="CalendarX"
          text={bi(
            "هذا المعلم لم يضف أوقات توفّر بعد، فلا توجد أوقات للحجز.",
            "This teacher hasn't added availability yet, so there are no times to book.",
          )}
        />
      ) : (
        <Panel title={bi("تفاصيل الحصة", "Session details")} icon="CalendarClock">
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label>{bi("نوع الحصة", "Session type")}</Label>
              <div className="flex flex-wrap gap-2" role="group">
                {modes.map((m) => (
                  <Button
                    key={m}
                    type="button"
                    size="sm"
                    variant={m === mode ? "default" : "outline"}
                    aria-pressed={m === mode}
                    onClick={() => {
                      setModeChoice(m);
                      setStartTime("");
                    }}
                  >
                    {deliveryTypeLabel(m, bi)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="bk-date">{bi("التاريخ", "Date")}</Label>
                <Input
                  id="bk-date"
                  type="date"
                  min={todayLocalIso()}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setStartTime("");
                  }}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bk-duration">{bi("المدة", "Duration")}</Label>
                <select
                  id="bk-duration"
                  className={SELECT_CLASS}
                  value={duration}
                  onChange={(e) => {
                    setDuration(Number(e.target.value));
                    setStartTime("");
                  }}
                >
                  {DURATION_OPTIONS.map((minutes) => (
                    <option key={minutes} value={minutes}>
                      {bi(`${minutes} دقيقة`, `${minutes} min`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {mode && (
              <div className="space-y-1.5">
                <Label>{bi("وقت البدء", "Start time")}</Label>
                <BookingSlotPicker
                  slots={slots}
                  mode={mode}
                  date={date}
                  durationMinutes={duration}
                  value={startTime}
                  onChange={setStartTime}
                />
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="bk-note">
                {bi("ملاحظة للمعلم (اختياري)", "Note to the teacher (optional)")}
              </Label>
              <Textarea
                id="bk-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                aria-invalid={errors.includes("note") || undefined}
              />
            </div>

            {messages.length > 0 && (
              <ul role="alert" className="space-y-1 text-sm text-destructive">
                {messages.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            )}
          </div>
        </Panel>
      )}

      {modes.length > 0 && slots.length > 0 && (
        <Panel title={bi("السعر والدفع", "Price & payment")} icon="Wallet">
          <div className="space-y-3 text-sm">
            {estimate === null ? (
              <p className="text-muted-foreground">
                {bi(
                  "لم يحدّد المعلم سعرًا لهذا النوع من الحصص، فلا يمكن تقدير السعر.",
                  "The teacher hasn't set a price for this session type, so the price can't be estimated.",
                )}
              </p>
            ) : (
              <p className="text-foreground">
                {bi("السعر التقديري: ", "Estimated price: ")}
                <strong>{formatMoney(estimate, bi<"ar" | "en">("ar", "en"))}</strong>
                <span className="text-muted-foreground">
                  {bi(
                    " (سعر الساعة × المدة — تقديري وقد يختلف عند التأكيد)",
                    " (hourly price × duration — an estimate that may differ at confirmation)",
                  )}
                </span>
              </p>
            )}
            {estimate !== null && typeof balance === "number" && (
              <InsufficientBalanceAlert required={estimate} balance={balance} />
            )}
            {/* Q-06: لحظة الخصم مش مؤكّدة بالباك اند؛ SRS FR-T06 بيربطها بقبول المعلم. */}
            <p className="text-xs text-muted-foreground">
              {bi(
                "وفق مواصفات المنصة، يُخصم المبلغ من محفظتك عند قبول المعلم للطلب. ستظهر لك أي رسالة من النظام إذا تعذّر الخصم.",
                "Per the platform spec, the amount is deducted from your wallet when the teacher accepts the request. You'll see a message if the deduction fails.",
              )}
            </p>
          </div>
        </Panel>
      )}

      {submitError && (
        <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {submitError}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          loading={submit.isPending}
          disabled={!BOOKING_FLOW_ENABLED || errors.length > 0 || mode === null}
          onClick={() => {
            setSubmitError(null);
            if (mode === null || errors.length > 0) return;
            submit.mutate({ mode, date, startTime, durationMinutes: duration, note });
          }}
        >
          {bi("إرسال طلب الحجز", "Send booking request")}
        </Button>
        {errors.length > 0 && (
          <span className="text-xs text-muted-foreground">
            {bi("أكمل التاريخ والوقت المتاح لتفعيل الإرسال.", "Pick a date and an available time to enable sending.")}
          </span>
        )}
      </div>
    </AppPage>
  );
}

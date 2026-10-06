import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AppPage, Panel, DataTable, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { WelcomeBanner } from "@/components/app/welcome-banner";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getStudentSchedule, type StudentScheduleItemDto } from "@/integrations/backend/student";
import { useBi } from "@/lib/bi";
import { withLoadErrorDetail } from "@/lib/load-error";
import { DeliveryType, dayOfWeekLabel, deliveryTypeLabel } from "@/lib/enums";
import { formatDate, formatTime } from "@/lib/format";
import { qk } from "@/lib/query-keys";
import { joinHref, locationLabel } from "@/lib/schedule-join";
import { authPageHead } from "@/lib/seo";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";

const description = "جدولك الأسبوعي — دروس المجموعات وحجوزاتك الفردية.";

export const Route = createFileRoute("/_authenticated/schedule")({
  head: () =>
    authPageHead(
      { title: "الجدول | أكاديميا", description },
      {
        title: "Schedule | Academia",
        description: "Your weekly schedule — group lessons and your one-on-one bookings.",
      },
    ),
  component: () => (
    <Guard pageKey="student_schedule">
      <Body />
    </Guard>
  ),
});

const SELECT_CLASS =
  "h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring";

type ModeFilter = "" | "1" | "2";

/** صفّ الموضوع: رابط لصفحة التفاصيل (درس → /lesson/$id، حجز → /booking/$id). */
function TopicLink({ item }: { item: StudentScheduleItemDto }) {
  const cls = "font-semibold text-foreground underline-offset-4 hover:underline";
  return item.kind === "Booking" ? (
    <Link to="/booking/$id" params={{ id: String(item.id) }} className={cls}>
      {item.topic}
    </Link>
  ) : (
    <Link to="/lesson/$id" params={{ id: String(item.id) }} className={cls}>
      {item.topic}
    </Link>
  );
}

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const lang = bi<"ar" | "en">("ar", "en");

  // فلاتر S5-05: مدى زمني + وضع (حضوري/أونلاين). القيم نصوص "YYYY-MM-DD" وتتحوّل لـDate بالاستعلام فقط.
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [mode, setMode] = useState<ModeFilter>("");
  const rangeInvalid = Boolean(from && to && from > to);
  const hasFilters = Boolean(from || to || mode);
  const filterKey = { from, to, mode };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: qk.studentSchedule(filterKey),
    queryFn: () =>
      getStudentSchedule({
        from: from ? new Date(`${from}T00:00:00`) : undefined,
        to: to ? new Date(`${to}T23:59:59`) : undefined,
        mode: mode ? (Number(mode) as DeliveryType) : undefined,
      }),
    enabled: !rangeInvalid,
    // نبقي النتائج السابقة وقت تغيير الفلتر كي ما تختفي الصفحة وتضيع حقول الفلتر.
    placeholderData: (previous: StudentScheduleItemDto[] | undefined) => previous,
  });

  return (
    <AppPage
      title={bi("الجدول", "Schedule")}
      icon="Calendar"
      subtitle={bi(
        description,
        "Your weekly schedule — group lessons and your one-on-one bookings.",
      )}
    >
      <WelcomeBanner
        subtitle={[
          "كل دروسك وحجوزاتك القادمة بمكان واحد.",
          "All your upcoming lessons and bookings in one place.",
        ]}
      />

      <Panel title={bi("تصفية الجدول", "Filter schedule")} icon="Filter">
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="space-y-1.5">
            <Label htmlFor="sch-from">{bi("من تاريخ", "From")}</Label>
            <Input
              id="sch-from"
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sch-to">{bi("إلى تاريخ", "To")}</Label>
            <Input id="sch-to" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sch-mode">{bi("نوع الحصة", "Session type")}</Label>
            <select
              id="sch-mode"
              className={SELECT_CLASS}
              value={mode}
              onChange={(e) => setMode(e.target.value as ModeFilter)}
            >
              <option value="">{bi("الكل", "All")}</option>
              <option value={String(DeliveryType.InPerson)}>{bi("حضوري", "In person")}</option>
              <option value={String(DeliveryType.Online)}>{bi("أونلاين", "Online")}</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button
              type="button"
              variant="outline"
              disabled={!hasFilters}
              onClick={() => {
                setFrom("");
                setTo("");
                setMode("");
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

      <Panel title={bi("الجدول القادم", "Upcoming schedule")} icon="Calendar">
        {isError ? (
          <ErrorState
            title={bi("ما قدرنا نحمّل الجدول", "We couldn't load the schedule")}
            description={withLoadErrorDetail(bi("جرّب التحديث مرة ثانية. إذا استمرت المشكلة، تأكد من اتصالك أو ارجع لاحقاً.", "Try again. If the problem continues, check your connection or come back later."), error, bi)}
            action={
              <RetryButton
                label={bi("إعادة المحاولة", "Try again")}
                onClick={() =>
                  void queryClient.invalidateQueries({ queryKey: qk.studentSchedule(filterKey) })
                }
              />
            }
          />
        ) : isLoading && !data ? (
          <LoadingState
            label={bi("جارٍ التحميل…", "Loading…")}
            className="border-none bg-transparent"
          />
        ) : data?.length ? (
          <DataTable
            head={[
              bi("الموضوع", "Topic"),
              bi("النوع", "Type"),
              bi("المعلم", "Teacher"),
              bi("اليوم", "Day"),
              bi("التاريخ", "Date"),
              bi("الوقت", "Time"),
              bi("القاعة / المنصة", "Room / Platform"),
              bi("الحالة", "Status"),
              "",
            ]}
            rows={data.map((s) => {
              const href = joinHref(s);
              return [
                <TopicLink key="topic" item={s} />,
                deliveryTypeLabel(s.mode, bi),
                s.teacherName ?? "—",
                dayOfWeekLabel(s.day, bi),
                formatDate(s.date, lang),
                formatTime(s.startTime),
                locationLabel(s, bi),
                s.status,
                href ? (
                  <a
                    key="join"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                  >
                    {bi("انضمام", "Join")}
                  </a>
                ) : (
                  ""
                ),
              ];
            })}
          />
        ) : (
          <EmptyState
            icon="Calendar"
            text={
              hasFilters
                ? bi("لا توجد نتائج مطابقة للتصفية.", "No results match the filter.")
                : bi("لا يوجد جدول قادم حالياً.", "No upcoming schedule right now.")
            }
          />
        )}
      </Panel>
    </AppPage>
  );
}

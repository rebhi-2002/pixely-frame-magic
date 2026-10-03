import { useState } from "react";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  Plus,
  Video,
  Wallet,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBi } from "@/lib/bi";
import type { PublicSession } from "@/hooks/use-session";

/**
 * HeroMockup — "اللحظة البصرية" الوحيدة المتعمّدة بالرئيسية. إعادة بناء حقيقية
 * لواجهة لوحة الطالب بـHTML/CSS (لا صورة شاشة فعلية لعدم وجود تصميم نهائي بعد،
 * ولا رسم SVG زخرفي) — نفس التقنية التي تستخدمها منتجات حقيقية (Linear، Notion).
 * الأيقونات وظيفية لا زخرفية. بلا أي أرقام مختلقة: كل الصفوف أشرطة هيكلية.
 *
 * التفاعل: 3 تبويبات فعلية تبدّل محتوى اللوحة بالكامل، بإشارة بصرية إضافية
 * للتبويب النشط (شريط علوي بلونه)، وانتقال لطيف بين اللوحات (fade/slide)
 * بدل قفزة فجّة. كل تبويب يعكس سيناريو حقيقي من الـSRS:
 * - معلّقة: المعلّم يراجع الطلب الآن (مؤشر نبض حي)، والطالب يقدر يسحبه.
 * - مؤكَّدة: تمييز صريح أونلاين (رابط انضمام) من وجاهي (موقع) — FR-S06/S07،
 *   مع إلغاء/إعادة جدولة حقيقيين — FR-S14/S15.
 * - المحفظة: رصيد + إجراء شحن سريع حقيقي — FR-W01.
 */

type Tab = "pending" | "confirmed" | "wallet";

const tabs = [
  {
    key: "pending" as const,
    icon: Clock,
    tone: "text-primary",
    bar: "bg-primary",
    bgActive: "bg-primary text-primary-foreground",
    ar: "طلبات معلّقة",
    en: "Pending requests",
  },
  {
    key: "confirmed" as const,
    icon: CheckCircle2,
    tone: "text-success",
    bar: "bg-success",
    bgActive: "bg-success text-success-foreground",
    ar: "حجوزات مؤكّدة",
    en: "Confirmed bookings",
  },
  {
    key: "wallet" as const,
    icon: Wallet,
    tone: "text-info",
    bar: "bg-info",
    bgActive: "bg-info text-info-foreground",
    ar: "المحفظة",
    en: "Wallet",
  },
];

const confirmedRows = [
  { mode: "online" as const, w: "w-3/4" },
  { mode: "inperson" as const, w: "w-2/3" },
  { mode: "online" as const, w: "w-4/5" },
];

export function HeroMockup({ session }: { session?: PublicSession | null }) {
  const bi = useBi();
  const [tab, setTab] = useState<Tab>("pending");
  const [dismissed, setDismissed] = useState<number[]>([]);
  const [confirmedCancelled, setConfirmedCancelled] = useState<number[]>([]);
  const [rescheduling, setRescheduling] = useState<number | null>(null);
  const [topUpped, setTopUpped] = useState(false);
  const firstName = session?.fullName?.trim().split(/\s+/)[0];
  const displayName = firstName || bi("طالب", "Student");
  const initial = displayName.charAt(0).toUpperCase();
  const greeting = bi(`أهلاً ${displayName} 👋`, `Hi ${displayName} 👋`);

  return (
    <div className="relative mx-auto w-full max-w-lg select-none">
      <div className="rounded-3xl border-2 border-[var(--border-strong)] bg-card p-3 shadow-[8px_8px_0_0_var(--shadow-brutal-color)] sm:p-4">
        <div className="flex items-center gap-1.5 px-1 pb-3">
          <span className="size-2.5 rounded-full bg-destructive/70" />
          <span className="size-2.5 rounded-full bg-primary/70" />
          <span className="size-2.5 rounded-full bg-success/70" />
          <span className="ms-3 flex-1 truncate rounded-full border border-[var(--border-strong)]/40 bg-background px-3 py-1 text-[11px] text-muted-foreground">
            academia.app/dashboard
          </span>
        </div>

        <div className="space-y-4 rounded-2xl border-2 border-[var(--border-strong)] bg-background p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-full border-2 border-[var(--border-strong)] bg-primary/15 text-sm font-bold text-primary">
                {initial}
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">{greeting}</p>
                <p className="text-xs text-muted-foreground">
                  {bi("حصصك ومحفظتك بمكان واحد", "Your sessions and wallet in one place")}
                </p>
              </div>
            </div>
            {/* FR-S12: إشعارات الطالب (حالة الحجز، الدفع، تغييرات الجدول، التذكيرات)
                — التمثيل الوحيد لها بالموقع كله، فلازم اسم وصول حقيقي لا أيقونة صامتة. */}
            <span
              role="img"
              aria-label={bi(
                "إشعاراتك: تأكيد الحجز، الدفع، وتغييرات الجدول",
                "Your notifications: booking confirmations, payments, and schedule changes",
              )}
              title={bi(
                "إشعاراتك: تأكيد الحجز، الدفع، وتغييرات الجدول",
                "Your notifications: booking confirmations, payments, and schedule changes",
              )}
              className="flex size-9 items-center justify-center rounded-full border-2 border-[var(--border-strong)] bg-secondary text-muted-foreground"
            >
              <Bell className="size-4" />
            </span>
          </div>

          <div
            role="tablist"
            aria-label={bi("أقسام اللوحة", "Dashboard sections")}
            className="grid grid-cols-3 gap-2.5"
          >
            {tabs.map((t) => {
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "relative overflow-hidden rounded-xl border-2 border-[var(--border-strong)] p-3 text-center transition-colors",
                    active
                      ? t.bgActive
                      : "bg-secondary/40 text-muted-foreground hover:bg-secondary",
                  )}
                >
                  {/* لمسة بصرية مخصّصة: شريط علوي بلون التبويب يظهر فقط حين يكون
                      نشطًا — يميّز الحالة الفعّالة فعليًا لا بتغيير الخلفية وحدها. */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 top-0 h-1 transition-opacity",
                      active ? t.bar : "opacity-0",
                    )}
                  />
                  <t.icon className={cn("mx-auto size-4", active ? "" : t.tone)} />
                  <div
                    className={cn(
                      "mx-auto mt-2 h-2 w-7 rounded-full bg-current",
                      active ? "opacity-60" : "opacity-25",
                    )}
                  />
                  <p className="mt-1.5 text-[10px] font-semibold">{bi(t.ar, t.en)}</p>
                </button>
              );
            })}
          </div>

          {/* key={tab} يعيد تركيب اللوحة فيُشغّل انتقال الدخول في كل تبديل —
              حركة واحدة مقصودة هنا فقط، لا بكل الصفحة. */}
          <div
            key={tab}
            role="tabpanel"
            className="animate-in fade-in slide-in-from-bottom-1 space-y-2.5 duration-200"
          >
            {tab === "pending" && (
              <>
                <p className="text-xs font-bold text-foreground">
                  {bi("طلباتك المعلّقة", "Your pending requests")}
                </p>
                {[0, 1].map((i) =>
                  dismissed.includes(i) ? (
                    <p
                      key={i}
                      className="rounded-lg border border-dashed border-[var(--border-strong)]/50 py-2.5 text-center text-[11px] text-muted-foreground"
                    >
                      {bi("تم سحب الطلب", "Request withdrawn")}
                    </p>
                  ) : (
                    <div
                      key={i}
                      className="rounded-lg border-2 border-[var(--border-strong)] bg-primary/5 p-2.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                          <Clock className="size-4" />
                        </span>
                        <div className="flex-1 space-y-1.5">
                          <div
                            className={cn(
                              "h-2 rounded-full bg-secondary",
                              i === 0 ? "w-3/4" : "w-3/5",
                            )}
                          />
                          <div className="h-2 w-1/3 rounded-full bg-secondary/70" />
                        </div>
                        <button
                          type="button"
                          aria-label={bi("سحب الطلب", "Withdraw request")}
                          onClick={() => setDismissed((d) => [...d, i])}
                          className="flex size-6 shrink-0 items-center justify-center rounded-md border border-[var(--border-strong)]/50 text-muted-foreground hover:text-destructive"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                      {i === 0 && (
                        <p className="mt-2 inline-flex items-center gap-1.5 ps-10 text-[10px] font-semibold text-primary">
                          <span className="relative flex size-1.5">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                          </span>
                          {bi("المعلّم يراجع طلبك الآن", "The teacher is reviewing your request")}
                        </p>
                      )}
                    </div>
                  ),
                )}
              </>
            )}

            {tab === "confirmed" && (
              <>
                <p className="text-xs font-bold text-foreground">
                  {bi("الجدول القادم", "Upcoming schedule")}
                </p>
                {confirmedRows.map((r, i) =>
                  confirmedCancelled.includes(i) ? (
                    <p
                      key={i}
                      className="rounded-lg border border-dashed border-[var(--border-strong)]/50 py-2.5 text-center text-[11px] text-muted-foreground"
                    >
                      {bi("تم إلغاء الحجز", "Booking cancelled")}
                    </p>
                  ) : (
                    <div
                      key={i}
                      className="rounded-lg border-2 border-[var(--border-strong)] bg-success/5 p-2.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-success/15 text-success">
                          {r.mode === "online" ? (
                            <Video className="size-4" />
                          ) : (
                            <MapPin className="size-4" />
                          )}
                        </span>
                        <div className="flex-1 space-y-1.5">
                          <div className={cn("h-2 rounded-full bg-secondary", r.w)} />
                          <div className="h-2 w-1/3 rounded-full bg-secondary/70" />
                        </div>
                        {/* FR-S06/FR-S07: تمييز صريح أونلاين (رابط انضمام) من
                            وجاهي (موقع) — لا أيقونة فقط بلا فعل حقيقي. */}
                        <span className="shrink-0 rounded-md bg-success/15 px-2 py-1 text-[9px] font-bold text-success">
                          {r.mode === "online" ? bi("انضمام", "Join") : bi("الموقع", "Location")}
                        </span>
                      </div>
                      {/* FR-S14/FR-S15: الطالب يلغي الحجز أو يطلب إعادة جدولة. */}
                      <div className="mt-2 flex gap-1.5 ps-10">
                        <button
                          type="button"
                          onClick={() => setRescheduling(i)}
                          className="rounded-md border border-[var(--border-strong)]/50 px-2 py-1 text-[9px] font-bold text-foreground hover:bg-secondary"
                        >
                          {bi("إعادة جدولة", "Reschedule")}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmedCancelled((d) => [...d, i])}
                          className="rounded-md border border-[var(--border-strong)]/50 px-2 py-1 text-[9px] font-bold text-destructive hover:bg-destructive/10"
                        >
                          {bi("إلغاء", "Cancel")}
                        </button>
                      </div>
                      {rescheduling === i && (
                        <p className="mt-2 ms-10 rounded-md bg-primary/10 px-2 py-1.5 text-[10px] font-semibold text-primary">
                          {bi(
                            "أُرسل طلب إعادة الجدولة للمعلّم ✓",
                            "Reschedule request sent to the teacher ✓",
                          )}
                        </p>
                      )}
                    </div>
                  ),
                )}
              </>
            )}

            {tab === "wallet" && (
              <>
                <div className="flex items-center justify-between rounded-lg border-2 border-[var(--border-strong)] bg-info/5 p-3">
                  <div>
                    <span className="text-xs font-bold text-foreground">
                      {bi("رصيدك الحالي", "Your balance")}
                    </span>
                    <div className="mt-1.5 h-3 w-16 rounded-full bg-info/30" />
                  </div>
                  {/* FR-W01: شحن المحفظة بتحويل وإيصال — إجراء حقيقي لا زخرفة. */}
                  <button
                    type="button"
                    onClick={() => setTopUpped(true)}
                    className="flex items-center gap-1 rounded-lg border-2 border-[var(--border-strong)] bg-background px-2.5 py-1.5 text-[10px] font-bold text-info hover:bg-info/10"
                  >
                    <Plus className="size-3" />
                    {bi("شحن", "Top up")}
                  </button>
                </div>
                {topUpped && (
                  <p className="rounded-md bg-success/10 px-2.5 py-1.5 text-[10px] font-semibold text-success">
                    {bi(
                      "أُرسل طلب الشحن، بانتظار مراجعة الإدارة ✓",
                      "Top-up request sent, awaiting admin review ✓",
                    )}
                  </p>
                )}

                <p className="text-xs font-bold text-foreground">
                  {bi("آخر المعاملات", "Recent transactions")}
                </p>
                {[0, 1].map((i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border-2 border-[var(--border-strong)] bg-secondary text-muted-foreground">
                      <Wallet className="size-4" />
                    </span>
                    <div className="flex-1 space-y-1.5">
                      <div
                        className={cn("h-2 rounded-full bg-secondary", i === 0 ? "w-2/3" : "w-1/2")}
                      />
                    </div>
                    <div className="h-2 w-10 rounded-full bg-secondary/70" />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="absolute -end-4 -top-5 flex items-center gap-2 rounded-2xl border-2 border-[var(--border-strong)] bg-card px-3.5 py-2.5 shadow-[4px_4px_0_0_var(--shadow-brutal-color)] sm:-end-8">
        <span className="flex size-7 items-center justify-center rounded-full border border-[var(--border-strong)]/40 bg-success/15 text-success">
          <Video className="size-3.5" />
        </span>
        <p className="text-[11px] font-bold text-foreground">
          {bi("رابط الاجتماع للحصص الأونلاين", "Meeting link for online sessions")}
        </p>
      </div>

      <div className="absolute -bottom-5 -start-4 flex items-center gap-2 rounded-2xl border-2 border-[var(--border-strong)] bg-card px-3.5 py-2.5 shadow-[4px_4px_0_0_var(--shadow-brutal-color)] sm:-start-8">
        <span className="flex size-7 items-center justify-center rounded-full border border-[var(--border-strong)]/40 bg-primary/15 text-primary">
          <Wallet className="size-3.5" />
        </span>
        <p className="text-[11px] font-bold text-foreground">
          {bi("محفظة بسجل معاملات واضح", "Wallet with a clear history")}
        </p>
      </div>
    </div>
  );
}

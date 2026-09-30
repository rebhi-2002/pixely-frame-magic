import { useState } from "react";
import { Bell, CalendarDays, CheckCircle2, Clock, Video, Wallet, X } from "lucide-react";
import { cn } from "@/lib/utils";import { useBi } from "@/lib/bi";
import type { PublicSession } from "@/hooks/use-session";

/**
 * HeroMockup — "اللحظة البصرية" الوحيدة المتعمّدة بالرئيسية. إعادة بناء حقيقية
 * لواجهة لوحة الطالب بـHTML/CSS (لا صورة شاشة فعلية لعدم وجود تصميم نهائي بعد،
 * ولا رسم SVG زخرفي) — نفس التقنية التي تستخدمها منتجات حقيقية (Linear، Notion).
 * الأيقونات وظيفية لا زخرفية. بلا أي أرقام مختلقة: كل الصفوف أشرطة هيكلية.
 *
 * التفاعل: الثلاث بطاقات فوق تبويبات حقيقية — كل واحدة تبدّل محتوى اللوحة
 * كاملةً (لا زر واحد منعزل)، فتعكس فعليًا الفرق بين ثلاث شاشات حقيقية
 * بالمنصة (الطلبات، الجدول، المحفظة) لا حالة تفاعل شكلية واحدة.
 */

type Tab = "pending" | "confirmed" | "wallet";

const tabs = [
  { key: "pending" as const, icon: Clock, tone: "text-primary", bgActive: "bg-primary text-primary-foreground", ar: "طلبات معلّقة", en: "Pending requests" },
  { key: "confirmed" as const, icon: CheckCircle2, tone: "text-success", bgActive: "bg-success text-success-foreground", ar: "حجوزات مؤكّدة", en: "Confirmed bookings" },
  { key: "wallet" as const, icon: Wallet, tone: "text-info", bgActive: "bg-info text-info-foreground", ar: "المحفظة", en: "Wallet" },
];

export function HeroMockup({ session }: { session?: PublicSession | null }) {
  const bi = useBi();
  const [tab, setTab] = useState<Tab>("pending");
  const [dismissed, setDismissed] = useState<number[]>([]);
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
                  {bi("دروسك ومحفظتك بمكان واحد", "Your lessons and wallet in one place")}
                </p>
              </div>
            </div>
            <span className="flex size-9 items-center justify-center rounded-full border-2 border-[var(--border-strong)] bg-secondary text-muted-foreground">
              <Bell className="size-4" />
            </span>
          </div>

        <div role="tablist" aria-label={bi("أقسام اللوحة", "Dashboard sections")} className="grid grid-cols-3 gap-2.5">
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
                  "rounded-xl border-2 border-[var(--border-strong)] p-3 text-center transition-colors",
                  active ? t.bgActive : "bg-secondary/40 text-muted-foreground hover:bg-secondary",
                )}
              >
                <t.icon className={cn("mx-auto size-4", active ? "" : t.tone)} />
                <div className={cn("mx-auto mt-2 h-2 w-7 rounded-full bg-current", active ? "opacity-60" : "opacity-25")} />
                <p className="mt-1.5 text-[10px] font-semibold">{bi(t.ar, t.en)}</p>
              </button>
            );
          })}
        </div>

          <div role="tabpanel" className="space-y-2.5">
            {tab === "pending" && (
              <>
                <p className="text-xs font-bold text-foreground">
                  {bi("طلباتك المعلّقة", "Your pending requests")}
                </p>
                {[0, 1].map((i) =>
                  dismissed.includes(i) ? (
                    <p key={i} className="rounded-lg border border-dashed border-[var(--border-strong)]/50 py-2.5 text-center text-[11px] text-muted-foreground">
                      {bi("تم سحب الطلب", "Request withdrawn")}
                    </p>
                  ) : (
                    <div key={i} className="flex items-center gap-2.5 rounded-lg border-2 border-[var(--border-strong)] bg-primary/5 p-2.5">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                        <Clock className="size-4" />
                      </span>
                      <div className="flex-1 space-y-1.5">
                        <div className={cn("h-2 rounded-full bg-secondary", i === 0 ? "w-3/4" : "w-3/5")} />
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
                  ),
                )}
              </>
            )}

            {tab === "confirmed" && (
              <>
                <p className="text-xs font-bold text-foreground">
                  {bi("الجدول القادم", "Upcoming schedule")}
                </p>
                {[
                  { icon: Video, w: "w-3/4" },
                  { icon: CalendarDays, w: "w-2/3" },
                  { icon: Video, w: "w-4/5" },
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-2.5 rounded-lg border-2 border-[var(--border-strong)] bg-success/5 p-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-success/15 text-success">
                      <r.icon className="size-4" />
                    </span>
                    <div className="flex-1 space-y-1.5">
                      <div className={cn("h-2 rounded-full bg-secondary", r.w)} />
                      <div className="h-2 w-1/3 rounded-full bg-secondary/70" />
                    </div>
                  </div>
                ))}
              </>
            )}

            {tab === "wallet" && (
              <>
                <div className="flex items-center justify-between rounded-lg border-2 border-[var(--border-strong)] bg-info/5 p-3">
                  <span className="text-xs font-bold text-foreground">{bi("رصيدك الحالي", "Your balance")}</span>
                  <div className="h-3 w-16 rounded-full bg-info/30" />
                </div>
            
                <p className="text-xs font-bold text-foreground">{bi("آخر المعاملات", "Recent transactions")}</p>
                {[0, 1].map((i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border-2 border-[var(--border-strong)] bg-secondary text-muted-foreground">
                      <Wallet className="size-4" />
                    </span>
                    <div className="flex-1 space-y-1.5">
                      <div className={cn("h-2 rounded-full bg-secondary", i === 0 ? "w-2/3" : "w-1/2")} />
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
          {bi("رابط الاجتماع للدروس الأونلاين", "Meeting link for online lessons")}
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

import { useState } from "react";
import { Bell, CalendarDays, CheckCircle2, Clock, Video, Wallet } from "lucide-react";
import { useBi } from "@/lib/bi";
import type { PublicSession } from "@/hooks/use-session";

/**
 * HeroMockup — "اللحظة البصرية" الوحيدة المتعمّدة بالرئيسية. إعادة بناء حقيقية
 * لواجهة لوحة الطالب بـHTML/CSS (لا صورة شاشة فعلية لعدم وجود تصميم نهائي بعد،
 * ولا رسم SVG زخرفي) — نفس التقنية التي تستخدمها منتجات حقيقية (Linear، Notion)
 * لعرض واجهاتها بجودة عالية وقابلة للتفاعل. الأيقونات وظيفية (تسمّي كل بطاقة)
 * لا زخرفية. بلا أي أرقام أو بيانات مختلقة: البطاقات بعناوينها فقط، والصفوف
 * أشرطة هيكلية (skeleton). تبديل حالة الطلب المعلّق ↔ المؤكَّد تفاعل حقيقي
 * بسيط يعكس تدفّق المنصة الفعلي، لا حركة زخرفية.
 */
const tiles = [
  { icon: Clock, tone: "bg-primary/10 text-primary", ar: "طلبات معلّقة", en: "Pending requests" },
  {
    icon: CheckCircle2,
    tone: "bg-success/10 text-success",
    ar: "حجوزات مؤكّدة",
    en: "Confirmed bookings",
  },
  { icon: Wallet, tone: "bg-info/10 text-info", ar: "رصيد المحفظة", en: "Wallet balance" },
] as const;

const lessonRows = [
  { icon: Video, w: "w-3/4" },
  { icon: CalendarDays, w: "w-2/3" },
  { icon: Video, w: "w-4/5" },
] as const;

export function HeroMockup({ session }: { session?: PublicSession | null }) {
  const bi = useBi();
  const [confirmed, setConfirmed] = useState(false);
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

          <div className="grid grid-cols-3 gap-2.5">
            {tiles.map((t, i) => (
              <div
                key={t.en}
                className={`rounded-xl border-2 border-[var(--border-strong)] p-3 text-center ${t.tone}`}
              >
                <t.icon className="mx-auto size-4" />
                <div className="mx-auto mt-2 h-2 w-7 rounded-full bg-current opacity-30" />
                <p className="mt-1.5 text-[10px] font-semibold text-muted-foreground">
                  {bi(t.ar, t.en)}
                </p>
                {i === 0 && (
                  <button
                    type="button"
                    onClick={() => setConfirmed((v) => !v)}
                    className="mt-2 w-full rounded-md border border-[var(--border-strong)]/50 py-1 text-[9px] font-bold text-primary hover:bg-primary/10"
                  >
                    {confirmed ? bi("رجوع", "Undo") : bi("تأكيد تجريبي", "Try confirming")}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2.5">
            <p className="text-xs font-bold text-foreground">
              {bi("الجدول القادم", "Upcoming schedule")}
            </p>
            {lessonRows.map((r, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-lg border-2 border-[var(--border-strong)] bg-secondary text-muted-foreground">
                  <r.icon className="size-4" />
                </span>
                <div className="flex-1 space-y-1.5">
                  <div
                    className={`h-2 rounded-full bg-secondary transition-all ${
                      confirmed && i === 0 ? "w-full bg-success/40" : r.w
                    }`}
                  />
                  <div className="h-2 w-1/3 rounded-full bg-secondary/70" />
                </div>
              </div>
            ))}
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

import { Bell, CalendarDays, CheckCircle2, Clock, Video, Wallet } from "lucide-react";
import { useBi } from "@/lib/bi";
import type { PublicSession } from "@/hooks/use-session";

/**
 * HeroMockup — معاينة بصرية لشكل لوحة الطالب الحقيقية (بطاقات الكورسات والحجوزات
 * والمحفظة والجدول القادم)، مبنية من عناصر الواجهة. بلا أي أرقام مختلقة: البطاقات
 * بعناوينها فقط والصفوف أشرطة هيكلية (skeleton)، حتى ما نوهم الزائر ببيانات أو
 * مزايا غير موجودة. الاسم الأول شخصي (من الجلسة الحقيقية) بعد تسجيل الدخول.
 */
const tiles = [
  { icon: Clock, tone: "bg-primary/10 text-primary", ar: "طلبات معلّقة", en: "Pending requests" },
  { icon: CheckCircle2, tone: "bg-success/10 text-success", ar: "حجوزات مؤكّدة", en: "Confirmed bookings" },
  { icon: Wallet, tone: "bg-info/10 text-info", ar: "رصيد المحفظة", en: "Wallet balance" },
] as const;

const lessonRows = [
  { icon: Video, w: "w-3/4" },
  { icon: CalendarDays, w: "w-2/3" },
  { icon: Video, w: "w-4/5" },
] as const;

export function HeroMockup({ session }: { session?: PublicSession | null }) {
  const bi = useBi();
  const firstName = session?.fullName?.trim().split(/\s+/)[0];
  const displayName = firstName || bi("طالب", "Student");
  const initial = displayName.charAt(0).toUpperCase();
  const greeting = bi(`أهلاً ${displayName} 👋`, `Hi ${displayName} 👋`);

  return (
    <div aria-hidden className="visual-orbit relative hidden min-h-[520px] select-none lg:block">
      <div className="glass-surface soft-glow shadow-elevation-3 relative mx-auto mt-12 w-full max-w-md rounded-3xl border border-white/10 p-4 [transform:perspective(1400px)_rotateY(-8deg)_rotateX(3deg)] transition-transform duration-700 hover:[transform:perspective(1400px)_rotateY(-3deg)_rotateX(1deg)]">
        <div className="flex items-center gap-1.5 px-1 pb-3">
          <span className="size-2.5 rounded-full bg-destructive/60" />
          <span className="size-2.5 rounded-full bg-primary/60" />
          <span className="size-2.5 rounded-full bg-success/60" />
          <span className="ms-3 flex-1 truncate rounded-full bg-background/70 px-3 py-1 text-[11px] text-muted-foreground">
            academia.app/dashboard
          </span>
          <span className="shrink-0 rounded-full bg-primary/12 px-2 py-1 text-[9px] font-bold text-primary">
            {bi("معاينة", "Preview")}
          </span>
        </div>

        <div className="shadow-elevation-1 space-y-4 rounded-2xl bg-background p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                {initial}
              </span>
              <div>
                <p className="text-xs font-bold text-foreground">{greeting}</p>
                <p className="text-[10px] text-muted-foreground">
                  {bi("دروسك ومحفظتك بمكان واحد", "Your lessons and wallet in one place")}
                </p>
              </div>
            </div>
            <span className="flex size-8 items-center justify-center rounded-full bg-secondary text-muted-foreground">
              <Bell className="size-4" />
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {tiles.map((t) => (
              <div key={t.en} className={`rounded-xl p-2.5 text-center ${t.tone}`}>
                <t.icon className="mx-auto size-3.5" />
                <div className="mx-auto mt-2 h-2 w-6 rounded-full bg-current opacity-25" />
                <p className="mt-1.5 text-[9px] text-muted-foreground">{bi(t.ar, t.en)}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2.5">
            <p className="text-[10px] font-bold text-foreground">
              {bi("الجدول القادم", "Upcoming schedule")}
            </p>
            {lessonRows.map((r, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="flex size-7 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                  <r.icon className="size-3.5" />
                </span>
                <div className="flex-1 space-y-1.5">
                  <div className={`h-1.5 rounded-full bg-secondary ${r.w}`} />
                  <div className="h-1.5 w-1/3 rounded-full bg-secondary/70" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-surface shadow-elevation-2 animate-float absolute -end-6 -top-6 flex items-center gap-2 rounded-2xl px-3.5 py-2.5">
        <span className="flex size-7 items-center justify-center rounded-full bg-success/15 text-success">
          <Video className="size-3.5" />
        </span>
        <p className="text-[11px] font-bold text-foreground">
          {bi("رابط الاجتماع للدروس الأونلاين", "Meeting link for online lessons")}
        </p>
      </div>

      <div
        className="glass-surface shadow-elevation-2 animate-float absolute -bottom-5 -start-8 flex items-center gap-2 rounded-2xl px-3.5 py-2.5"
        style={{ animationDelay: "1.2s" }}
      >
        <span className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Wallet className="size-3.5" />
        </span>
        <p className="text-[11px] font-bold text-foreground">
          {bi("محفظة بسجل معاملات واضح", "Wallet with a clear history")}
        </p>
      </div>
    </div>
  );
}

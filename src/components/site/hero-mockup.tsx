import { Bell, CheckCircle2, Flame, TrendingUp } from "lucide-react";
import { useBi } from "@/lib/bi";

const subjects = [
  { icon: "📐", pct: 78, tone: "bg-primary" },
  { icon: "🧪", pct: 54, tone: "bg-info" },
  { icon: "📖", pct: 92, tone: "bg-success" },
] as const;

/** ارتفاعات ثابتة (px) لأعمدة النشاط الأسبوعي — تصميمية بحتة، لا تمثّل بيانات حقيقية */
const weekBars = [22, 34, 18, 40, 28, 46, 32];

/**
 * HeroMockup — معاينة بصرية حقيقية للوحة تحكم الطالب، مبنية بالكامل من عناصر
 * الواجهة (لا صورة/سكرين‌شوت). تُستخدم في الـ Hero لإعطاء إحساس "منتج حقيقي"
 * بدل نص فاضٍ. زخرفية بالكامل (aria-hidden) ولا تعرض بيانات مستخدم فعلية.
 */
export function HeroMockup() {
  const bi = useBi();

  return (
    <div aria-hidden className="relative hidden select-none lg:block">
      {/* البطاقة الرئيسية — إطار متصفح مصغّر بميلان خفيف لإحساس العمق */}
      <div className="glass-surface shadow-elevation-3 relative mx-auto w-full max-w-md rounded-3xl p-4 [transform:perspective(1400px)_rotateY(-8deg)_rotateX(3deg)] transition-transform duration-700 hover:[transform:perspective(1400px)_rotateY(-3deg)_rotateX(1deg)]">
        {/* شريط المتصفح */}
        <div className="flex items-center gap-1.5 px-1 pb-3">
          <span className="size-2.5 rounded-full bg-destructive/60" />
          <span className="size-2.5 rounded-full bg-primary/60" />
          <span className="size-2.5 rounded-full bg-success/60" />
          <span className="ms-3 flex-1 truncate rounded-full bg-background/70 px-3 py-1 text-[11px] text-muted-foreground">
            academia.app/dashboard
          </span>
        </div>

        {/* محتوى اللوحة */}
        <div className="shadow-elevation-1 space-y-4 rounded-2xl bg-background p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                {bi("سا", "S")}
              </span>
              <div>
                <p className="text-xs font-bold text-foreground">
                  {bi("أهلاً سارة 👋", "Hi Sarah 👋")}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {bi("جاهزة لمتابعة إنجازك اليوم", "Ready to keep your streak going")}
                </p>
              </div>
            </div>
            <span className="flex size-8 items-center justify-center rounded-full bg-secondary text-muted-foreground">
              <Bell className="size-4" />
            </span>
          </div>

          {/* صف الإحصائيات المصغّرة */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-primary/10 p-2.5 text-center">
              <Flame className="mx-auto size-3.5 text-primary" />
              <p className="mt-1 font-display text-sm font-bold text-foreground">12</p>
              <p className="text-[9px] text-muted-foreground">{bi("يوم متتالي", "day streak")}</p>
            </div>
            <div className="rounded-xl bg-success/10 p-2.5 text-center">
              <TrendingUp className="mx-auto size-3.5 text-success" />
              <p className="mt-1 font-display text-sm font-bold text-foreground">86%</p>
              <p className="text-[9px] text-muted-foreground">{bi("نسبة الإنجاز", "completion")}</p>
            </div>
            <div className="rounded-xl bg-info/10 p-2.5 text-center">
              <CheckCircle2 className="mx-auto size-3.5 text-info" />
              <p className="mt-1 font-display text-sm font-bold text-foreground">24</p>
              <p className="text-[9px] text-muted-foreground">{bi("درس مكتمل", "lessons done")}</p>
            </div>
          </div>

          {/* تقدّم المواد */}
          <div className="space-y-2.5">
            {subjects.map((s) => (
              <div key={s.icon} className="flex items-center gap-2.5">
                <span className="text-sm">{s.icon}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div className={`h-full rounded-full ${s.tone}`} style={{ width: `${s.pct}%` }} />
                </div>
                <span className="w-8 text-end text-[10px] font-bold text-muted-foreground">
                  {s.pct}%
                </span>
              </div>
            ))}
          </div>

          {/* نشاط الأسبوع — أعمدة CSS بحتة */}
          <div className="flex h-14 items-end justify-between gap-1.5 border-t border-border pt-3">
            {weekBars.map((h, i) => (
              <div
                key={i}
                className={`w-full rounded-t-sm ${i === 5 ? "bg-primary" : "bg-secondary"}`}
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* بطاقات عائمة — إحساس حيوية إضافي حول الإطار الرئيسي */}
      <div className="glass-surface shadow-elevation-2 animate-float absolute -end-6 -top-6 flex items-center gap-2 rounded-2xl px-3.5 py-2.5">
        <span className="flex size-7 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="size-3.5" />
        </span>
        <p className="text-[11px] font-bold text-foreground">
          {bi("أنجزت 12 درس هالأسبوع", "12 lessons done this week")}
        </p>
      </div>

      <div
        className="glass-surface shadow-elevation-2 animate-float absolute -bottom-5 -start-8 flex items-center gap-2 rounded-2xl px-3.5 py-2.5"
        style={{ animationDelay: "1.2s" }}
      >
        <span className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Flame className="size-3.5" />
        </span>
        <p className="text-[11px] font-bold text-foreground">
          {bi("سلسلة 12 يوم 🔥", "12-day streak 🔥")}
        </p>
      </div>
    </div>
  );
}

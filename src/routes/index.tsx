import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpenCheck,
  MessagesSquare,
  LineChart,
  Timer,
  Trophy,
  Bot,
  XCircle,
  Users,
} from "lucide-react";
import { PublicLayout } from "@/components/site/public-layout";

const title = "أكاديميا | منصة الطالب للتنظيم والإنجاز";
const description =
  "أكاديميا: مكتبة ذكية مرتبة، مجتمعات مواد، متابعة إنجاز، بنك أخطاء ومحاكي امتحان وزاري — كل دراستك بمكان واحد.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: BookOpenCheck,
    title: "المكتبة الذكية",
    text: "تصنيف شجري صارم: فصل ← مادة ← وحدة ← درس. بحث متقدم وحفظ للمفضلة.",
  },
  {
    icon: MessagesSquare,
    title: "مجتمعات المواد",
    text: "قناة لكل مادة، سؤال وجواب مع تثبيت الإجابة الصحيحة، وساعات هدوء ليلاً.",
  },
  {
    icon: LineChart,
    title: "متابعة الإنجاز",
    text: "عدّاد إنجاز لكل مادة، جدول دراسي تفاعلي، وكويز قصير بعد كل درس.",
  },
  {
    icon: Bot,
    title: "محاكي الامتحان الوزاري",
    text: "امتحان بنفس النمط والتوقيت، تصحيح فوري وتحليل نقاط الضعف حسب الوحدة.",
  },
  {
    icon: XCircle,
    title: "بنك أخطائي",
    text: "كل سؤال تخطئ فيه يُحفظ تلقائياً لتراجعه دورياً حتى تتقنه.",
  },
  {
    icon: Timer,
    title: "مراجعة الـ15 دقيقة",
    text: "فلاش كاردز ذكية تُقترح حسب أضعف نقطة عندك قبل النوم أو قبل الامتحان.",
  },
];

const stats = [
  { value: "٤", label: "مستويات تصنيف للمحتوى" },
  { value: "١٠٠٪", label: "عربي وواجهة RTL" },
  { value: "٣", label: "مساحات: طالب، معلم، ولي أمر" },
];

function Landing() {
  return (
    <PublicLayout>
      <section className="surface-grid border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-semibold text-primary">
            <Trophy className="size-4" />
            للطلاب من ١٦ إلى ١٨ سنة
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.25] text-foreground sm:text-5xl md:text-6xl">
            ملفاتك ضايعة بالواتساب؟ <span className="text-primary">أكاديميا</span> ترتّبها وتخلّيك
            تنجز.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            مكان واحد لكل موادك: مكتبة مرتّبة، أسئلة تتجاوب عليها، جدول يذكّرك، وامتحانات تدريب
            تكشف نقاط ضعفك قبل الامتحان الحقيقي.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/auth"
              className="glow-primary inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              ابدأ مجاناً الآن
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
            >
              شوف كيف بتشتغل
            </Link>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
                <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-3xl font-bold text-foreground">كل شي بتحتاجه بمكان واحد</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          مش أرشيف ملفات — أدوات فعلية تساعدك تنجز وتتقن، مبنية على طريقة دراستك الحقيقية.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 md:grid-cols-3">
          {[
            { icon: Users, t: "طالب", d: "لوحة تحكم بمهام اليوم، إنجازك، وشاراتك." },
            { icon: BookOpenCheck, t: "معلّم", d: "ارفع محتواك، جهّز كويزات، وتابع أداء شُعبك." },
            { icon: LineChart, t: "ولي أمر", d: "تقرير أسبوعي مختصر عن الانتظام والإنجاز." },
          ].map((r) => (
            <div key={r.t} className="rounded-2xl border border-border bg-background p-6">
              <r.icon className="size-6 text-success" />
              <h3 className="mt-3 font-bold text-foreground">{r.t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{r.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 text-center">
        <h2 className="text-3xl font-bold text-foreground">جاهز تبلّش؟</h2>
        <p className="mt-3 text-muted-foreground">
          سجّل بدقيقة، اختار موادك، وحدّد أول هدف أسبوعي — والباقي علينا.
        </p>
        <Link
          to="/auth"
          className="glow-primary mt-7 inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          إنشاء حساب مجاني
        </Link>
      </section>
    </PublicLayout>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/site/public-layout";

const title = "كيف تعمل أكاديميا؟ | خطوات البداية";
const description =
  "أربع خطوات فقط: سجّل واختر دورك، حدّد نظامك وصفك وموادك، ابدأ من المكتبة المرتّبة، وتابع إنجازك أسبوعياً.";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  {
    n: "١",
    t: "اختر دورك",
    d: "طالب، معلّم، أو ولي أمر — كل دور يفتح مساحة مختلفة كلياً بصلاحياتها الخاصة.",
  },
  {
    n: "٢",
    t: "النظام والصف",
    d: "فلسطيني أو أردني، الفرع (علمي/أدبي)، والصف — عشان يتخصّص لك المحتوى الصح.",
  },
  {
    n: "٣",
    t: "اختر موادك",
    d: "حدّد المواد اللي بتتابعها، وتنبني لوحة تحكمك ومكتبتك على أساسها مباشرة.",
  },
  {
    n: "٤",
    t: "أول هدف أسبوعي",
    d: "هدف بسيط يشغّل عدّاد الإنجاز من أول لحظة، وتبدأ سلسلة الأيام (Streak).",
  },
];

function HowItWorks() {
  return (
    <PublicLayout>
      <section className="surface-grid border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center">
          <h1 className="text-4xl font-bold text-foreground">كيف بتشتغل أكاديميا؟</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            من أول تسجيل دخول، أربع خطوات سريعة (وبتقدر تتخطاها بأي وقت) وبتصير جاهز.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <ol className="space-y-4">
          {steps.map((s) => (
            <li key={s.n} className="flex gap-5 rounded-2xl border border-border bg-card p-6">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/12 font-display text-xl font-bold text-primary">
                {s.n}
              </span>
              <div>
                <h2 className="text-lg font-bold text-foreground">{s.t}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-2xl border border-border bg-card/50 p-7">
          <h2 className="text-xl font-bold text-foreground">وبعدين؟</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>• كل درس تخلّصه بتضغط «تم الفهم» وبتحل كويز قصير.</li>
            <li>• كل غلطة بتنحفظ ببنك أخطائك لتراجعها لاحقاً.</li>
            <li>• قبل الامتحان، محاكي الامتحان الوزاري بيقيسك بنفس التوقيت الحقيقي.</li>
            <li>• ولي أمرك بيوصله تقرير أسبوعي مختصر بدون ما ينبش بخصوصيتك اليومية.</li>
          </ul>
          <Link
            to="/auth"
            className="mt-7 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            جرّبها الآن
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}

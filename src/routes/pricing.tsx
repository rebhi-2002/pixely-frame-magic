import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { PublicLayout } from "@/components/site/public-layout";

const title = "الأسعار | أكاديميا مجاناً أو بريميوم";
const description =
  "ابدأ مجاناً بالمكتبة والمجتمعات ومتابعة الإنجاز، أو اشترك ببريميوم لمحاكي الامتحان الوزاري وبنك الأخطاء والتقارير.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Pricing,
});

const plans = [
  {
    name: "المجاني",
    price: "٠",
    note: "للأبد",
    features: [
      "المكتبة الذكية وتصفح كل المواد",
      "حفظ الدروس بالمفضلة",
      "مجتمعات المواد وسؤال وجواب",
      "الجدول الدراسي التفاعلي",
      "عدّاد إنجاز أساسي",
    ],
    cta: "ابدأ مجاناً",
    highlight: false,
  },
  {
    name: "بريميوم",
    price: "٢٩",
    note: "شهرياً",
    features: [
      "كل مزايا الخطة المجانية",
      "محاكي الامتحان الوزاري بالذكاء الاصطناعي",
      "بنك أخطائي الخاصة + التكرار المتباعد",
      "مراجعة الـ١٥ دقيقة (فلاش كاردز ذكية)",
      "تقرير أسبوعي لولي الأمر",
      "شهادات رقمية عند إتمام مادة",
    ],
    cta: "اشترك ببريميوم",
    highlight: true,
  },
];

function Pricing() {
  return (
    <PublicLayout>
      <section className="surface-grid border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center">
          <h1 className="text-4xl font-bold text-foreground">خطط بسيطة، بدون تعقيد</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            ابدأ مجاناً بالكامل. ارفع لبريميوم وقت ما تحس إنك بحاجة لأدوات التحضير للامتحان.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-4xl gap-5 px-5 py-16 md:grid-cols-2">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`flex flex-col rounded-2xl border p-7 ${
              p.highlight
                ? "glow-primary border-primary/50 bg-card"
                : "border-border bg-card/60"
            }`}
          >
            {p.highlight && (
              <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">
                <Sparkles className="size-3.5" />
                الأكثر اختياراً
              </span>
            )}
            <h2 className="text-xl font-bold text-foreground">{p.name}</h2>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold text-foreground">{p.price}</span>
              <span className="text-sm text-muted-foreground">شيكل / {p.note}</span>
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/auth"
              className={`mt-7 inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90 ${
                p.highlight
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background text-foreground"
              }`}
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </section>
    </PublicLayout>
  );
}

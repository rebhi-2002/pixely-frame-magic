import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Coins, LineChart, Upload } from "lucide-react";
import { PublicLayout } from "@/components/site/public-layout";

const title = "للمعلمين | انشر محتواك واربح مع أكاديميا";
const description =
  "ارفع محتواك التعليمي، جهّز بنوك أسئلة، تابع أداء طلابك بتحليلات دقيقة، واحصل على دخل من اشتراكات المنصة.";

export const Route = createFileRoute("/for-teachers")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ForTeachers,
});

const benefits = [
  {
    icon: Upload,
    t: "محتواك مرتّب ومحفوظ",
    d: "ارفع ملفاتك وفيديوهاتك مرة وحدة، وتنصنّف تلقائياً حسب الفصل والمادة والوحدة والدرس.",
  },
  {
    icon: LineChart,
    t: "تحليلات لكل طالب وشعبة",
    d: "شوف مين فهم ومين متعثّر، وأي وحدة بالضبط بتشكّل نقطة ضعف عند شعبتك.",
  },
  {
    icon: Coins,
    t: "دخل من عملك",
    d: "عمولة على اشتراكات الطلاب المرتبطين فيك، مع لوحة واضحة للمدفوعات.",
  },
  {
    icon: BadgeCheck,
    t: "حساب موثّق",
    d: "توثيق الحساب برفع بطاقة/شهادة، وبعد الموافقة بيظهر توثيقك جنب اسمك.",
  },
];

function ForTeachers() {
  return (
    <PublicLayout>
      <section className="surface-grid border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            علّم أكتر، صحّح أقل، ووصل لطلاب أكتر.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            أكاديميا بتعطيك مكان منظّم لمحتواك، تصحيح آلي للكويزات، وتحليلات تخليك تعرف بالضبط وين
            تركّز جهدك.
          </p>
          <Link
            to="/auth"
            className="glow-primary mt-8 inline-flex rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            سجّل كمعلّم
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-4 px-5 py-16 md:grid-cols-2">
        {benefits.map((b) => (
          <article key={b.t} className="rounded-2xl border border-border bg-card p-6">
            <span className="flex size-11 items-center justify-center rounded-xl bg-success/12 text-success">
              <b.icon className="size-5" />
            </span>
            <h2 className="mt-4 text-base font-bold text-foreground">{b.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
          </article>
        ))}
      </section>
    </PublicLayout>
  );
}

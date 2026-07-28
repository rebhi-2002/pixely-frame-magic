import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/site/public-layout";

const title = "شروط الاستخدام | أكاديميا";
const description =
  "قواعد استخدام أكاديميا: حساب واحد لكل مستخدم، احترام المجتمع، حقوق المحتوى، وسياسة الاشتراكات.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Terms,
});

const sections = [
  {
    t: "الحساب",
    d: "حساب واحد لكل شخص، وبمعلومات صحيحة. مشاركة الحساب مع غيرك قد تؤدي لتعليقه.",
  },
  {
    t: "سلوك المجتمع",
    d: "الأسئلة والإجابات للتعلّم. أي إساءة أو محتوى غير لائق يُبلَّغ عنه ويُراجع من فريق الإشراف.",
  },
  {
    t: "حقوق المحتوى",
    d: "لا ترفع محتوى لا تملك حقوقه. المحتوى المخالف يُحذف، والتكرار قد يؤدي لإيقاف الحساب.",
  },
  {
    t: "الاشتراكات",
    d: "الاشتراك الشهري يتجدد تلقائياً ويمكن إلغاؤه بأي وقت، ويبقى فعّالاً حتى نهاية الفترة المدفوعة.",
  },
  {
    t: "حدود الخدمة",
    d: "محاكي الامتحان أداة تدريب مبنية على الذكاء الاصطناعي، وليس بديلاً رسمياً عن مصادر الوزارة.",
  },
];

function Terms() {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-4xl font-bold text-foreground">شروط الاستخدام</h1>
        <p className="mt-3 text-muted-foreground">
          باستخدامك أكاديميا، أنت موافق على النقاط التالية.
        </p>
        <div className="mt-10 space-y-5">
          {sections.map((s) => (
            <section key={s.t} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold text-foreground">{s.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </section>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}

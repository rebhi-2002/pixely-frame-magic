import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/site/public-layout";

const title = "سياسة الخصوصية | أكاديميا";
const description =
  "كيف نجمع بيانات الطلاب والمعلمين، وكيف نحميها، وما الذي يظهر لولي الأمر — بوضوح وبدون لغة قانونية معقدة.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Privacy,
});

const sections = [
  {
    t: "البيانات التي نجمعها",
    d: "الاسم، البريد الإلكتروني، النظام والصف والمواد التي تختارها، ونشاطك داخل المنصة (الدروس التي أنهيتها ونتائج الكويزات).",
  },
  {
    t: "كيف نستخدمها",
    d: "لتخصيص محتواك، لحساب نسبة إنجازك، ولاقتراح المراجعات المناسبة لك. لا نبيع بياناتك لأي طرف ثالث.",
  },
  {
    t: "خصوصية الطالب أمام ولي الأمر",
    d: "ولي الأمر يرى ملخصاً أسبوعياً للانتظام ونسبة الإنجاز فقط — لا يرى محادثاتك في المجتمعات ولا تفاصيل نشاطك اليومي.",
  },
  {
    t: "المحتوى المرفوع",
    d: "المعلّم مسؤول عن حقوق المحتوى الذي يرفعه. أي محتوى مُبلَّغ عنه يخضع لمراجعة فريق الإشراف وقد يُحذف.",
  },
  {
    t: "حقوقك",
    d: "تقدر تطلب حذف حسابك وبياناتك بأي وقت من صفحة الإعدادات أو بالتواصل مع فريق الدعم.",
  },
];

function Privacy() {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-4xl font-bold text-foreground">سياسة الخصوصية</h1>
        <p className="mt-3 text-muted-foreground">
          آخر تحديث: بداية إطلاق المنصة. نكتبها بلغة مفهومة لأنها تخصّك فعلاً.
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

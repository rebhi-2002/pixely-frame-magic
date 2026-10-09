import type { ReactNode } from "react";

/**
 * رأس الصفحات الداخلية الموحّد (لوحة 14): خلفية الورق المسطّحة + الشريط الثلاثي
 * + عنوان يبرز آخر كلمة فيه بخطّي الـhighlight الذهبيين + جملة فرعية.
 * `children` للعناصر التفاعلية تحت العنوان (بحث/مرشّحات...). لا نص جديد: العنوان
 * والجملة يأتيان من مفاتيح الصفحة نفسها، والكلمة المميّزة هي آخر كلمة بالعنوان.
 */
export function PageHeader({
  title,
  sub,
  highlight,
  children,
}: {
  title: string;
  sub?: string;
  /** العبارة الملوّنة (جزء حرفي من العنوان، بنفس المعنى بكل اللغات). بدونها
   *  تُلوَّن آخر كلمة بدون علامة الترقيم. */
  highlight?: string;
  children?: ReactNode;
}) {
  const text = title.trim();
  let before = text;
  let hl = "";
  let after = "";
  const at = highlight ? text.indexOf(highlight) : -1;
  if (highlight && at >= 0) {
    before = text.slice(0, at);
    hl = highlight;
    after = text.slice(at + highlight.length);
  } else {
    const m = text.match(/^(.*\s)(\S+?)([.!؟?،,:;]*)$/);
    if (m) [, before, hl, after] = m;
  }
  return (
    <section className="band-hero relative border-b-2 border-[var(--border-strong)]">
      <div aria-hidden className="stripe-tri" />
      <div className="mx-auto max-w-6xl px-5 py-14 md:py-16">
        <h1 className="text-4xl font-extrabold leading-[1.25] text-foreground md:text-5xl">
          {before}
          {hl && <span className="text-highlight">{hl}</span>}
          {after}
        </h1>
        {sub && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{sub}</p>}
        {children}
      </div>
    </section>
  );
}

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
  children,
}: {
  title: string;
  sub?: string;
  children?: ReactNode;
}) {
  const words = title.trim().split(/\s+/);
  const last = words.length > 1 ? words.pop() : null;
  return (
    <section className="band-hero relative border-b-2 border-[var(--border-strong)]">
      <div aria-hidden className="stripe-tri" />
      <div className="mx-auto max-w-6xl px-5 py-14 md:py-16">
        <h1 className="text-4xl font-extrabold leading-[1.25] text-foreground md:text-5xl">
          {last ? (
            <>
              {words.join(" ")} <span className="text-highlight">{last}</span>
            </>
          ) : (
            title
          )}
        </h1>
        {sub && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{sub}</p>}
        {children}
      </div>
    </section>
  );
}

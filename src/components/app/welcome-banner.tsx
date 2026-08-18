import type { ReactNode } from "react";
import { WelcomeIllustration } from "@/components/site/illustrations";
import { Reveal } from "@/components/ui/reveal";
import { useSession } from "@/hooks/use-session";
import { useBi } from "@/lib/bi";

/**
 * WelcomeBanner — بانر شخصي بأعلى كل لوحة تحكم (طالب/معلم/ولي أمر/مشرف/أدمن).
 * الاسم حقيقي (من الجلسة)؛ العنوان الفرعي والنصيحة مخصّصة لكل دور عبر props.
 */
export function WelcomeBanner({
  subtitle,
  tip,
}: {
  /** جملة ثانوية مخصّصة للدور — [عربي, إنجليزي] */
  subtitle: readonly [string, string];
  /** نصيحة/تلميح قصير يظهر كشارة صغيرة تحت العنوان — اختياري */
  tip?: readonly [string, string];
}) {
  const { session } = useSession();
  const bi = useBi();
  const firstName = session?.fullName?.trim().split(/\s+/)[0];
  const greeting = firstName
    ? bi(`أهلاً ${firstName} 👋`, `Hi ${firstName} 👋`)
    : bi("أهلاً بيك 👋", "Welcome 👋");

  return (
    <Reveal>
      <div className="surface-mesh shadow-elevation-1 relative overflow-hidden rounded-2xl border border-border">
        <div className="relative flex items-center gap-6 px-6 py-6">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">{greeting}</h2>
            <p className="mt-1.5 max-w-md text-sm text-muted-foreground">{bi(...subtitle)}</p>
            {tip && (
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">
                {bi(...tip)}
              </span>
            )}
          </div>
          <WelcomeIllustration className="hidden h-28 w-auto shrink-0 sm:block" />
        </div>
      </div>
    </Reveal>
  );
}

/** غلاف بسيط لإضافة محتوى إضافي (مثل بطاقات سريعة) بجانب البانر عند الحاجة. */
export function WelcomeBannerRow({ children }: { children: ReactNode }) {
  return <div className="space-y-5">{children}</div>;
}

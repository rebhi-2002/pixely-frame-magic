import { HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";

type FaqItem = { q: string; a: string };

/**
 * FAQSection — قسم أسئلة شائعة موحّد. يقرأ المصفوفة من مفتاح i18n المُمرَّر
 * (مثال: "pricing.faq") فيبقى المحتوى قابلاً للترجمة والتحديث من ملفات اللغة فقط.
 */
export function FAQSection({ i18nKey, className }: { i18nKey: string; className?: string }) {
  const { t } = useTranslation();
  const items = t(i18nKey, { returnObjects: true }) as FaqItem[];
  if (!items?.length) return null;

  return (
    <section className={className}>
      <div className="mx-auto max-w-3xl px-5 py-16">
        <Reveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/12 px-4 py-1.5 text-sm font-bold text-primary">
              <HelpCircle className="size-4" />
              {t("common.faqBadge")}
            </span>
            <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
              {t("common.faqTitle")}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion
            type="single"
            collapsible
            className="shadow-elevation-1 mt-8 rounded-2xl border border-border bg-card px-5"
          >
            {items.map((item, i) => (
              <AccordionItem key={item.q} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="text-start text-sm font-bold text-foreground hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

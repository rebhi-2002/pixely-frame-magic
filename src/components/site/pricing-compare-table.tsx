import { Check, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/reveal";

type Row = { l: string; free: boolean; plus: boolean };
type Group = { t: string; rows: Row[] };

/**
 * PricingCompareTable — مقارنة تفصيلية بين الخطة المجانية وبريميوم، مجمّعة حسب
 * الفئة (المحتوى، التحضير للامتحان، المتابعة، الدعم). يقرأ المحتوى بالكامل من
 * i18n (pricing.compare) ليبقى قابلاً للتعديل من ملفات الترجمة فقط.
 */
export function PricingCompareTable() {
  const { t } = useTranslation();
  const groups = t("pricing.compare.groups", { returnObjects: true }) as Group[];

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <Reveal>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {t("pricing.compare.title")}
            </h2>
            <p className="mt-2 text-muted-foreground">{t("pricing.compare.sub")}</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="shadow-elevation-1 mt-9 overflow-hidden rounded-2xl border border-border bg-card">
            {/* رأس الجدول */}
            <div className="grid grid-cols-[1fr_5rem_5rem] items-center gap-2 border-b border-border bg-card/60 px-5 py-3 sm:grid-cols-[1fr_7rem_7rem]">
              <span className="text-xs font-bold text-muted-foreground">
                {t("pricing.compare.colFree")} / {t("pricing.compare.colPlus")}
              </span>
              <span className="text-center text-xs font-bold text-muted-foreground">
                {t("pricing.compare.colFree")}
              </span>
              <span className="text-center text-xs font-bold text-primary">
                {t("pricing.compare.colPlus")}
              </span>
            </div>

            {groups.map((group) => (
              <div key={group.t}>
                <p className="bg-secondary/40 px-5 py-2 text-xs font-bold text-foreground">
                  {group.t}
                </p>
                {group.rows.map((row) => (
                  <div
                    key={row.l}
                    className="grid grid-cols-[1fr_5rem_5rem] items-center gap-2 border-t border-border px-5 py-3 sm:grid-cols-[1fr_7rem_7rem]"
                  >
                    <span className="text-sm text-foreground">{row.l}</span>
                    <span className="flex justify-center">
                      {row.free ? (
                        <Check className="size-4 text-success" />
                      ) : (
                        <Minus className="size-4 text-muted-foreground/40" />
                      )}
                    </span>
                    <span className="flex justify-center">
                      {row.plus ? (
                        <Check className="size-4 text-primary" />
                      ) : (
                        <Minus className="size-4 text-muted-foreground/40" />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

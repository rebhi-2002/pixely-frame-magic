import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import {
  UserSearch,
  Coins,
  CalendarClock,
  IdCard,
  Users,
  Video,
  CalendarDays,
  ClipboardCheck,
  Star,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { PageHeader } from "@/components/site/page-header";
import { SessionCta } from "@/components/site/session-cta";
import { FAQSection } from "@/components/site/faq-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/for-teachers")({
  head: (ctx) => createSeoHead("/for-teachers", localeFromSearch(ctx.match.search)),
  component: ForTeachers,
});

/* كل أيقونة بتعبّر عن معنى العنصر الفعلي، مو مجرّد زخرفة:
   - IdCard: الملف المهني (خبرة/مؤهلات/أسعار) — بطاقة تعريف لا رفع ملف.
   - CalendarClock: أوقات التوفّر — جدول/وقت، مش رسم بياني تحليلي.
   - Coins: الأرباح والمحفظة — مطابقة فعليًا، بلا تغيير.
   - UserSearch: الظهور بدليل البحث — اكتشاف/بحث، لا رمز "توثيق" (BadgeCheck)
     يلي ممكن يفهم غلط كشهادة رسمية غير موجودة فعليًا بالباك اند (Truth Rule). */

const benefits = [
  { icon: IdCard, key: "upload" },
  { icon: CalendarClock, key: "analytics" },
  { icon: Coins, key: "income" },
  { icon: UserSearch, key: "verified" },
] as const;

// بلاط الأيقونات من لوحة 14 (ذهبي/أزرق/صدئي) بالتناوب — تمييز بصري فقط.
const TILES = [
  "bg-[var(--brand)] text-[var(--ink)]",
  "bg-[var(--accent-2)] text-white",
  "bg-primary text-primary-foreground",
] as const;

const courseIcons = [Users, Video, CalendarDays, ClipboardCheck, Star] as const;

function ForTeachers() {
  const { t } = useTranslation();
  const courseItems = t("forTeachers.coursesItems", { returnObjects: true }) as {
    t: string;
    d: string;
  }[];

  return (
    <PublicLayout>
      <PageHeader
        title={t("forTeachers.h1")}
        highlight={t("forTeachers.h1b")}
        sub={t("forTeachers.sub")}
      >
        <SessionCta
          to="/signup"
          label={t("forTeachers.cta")}
          className={buttonVariants({
            variant: "default",
            className: "mt-8 h-auto px-7 py-3.5 text-sm",
          })}
        />
      </PageHeader>

      {/* إدارة الكورسات والجدول — FR-I01 إلى FR-I11 وFR-T09/FR-T10، غير
          ممثَّلة إطلاقًا سابقًا رغم كونها جوهر عمل المعلّم اليومي. */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-extrabold text-foreground">{t("forTeachers.coursesTitle")}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("forTeachers.coursesSub")}</p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courseItems.map((item, i) => {
            const Icon = courseIcons[i];
            return (
              <li
                key={item.t}
                className="flex items-start gap-3 rounded-2xl border-2 border-[var(--border-strong)] bg-card p-5 shadow-[var(--shadow-brutal)]"
              >
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-[var(--border-strong)] shadow-[2px_2px_0_0_var(--shadow-brutal-color)]",
                    TILES[i % TILES.length],
                  )}
                >
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-foreground">{item.t}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{item.d}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="band-sky border-t-2 border-[var(--border-strong)]">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-2xl font-extrabold text-foreground">
            {t("forTeachers.benefitsTitle")}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <div
                key={b.key}
                className="flex flex-col items-start gap-4 rounded-2xl border-2 border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)]"
              >
                <span
                  className={cn(
                    "flex size-14 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--border-strong)] shadow-[2px_2px_0_0_var(--shadow-brutal-color)]",
                    TILES[i % TILES.length],
                  )}
                >
                  <b.icon className="size-6" />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-foreground">
                    {t(`forTeachers.benefits.${b.key}.t`)}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {t(`forTeachers.benefits.${b.key}.d`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection className="border-y-2 border-[var(--border-strong)] bg-card/60" />
      <FAQSection i18nKey="forTeachers.faq" />
    </PublicLayout>
  );
}

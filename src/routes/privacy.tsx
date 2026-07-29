import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";

const title = "سياسة الخصوصية | أكاديميا";
const description = "كيف نجمع بيانات الطلاب والمعلمين، وكيف نحميها، وما الذي يظهر لولي الأمر — بوضوح وبدون لغة قانونية معقدة.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  const { t } = useTranslation();
  const sections = t("privacy.sections", { returnObjects: true }) as { t: string; d: string }[];

  return (
    <PublicLayout>
      <section className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-4xl font-bold text-foreground">{t("privacy.h1")}</h1>
        <p className="mt-3 text-muted-foreground">{t("privacy.intro")}</p>
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

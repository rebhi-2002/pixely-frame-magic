import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";

const title = "غير مصرّح | أكاديميا";
const description = "هذا القسم غير متاح لدورك الحالي على المنصة.";

export const Route = createFileRoute("/403")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Forbidden,
});

function Forbidden() {
  const { t } = useTranslation();

  return (
    <PublicLayout>
      <section className="mx-auto flex max-w-xl flex-col items-center px-5 py-24 text-center">
        <span className="flex size-16 items-center justify-center rounded-2xl bg-destructive/12 text-destructive">
          <ShieldAlert className="size-8" />
        </span>
        <h1 className="mt-6 font-display text-5xl font-bold text-foreground">
          {t("forbidden.code")}
        </h1>
        <h2 className="mt-3 text-xl font-bold text-foreground">{t("forbidden.title")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("forbidden.text")}</p>
        <Link
          to="/dashboard"
          className="mt-7 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {t("forbidden.cta")}
        </Link>
      </section>
    </PublicLayout>
  );
}

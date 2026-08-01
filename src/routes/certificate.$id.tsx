import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ShieldQuestion, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";

export const Route = createFileRoute("/certificate/$id")({
  head: () => ({
    meta: [
      { title: "التحقق من شهادة | أكاديميا" },
      {
        name: "description",
        content: "تحقّق من صحة شهادة رقمية صادرة عن منصة أكاديميا برقم الشهادة.",
      },
      { property: "og:title", content: "التحقق من شهادة | أكاديميا" },
      { property: "og:description", content: "التحقق يتم مقابل سجل الشهادات الرسمي للمنصة." },
    ],
  }),
  component: CertificatePage,
});

/** رقم صالح شكلياً: ACD-YYYY-NNNNN (سجل الشهادات الحقيقي يأتي مع مرحلة الباك-إند). */
const VALID = /^ACD-\d{4}-\d{5}$/i;

function CertificatePage() {
  const { id } = Route.useParams();
  const { t } = useTranslation();
  const initial = id === "verify" ? "" : id;
  const [code, setCode] = useState(initial);
  const [result, setResult] = useState<"valid" | "invalid" | null>(
    initial ? (VALID.test(initial) ? "valid" : "invalid") : null,
  );

  return (
    <PublicLayout>
      <section className="mx-auto max-w-2xl px-5 py-20">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
          <ShieldQuestion className="size-6" />
        </span>
        <h1 className="mt-5 text-3xl font-bold text-foreground">{t("certificate.h1")}</h1>
        <p className="mt-3 text-muted-foreground">{t("certificate.sub")}</p>

        <form
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            setResult(VALID.test(code.trim()) ? "valid" : "invalid");
          }}
        >
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t("certificate.placeholder")}
            aria-label={t("certificate.id")}
            className="h-12 flex-1 rounded-xl border border-border bg-card px-4 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />
          <button
            type="submit"
            className="h-12 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("certificate.check")}
          </button>
        </form>

        {result === "valid" && (
          <div className="mt-8 rounded-2xl border border-success/40 bg-success/10 p-6">
            <p className="inline-flex items-center gap-2 font-bold text-success">
              <CheckCircle2 className="size-5" />
              {t("certificate.valid")}
            </p>
            <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              <Row label={t("certificate.holder")} value="—" />
              <Row label={t("certificate.course")} value="—" />
              <Row label={t("certificate.issued")} value="—" />
              <Row label={t("certificate.id")} value={code.toUpperCase()} mono />
            </dl>
          </div>
        )}

        {result === "invalid" && (
          <p className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 p-5 text-sm font-semibold text-destructive">
            <XCircle className="size-5" />
            {t("certificate.invalid")}
          </p>
        )}

        <p className="mt-8 text-xs text-muted-foreground">{t("certificate.note")}</p>
      </section>
    </PublicLayout>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={`font-semibold text-foreground ${mono ? "font-mono" : ""}`}>{value}</dd>
    </div>
  );
}

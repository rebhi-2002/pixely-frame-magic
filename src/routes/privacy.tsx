import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/legal-page";

export const Route = createFileRoute("/privacy")({
  head: (ctx) => createSeoHead("/privacy", localeFromSearch(ctx.match.search)),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <LegalPage ns="privacy" />;
}

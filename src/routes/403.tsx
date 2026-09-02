import { createFileRoute } from "@tanstack/react-router";
import { Forbidden } from "@/components/app/guard";
import { createSeoHead, localeFromSearch } from "@/lib/seo";

export const Route = createFileRoute("/403")({
  head: (ctx) => createSeoHead("/403", localeFromSearch(ctx.match.search)),
  component: Forbidden,
});

import { createFileRoute } from "@tanstack/react-router";
import { Forbidden } from "@/components/app/guard";

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

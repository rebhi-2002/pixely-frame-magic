import type { BlogBlock } from "@/content/blog-posts";

/** BlogRenderer — يطبع بلوكات المقال (فقرة/عنوان/قائمة/اقتباس) بتنسيق قراءة مريح. */
export function BlogRenderer({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2 key={i} className="pt-2 text-xl font-extrabold text-foreground">
              {block.text}
            </h2>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="space-y-2 ps-1">
              {block.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[15px] leading-[1.9] text-foreground/90"
                >
                  <span className="mt-3 size-2 shrink-0 rounded-[2px] border border-[var(--border-strong)] bg-[var(--brand)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote
              key={i}
              className="rounded-e-xl border-2 border-s-[6px] border-[var(--border-strong)] border-s-[var(--brand)] bg-card px-5 py-4 text-[15px] font-semibold leading-[1.9] text-foreground"
            >
              {block.text}
            </blockquote>
          );
        }
        return (
          <p key={i} className="text-[15px] leading-[1.9] text-foreground/90">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

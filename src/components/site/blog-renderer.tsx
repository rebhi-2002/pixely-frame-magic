import type { BlogBlock } from "@/content/blog-posts";

/** BlogRenderer — يطبع بلوكات المقال (فقرة/عنوان/قائمة/اقتباس) بتنسيق قراءة مريح. */
export function BlogRenderer({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2 key={i} className="pt-2 text-xl font-bold text-foreground">
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
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
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
              className="border-primary rounded-e-xl border-s-4 bg-primary/6 px-5 py-4 text-[15px] font-semibold leading-[1.9] text-foreground"
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

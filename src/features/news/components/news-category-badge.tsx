import { cn } from "@/lib/class-names";

import type { NewsCategory } from "../schemas/news.schema";

const categoryStyles: Record<NewsCategory, string> = {
  News: "bg-[#f4f3ff] text-[#6938ef]",
  Events: "bg-[#fffbb7] text-[#88580b]",
  "Company updates": "bg-[#e8f7f0] text-[#147a55]",
  Features: "bg-[#eaf3ff] text-[#164990]",
};

export function NewsCategoryBadge({ category, compact = false }: { category: NewsCategory; compact?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-medium",
        compact ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        categoryStyles[category],
      )}
    >
      {category}
    </span>
  );
}

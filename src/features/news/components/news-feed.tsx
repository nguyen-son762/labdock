"use client";

import { ArrowLeft, ArrowRight } from "iconsax-reactjs";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/class-names";

import type { NewsArticle } from "../schemas/news.schema";
import { NewsArticleRow } from "./news-article-row";

const categories = ["All", "News", "Events", "Company updates", "Features"] as const;
const pageSize = 4;

type CategoryFilter = (typeof categories)[number];
type SortOrder = "latest" | "oldest";

export function NewsFeed({ articles }: { articles: NewsArticle[] }) {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const [page, setPage] = useState(1);

  const filteredArticles = useMemo(() => {
    const filtered = category === "All" ? articles : articles.filter((article) => article.category === category);
    return [...filtered].sort((first, second) => {
      const difference = new Date(second.publishedAt).getTime() - new Date(first.publishedAt).getTime();
      return sortOrder === "latest" ? difference : -difference;
    });
  }, [articles, category, sortOrder]);

  const pageCount = Math.max(1, Math.ceil(filteredArticles.length / pageSize));
  const visibleArticles = filteredArticles.slice((page - 1) * pageSize, page * pageSize);

  function selectCategory(nextCategory: CategoryFilter) {
    setCategory(nextCategory);
    setPage(1);
  }

  return (
    <section aria-labelledby="latest-updates-heading">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 id="latest-updates-heading" className="text-[32px] font-semibold leading-none text-[#0f3678]">
          Latest updates
        </h2>
        <Select
          value={sortOrder}
          onValueChange={(value: SortOrder) => {
            setSortOrder(value);
            setPage(1);
          }}
        >
          <SelectTrigger
            aria-label="Sort news"
            className="h-11 w-[120px] rounded-full border-[#c8d0d9] bg-white pl-4 text-[#0f3678]"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 flex flex-wrap gap-1" aria-label="Filter news by category">
        {categories.map((item) => (
          <Button
            key={item}
            type="button"
            size="sm"
            variant="ghost"
            aria-pressed={category === item}
            onClick={() => selectCategory(item)}
            className={cn(
              "h-7 rounded-full px-3 text-sm font-medium",
              category === item ? "bg-[#d1ecfa] text-[#092661] hover:bg-[#c5e7f8]" : "bg-[#ecf0f3] text-[#73798f]",
            )}
          >
            {item}
          </Button>
        ))}
      </div>

      <div className="mt-4 rounded-xl bg-white px-4">
        {visibleArticles.length > 0 ? (
          visibleArticles.map((article) => <NewsArticleRow key={article.slug} article={article} />)
        ) : (
          <p className="py-16 text-center text-sm text-[#73798f]">No articles in this category yet.</p>
        )}

        <nav aria-label="News pagination" className="flex items-center justify-between border-t border-[#e9eaeb] py-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="gap-2 px-0 text-[#73798f]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
              <Button
                key={pageNumber}
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Go to page ${pageNumber}`}
                aria-current={page === pageNumber ? "page" : undefined}
                onClick={() => setPage(pageNumber)}
                className={cn(
                  "size-8 rounded-full text-xs text-[#73798f]",
                  page === pageNumber && "bg-[#d1ecfa] text-[#092661]",
                )}
              >
                {pageNumber}
              </Button>
            ))}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={page === pageCount}
            onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
            className="gap-2 px-0 text-[#73798f]"
          >
            Next <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </nav>
      </div>
    </section>
  );
}

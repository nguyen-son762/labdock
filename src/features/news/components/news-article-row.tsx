import Image from "next/image";
import Link from "next/link";

import type { NewsArticle } from "../schemas/news.schema";
import { formatNewsDate } from "../utils/news-formatters";
import { NewsCategoryBadge } from "./news-category-badge";

export function NewsArticleRow({ article }: { article: NewsArticle }) {
  return (
    <article className="border-b border-[#e9eaeb] py-4 last:border-b-0">
      <Link
        href={`/news/${article.slug}`}
        className="group grid gap-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990] sm:grid-cols-[minmax(180px,265px)_1fr] sm:items-center"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:h-[199px] sm:aspect-auto">
          <Image
            src={article.image}
            alt=""
            fill
            sizes="(min-width: 640px) 265px, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.025]"
          />
        </div>
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <NewsCategoryBadge category={article.category} />
            <time dateTime={article.publishedAt} className="text-sm font-medium text-[#73798f]">
              {formatNewsDate(article.publishedAt)}
            </time>
          </div>
          <h3 className="text-base font-bold leading-6 text-[#1f5fa8] transition-colors group-hover:text-[#0f3678]">
            {article.title}
          </h3>
          <p className="line-clamp-2 text-base leading-6 text-[#2e3038]">{article.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}

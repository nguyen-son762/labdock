import Image from "next/image";
import Link from "next/link";

import type { NewsArticle } from "../schemas/news.schema";
import { formatNewsDate } from "../utils/news-formatters";
import { NewsCategoryBadge } from "./news-category-badge";

export function FeaturedArticle({ article }: { article: NewsArticle }) {
  return (
    <section aria-labelledby="top-highlight-heading">
      <h2 id="top-highlight-heading" className="text-[32px] font-semibold leading-none text-[#0f3678]">
        Top highlight
      </h2>
      <div className="mt-4 rounded-xl bg-white p-3 md:px-4">
        <Link
          href={`/news/${article.slug}`}
          className="group grid gap-5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990] md:grid-cols-2 md:gap-4"
        >
          <div className="flex min-w-0 flex-col gap-4 py-1">
            <div className="flex items-center gap-3">
              <NewsCategoryBadge category={article.category} />
              <time dateTime={article.publishedAt} className="text-sm font-semibold text-[#73798f]">
                {formatNewsDate(article.publishedAt)}
              </time>
            </div>
            <h3 className="text-[28px] font-semibold leading-[1.15] text-[#0f3678] transition-colors group-hover:text-[#1f5fa8] lg:text-[32px]">
              {article.title}
            </h3>
            <p className="line-clamp-3 text-base leading-6 text-[#2e3038]">{article.excerpt}</p>
          </div>
          <div className="relative min-h-[240px] overflow-hidden rounded-xl md:h-[273px]">
            <Image
              src={article.image}
              alt="Panel discussion at the SALAS Scientific Conference 2026"
              fill
              priority
              sizes="(min-width: 1024px) 386px, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </Link>
        <div className="mt-6 flex items-center justify-center gap-3" aria-label="Featured article 1 of 3">
          <span className="size-2 rounded-full bg-[#1f5fa8]" />
          <span className="size-2 rounded-full bg-[#ecf0f3]" />
          <span className="size-2 rounded-full bg-[#ecf0f3]" />
        </div>
      </div>
    </section>
  );
}

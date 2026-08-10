import { ArrowLeft2 } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";

import type { NewsArticle } from "../schemas/news.schema";
import { formatNewsDate } from "../utils/news-formatters";
import { CopyLinkButton } from "./copy-link-button";
import { NewsCategoryBadge } from "./news-category-badge";

export function NewsDetailScreen({ article }: { article: NewsArticle }) {
  return (
    <article className="bg-[#f5f8fb] pb-16">
      <header className="mx-auto max-w-[1240px] px-5 pb-[50px] pt-8 sm:px-10 xl:px-0">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 rounded text-sm text-[#1f5fa8] hover:text-[#0f3678] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]"
        >
          <ArrowLeft2 className="size-5" aria-hidden="true" /> Back to all articles
        </Link>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3">
            <NewsCategoryBadge category={article.category} compact />
            <time dateTime={article.publishedAt} className="text-sm font-semibold text-[#73798f]">
              {formatNewsDate(article.publishedAt)}
            </time>
          </div>
          <h1 className="text-[32px] font-semibold leading-[1.15] text-[#0f3678]">{article.title}</h1>
        </div>

        <div className="relative mt-6 aspect-[2/1] min-h-[300px] overflow-hidden rounded-[20px] lg:h-[620px] lg:aspect-auto">
          <Image
            src={article.heroImage ?? article.image}
            alt={`${article.title} featured image`}
            fill
            priority
            sizes="(min-width: 1280px) 1240px, 100vw"
            className="object-cover"
          />
        </div>
      </header>

      <div className="mx-auto max-w-[824px] space-y-8 px-5 sm:px-10 lg:px-0">
        <div className="text-base leading-6 text-[#868da5]">
          {article.introLines.map((line, index) => (
            <p key={`${line}-${index}`}>{line}</p>
          ))}
        </div>

        {article.sections.map((section) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="text-lg font-semibold leading-6 text-[#1f5fa8]">{section.heading}</h2>
            <div className="space-y-0 text-base leading-6 text-[#868da5]">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}

        {article.gallery.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {article.gallery.map((image, index) => (
              <div key={`${image}-${index}`} className="relative aspect-[1.45/1] overflow-hidden">
                <Image
                  src={image}
                  alt={`Modern laboratory workspace ${index + 1}`}
                  fill
                  sizes="(min-width: 640px) 404px, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex items-center justify-between border-t border-[#dde2e8] pt-5">
          <p className="text-sm text-[#051a50]">Share this article</p>
          <CopyLinkButton />
        </div>
      </div>
    </article>
  );
}

import { newsArticles } from "../data/news-data";
import { FeaturedArticle } from "./featured-article";
import { NewsFeed } from "./news-feed";
import { NewsHero } from "./news-hero";
import { NewsSidebar } from "./news-sidebar";

export function NewsListScreen() {
  const [featuredArticle, ...latestArticles] = newsArticles;

  if (!featuredArticle) return null;

  return (
    <div className="bg-[#f5f8fb]">
      <NewsHero />
      <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-8 sm:px-10 lg:grid-cols-[minmax(0,820px)_minmax(320px,404px)] lg:gap-4 xl:px-0">
        <div className="space-y-12">
          <FeaturedArticle article={featuredArticle} />
          <NewsFeed articles={latestArticles} />
        </div>
        <NewsSidebar />
      </div>
    </div>
  );
}

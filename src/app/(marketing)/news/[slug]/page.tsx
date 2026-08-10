import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";
import { getNewsArticle, NewsDetailScreen, newsArticles } from "@/features/news";

type NewsArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  const article = getNewsArticle((await params).slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      url: `/news/${article.slug}`,
      images: [{ url: article.heroImage ?? article.image, alt: `${article.title} featured image` }],
    },
  };
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const article = getNewsArticle((await params).slug);
  if (!article) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    image: `${siteConfig.url}${article.heroImage ?? article.image}`,
    mainEntityOfPage: `${siteConfig.url}/news/${article.slug}`,
    url: `${siteConfig.url}/news/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/auth/labdock-wordmark.svg` },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replaceAll("<", "\\u003c") }}
      />
      <NewsDetailScreen article={article} />
    </>
  );
}

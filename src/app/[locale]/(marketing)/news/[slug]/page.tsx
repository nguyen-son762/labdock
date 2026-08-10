import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";
import { getNewsArticle, NewsDetailScreen, newsArticles } from "@/features/news";
import { getLocalizedAlternates, getLocalizedPath, isAppLocale } from "@/i18n/locale";

type NewsArticlePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isAppLocale(locale)) return {};
  const article = getNewsArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: getLocalizedAlternates(`/news/${article.slug}`, locale),
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      url: getLocalizedPath(`/news/${article.slug}`, locale),
      locale: locale === "vi" ? "vi_VN" : "en_SG",
      images: [{ url: article.heroImage ?? article.image, alt: `${article.title} featured image` }],
    },
  };
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { locale, slug } = await params;
  if (!isAppLocale(locale)) notFound();
  const article = getNewsArticle(slug);
  if (!article) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    image: `${siteConfig.url}${article.heroImage ?? article.image}`,
    inLanguage: locale,
    mainEntityOfPage: `${siteConfig.url}${getLocalizedPath(`/news/${article.slug}`, locale)}`,
    url: `${siteConfig.url}${getLocalizedPath(`/news/${article.slug}`, locale)}`,
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

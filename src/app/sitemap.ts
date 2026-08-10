import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { newsArticles } from "@/features/news/server";
import { products } from "@/features/products/server";
import { getLanguageAlternates, getLocalizedPath } from "@/i18n/locale";
import { routing, type AppLocale } from "@/i18n/routing";

const absoluteLanguages = (path: string) =>
  Object.fromEntries(
    Object.entries(getLanguageAlternates(path)).map(([locale, localizedPath]) => [
      locale,
      `${siteConfig.url}${localizedPath}`,
    ]),
  );

const createLocalizedEntries = (path: string, attributes: Omit<MetadataRoute.Sitemap[number], "url" | "alternates">) =>
  routing.locales.map((locale: AppLocale) => ({
    url: `${siteConfig.url}${getLocalizedPath(path, locale)}`,
    alternates: { languages: absoluteLanguages(path) },
    ...attributes,
  }));

export default function sitemap(): MetadataRoute.Sitemap {
  const productEntries = products.flatMap((product) =>
    createLocalizedEntries(`/products/${product.id}`, { changeFrequency: "weekly", priority: 0.7 }),
  );

  const articles = newsArticles.flatMap((article) =>
    createLocalizedEntries(`/news/${article.slug}`, {
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [
    ...createLocalizedEntries("/", { changeFrequency: "weekly", priority: 1 }),
    ...createLocalizedEntries("/products", { changeFrequency: "daily", priority: 0.9 }),
    ...createLocalizedEntries("/news", { changeFrequency: "weekly", priority: 0.8 }),
    ...createLocalizedEntries("/about-us", { changeFrequency: "monthly", priority: 0.7 }),
    ...createLocalizedEntries("/contact-us", { changeFrequency: "monthly", priority: 0.7 }),
    ...createLocalizedEntries("/security", { changeFrequency: "yearly", priority: 0.4 }),
    ...createLocalizedEntries("/terms-and-conditions", { changeFrequency: "yearly", priority: 0.3 }),
    ...createLocalizedEntries("/privacy", { changeFrequency: "yearly", priority: 0.3 }),
    ...productEntries,
    ...articles,
  ];
}

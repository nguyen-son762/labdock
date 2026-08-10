import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { newsArticles } from "@/features/news/server";
import { products } from "@/features/products/server";

export default function sitemap(): MetadataRoute.Sitemap {
  const productEntries = products.map((product) => ({
    url: `${siteConfig.url}/products/${product.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const articles = newsArticles.map((article) => ({
    url: `${siteConfig.url}/news/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/products`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/news`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/about-us`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/contact-us`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/security`, changeFrequency: "yearly", priority: 0.4 },
    {
      url: `${siteConfig.url}/terms-and-conditions`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    { url: `${siteConfig.url}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    ...productEntries,
    ...articles,
  ];
}

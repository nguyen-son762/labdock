import { describe, expect, it } from "vitest";

import { newsArticles } from "@/features/news/server";
import { products } from "@/features/products/server";

import sitemap from "./sitemap";

describe("sitemap", () => {
  const entries = sitemap();

  it("contains unique public URLs", () => {
    const urls = entries.map((entry) => entry.url);

    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.some((url) => url.endsWith("/security"))).toBe(true);
  });

  it("indexes only canonical product records", () => {
    const productUrls = entries.filter((entry) => entry.url.includes("/products/"));

    expect(productUrls).toHaveLength(products.length);
    expect(productUrls.map((entry) => entry.url.split("/").at(-1))).toEqual(products.map((product) => product.id));
  });

  it("only supplies evidence-based modification dates", () => {
    const datedEntries = entries.filter((entry) => entry.lastModified !== undefined);

    expect(datedEntries).toHaveLength(newsArticles.length);
    expect(datedEntries.every((entry) => entry.url.includes("/news/"))).toBe(true);
  });
});

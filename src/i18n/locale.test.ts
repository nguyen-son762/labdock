import { describe, expect, it } from "vitest";

import { getLanguageAlternates, getLocalizedAlternates, getLocalizedPath, isAppLocale } from "./locale";

describe("locale routing", () => {
  it("keeps the default locale unprefixed", () => {
    expect(getLocalizedPath("/products", "en")).toBe("/products");
    expect(getLocalizedPath("/", "en")).toBe("/");
  });

  it("prefixes Vietnamese routes", () => {
    expect(getLocalizedPath("/products", "vi")).toBe("/vi/products");
    expect(getLocalizedPath("/", "vi")).toBe("/vi");
  });

  it("provides canonical and hreflang alternatives", () => {
    expect(getLocalizedAlternates("/news", "vi")).toEqual({
      canonical: "/vi/news",
      languages: getLanguageAlternates("/news"),
    });
    expect(getLanguageAlternates("/news")).toEqual({
      en: "/news",
      vi: "/vi/news",
      "x-default": "/news",
    });
  });

  it("narrows supported locales", () => {
    expect(isAppLocale("en")).toBe(true);
    expect(isAppLocale("vi")).toBe(true);
    expect(isAppLocale("fr")).toBe(false);
  });
});

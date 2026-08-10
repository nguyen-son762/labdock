import { describe, expect, it } from "vitest";

import { newsArticles } from "./news-data";

describe("news SEO data", () => {
  it("contains no placeholder copy", () => {
    const content = JSON.stringify(newsArticles).toLowerCase();

    expect(content).not.toContain("lorem");
    expect(content).not.toContain("another title example");
  });

  it("gives every article a unique body", () => {
    const bodies = newsArticles.map((article) =>
      JSON.stringify({ introLines: article.introLines, sections: article.sections }),
    );

    expect(new Set(bodies).size).toBe(newsArticles.length);
  });
});

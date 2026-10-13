import { describe, expect, it } from "vitest";

import { parseProductCatalogFilters } from "./product-catalog.schema";

describe("parseProductCatalogFilters", () => {
  it("parses valid product catalog URL filters", () => {
    expect(
      parseProductCatalogFilters({
        page: "3",
        brandId: "11111111-1111-1111-1111-111111111111",
        categoryId: "22222222-2222-2222-2222-222222222222",
        sort: "price-desc",
      }),
    ).toEqual({
      page: 3,
      origins: [],
      brandIds: ["11111111-1111-1111-1111-111111111111"],
      categoryId: "22222222-2222-2222-2222-222222222222",
      sort: "price-desc",
    });
  });

  it("falls back safely for invalid or repeated URL values", () => {
    expect(
      parseProductCatalogFilters({
        page: "-2",
        brandId: "invalid",
        categoryId: ["33333333-3333-3333-3333-333333333333", "ignored"],
        sort: "unknown",
      }),
    ).toEqual({
      page: 1,
      origins: [],
      brandIds: [],
      categoryId: "33333333-3333-3333-3333-333333333333",
      sort: "featured",
    });
  });
  it("normalizes multiple brand IDs and ignores invalid or duplicate IDs", () => {
    const first = "11111111-1111-1111-1111-111111111111";
    const second = "22222222-2222-2222-2222-222222222222";
    expect(parseProductCatalogFilters({ brandIds: `${first},invalid, ${second},${first}` }).brandIds).toEqual([
      first,
      second,
    ]);
  });
  it("normalizes comma-separated origins without dropping spaces within a name", () => {
    expect(parseProductCatalogFilters({ origins: "SG, United States,SG,, " }).origins).toEqual(["SG", "United States"]);
    expect(parseProductCatalogFilters({ origins: ["SG,DE", "ignored"] }).origins).toEqual(["SG", "DE"]);
    expect(parseProductCatalogFilters({ origins: "" }).origins).toEqual([]);
  });
});

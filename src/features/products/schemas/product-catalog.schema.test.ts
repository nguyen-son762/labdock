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
      brandId: "11111111-1111-1111-1111-111111111111",
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
      brandId: undefined,
      categoryId: "33333333-3333-3333-3333-333333333333",
      sort: "featured",
    });
  });
});

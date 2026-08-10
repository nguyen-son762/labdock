import { describe, expect, it } from "vitest";

import { getProductById, productGrid, products } from "./products-data";

describe("product catalog SEO data", () => {
  it("keeps every indexable product URL unique", () => {
    const productIds = products.map((product) => product.id);

    expect(new Set(productIds).size).toBe(productIds.length);
  });

  it("only repeats real products in the display grid", () => {
    const indexableIds = new Set(products.map((product) => product.id));

    expect(productGrid.length).toBeGreaterThan(products.length);
    expect(productGrid.every((product) => indexableIds.has(product.id))).toBe(true);
    expect(getProductById("spider-flask-6")).toBeUndefined();
  });

  it("provides distinct searchable descriptions and catalog numbers", () => {
    expect(new Set(products.map((product) => product.description)).size).toBe(products.length);
    expect(new Set(products.map((product) => product.catalogNumber)).size).toBe(products.length);
  });
});

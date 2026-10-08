import { describe, expect, it } from "vitest";

import type { PublicProductListItem } from "../schemas/product-list.schema";
import { mapPublicProduct } from "./map-public-product";

const apiProduct: PublicProductListItem = {
  id: "11111111-1111-1111-1111-111111111111",
  name: "Example Name",
  slug: "example-slug",
  productNo: "SKU-001",
  brandName: "Example Brand",
  primaryImageUrl: "/media/public/example.jpg",
  priceVisible: true,
  fromPrice: 99.5,
  currency: "SGD",
  outOfStock: true,
  publishedAt: "2026-08-21T10:00:00+00:00",
  isNew: true,
  isOutstanding: true,
};

describe("mapPublicProduct", () => {
  it("maps the public list item into the shared Product contract", () => {
    expect(mapPublicProduct(apiProduct)).toEqual(
      expect.objectContaining({
        id: apiProduct.id,
        slug: apiProduct.slug,
        productNo: apiProduct.productNo,
        brandName: apiProduct.brandName,
        priceVisible: true,
        variants: [
          expect.objectContaining({
            sku: apiProduct.productNo,
            unitPrice: 99.5,
            currency: "SGD",
            stockQty: 0,
          }),
        ],
        media: [expect.objectContaining({ url: "/media/public/example.jpg", isPrimary: true })],
      }),
    );
  });

  it("does not expose a hidden price as purchasable", () => {
    const product = mapPublicProduct({ ...apiProduct, priceVisible: false, fromPrice: null, outOfStock: false });

    expect(product.priceVisible).toBe(false);
    expect(product.variants[0]).toEqual(expect.objectContaining({ priceVisible: false, unitPrice: null }));
  });

  it("preserves full product data instead of synthesizing a list variant", () => {
    const detail = {
      ...mapPublicProduct(apiProduct),
      supplierItemNo: "SUPPLIER-001",
      notes: "Handle with care",
      description: "Full product description",
      specialRequirement: true,
      variants: [
        {
          ...mapPublicProduct(apiProduct).variants[0]!,
          id: "variant-id",
          unitPrice: null,
          rfqBasePrice: null,
          promotionPercent: 10,
        },
      ],
    };

    expect(mapPublicProduct(detail)).toEqual(detail);
    expect(mapPublicProduct({ ...detail, related: null })).toEqual({ ...detail, related: [] });
  });
});

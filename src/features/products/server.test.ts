import { afterEach, describe, expect, it, vi } from "vitest";

import { getProductCatalogPage, getPublicProductBySlug, getPublicProducts, ProductNotFoundError } from "./server";

const productsResponse = {
  items: [
    {
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
    },
  ],
  page: 1,
  pageSize: 1,
  total: 10,
};

const productDetailResponse = {
  id: "11111111-1111-1111-1111-111111111111",
  name: "Example Name",
  slug: "example-slug",
  productNo: "SKU-001",
  status: 1,
  brandName: "Example Brand",
  notes: "Handle with care",
  description: "Example description",
  specialRequirement: true,
  restrictedCondition: true,
  priceVisible: true,
  casNumber: "64-17-5",
  specifications: [{ name: "Purity", value: "99%" }],
  variants: [
    {
      id: "22222222-2222-2222-2222-222222222222",
      sku: "SKU-001-100",
      priceVisible: true,
      unitPrice: 99.5,
      rfqBasePrice: 120,
      promotionPercent: 10,
      currency: "SGD",
      stockQty: 10,
      isActive: true,
      selections: [
        {
          attributeId: "33333333-3333-3333-3333-333333333333",
          attributeCode: "size",
          attributeName: "Size",
          valueId: "44444444-4444-4444-4444-444444444444",
          valueCode: "100ml",
          value: "100ml",
        },
      ],
    },
  ],
  media: [
    {
      id: "55555555-5555-5555-5555-555555555555",
      url: "/media/public/example.jpg",
      contentType: "image/jpeg",
      sortOrder: 0,
      isPrimary: true,
    },
  ],
  documents: [],
  related: [],
  certificates: [{ id: "66666666-6666-6666-6666-666666666666", name: "ISO Certified" }],
  isNew: true,
  isOutstanding: false,
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getPublicProducts", () => {
  it("serializes every supported filter with the backend parameter casing", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(productsResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      getPublicProducts({
        page: 1,
        pageSize: 12,
        brandId: "brand-id",
        categoryId: "category-id",
        sort: "newest",
        isNew: true,
        isOutstanding: true,
      }),
    ).resolves.toEqual(productsResponse);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://uat-api-labdock.365studio.vn/api/public/v1/products?page=1&pageSize=12&brandId=brand-id&categoryId=category-id&sort=newest&isNew=true&IsOutstanding=true",
      { next: { revalidate: 300, tags: ["products", "products:outstanding"] } },
    );
  });

  it("omits optional filters for the normal product feed", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(productsResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await getPublicProducts({ page: 1, pageSize: 6 });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://uat-api-labdock.365studio.vn/api/public/v1/products?page=1&pageSize=6",
      { next: { revalidate: 300, tags: ["products", "products:all"] } },
    );
  });

  it("rejects malformed product payloads", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ items: [] }), { status: 200 })));

    await expect(getPublicProducts({ page: 1, pageSize: 6 })).rejects.toThrow();
  });

  it("maps product list items into the Product contract consumed by cards", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify(productsResponse), { status: 200 })));

    const result = await getProductCatalogPage({ page: 1, pageSize: 20 });

    expect(result.total).toBe(10);
    expect(result.items[0]).toEqual(
      expect.objectContaining({
        id: productsResponse.items[0]?.id,
        productNo: "SKU-001",
        brandName: "Example Brand",
        variants: [expect.objectContaining({ unitPrice: 99.5, stockQty: 0 })],
      }),
    );
  });
});

describe("getPublicProductBySlug", () => {
  it("loads and validates a product detail by encoded slug", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(productDetailResponse), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(getPublicProductBySlug("example slug")).resolves.toEqual(productDetailResponse);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://uat-api-labdock.365studio.vn/api/public/v1/products/example%20slug",
      { next: { revalidate: 300, tags: ["products", "product:example slug"] } },
    );
  });

  it("maps a 404 response to ProductNotFoundError", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 404 })));

    await expect(getPublicProductBySlug("missing-product")).rejects.toBeInstanceOf(ProductNotFoundError);
  });

  it("rejects malformed product detail payloads", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(new Response(JSON.stringify({ ...productDetailResponse, variants: null }), { status: 200 })),
    );

    await expect(getPublicProductBySlug("example-slug")).rejects.toThrow();
  });
});

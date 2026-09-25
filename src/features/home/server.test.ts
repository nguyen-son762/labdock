import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({ get: () => undefined })),
}));

import { getHomePageData, getPublicHomepage } from "./server";

const homepageResponse = {
  banners: [
    {
      id: "11111111-1111-1111-1111-111111111111",
      imagePath: "public/banners/example.jpg",
      linkUrl: "https://example.com/banner",
      title: "Example banner",
      sortOrder: 1,
    },
  ],
  topBrands: [
    {
      id: "22222222-2222-2222-2222-222222222222",
      name: "Example Brand",
      brandCode: "BRAND-001",
      country: null,
      websiteUrl: null,
      logoPath: "public/brands/example.jpg",
      isTopBrand: true,
    },
  ],
  topCategories: [
    {
      id: "33333333-3333-3333-3333-333333333333",
      name: "Example Category",
      slug: "example-category",
      sortOrder: 1,
    },
  ],
  newestProducts: [
    {
      id: "44444444-4444-4444-4444-444444444444",
      name: "Example New Product",
      slug: "example-new-product",
      productNo: "SKU-001",
      brandName: "Example Brand",
      primaryImageUrl: "/media/public/product.jpg",
      priceVisible: true,
      fromPrice: 99.5,
      currency: "SGD",
      outOfStock: false,
      publishedAt: "2026-08-21T10:00:00+00:00",
      isNew: true,
      isOutstanding: true,
    },
  ],
  personalizedOffers: [],
  testimonials: [
    {
      id: "55555555-5555-5555-5555-555555555555",
      author: "Example Author",
      content: "Example testimonial",
      sortOrder: 1,
    },
  ],
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getPublicHomepage", () => {
  it("loads the complete homepage contract through one cached request", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(homepageResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(getPublicHomepage()).resolves.toEqual(homepageResponse);
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith("https://uat-api-labdock.365studio.vn/api/public/v1/homepage", {
      next: { revalidate: 300, tags: ["homepage"] },
    });
  });

  it("rejects unsuccessful responses", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 503 })));

    await expect(getPublicHomepage()).rejects.toThrow("Unable to load homepage (503).");
  });

  it("rejects malformed aggregate payloads", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ banners: [] }), { status: 200 })));

    await expect(getPublicHomepage()).rejects.toThrow();
  });
});

describe("getHomePageData", () => {
  it("maps every aggregate section without making secondary API calls", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(homepageResponse), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await getHomePageData();

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(result.banners[0]).toMatchObject({
      imageUrl: "https://uat-api-labdock.365studio.vn/media/public/banners/example.jpg",
      title: "Example banner",
    });
    expect(result.topBrands[0]?.name).toBe("Example Brand");
    expect(result.topCategories[0]?.slug).toBe("example-category");
    expect(result.outstandingProducts[0]?.slug).toBe("example-new-product");
    expect(result.newestProducts[0]?.slug).toBe("example-new-product");
    expect(result.personalizedProducts).toEqual([]);
    expect(result.testimonials[0]?.author).toBe("Example Author");
  });

  it("returns empty sections when the single homepage request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Unavailable")));

    await expect(getHomePageData()).resolves.toEqual({
      banners: [],
      topBrands: [],
      topCategories: [],
      outstandingProducts: [],
      newestProducts: [],
      personalizedProducts: [],
      testimonials: [],
    });
  });
});

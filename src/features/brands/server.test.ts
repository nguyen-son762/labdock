import { afterEach, describe, expect, it, vi } from "vitest";

import { getPublicBrands, getTopBrands } from "./server";

const brandsResponse = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    name: "Top Brand",
    brandCode: "TOP-001",
    country: null,
    websiteUrl: null,
    logoPath: "public/brands/top-brand.jpg",
    isTopBrand: true,
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    name: "Regular Brand",
    brandCode: "REG-001",
    country: "VN",
    websiteUrl: "https://brand.example/about",
    logoPath: "/media/public/brands/regular-brand.jpg",
    isTopBrand: false,
  },
];

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getPublicBrands", () => {
  it("loads and validates the public brands with the shared cache policy", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(brandsResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(getPublicBrands()).resolves.toEqual(brandsResponse);
    expect(fetchMock).toHaveBeenCalledWith("https://uat-api-labdock.365studio.vn/api/public/v1/brands", {
      next: { revalidate: 300, tags: ["brands"] },
    });
  });

  it("rejects unsuccessful responses", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 503 })));

    await expect(getPublicBrands()).rejects.toThrow("Unable to load brands (503).");
  });

  it("rejects malformed payloads", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify([{ id: "invalid" }]), { status: 200 })),
    );

    await expect(getPublicBrands()).rejects.toThrow();
  });
});

describe("getTopBrands", () => {
  it("keeps top brands and normalizes the logo path returned by UAT", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify(brandsResponse), { status: 200 })));

    await expect(getTopBrands()).resolves.toEqual([
      {
        id: "11111111-1111-1111-1111-111111111111",
        name: "Top Brand",
        logoUrl: "https://uat-api-labdock.365studio.vn/media/public/brands/top-brand.jpg",
        websiteUrl: null,
      },
    ]);
  });
});

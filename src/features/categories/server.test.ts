import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({ get: () => undefined })),
}));

import { getPublicCategories } from "./server";

const categoryResponse = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    name: "Example Name",
    description: "Example description",
    slug: "example-slug",
    level: 10,
    sortOrder: 10,
    media: [
      {
        id: "11111111-1111-1111-1111-111111111111",
        url: "/media/public/example.jpg",
        contentType: "image/jpeg",
        sortOrder: 10,
        isPrimary: true,
      },
    ],
    children: [
      {
        id: "11111111-1111-1111-1111-111111111111",
        name: "Example Name",
        description: "Example description",
        slug: "example-slug",
        level: 10,
        sortOrder: 10,
        media: [],
        children: [],
      },
    ],
  },
];

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getPublicCategories", () => {
  it("loads and validates the recursive public category tree", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(categoryResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(getPublicCategories()).resolves.toEqual(categoryResponse);
    expect(fetchMock).toHaveBeenCalledWith("https://uat-api-labdock.365studio.vn/api/public/v1/categories", {
      next: { revalidate: 300, tags: ["categories"] },
    });
  });

  it("rejects unsuccessful responses", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 503 })));

    await expect(getPublicCategories()).rejects.toThrow("Unable to load categories (503).");
  });

  it("rejects malformed category payloads", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify([{ id: "invalid" }]), { status: 200 })),
    );

    await expect(getPublicCategories()).rejects.toThrow();
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";

const httpClient = vi.hoisted(() => ({ get: vi.fn(), post: vi.fn(), patch: vi.fn() }));

vi.mock("@/lib/http-client", () => ({ httpClient }));

import { cartService } from "./cart.service";

const cartResponse = {
  id: "11111111-1111-1111-1111-111111111111",
  items: [
    {
      id: "22222222-2222-2222-2222-222222222222",
      variantId: "33333333-3333-3333-3333-333333333333",
      productId: "44444444-4444-4444-4444-444444444444",
      productName: "Example Product",
      sku: "SKU-001",
      quantity: 10,
      unitPrice: 99.5,
      currency: "SGD",
      lineTotal: 995,
      stockQty: 10,
      productStatus: "Published",
      isDeleted: false,
      variants: [
        {
          id: "33333333-3333-3333-3333-333333333333",
          sku: "SKU-001",
          unitPrice: 99.5,
          currency: "SGD",
          stockQty: 10,
          selections: [
            {
              attributeId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
              attributeCode: "size",
              attributeName: "Size",
              valueId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
              valueCode: "1l",
              value: "1 L",
            },
          ],
        },
      ],
    },
  ],
  subtotal: 995,
  currency: "SGD",
  updatedAt: "2026-08-21T10:00:00+00:00",
};

afterEach(() => {
  vi.resetAllMocks();
});

describe("cartService.get", () => {
  it("loads the authenticated cart with cancellation and preserves backend field names", async () => {
    httpClient.get.mockResolvedValue({ data: cartResponse });
    const controller = new AbortController();

    await expect(cartService.get(controller.signal)).resolves.toEqual(cartResponse.items);
    expect(httpClient.get).toHaveBeenCalledWith("/cart", { signal: controller.signal });
  });

  it("rejects a malformed cart payload", async () => {
    httpClient.get.mockResolvedValue({ data: { ...cartResponse, subtotal: -1 } });

    await expect(cartService.get()).rejects.toThrow();
  });

  it("propagates HTTP failures for React Query error handling", async () => {
    const error = new Error("Unauthorized");
    httpClient.get.mockRejectedValue(error);

    await expect(cartService.get()).rejects.toBe(error);
  });
});

describe("cartService response validation", () => {
  it("preserves the cart items returned after adding or updating an item", async () => {
    httpClient.post.mockResolvedValue({ data: cartResponse });
    httpClient.patch.mockResolvedValue({ data: cartResponse });

    const added = await cartService.add({ variantId: "33333333-3333-3333-3333-333333333333", quantity: 10 });
    const updated = await cartService.update({ itemId: "22222222-2222-2222-2222-222222222222", quantity: 10 });

    expect(added).toEqual(cartResponse.items);
    expect(updated).toEqual(cartResponse.items);
  });

  it("keeps deleted items and handles an unavailable selected variant", async () => {
    httpClient.get.mockResolvedValue({
      data: {
        ...cartResponse,
        items: [{ ...cartResponse.items[0], productStatus: "Archived", isDeleted: true, variants: [] }],
      },
    });

    await expect(cartService.get()).resolves.toEqual([
      expect.objectContaining({ productStatus: "Archived", isDeleted: true, variants: [] }),
    ]);
  });
});

describe("cartService.update variant selection", () => {
  it("sends the selected variant and current quantity to the API", async () => {
    httpClient.patch.mockResolvedValue({ data: cartResponse });
    const variantId = "33333333-3333-3333-3333-333333333333";

    await expect(cartService.update({ itemId: "cart-item", variantId, quantity: 2 })).resolves.toEqual(
      cartResponse.items,
    );

    expect(httpClient.patch).toHaveBeenCalledWith("/cart/items/cart-item", { variantId, quantity: 2 });
  });

  it("rejects invalid variant identifiers before sending a request", async () => {
    await expect(cartService.update({ itemId: "cart-item", variantId: "invalid", quantity: 2 })).rejects.toThrow();
    expect(httpClient.patch).not.toHaveBeenCalled();
  });

  it("propagates update failures without returning a replacement cart", async () => {
    const error = new Error("Variant unavailable");
    httpClient.patch.mockRejectedValue(error);

    await expect(
      cartService.update({ itemId: "cart-item", variantId: "33333333-3333-3333-3333-333333333333", quantity: 2 }),
    ).rejects.toBe(error);
  });
});

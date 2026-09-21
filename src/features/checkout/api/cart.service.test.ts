import { afterEach, describe, expect, it, vi } from "vitest";

const httpClient = vi.hoisted(() => ({ get: vi.fn() }));

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
    },
  ],
  subtotal: 995,
  currency: "SGD",
  updatedAt: "2026-08-21T10:00:00+00:00",
};

afterEach(() => {
  httpClient.get.mockReset();
});

describe("cartService.get", () => {
  it("loads the authenticated cart with cancellation and maps API fields for the UI", async () => {
    httpClient.get.mockResolvedValue({ data: cartResponse });
    const controller = new AbortController();

    await expect(cartService.get(controller.signal)).resolves.toEqual([
      {
        id: cartResponse.items[0]?.id,
        variantId: cartResponse.items[0]?.variantId,
        productId: cartResponse.items[0]?.productId,
        name: "Example Product",
        catalogNumber: "SKU-001",
        quantity: 10,
        unitPrice: 99.5,
        currency: "SGD",
        lineTotal: 995,
        stockQty: 10,
      },
    ]);
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

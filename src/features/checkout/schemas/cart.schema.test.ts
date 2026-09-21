import { describe, expect, it } from "vitest";

import { cartResponseSchema } from "./cart.schema";

const response = {
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

describe("cartResponseSchema", () => {
  it("validates the complete cart response", () => {
    expect(cartResponseSchema.parse(response)).toEqual(response);
  });

  it("rejects malformed nested cart items", () => {
    expect(() =>
      cartResponseSchema.parse({
        ...response,
        items: [{ ...response.items[0], quantity: 0 }],
      }),
    ).toThrow();
  });
});

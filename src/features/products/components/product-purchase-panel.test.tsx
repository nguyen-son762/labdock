import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { cartService } from "@/features/checkout/api/cart.service";
import { renderWithProviders } from "@/test/render-with-providers";

import type { Product } from "../products.types";
import { ProductPurchasePanel } from "./product-purchase-panel";

vi.mock("@/i18n/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

const product: Product = {
  id: "11111111-1111-1111-1111-111111111111",
  name: "Example Product",
  slug: "example-product",
  productNo: "SKU-001",
  status: 3,
  brandName: "Example Brand",
  notes: "Handle with care",
  description: "Example description",
  specialRequirement: true,
  restrictedCondition: false,
  priceVisible: true,
  casNumber: "64-17-5",
  specifications: [],
  variants: [
    {
      id: "22222222-2222-2222-2222-222222222222",
      sku: "SKU-001-100",
      priceVisible: true,
      unitPrice: 100,
      rfqBasePrice: 100,
      promotionPercent: 0,
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
    {
      id: "55555555-5555-5555-5555-555555555555",
      sku: "SKU-001-200",
      priceVisible: true,
      unitPrice: 180,
      rfqBasePrice: 200,
      promotionPercent: 10,
      currency: "SGD",
      stockQty: 5,
      isActive: true,
      selections: [
        {
          attributeId: "33333333-3333-3333-3333-333333333333",
          attributeCode: "size",
          attributeName: "Size",
          valueId: "66666666-6666-6666-6666-666666666666",
          valueCode: "200ml",
          value: "200ml",
        },
      ],
    },
  ],
  media: [],
  documents: [],
  related: [],
  certificates: [{ id: "77777777-7777-7777-7777-777777777777", name: "ISO 27001" }],
  isNew: false,
  isOutstanding: false,
};

describe("ProductPurchasePanel", () => {
  it("adds the variant selected from the API payload to cart", async () => {
    const addSpy = vi.spyOn(cartService, "add").mockResolvedValue([]);
    const user = userEvent.setup();
    renderWithProviders(<ProductPurchasePanel product={product} />);

    await user.click(screen.getByRole("button", { name: "200ml" }));
    await user.click(screen.getByRole("button", { name: "Add to cart" }));

    expect(addSpy).toHaveBeenCalledWith(
      expect.objectContaining({ catalogNumber: "SKU-001-200", size: "200ml", unitPrice: 180 }),
      expect.anything(),
    );
    expect(await screen.findByText(`${product.name} added to cart.`)).toBeInTheDocument();
    expect(screen.getByText("ISO 27001")).toBeInTheDocument();
  });
});

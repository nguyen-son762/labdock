import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test/render-with-providers";

import { cartService } from "@/features/checkout/api/cart.service";

import type { Product } from "../products.types";
import { ProductCard } from "./product-card";

const product: Product = {
  id: "11111111-1111-1111-1111-111111111111",
  name: "Round Bottom Flask",
  slug: "round-bottom-flask",
  productNo: "BK-00120",
  status: 1,
  brandName: "Medisafe",
  notes: "",
  description: "Laboratory flask",
  specialRequirement: false,
  restrictedCondition: false,
  priceVisible: true,
  casNumber: "",
  specifications: [],
  variants: [
    {
      id: "22222222-2222-2222-2222-222222222222",
      sku: "BK-00120-50ML",
      priceVisible: true,
      unitPrice: 1000,
      rfqBasePrice: 1000,
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
          valueCode: "50ml",
          value: "50ml",
        },
      ],
    },
  ],
  media: [
    {
      id: "55555555-5555-5555-5555-555555555555",
      url: "/home/product-flask-round.png",
      contentType: "image/png",
      sortOrder: 0,
      isPrimary: true,
    },
  ],
  documents: [],
  related: [],
  certificates: [],
  isNew: true,
  isOutstanding: false,
};

describe("ProductCard", () => {
  it("links an available product to its detail page", () => {
    renderWithProviders(<ProductCard product={product} />);
    expect(screen.getByRole("link", { name: "Buy now" })).toHaveAttribute("href", "/products/round-bottom-flask");
    expect(screen.getByText(product.brandName)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: `Add ${product.name} to cart` })).toBeInTheDocument();
  });

  it("shows learn more and hides cart for out of stock products", () => {
    renderWithProviders(
      <ProductCard
        product={{ ...product, variants: product.variants.map((variant) => ({ ...variant, stockQty: 0 })) }}
      />,
    );
    expect(screen.getByRole("link", { name: "Learn more" })).toHaveAttribute("href", "/products/round-bottom-flask");
    expect(screen.queryByRole("button", { name: `Add ${product.name} to cart` })).not.toBeInTheDocument();
  });

  it("shows contact pricing and hides cart when the API price is not visible", () => {
    renderWithProviders(<ProductCard product={{ ...product, priceVisible: false }} />);

    expect(screen.getByText("Contact for price")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Learn more" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: `Add ${product.name} to cart` })).not.toBeInTheDocument();
  });

  it("adds the selected product to the shared cart", async () => {
    const addSpy = vi.spyOn(cartService, "add").mockResolvedValue();
    const user = userEvent.setup();
    renderWithProviders(<ProductCard product={product} />);

    await user.click(screen.getByRole("button", { name: `Add ${product.name} to cart` }));

    expect(addSpy).toHaveBeenCalledWith(
      expect.objectContaining({ id: product.id, quantity: 1, size: "50ml", unitPrice: 1000 }),
      expect.anything(),
    );
    expect(await screen.findByText(`${product.name} added to cart.`)).toBeInTheDocument();
  });
});

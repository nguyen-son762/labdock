import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test/render-with-providers";

import { cartService } from "@/features/checkout/api/cart.service";

import type { Product } from "../products.types";
import { ProductCard } from "./product-card";

const product: Product = {
  id: "round-bottom-flask",
  name: "Round Bottom Flask",
  image: "/home/product-flask-round.png",
  volume: "50ml",
  brand: "Medisafe",
  price: "$1,000.00",
  currency: "SGD",
  category: "Laboratory Equipment",
  origin: "Singapore",
  catalogNumber: "BK-00120",
  description: "Laboratory flask",
  specifications: [],
};

describe("ProductCard", () => {
  it("links an available product to its detail page", () => {
    renderWithProviders(<ProductCard product={product} />);
    expect(screen.getByRole("link", { name: "Buy now" })).toHaveAttribute("href", "/products/round-bottom-flask");
    expect(screen.getByRole("button", { name: `Add ${product.name} to cart` })).toBeInTheDocument();
  });

  it("shows learn more and hides cart for out of stock products", () => {
    renderWithProviders(<ProductCard product={{ ...product, badge: "Out of stock" }} />);
    expect(screen.getByRole("link", { name: "Learn more" })).toHaveAttribute("href", "/products/round-bottom-flask");
    expect(screen.queryByRole("button", { name: `Add ${product.name} to cart` })).not.toBeInTheDocument();
  });

  it("adds the selected product to the shared cart", async () => {
    const addSpy = vi.spyOn(cartService, "add").mockResolvedValue([]);
    const user = userEvent.setup();
    renderWithProviders(<ProductCard product={product} />);

    await user.click(screen.getByRole("button", { name: `Add ${product.name} to cart` }));

    expect(addSpy).toHaveBeenCalledWith(
      expect.objectContaining({ id: product.id, quantity: 1, size: product.volume, unitPrice: 1000 }),
      expect.anything(),
    );
    expect(await screen.findByText(`${product.name} added to cart.`)).toBeInTheDocument();
  });
});

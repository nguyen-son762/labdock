import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Product } from "../home.types";
import { ProductCard } from "./product-card";

const product: Product = {
  id: "round-bottom-flask",
  name: "Round Bottom Flask",
  image: "/home/product-flask-round.png",
  volume: "50ml",
  brand: "Medisafe",
  price: "$1,000.00",
};

describe("ProductCard", () => {
  it("exposes the product actions with accessible names", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByRole("link", { name: "Buy now" })).toHaveAttribute("href", "/products/round-bottom-flask");
    expect(screen.getByRole("button", { name: "Add Round Bottom Flask to cart" })).toBeInTheDocument();
    expect(screen.getByAltText("Round Bottom Flask")).toBeInTheDocument();
  });

  it("shows a learn-more action when the product is out of stock", () => {
    render(<ProductCard product={{ ...product, badge: "Out of stock" }} />);

    expect(screen.getByRole("link", { name: "Learn more" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /add round bottom flask/i })).not.toBeInTheDocument();
  });
});

import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test/render-with-providers";

import { cartService } from "../api/cart.service";
import { checkoutItems } from "../data/checkout-data";
import { CartScreen } from "./cart-screen";

const variants = [
  {
    id: "22222222-2222-2222-2222-222222222222",
    sku: "BEAKER-1L",
    unitPrice: 35,
    currency: "SGD",
    stockQty: 25,
    displayName: "Size: 1 L",
    selections: [],
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    sku: "BEAKER-2L",
    unitPrice: 50,
    currency: "SGD",
    stockQty: 20,
    displayName: "Size: 2 L",
    selections: [],
  },
];
const item = { ...checkoutItems[0]!, variantId: variants[0]!.id, variants, quantity: 2 };

beforeEach(() => {
  vi.spyOn(cartService, "get").mockResolvedValue([item]);
});

it("updates the selected variant through the API and renders the returned cart", async () => {
  const user = userEvent.setup();
  const variant = variants[1]!;
  const update = vi
    .spyOn(cartService, "update")
    .mockResolvedValue([
      { ...item, variantId: variant.id, sku: variant.sku, unitPrice: variant.unitPrice, lineTotal: 100 },
    ]);
  renderWithProviders(<CartScreen />);

  const select = await screen.findByRole("combobox", { name: /option for beakers/i });
  await user.click(select);
  await user.click(screen.getByRole("option", { name: "Size: 2 L" }));

  await waitFor(() =>
    expect(update).toHaveBeenCalledWith({ itemId: item.id, variantId: variant.id, quantity: 2 }, expect.anything()),
  );
  await waitFor(() => expect(select).toHaveTextContent("Size: 2 L"));
  expect(screen.getByText("$50.00")).toBeInTheDocument();
  expect(screen.getByText(/Product no: BEAKER-2L/)).toBeInTheDocument();
});

it("keeps the previous option and displays an error when the API rejects the change", async () => {
  const user = userEvent.setup();
  vi.spyOn(cartService, "update").mockRejectedValue(new Error("Variant unavailable"));
  renderWithProviders(<CartScreen />);

  const select = await screen.findByRole("combobox", { name: /option for beakers/i });
  await user.click(select);
  await user.click(screen.getByRole("option", { name: "Size: 2 L" }));

  expect(await screen.findByRole("alert")).toHaveTextContent("We could not update this item. Please try again.");
  expect(select).toHaveTextContent("Size: 1 L");
});

it("CART-002 shows the empty cart after loading an empty response", async () => {
  vi.spyOn(cartService, "get").mockResolvedValue([]);
  renderWithProviders(<CartScreen />);
  expect(await screen.findByRole("heading", { name: "Your cart is empty" })).toBeInTheDocument();
});
it("CART-003 reports a cart loading failure", async () => {
  vi.spyOn(cartService, "get").mockRejectedValue(new Error("Cart unavailable"));
  renderWithProviders(<CartScreen />);
  expect(await screen.findByRole("alert")).toHaveTextContent("We could not load your cart.");
});
it("CART-015 preserves the item and reports a failed removal", async () => {
  vi.spyOn(cartService, "remove").mockRejectedValue(new Error("Remove unavailable"));
  renderWithProviders(<CartScreen />);
  await userEvent.setup().click(await screen.findByRole("button", { name: `Remove ${item.productName}` }));
  expect(await screen.findByRole("alert")).toHaveTextContent("We could not remove this item.");
  expect(screen.getByText(item.productName)).toBeInTheDocument();
});
it("CART-014 removes the final item and displays the empty state", async () => {
  vi.spyOn(cartService, "get").mockResolvedValueOnce([item]).mockResolvedValue([]);
  vi.spyOn(cartService, "remove").mockResolvedValue();
  renderWithProviders(<CartScreen />);
  await userEvent.setup().click(await screen.findByRole("button", { name: `Remove ${item.productName}` }));
  expect(await screen.findByRole("heading", { name: "Your cart is empty" })).toBeInTheDocument();
});
it("CART-004 CART-005 CART-024 defaults to all items and changes checkout/quote links with selection", async () => {
  const interaction = userEvent.setup();
  vi.spyOn(cartService, "get").mockResolvedValue(checkoutItems);
  renderWithProviders(<CartScreen />);
  const first = await screen.findByRole("checkbox", { name: `Select ${checkoutItems[0]?.productName}` });
  expect(first).toBeChecked();
  const checkout = screen.getByRole("link", { name: "Proceed to checkout" });
  expect(checkout).toHaveAttribute("href", "/checkout?items=beaker-griffin%2Cdigital-microscope");
  await interaction.click(first);
  expect(checkout).toHaveAttribute("href", "/checkout?items=digital-microscope");
  expect(screen.getByRole("link", { name: "Request for quote" })).toHaveAttribute(
    "href",
    "/request-quote?items=digital-microscope",
  );
  await interaction.click(screen.getByRole("checkbox", { name: `Select ${checkoutItems[1]?.productName}` }));
  expect(checkout).toHaveAttribute("aria-disabled", "true");
  expect(checkout).toHaveAttribute("href", "#cart-products");
});

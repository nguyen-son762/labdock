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
    selections: [],
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    sku: "BEAKER-2L",
    unitPrice: 50,
    currency: "SGD",
    stockQty: 20,
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
  await user.click(screen.getByRole("option", { name: "BEAKER-2L" }));

  await waitFor(() =>
    expect(update).toHaveBeenCalledWith({ itemId: item.id, variantId: variant.id, quantity: 2 }, expect.anything()),
  );
  await waitFor(() => expect(select).toHaveTextContent("BEAKER-2L"));
  expect(screen.getByText("$50.00")).toBeInTheDocument();
  expect(screen.getByText(/Product no: BEAKER-2L/)).toBeInTheDocument();
});

it("keeps the previous option and displays an error when the API rejects the change", async () => {
  const user = userEvent.setup();
  vi.spyOn(cartService, "update").mockRejectedValue(new Error("Variant unavailable"));
  renderWithProviders(<CartScreen />);

  const select = await screen.findByRole("combobox", { name: /option for beakers/i });
  await user.click(select);
  await user.click(screen.getByRole("option", { name: "BEAKER-2L" }));

  expect(await screen.findByRole("alert")).toHaveTextContent("We could not update this item. Please try again.");
  expect(select).toHaveTextContent("BEAKER-1L");
});

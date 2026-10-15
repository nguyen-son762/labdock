import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test/render-with-providers";

import { checkoutItems } from "../data/checkout-data";
import { CartItemsTable } from "./cart-items-table";

const item = {
  ...checkoutItems[0]!,
  quantity: 1,
  variantId: "22222222-2222-2222-2222-222222222222",
  variants: [
    {
      id: "22222222-2222-2222-2222-222222222222",
      sku: "BEAKER-1L",
      unitPrice: 35,
      currency: "SGD",
      stockQty: 25,
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
};

describe("CartItemsTable", () => {
  it("keeps quantity focused while typing and commits the formatted value on blur", async () => {
    const user = userEvent.setup();
    const onQuantityChange = vi.fn();

    renderWithProviders(
      <CartItemsTable
        items={[item]}
        selectedIds={[item.id]}
        onSelectedIdsChange={vi.fn()}
        onQuantityChange={onQuantityChange}
        onVariantChange={vi.fn()}
        onRemove={vi.fn()}
      />,
    );

    expect(screen.getByText(item.productName)).toBeInTheDocument();
    expect(screen.getByText(/9000000001/)).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /option for beakers/i })).toHaveTextContent("1 L");
    const quantity = screen.getByRole("textbox", { name: /quantity for beakers/i });
    await user.click(quantity);
    await user.clear(quantity);
    await user.type(quantity, "12");

    expect(quantity).toHaveFocus();
    expect(onQuantityChange).not.toHaveBeenCalled();

    await user.tab();
    expect(onQuantityChange).toHaveBeenCalledOnce();
    expect(onQuantityChange).toHaveBeenCalledWith("beaker-griffin", 12);
  });
});

it("lists variants using every selection value and notifies when the option changes", async () => {
  const user = userEvent.setup();
  const onVariantChange = vi.fn();
  const variant = item.variants[0]!;
  const alternative = {
    ...variant,
    id: "33333333-3333-3333-3333-333333333333",
    selections: [
      { ...variant.selections[0]!, value: "2 L" },
      { ...variant.selections[0]!, attributeCode: "color", value: "Blue" },
    ],
  };
  const skuOnly = { ...variant, id: "44444444-4444-4444-4444-444444444444", sku: "BEAKER-PLAIN", selections: [] };

  renderWithProviders(
    <CartItemsTable
      items={[{ ...item, variants: [variant, alternative, skuOnly] }]}
      selectedIds={[item.id]}
      onSelectedIdsChange={vi.fn()}
      onQuantityChange={vi.fn()}
      onVariantChange={onVariantChange}
      onRemove={vi.fn()}
    />,
  );

  expect(screen.getAllByText("Option")).toHaveLength(2);
  const select = screen.getByRole("combobox", { name: /option for beakers/i });
  await user.click(select);
  expect(screen.getByRole("option", { name: "1 L" })).toHaveAttribute("aria-selected", "true");
  expect(screen.getByRole("option", { name: "BEAKER-PLAIN" })).toBeInTheDocument();
  await user.click(screen.getByRole("option", { name: "2 L / Blue" }));

  expect(onVariantChange).toHaveBeenCalledExactlyOnceWith(item.id, alternative.id, item.quantity);
});

it("disables option changes while the cart item is being updated", () => {
  renderWithProviders(
    <CartItemsTable
      items={[item]}
      selectedIds={[item.id]}
      onSelectedIdsChange={vi.fn()}
      onQuantityChange={vi.fn()}
      onVariantChange={vi.fn()}
      onRemove={vi.fn()}
      pendingItemId={item.id}
    />,
  );

  expect(screen.getByRole("combobox", { name: /option for beakers/i })).toBeDisabled();
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { checkoutItems } from "../data/checkout-data";
import { CartItemsTable } from "./cart-items-table";

describe("CartItemsTable", () => {
  it("keeps quantity focused while typing and commits the formatted value on blur", async () => {
    const user = userEvent.setup();
    const onQuantityChange = vi.fn();
    const item = { ...checkoutItems[0]!, quantity: 1 };

    render(
      <CartItemsTable
        items={[item]}
        selectedIds={[item.id]}
        onSelectedIdsChange={vi.fn()}
        onQuantityChange={onQuantityChange}
        onSizeChange={vi.fn()}
        onRemove={vi.fn()}
      />,
    );

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

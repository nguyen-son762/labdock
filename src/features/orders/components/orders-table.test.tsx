import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { OrderSummary } from "../schemas/order.schema";
import { OrdersTable } from "./orders-table";

const orders: OrderSummary[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    orderNumber: "OR-3000",
    createdAt: "2026-01-10T08:00:00.000Z",
    status: "Shipped",
    subtotal: 4905,
    tax: 0,
    shippingFee: 0,
    additionalFeeTotal: 0,
    platformFee: 0,
    total: 4905,
    currency: "SGD",
  },
];

describe("OrdersTable", () => {
  it("shows the order data and exposes a detail link", () => {
    render(<OrdersTable orders={orders} total={1} page={1} pageSize={10} onPageChange={vi.fn()} />);

    expect(screen.getAllByRole("link", { name: "#OR-3000" })[0]).toHaveAttribute(
      "href",
      "/orders/11111111-1111-1111-1111-111111111111",
    );
    expect(screen.getAllByText("10 Jan 2026").length).toBeGreaterThan(0);
    expect(screen.getAllByText("$4,905.00").length).toBeGreaterThan(0);
    expect(screen.getByText("Showing 1–1 of 1")).toBeInTheDocument();
  });

  it("requests the next page when more orders are available", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<OrdersTable orders={orders} total={11} page={1} pageSize={10} onPageChange={onPageChange} />);

    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Next" }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});

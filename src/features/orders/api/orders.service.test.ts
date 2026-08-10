import { describe, expect, it } from "vitest";

import { ordersService } from "./orders.service";

describe("ordersService", () => {
  it("filters private mock orders by status and search", async () => {
    const result = await ordersService.list({
      search: "3000",
      status: "shipped",
      month: "2026-01",
      page: 1,
    });

    expect(result.orders).toHaveLength(1);
    expect(result.orders[0]?.id).toBe("OR-3000");
    expect(result.summary.totalSpent).toBe(13905);
  });

  it("rejects an unknown order id", async () => {
    await expect(ordersService.getById("OR-9999")).rejects.toThrow("Order not found");
  });
});

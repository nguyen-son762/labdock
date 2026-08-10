import { describe, expect, it } from "vitest";

import { formatCurrency, formatOrderDate } from "./order-formatters";

describe("order formatters", () => {
  it("formats order dates in the day-month-year order used by the design", () => {
    expect(formatOrderDate("2026-01-10T08:00:00.000Z")).toBe("10 Jan 2026");
  });

  it("formats prices as USD values", () => {
    expect(formatCurrency(4905)).toBe("$4,905.00");
  });
});

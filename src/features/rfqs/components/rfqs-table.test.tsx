import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { RfqSummary } from "../schemas/rfq.schema";
import { RfqsTable } from "./rfqs-table";

const rfqs: RfqSummary[] = [
  {
    id: "RFQ-0018",
    submittedAt: "2026-01-01T08:00:00.000Z",
    totalProducts: 101,
    estimatedValue: 4539.85,
    status: "quoted",
    validUntil: "2026-01-15T08:00:00.000Z",
  },
];

describe("RfqsTable", () => {
  it("shows RFQ data and exposes the detail route", () => {
    render(<RfqsTable rfqs={rfqs} total={1} page={1} onPageChange={vi.fn()} />);

    expect(screen.getAllByRole("link", { name: "#RFQ-0018" })[0]).toHaveAttribute("href", "/rfqs/RFQ-0018");
    expect(screen.getAllByText("01 Jan 2026").length).toBeGreaterThan(0);
    expect(screen.getAllByText("$4,539.85").length).toBeGreaterThan(0);
    expect(screen.getByText("Showing 1–1 of 1")).toBeInTheDocument();
  });

  it("requests the next page when more RFQs are available", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<RfqsTable rfqs={rfqs} total={11} page={1} onPageChange={onPageChange} />);

    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Next" }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});

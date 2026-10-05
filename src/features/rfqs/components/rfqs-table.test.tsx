import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { RfqSummary } from "../schemas/rfq.schema";
import { RfqsTable } from "./rfqs-table";

const rfqs: RfqSummary[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    rfqNumber: "RFQ-2026-001",
    status: "Submitted",
    source: "InApp",
    supplierId: "22222222-2222-2222-2222-222222222222",
    createdAt: "2026-01-01T08:00:00.000Z",
    updatedAt: "2026-01-02T08:00:00.000Z",
  },
];

describe("RfqsTable", () => {
  it("shows API RFQ data and links to detail by id", () => {
    render(<RfqsTable rfqs={rfqs} total={1} page={1} pageSize={10} onPageChange={vi.fn()} />);

    expect(screen.getAllByRole("link", { name: "#RFQ-2026-001" })[0]).toHaveAttribute(
      "href",
      "/rfqs/11111111-1111-1111-1111-111111111111",
    );
    expect(screen.getAllByText("01 Jan 2026").length).toBeGreaterThan(0);
    expect(screen.getAllByText("InApp").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Submitted").length).toBeGreaterThan(0);
    expect(screen.getByText("Showing 1–1 of 1")).toBeInTheDocument();
  });

  it("requests the next page when more RFQs are available", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<RfqsTable rfqs={rfqs} total={11} page={1} pageSize={10} onPageChange={onPageChange} />);

    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Next" }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});

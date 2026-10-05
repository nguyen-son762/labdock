import { afterEach, describe, expect, it, vi } from "vitest";

const httpClient = vi.hoisted(() => ({ get: vi.fn() }));

vi.mock("@/lib/http-client", () => ({ httpClient }));

import { rfqsService } from "./rfqs.service";

const rfq = {
  id: "11111111-1111-1111-1111-111111111111",
  rfqNumber: "RFQ-2026-001",
  status: "Submitted",
  source: "InApp",
  supplierId: "11111111-1111-1111-1111-111111111111",
  createdAt: "2026-08-21T10:00:00+00:00",
  updatedAt: "2026-08-21T10:00:00+00:00",
};

describe("rfqsService", () => {
  afterEach(() => httpClient.get.mockReset());

  it("fetches a paginated RFQ list and validates the response", async () => {
    httpClient.get.mockResolvedValue({ data: { items: [rfq], page: 2, pageSize: 10, total: 11 } });
    const controller = new AbortController();

    const result = await rfqsService.list({ page: 2, pageSize: 10 }, controller.signal);

    expect(httpClient.get).toHaveBeenCalledWith("/rfqs", {
      params: { page: 2, pageSize: 10 },
      signal: controller.signal,
    });
    expect(result.items).toEqual([rfq]);
    expect(result.total).toBe(11);
  });

  it("fetches RFQ detail by id and validates its items and remarks", async () => {
    const detail = {
      ...rfq,
      userId: "11111111-1111-1111-1111-111111111111",
      notes: "Need a bulk quotation.",
      adminRemarks: "Reviewed.",
      supplierRemarks: "Available in 2 weeks.",
      items: [
        {
          id: "11111111-1111-1111-1111-111111111111",
          variantId: "11111111-1111-1111-1111-111111111111",
          quantity: 10,
          specNote: "Sterile packaging",
        },
      ],
    };
    httpClient.get.mockResolvedValue({ data: detail });

    const result = await rfqsService.getById(rfq.id);

    expect(httpClient.get).toHaveBeenCalledWith(`/rfqs/${rfq.id}`, { signal: undefined });
    expect(result.items[0]?.quantity).toBe(10);
    expect(result.supplierRemarks).toBe("Available in 2 weeks.");
  });

  it("rejects an invalid RFQ id before making a request", async () => {
    await expect(rfqsService.getById("RFQ-2026-001")).rejects.toThrow();
    expect(httpClient.get).not.toHaveBeenCalled();
  });
});

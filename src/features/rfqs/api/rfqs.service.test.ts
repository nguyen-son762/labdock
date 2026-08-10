import { describe, expect, it } from "vitest";

import { rfqsService } from "./rfqs.service";

describe("rfqsService", () => {
  it("filters private mock RFQs by status and search", async () => {
    const result = await rfqsService.list({ search: "0018", status: "quoted", month: "2026-01", page: 1 });

    expect(result.rfqs).toHaveLength(1);
    expect(result.rfqs[0]?.id).toBe("RFQ-0018");
    expect(result.summary).toEqual({ totalRfqs: 10, quoted: 3, pending: 2 });
  });

  it("rejects an unknown RFQ id", async () => {
    await expect(rfqsService.getById("RFQ-9999")).rejects.toThrow("RFQ not found");
  });
});

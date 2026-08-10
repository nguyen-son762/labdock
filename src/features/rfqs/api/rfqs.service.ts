import { mockRfqDetail, mockRfqs } from "../data/rfqs-data";
import {
  rfqDetailSchema,
  rfqFiltersSchema,
  rfqListResponseSchema,
  type RfqDetail,
  type RfqFilters,
  type RfqListResponse,
} from "../schemas/rfq.schema";

const MOCK_DELAY_MS = 420;
const PAGE_SIZE = 10;

function waitForMockApi(signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = globalThis.setTimeout(resolve, MOCK_DELAY_MS);
    signal?.addEventListener(
      "abort",
      () => {
        globalThis.clearTimeout(timeout);
        reject(new DOMException("Request aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

export const rfqsService = {
  async list(input: RfqFilters, signal?: AbortSignal): Promise<RfqListResponse> {
    const filters = rfqFiltersSchema.parse(input);
    await waitForMockApi(signal);
    const filtered = mockRfqs.filter((rfq) => {
      const matchesSearch = rfq.id.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === "all" || rfq.status === filters.status;
      const matchesMonth = !filters.month || rfq.submittedAt.startsWith(filters.month);
      return matchesSearch && matchesStatus && matchesMonth;
    });
    const start = (filters.page - 1) * PAGE_SIZE;

    return rfqListResponseSchema.parse({
      rfqs: filtered.slice(start, start + PAGE_SIZE),
      total: filtered.length,
      summary: { totalRfqs: 10, quoted: 3, pending: 2 },
    });
  },

  async getById(id: string, signal?: AbortSignal): Promise<RfqDetail> {
    await waitForMockApi(signal);
    const summary = mockRfqs.find((rfq) => rfq.id === id);
    if (!summary) throw new Error("RFQ not found.");
    return rfqDetailSchema.parse({ ...mockRfqDetail, ...summary });
  },
};

import { mockOrderDetail, mockOrders } from "../data/orders-data";
import {
  orderDetailSchema,
  orderFiltersSchema,
  orderListResponseSchema,
  type OrderDetail,
  type OrderFilters,
  type OrderListResponse,
} from "../schemas/order.schema";

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

export const ordersService = {
  async list(input: OrderFilters, signal?: AbortSignal): Promise<OrderListResponse> {
    const filters = orderFiltersSchema.parse(input);
    await waitForMockApi(signal);
    const allOrders = mockOrders;
    const filtered = allOrders.filter((order) => {
      const matchesSearch = order.id.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === "all" || order.status === filters.status;
      const matchesMonth = !filters.month || order.orderedAt.startsWith(filters.month);
      return matchesSearch && matchesStatus && matchesMonth;
    });
    const start = (filters.page - 1) * PAGE_SIZE;
    return orderListResponseSchema.parse({
      orders: filtered.slice(start, start + PAGE_SIZE),
      total: filtered.length,
      summary: {
        totalSpent: allOrders.reduce((sum, order) => sum + order.total, 0),
        totalOrders: allOrders.length,
        awaitingShipment: allOrders.filter((order) => order.status === "awaiting-shipment").length,
        shipped: allOrders.filter((order) => order.status === "shipped").length,
        delivered: allOrders.filter((order) => order.status === "delivered").length,
      },
    });
  },

  async getById(id: string, signal?: AbortSignal): Promise<OrderDetail> {
    await waitForMockApi(signal);
    const summary = mockOrders.find((order) => order.id === id);
    if (!summary) throw new Error("Order not found.");
    return orderDetailSchema.parse({ ...mockOrderDetail, ...summary });
  },

  async downloadInvoice(invoiceNumber: string): Promise<string> {
    await waitForMockApi();
    return invoiceNumber;
  },
};

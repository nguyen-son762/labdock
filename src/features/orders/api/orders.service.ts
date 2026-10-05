import { httpClient } from "@/lib/http-client";

import {
  orderDetailSchema,
  orderFiltersSchema,
  orderListResponseSchema,
  type OrderDetail,
  type OrderFilters,
  type OrderListResponse,
} from "../schemas/order.schema";

const orderIdSchema = orderDetailSchema.shape.id;

export const ordersService = {
  async list(input: OrderFilters, signal?: AbortSignal): Promise<OrderListResponse> {
    const { page, pageSize } = orderFiltersSchema.parse(input);
    const response = await httpClient.get<unknown>("/orders", {
      params: { page, pageSize },
      signal,
    });

    return orderListResponseSchema.parse(response.data);
  },

  async getById(id: string, signal?: AbortSignal): Promise<OrderDetail> {
    const orderId = orderIdSchema.parse(id);
    const response = await httpClient.get<unknown>(`/orders/${encodeURIComponent(orderId)}`, { signal });

    return orderDetailSchema.parse(response.data);
  },
};

import { z } from "zod";

export const orderStatusSchema = z.enum(["awaiting-shipment", "shipped", "delivered", "cancelled"]);

export const orderSummarySchema = z.object({
  id: z.string().regex(/^OR-\d{4}$/),
  orderedAt: z.string().datetime(),
  status: orderStatusSchema,
  total: z.number().nonnegative(),
});

export const orderItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  catalogNumber: z.string().min(1),
  image: z.string().min(1),
  unitPrice: z.number().nonnegative(),
  size: z.string().min(1),
  quantity: z.number().int().positive(),
  subtotal: z.number().nonnegative(),
});

export const orderDetailSchema = orderSummarySchema.extend({
  items: z.array(orderItemSchema).min(1),
  subtotal: z.number().nonnegative(),
  deliveryFee: z.number().nonnegative(),
  tax: z.number().nonnegative(),
  tracking: z.object({
    number: z.string().min(1),
    carrier: z.string().min(1),
    confirmedAt: z.string().datetime(),
    awaitingAt: z.string().datetime(),
    shippedAt: z.string().datetime(),
    estimatedDeliveryAt: z.string().datetime(),
  }),
  delivery: z.object({ name: z.string(), company: z.string(), address: z.string(), phone: z.string() }),
  payment: z.object({
    cardLastFour: z.string().length(4),
    chargedAt: z.string().datetime(),
    invoiceNumber: z.string(),
  }),
});

export const orderFilterStatusSchema = z.union([orderStatusSchema, z.literal("all")]);

export const orderFiltersSchema = z.object({
  search: z.string().trim().max(80).default(""),
  status: orderFilterStatusSchema.default("all"),
  month: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .optional(),
  page: z.number().int().positive().default(1),
});

export const orderListResponseSchema = z.object({
  orders: z.array(orderSummarySchema),
  total: z.number().int().nonnegative(),
  summary: z.object({
    totalSpent: z.number(),
    totalOrders: z.number(),
    awaitingShipment: z.number(),
    shipped: z.number(),
    delivered: z.number(),
  }),
});

export type OrderStatus = z.infer<typeof orderStatusSchema>;
export type OrderSummary = z.infer<typeof orderSummarySchema>;
export type OrderDetail = z.infer<typeof orderDetailSchema>;
export type OrderFilters = z.infer<typeof orderFiltersSchema>;
export type OrderListResponse = z.infer<typeof orderListResponseSchema>;

import { z } from "zod";

export const rfqStatusSchema = z.enum(["quoted", "pending", "declined", "accepted", "expired"]);

export const rfqSummarySchema = z.object({
  id: z.string().regex(/^RFQ-\d{4}$/),
  submittedAt: z.string().datetime(),
  totalProducts: z.number().int().positive(),
  estimatedValue: z.number().nonnegative(),
  status: rfqStatusSchema,
  validUntil: z.string().datetime().nullable(),
});

export const rfqItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  catalogNumber: z.string().min(1),
  image: z.string().min(1),
  unitPrice: z.number().nonnegative(),
  size: z.string().min(1),
  requestedQuantity: z.number().int().positive(),
  quotedUnitPrice: z.number().nonnegative(),
  subtotal: z.number().nonnegative(),
});

export const rfqDetailSchema = rfqSummarySchema.extend({
  items: z.array(rfqItemSchema).min(1),
  subtotal: z.number().nonnegative(),
  deliveryFee: z.number().nonnegative(),
  tax: z.number().nonnegative(),
  inquiryMessage: z.string().min(1),
});

export const rfqFilterStatusSchema = z.union([rfqStatusSchema, z.literal("all")]);

export const rfqFiltersSchema = z.object({
  search: z.string().trim().max(80).default(""),
  status: rfqFilterStatusSchema.default("all"),
  month: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .optional(),
  page: z.number().int().positive().default(1),
});

export const rfqListResponseSchema = z.object({
  rfqs: z.array(rfqSummarySchema),
  total: z.number().int().nonnegative(),
  summary: z.object({
    totalRfqs: z.number().int().nonnegative(),
    quoted: z.number().int().nonnegative(),
    pending: z.number().int().nonnegative(),
  }),
});

export type RfqStatus = z.infer<typeof rfqStatusSchema>;
export type RfqSummary = z.infer<typeof rfqSummarySchema>;
export type RfqDetail = z.infer<typeof rfqDetailSchema>;
export type RfqFilters = z.infer<typeof rfqFiltersSchema>;
export type RfqListResponse = z.infer<typeof rfqListResponseSchema>;

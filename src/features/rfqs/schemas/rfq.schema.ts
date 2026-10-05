import { z } from "zod";

// Accept GUID-shaped values even if a documented sample omits RFC UUID variant bits.
const guidSchema = z.guid();
const dateTimeSchema = z.iso.datetime({ offset: true });

export const rfqStatusSchema = z.string().trim().min(1);

export const rfqSummarySchema = z.object({
  id: guidSchema,
  rfqNumber: z.string().min(1),
  status: rfqStatusSchema,
  source: z.string().min(1),
  supplierId: guidSchema,
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
});

export const rfqItemSchema = z.object({
  id: guidSchema,
  variantId: guidSchema,
  quantity: z.number().int().positive(),
  specNote: z.string().nullable().optional(),
});

export const rfqDetailSchema = rfqSummarySchema.extend({
  userId: guidSchema,
  notes: z.string().nullable().optional(),
  adminRemarks: z.string().nullable().optional(),
  supplierRemarks: z.string().nullable().optional(),
  items: z.array(rfqItemSchema),
});

export const rfqFiltersSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(10),
});

export const rfqListResponseSchema = z.object({
  items: z.array(rfqSummarySchema),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  total: z.number().int().nonnegative(),
});

export type RfqStatus = z.infer<typeof rfqStatusSchema>;
export type RfqSummary = z.infer<typeof rfqSummarySchema>;
export type RfqItem = z.infer<typeof rfqItemSchema>;
export type RfqDetail = z.infer<typeof rfqDetailSchema>;
export type RfqFilters = z.infer<typeof rfqFiltersSchema>;
export type RfqListResponse = z.infer<typeof rfqListResponseSchema>;

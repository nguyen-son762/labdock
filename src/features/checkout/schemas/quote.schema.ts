import { z } from "zod";

export const quoteContactSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  phoneCountry: z.string().min(1, "Select a country code."),
  phone: z
    .string()
    .trim()
    .regex(/^\d[\d\s-]{6,18}$/, "Enter a valid phone number."),
  email: z.email("Enter a valid email address."),
  companyName: z.string().trim().max(100).optional(),
  region: z.string().min(1, "Select a region."),
});

export const submitQuoteInputSchema = z.object({
  contact: quoteContactSchema,
  itemIds: z.array(z.string().min(1)).min(1, "Select at least one product."),
  idempotencyKey: z.uuid(),
});

export const quoteSubmissionSchema = z.object({ reference: z.string().min(1), status: z.literal("submitted") });

export type QuoteContactValues = z.infer<typeof quoteContactSchema>;
export type SubmitQuoteInput = z.infer<typeof submitQuoteInputSchema>;
export type QuoteSubmission = z.infer<typeof quoteSubmissionSchema>;

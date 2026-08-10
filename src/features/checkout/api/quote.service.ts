import {
  quoteSubmissionSchema,
  submitQuoteInputSchema,
  type QuoteSubmission,
  type SubmitQuoteInput,
} from "../schemas/quote.schema";

const MOCK_DELAY_MS = 550;

export const quoteService = {
  async submit(input: SubmitQuoteInput): Promise<QuoteSubmission> {
    const parsed = submitQuoteInputSchema.parse(input);
    await new Promise((resolve) => globalThis.setTimeout(resolve, MOCK_DELAY_MS));
    return quoteSubmissionSchema.parse({
      reference: `RFQ-${parsed.idempotencyKey.slice(0, 8).toUpperCase()}`,
      status: "submitted",
    });
  },
};

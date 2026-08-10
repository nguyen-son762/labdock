import {
  contactSubmissionSchema,
  submitContactInputSchema,
  type ContactSubmission,
  type SubmitContactInput,
} from "../schemas/contact.schema";

const MOCK_DELAY_MS = 550;

export const contactService = {
  async submit(input: SubmitContactInput): Promise<ContactSubmission> {
    const parsed = submitContactInputSchema.parse(input);
    await new Promise((resolve) => globalThis.setTimeout(resolve, MOCK_DELAY_MS));
    return contactSubmissionSchema.parse({
      reference: `${parsed.contact.inquiryType === "quote" ? "RFQ" : "MSG"}-${parsed.idempotencyKey.slice(0, 8).toUpperCase()}`,
      status: "submitted",
    });
  },
};

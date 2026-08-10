import { z } from "zod";

import type { CheckoutSession, PaymentResult } from "../checkout.types";
import { calculateOrderTotals } from "../data/checkout-data";
import {
  completePaymentInputSchema,
  createCheckoutInputSchema,
  type CompletePaymentInput,
  type CreateCheckoutInput,
} from "../schemas/checkout.schema";

const MOCK_DELAY_MS = 550;

const checkoutSessionSchema = z.object({ paymentReference: z.string(), amount: z.number().positive() });
const paymentResultSchema = z.object({ orderId: z.string(), status: z.literal("paid") });

function waitForMockApi(): Promise<void> {
  return new Promise((resolve) => globalThis.setTimeout(resolve, MOCK_DELAY_MS));
}

export const checkoutService = {
  async create(input: CreateCheckoutInput): Promise<CheckoutSession> {
    const parsed = createCheckoutInputSchema.parse(input);
    await waitForMockApi();
    return checkoutSessionSchema.parse({
      paymentReference: `PAY-${parsed.idempotencyKey.slice(0, 8).toUpperCase()}`,
      amount: calculateOrderTotals(parsed.items).total,
    });
  },

  async completePayment(input: CompletePaymentInput): Promise<PaymentResult> {
    completePaymentInputSchema.parse(input);
    await waitForMockApi();
    return paymentResultSchema.parse({ orderId: "OR-3000", status: "paid" });
  },
};

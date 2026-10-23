import { z } from "zod";

import { resolveCountryCode } from "@/constants/country-options";
import { httpClient } from "@/lib/http-client";

import type { CheckoutSession, PaymentResult } from "../checkout.types";
import {
  checkoutSessionSchema,
  completePaymentInputSchema,
  createCheckoutInputSchema,
  createCheckoutRequestSchema,
  type CompletePaymentInput,
  type CreateCheckoutInput,
} from "../schemas/checkout.schema";

const MOCK_DELAY_MS = 550;

const paymentResultSchema = z.object({ orderId: z.string(), status: z.literal("paid") });

function waitForMockApi(): Promise<void> {
  return new Promise((resolve) => globalThis.setTimeout(resolve, MOCK_DELAY_MS));
}

export const checkoutService = {
  async create(input: CreateCheckoutInput): Promise<CheckoutSession> {
    const { checkout, items } = createCheckoutInputSchema.parse(input);
    const body = createCheckoutRequestSchema.parse({
      cartItemIds: items.map(({ id }) => id),
      recipientName: checkout.fullName,
      phone: checkout.phone.replace(/[\s-]/g, ""),
      addressLine1: checkout.address,
      city: checkout.city,
      country: resolveCountryCode(checkout.country) ?? checkout.country,
      notes: checkout.notes ?? "",
    });
    const response = await httpClient.post<unknown>("/checkout/sessions", body);
    return checkoutSessionSchema.parse(response.data);
  },

  async completePayment(input: CompletePaymentInput): Promise<PaymentResult> {
    completePaymentInputSchema.parse(input);
    await waitForMockApi();
    return paymentResultSchema.parse({ orderId: "OR-3000", status: "paid" });
  },
};

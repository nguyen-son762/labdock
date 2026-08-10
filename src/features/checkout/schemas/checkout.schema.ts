import { z } from "zod";

import { cartItemsSchema } from "./cart.schema";

export const paymentMethodSchema = z.enum(["paynow", "bank-transfer"]);
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;

export const checkoutSchema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your full name."),
    email: z.email("Enter a valid email address."),
    phone: z
      .string()
      .trim()
      .regex(/^[+\d][\d\s-]{7,19}$/, "Enter a valid phone number."),
    companyName: z.string().trim().max(100).optional(),
    address: z.string().trim().min(8, "Enter a complete delivery address."),
    postalCode: z
      .string()
      .trim()
      .regex(/^\d{6}$/, "Postal code must contain 6 digits."),
    country: z.string().min(1, "Select a country."),
    billingSameAsDelivery: z.boolean(),
    billingAddress: z.string().trim().optional(),
    billingPostalCode: z.string().trim().optional(),
    paymentMethod: paymentMethodSchema,
  })
  .superRefine((values, context) => {
    if (!values.billingSameAsDelivery && (!values.billingAddress || values.billingAddress.length < 8)) {
      context.addIssue({ code: "custom", path: ["billingAddress"], message: "Enter a complete billing address." });
    }
    if (!values.billingSameAsDelivery && !/^\d{6}$/.test(values.billingPostalCode ?? "")) {
      context.addIssue({ code: "custom", path: ["billingPostalCode"], message: "Postal code must contain 6 digits." });
    }
  });

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const createCheckoutInputSchema = z.object({
  checkout: checkoutSchema,
  items: cartItemsSchema.min(1, "Select at least one product."),
  idempotencyKey: z.uuid(),
});
export type CreateCheckoutInput = z.infer<typeof createCheckoutInputSchema>;

export const completePaymentInputSchema = z.object({
  paymentReference: z.string().min(1),
  method: paymentMethodSchema,
});
export type CompletePaymentInput = z.infer<typeof completePaymentInputSchema>;

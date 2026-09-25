import { z } from "zod";

export const userRoleSchema = z.enum(["member", "manager", "admin", "unknown"]);

const addressSchema = z.object({
  address: z.string(),
  postalCode: z.string(),
  country: z.string(),
});

export const currentUserSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string(),
  avatarUrl: z.string().min(1),
  companyName: z.string(),
  companyPhone: z.string(),
  businessRegistrationNumber: z.string(),
  deliveryAddress: z.string(),
  postalCode: z.string(),
  country: z.string(),
  billingSameAsDelivery: z.boolean(),
  billingAddress: addressSchema,
  role: userRoleSchema,
  joinedAt: z.string().datetime(),
  lastActiveAt: z.string().datetime().nullable(),
  passwordChangedAt: z.string().datetime().nullable(),
});

export type CurrentUser = z.infer<typeof currentUserSchema>;

import { z } from "zod";

export const userRoleSchema = z.enum(["member", "manager", "admin"]);

export const currentUserSchema = z.object({
  id: z.string().min(1),
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  avatarUrl: z.string().min(1),
  companyName: z.string().min(1),
  companyPhone: z.string().min(1),
  businessRegistrationNumber: z.string().min(1),
  deliveryAddress: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
  billingSameAsDelivery: z.boolean(),
  role: userRoleSchema,
  joinedAt: z.string().datetime(),
  lastActiveAt: z.string().datetime().nullable(),
});

export type CurrentUser = z.infer<typeof currentUserSchema>;

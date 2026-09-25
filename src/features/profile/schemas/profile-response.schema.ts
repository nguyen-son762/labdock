import { z } from "zod";

const optionalTextSchema = z
  .string()
  .nullish()
  .transform((value) => value ?? "");

export const profileAddressSchema = z
  .object({
    address: optionalTextSchema,
    postalCode: optionalTextSchema,
    country: optionalTextSchema,
  })
  .nullish()
  .transform((value) => value ?? { address: "", postalCode: "", country: "" });

export const profileResponseSchema = z.object({
  fullName: z.string().min(1),
  phoneNumber: optionalTextSchema,
  email: z.string().email(),
  companyName: optionalTextSchema,
  companyPhone: optionalTextSchema,
  businessRegistrationNumber: optionalTextSchema,
  deliveryAddress: profileAddressSchema,
  sameAsDeliveryAddress: z
    .boolean()
    .nullish()
    .transform((value) => value ?? false),
  billingAddress: profileAddressSchema,
  profilePictureUrl: z.string().min(1).nullish(),
  passwordChangedAt: z.iso.datetime({ offset: true }).nullish(),
  memberSince: z.iso.datetime({ offset: true }),
});

export type ProfileResponse = z.infer<typeof profileResponseSchema>;

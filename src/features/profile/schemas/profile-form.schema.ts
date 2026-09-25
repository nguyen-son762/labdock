import { z } from "zod";

const optionalCompanyPhoneSchema = z
  .string()
  .trim()
  .max(20)
  .refine((value) => value.length === 0 || value.length >= 6, "Enter a valid company phone number.");

const optionalBusinessRegistrationSchema = z
  .string()
  .trim()
  .max(40)
  .refine((value) => value.length === 0 || value.length >= 3, "Enter a valid business registration number.");

export const profileFormSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must have at least 2 characters.").max(80),
  phone: z.string().trim().min(8, "Enter a valid phone number.").max(20),
  email: z.string().trim().email("Enter a valid email address."),
  companyName: z.string().trim().min(2, "Company name is required.").max(120),
  companyPhone: optionalCompanyPhoneSchema,
  businessRegistrationNumber: optionalBusinessRegistrationSchema,
  deliveryAddress: z.string().trim().min(5, "Delivery address is required.").max(200),
  postalCode: z.string().trim().min(4, "Postal code is required.").max(12),
  country: z.string().trim().min(1, "Country is required."),
  billingSameAsDelivery: z.boolean(),
});

export const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8, "Current password must have at least 8 characters."),
    newPassword: z.string().min(8, "New password must have at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm your new password."),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
export type PasswordFormValues = z.infer<typeof passwordFormSchema>;

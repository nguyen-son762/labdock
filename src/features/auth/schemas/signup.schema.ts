import { z } from "zod";

export const signupSchema = z.object({
  company: z.string().trim().max(160, "Company name is too long."),
  fullName: z.string().trim().min(1, "Please enter your full name."),
  email: z.string().trim().min(1, "Please enter your email address.").email("Enter a valid email address."),
  phoneCode: z.string().min(1, "Please select a calling code."),
  phone: z
    .string()
    .trim()
    .regex(/^\d{6,15}$/, "Enter a valid phone number."),
  country: z.string().min(1, "Please select your country."),
  region: z.string(),
  address: z.string().trim().min(1, "Please enter your address."),
});

export const verificationSchema = z.object({
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter the 6-digit verification code."),
});

export const passwordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type SignupValues = z.infer<typeof signupSchema>;
export type VerificationValues = z.infer<typeof verificationSchema>;
export type PasswordValues = z.infer<typeof passwordSchema>;

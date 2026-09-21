import { z } from "zod";

const guidSchema = z.string().regex(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i, "Invalid identifier.");

export const signupSchema = z.object({
  company: z.string().trim().min(1, "Please enter your company name.").max(160, "Company name is too long."),
  fullName: z.string().trim().min(1, "Please enter your full name."),
  email: z.string().trim().min(1, "Please enter your email address.").email("Enter a valid email address."),
  phoneCode: z.string().min(1, "Please select a calling code."),
  phone: z
    .string()
    .trim()
    .regex(/^\d{6,15}$/, "Enter a valid phone number."),
  country: z.string().regex(/^[A-Z]{2}$/, "Please select your country."),
  region: z.string().trim().min(1, "Please enter your region."),
  address: z.string().trim().min(1, "Please enter your address."),
});

const verificationCodeSchema = z
  .string()
  .trim()
  .regex(/^\d{6}$/, "Enter the 6-digit verification code.");

export const verificationSchema = z.object({ code: verificationCodeSchema });

const passwordFieldsSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string().min(1, "Please confirm your password."),
});

export const passwordSchema = passwordFieldsSchema.refine((values) => values.password === values.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match.",
});

export const signupStartResponseSchema = z.object({
  challengeId: guidSchema,
  expiresAt: z.iso.datetime({ offset: true }),
});

export const verifySignupInputSchema = z.object({
  challengeId: guidSchema,
  code: verificationCodeSchema,
});

export const signupVerificationResponseSchema = z.object({ verified: z.boolean() });

export const completeSignupInputSchema = z.object({ challengeId: guidSchema }).and(passwordSchema);

export const signupCompletionSchema = z.object({
  userId: guidSchema,
  email: z.string().min(1),
});

export type SignupValues = z.infer<typeof signupSchema>;
export type VerificationValues = z.infer<typeof verificationSchema>;
export type PasswordValues = z.infer<typeof passwordSchema>;
export type SignupChallenge = z.infer<typeof signupStartResponseSchema>;
export type VerifySignupInput = z.infer<typeof verifySignupInputSchema>;
export type CompleteSignupInput = z.infer<typeof completeSignupInputSchema>;
export type SignupCompletion = z.infer<typeof signupCompletionSchema>;

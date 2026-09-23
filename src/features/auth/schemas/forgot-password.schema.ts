import { z } from "zod";

const guidSchema = z.string().regex(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i, "Invalid identifier.");

const verificationCodeSchema = z
  .string()
  .trim()
  .regex(/^\d{6}$/, "Enter the 6-digit verification code.");

export const forgotPasswordSchema = z.object({
  email: z.string().trim().min(1, "Please enter your email address.").email("Enter a valid email address."),
});

export const forgotPasswordStartResponseSchema = z.object({
  challengeId: guidSchema,
  expiresAt: z.iso.datetime({ offset: true }),
});

export const forgotPasswordVerificationSchema = z.object({ code: verificationCodeSchema });

export const verifyForgotPasswordInputSchema = z.object({
  challengeId: guidSchema,
  code: verificationCodeSchema,
});

export const forgotPasswordVerificationResponseSchema = z.object({ verified: z.boolean() });

const forgotPasswordResetFieldsSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string().min(1, "Please confirm your password."),
});

export const forgotPasswordResetSchema = forgotPasswordResetFieldsSchema.refine(
  (values) => values.newPassword === values.confirmPassword,
  { path: ["confirmPassword"], message: "Passwords do not match." },
);

export const resetForgotPasswordInputSchema = z.object({ challengeId: guidSchema }).and(forgotPasswordResetSchema);

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ForgotPasswordChallenge = z.infer<typeof forgotPasswordStartResponseSchema>;
export type ForgotPasswordVerificationValues = z.infer<typeof forgotPasswordVerificationSchema>;
export type VerifyForgotPasswordInput = z.infer<typeof verifyForgotPasswordInputSchema>;
export type ForgotPasswordResetValues = z.infer<typeof forgotPasswordResetSchema>;
export type ResetForgotPasswordInput = z.infer<typeof resetForgotPasswordInputSchema>;

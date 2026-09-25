import { httpClient } from "@/lib/http-client";
import { authTokenStore } from "@/lib/auth-token-store";

import {
  forgotPasswordSchema,
  forgotPasswordStartResponseSchema,
  forgotPasswordVerificationResponseSchema,
  resetForgotPasswordInputSchema,
  verifyForgotPasswordInputSchema,
  type ForgotPasswordChallenge,
  type ForgotPasswordValues,
  type ResetForgotPasswordInput,
  type VerifyForgotPasswordInput,
} from "../schemas/forgot-password.schema";
import { loginSchema, type LoginValues } from "../schemas/login.schema";
import {
  completeSignupInputSchema,
  signupCompletionSchema,
  signupSchema,
  signupStartResponseSchema,
  signupVerificationResponseSchema,
  verifySignupInputSchema,
  type CompleteSignupInput,
  type SignupChallenge,
  type SignupCompletion,
  type SignupValues,
  type VerifySignupInput,
} from "../schemas/signup.schema";
import { authSessionSchema, type AuthSession } from "../schemas/auth-session.schema";

function getCurrentSession(): AuthSession {
  const session = authTokenStore.getSessionMetadata();
  return session
    ? authSessionSchema.parse({ authenticated: true, ...session })
    : authSessionSchema.parse({ authenticated: false });
}

function toInternationalPhone(phoneCode: string, phone: string): string {
  return `${phoneCode}${phone.replace(/^0+/, "")}`;
}

export const authService = {
  async getSession(): Promise<AuthSession> {
    return getCurrentSession();
  },

  async login(input: LoginValues): Promise<AuthSession> {
    const { email, password } = loginSchema.parse(input);
    const response = await httpClient.post<unknown>("/auth/login", { email, password });
    authTokenStore.set(response.data);
    return getCurrentSession();
  },

  async logout(): Promise<void> {
    authTokenStore.clear();
  },

  async signup(input: SignupValues): Promise<SignupChallenge> {
    const values = signupSchema.parse(input);
    const response = await httpClient.post<unknown>("/auth/signup/start", {
      organization: values.company,
      fullName: values.fullName,
      phone: toInternationalPhone(values.phoneCode, values.phone),
      email: values.email,
      country: values.country,
      region: values.region,
      address: values.address,
    });
    return signupStartResponseSchema.parse(response.data);
  },

  async verifySignup(input: VerifySignupInput): Promise<void> {
    const values = verifySignupInputSchema.parse(input);
    const response = await httpClient.post<unknown>("/auth/signup/verify-otp", values);
    const result = signupVerificationResponseSchema.parse(response.data);
    if (!result.verified) throw new Error("The verification code could not be verified.");
  },

  async completeSignup(input: CompleteSignupInput): Promise<SignupCompletion> {
    const values = completeSignupInputSchema.parse(input);
    const response = await httpClient.post<unknown>("/auth/signup/complete", values);
    return signupCompletionSchema.parse(response.data);
  },

  async startForgotPassword(input: ForgotPasswordValues): Promise<ForgotPasswordChallenge> {
    const values = forgotPasswordSchema.parse(input);
    const response = await httpClient.post<unknown>("/auth/forgot-password/start", values);
    return forgotPasswordStartResponseSchema.parse(response.data);
  },

  async verifyForgotPassword(input: VerifyForgotPasswordInput): Promise<void> {
    const values = verifyForgotPasswordInputSchema.parse(input);
    const response = await httpClient.post<unknown>("/auth/forgot-password/verify-otp", values);
    const result = forgotPasswordVerificationResponseSchema.parse(response.data);
    if (!result.verified) throw new Error("The verification code could not be verified.");
  },

  async resetForgotPassword(input: ResetForgotPasswordInput): Promise<void> {
    const values = resetForgotPasswordInputSchema.parse(input);
    await httpClient.post("/auth/forgot-password/reset", values);
  },

  resetSession(): void {
    authTokenStore.clear();
  },
};

import { httpClient } from "@/lib/http-client";
import { authTokenStore } from "@/lib/auth-token-store";

import type { ForgotPasswordValues } from "../schemas/forgot-password.schema";
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

const MOCK_AUTH_DELAY_MS = 350;

function getCurrentSession(): AuthSession {
  const session = authTokenStore.getSessionMetadata();
  return session
    ? authSessionSchema.parse({ authenticated: true, ...session })
    : authSessionSchema.parse({ authenticated: false });
}

function waitForMockApi(): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, MOCK_AUTH_DELAY_MS));
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
    authTokenStore.clear();
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

  async forgotPassword(input: ForgotPasswordValues): Promise<void> {
    await waitForMockApi();
    if (input.email === "error@labdock.vn") throw new Error("We could not find an account for this email.");
  },

  resetSession(): void {
    authTokenStore.clear();
  },
};

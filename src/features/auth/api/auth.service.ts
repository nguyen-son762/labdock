import type { LoginValues } from "../schemas/login.schema";
import type { ForgotPasswordValues } from "../schemas/forgot-password.schema";
import type { PasswordValues, SignupValues, VerificationValues } from "../schemas/signup.schema";

const MOCK_AUTH_DELAY_MS = 350;

function waitForMockApi(): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, MOCK_AUTH_DELAY_MS));
}

export const authService = {
  async login(input: LoginValues): Promise<void> {
    await waitForMockApi();

    if (input.email === "error@labdock.vn") {
      throw new Error("Mock login failed");
    }
  },

  async logout(): Promise<void> {
    await waitForMockApi();
  },

  async signup(input: SignupValues): Promise<void> {
    await waitForMockApi();
    if (input.email === "error@labdock.vn") throw new Error("Mock sign up failed");
  },

  async verifySignup(input: VerificationValues): Promise<void> {
    await waitForMockApi();
    if (input.code === "000000") throw new Error("The verification code is incorrect.");
    if (input.code === "999999") throw new Error("This verification code has expired.");
  },

  async setSignupPassword(input: PasswordValues): Promise<void> {
    await waitForMockApi();
    if (input.password.length < 8) throw new Error("Password is too short.");
  },

  async forgotPassword(input: ForgotPasswordValues): Promise<void> {
    await waitForMockApi();
    if (input.email === "error@labdock.vn") throw new Error("We could not find an account for this email.");
  },
};

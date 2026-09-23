import { describe, expect, it } from "vitest";

import {
  forgotPasswordResetSchema,
  forgotPasswordStartResponseSchema,
  forgotPasswordVerificationSchema,
  resetForgotPasswordInputSchema,
} from "./forgot-password.schema";

const challengeId = "11111111-1111-1111-1111-111111111111";

describe("forgot-password schemas", () => {
  it("accepts the API challenge and OTP contracts", () => {
    expect(forgotPasswordStartResponseSchema.parse({ challengeId, expiresAt: "2026-08-21T10:00:00+00:00" })).toEqual({
      challengeId,
      expiresAt: "2026-08-21T10:00:00+00:00",
    });
    expect(forgotPasswordVerificationSchema.parse({ code: "123456" })).toEqual({ code: "123456" });
  });

  it("rejects invalid identifiers and verification codes", () => {
    expect(() =>
      forgotPasswordStartResponseSchema.parse({ challengeId: "invalid", expiresAt: "2026-08-21T10:00:00+00:00" }),
    ).toThrow();
    expect(() => forgotPasswordVerificationSchema.parse({ code: "12345a" })).toThrow();
  });

  it("requires matching passwords in the form and API payload", () => {
    expect(
      forgotPasswordResetSchema.safeParse({ newPassword: "Passw0rd!", confirmPassword: "Different1!" }).success,
    ).toBe(false);
    expect(
      resetForgotPasswordInputSchema.parse({
        challengeId,
        newPassword: "Passw0rd!",
        confirmPassword: "Passw0rd!",
      }),
    ).toEqual({ challengeId, newPassword: "Passw0rd!", confirmPassword: "Passw0rd!" });
  });
});

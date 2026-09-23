import { afterEach, describe, expect, it, vi } from "vitest";

const httpClient = vi.hoisted(() => ({ post: vi.fn() }));

vi.mock("@/lib/http-client", () => ({ httpClient }));

import { authService } from "./auth.service";

const loginResponse = {
  accessToken: "access-token",
  refreshToken: "refresh-token",
  expiresAt: "2099-08-21T12:00:00+00:00",
  mustChangePassword: false,
};

const signupChallenge = {
  challengeId: "11111111-1111-1111-1111-111111111111",
  expiresAt: "2099-08-21T10:00:00+00:00",
};

describe("authService", () => {
  afterEach(() => {
    authService.resetSession();
    httpClient.post.mockReset();
  });

  it("logs in with the API request contract and exposes sanitized session metadata", async () => {
    httpClient.post.mockResolvedValue({ data: loginResponse });

    const session = await authService.login({
      email: " admin@labdock.local ",
      password: "Passw0rd!",
    });

    expect(httpClient.post).toHaveBeenCalledWith("/auth/login", {
      email: "admin@labdock.local",
      password: "Passw0rd!",
    });
    expect(session).toEqual({
      authenticated: true,
      expiresAt: loginResponse.expiresAt,
      mustChangePassword: false,
    });
    expect(await authService.getSession()).toEqual(session);
  });

  it("rejects an invalid token response without creating a session", async () => {
    httpClient.post.mockResolvedValue({ data: { ...loginResponse, accessToken: "" } });

    await expect(authService.login({ email: "admin@labdock.local", password: "Passw0rd!" })).rejects.toThrow();
    await expect(authService.getSession()).resolves.toEqual({ authenticated: false });
  });

  it("clears the in-memory session on logout", async () => {
    httpClient.post.mockResolvedValue({ data: loginResponse });
    await authService.login({ email: "admin@labdock.local", password: "Passw0rd!" });

    await authService.logout();

    await expect(authService.getSession()).resolves.toEqual({ authenticated: false });
  });

  it("starts signup with the public API contract and a normalized international phone", async () => {
    httpClient.post.mockResolvedValue({ data: signupChallenge });

    const result = await authService.signup({
      company: "Example Name",
      fullName: "Example Name",
      phoneCode: "+84",
      phone: "0901234567",
      email: "user@labdock.local",
      country: "VN",
      region: "HCM",
      address: "1 Nguyen Hue",
    });

    expect(httpClient.post).toHaveBeenCalledWith("/auth/signup/start", {
      organization: "Example Name",
      fullName: "Example Name",
      phone: "+84901234567",
      email: "user@labdock.local",
      country: "VN",
      region: "HCM",
      address: "1 Nguyen Hue",
    });
    expect(result).toEqual(signupChallenge);
  });

  it("verifies the signup OTP and completes the challenge", async () => {
    httpClient.post.mockResolvedValueOnce({ data: { verified: true } }).mockResolvedValueOnce({
      data: { userId: "22222222-2222-2222-2222-222222222222", email: "user@labdock.local" },
    });

    await authService.verifySignup({ challengeId: signupChallenge.challengeId, code: "123456" });
    const completion = await authService.completeSignup({
      challengeId: signupChallenge.challengeId,
      password: "Passw0rd!",
      confirmPassword: "Passw0rd!",
    });

    expect(httpClient.post).toHaveBeenNthCalledWith(1, "/auth/signup/verify-otp", {
      challengeId: signupChallenge.challengeId,
      code: "123456",
    });
    expect(httpClient.post).toHaveBeenNthCalledWith(2, "/auth/signup/complete", {
      challengeId: signupChallenge.challengeId,
      password: "Passw0rd!",
      confirmPassword: "Passw0rd!",
    });
    expect(completion.email).toBe("user@labdock.local");
  });

  it("rejects an OTP response that was not verified", async () => {
    httpClient.post.mockResolvedValue({ data: { verified: false } });

    await expect(
      authService.verifySignup({ challengeId: signupChallenge.challengeId, code: "123456" }),
    ).rejects.toThrow("could not be verified");
  });

  it("starts, verifies and resets a forgot-password challenge", async () => {
    httpClient.post
      .mockResolvedValueOnce({ data: signupChallenge })
      .mockResolvedValueOnce({ data: { verified: true } })
      .mockResolvedValueOnce({ data: {} });

    const challenge = await authService.startForgotPassword({ email: " user@labdock.local " });
    await authService.verifyForgotPassword({ challengeId: challenge.challengeId, code: "123456" });
    await authService.resetForgotPassword({
      challengeId: challenge.challengeId,
      newPassword: "Passw0rd!",
      confirmPassword: "Passw0rd!",
    });

    expect(httpClient.post).toHaveBeenNthCalledWith(1, "/auth/forgot-password/start", {
      email: "user@labdock.local",
    });
    expect(httpClient.post).toHaveBeenNthCalledWith(2, "/auth/forgot-password/verify-otp", {
      challengeId: signupChallenge.challengeId,
      code: "123456",
    });
    expect(httpClient.post).toHaveBeenNthCalledWith(3, "/auth/forgot-password/reset", {
      challengeId: signupChallenge.challengeId,
      newPassword: "Passw0rd!",
      confirmPassword: "Passw0rd!",
    });
  });

  it("rejects a forgot-password OTP response that was not verified", async () => {
    httpClient.post.mockResolvedValue({ data: { verified: false } });

    await expect(
      authService.verifyForgotPassword({ challengeId: signupChallenge.challengeId, code: "123456" }),
    ).rejects.toThrow("could not be verified");
  });
});

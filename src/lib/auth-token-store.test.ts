import { afterEach, describe, expect, it, vi } from "vitest";

import { authTokenStore } from "./auth-token-store";

const tokens = {
  accessToken: "access-token",
  refreshToken: "refresh-token",
  expiresAt: "2099-08-21T12:00:00+00:00",
  mustChangePassword: false,
};

describe("authTokenStore", () => {
  afterEach(() => authTokenStore.clear());

  it("keeps tokens in memory and only exposes non-secret session metadata", () => {
    authTokenStore.set(tokens);

    expect(authTokenStore.getAccessToken()).toBe(tokens.accessToken);
    expect(authTokenStore.getRefreshToken()).toBe(tokens.refreshToken);
    expect(authTokenStore.getSessionMetadata()).toEqual({
      expiresAt: tokens.expiresAt,
      mustChangePassword: false,
    });
  });

  it("rejects malformed token responses", () => {
    expect(() => authTokenStore.set({ ...tokens, expiresAt: "invalid" })).toThrow();
    expect(authTokenStore.getSessionMetadata()).toBeNull();
  });

  it("notifies subscribers when an active session is cleared", () => {
    const listener = vi.fn();
    const unsubscribe = authTokenStore.onClear(listener);
    authTokenStore.set(tokens);

    authTokenStore.clear();
    authTokenStore.clear();
    unsubscribe();

    expect(listener).toHaveBeenCalledTimes(1);
  });
});

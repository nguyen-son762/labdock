import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosAdapter,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { afterEach, describe, expect, it } from "vitest";

import { authTokenStore } from "./auth-token-store";
import { httpClient } from "./http-client";

const initialTokens = {
  accessToken: "initial-access-token",
  refreshToken: "initial-refresh-token",
  expiresAt: "2099-08-21T12:00:00+00:00",
  mustChangePassword: false,
};

const refreshedTokens = {
  ...initialTokens,
  accessToken: "refreshed-access-token",
  refreshToken: "refreshed-refresh-token",
};

const originalAdapter = httpClient.defaults.adapter;

function createResponse<T>(config: InternalAxiosRequestConfig, data: T, status = 200): AxiosResponse<T> {
  return { data, status, statusText: status === 200 ? "OK" : "Unauthorized", headers: new AxiosHeaders(), config };
}

function unauthorized(config: InternalAxiosRequestConfig): AxiosError {
  return new AxiosError("Unauthorized", AxiosError.ERR_BAD_REQUEST, config, undefined, createResponse(config, {}, 401));
}

describe("httpClient authentication", () => {
  afterEach(() => {
    httpClient.defaults.adapter = originalAdapter;
    authTokenStore.clear();
  });

  it("adds the Bearer access token to requests", async () => {
    authTokenStore.set(initialTokens);
    let authorization: string | undefined;
    httpClient.defaults.adapter = (async (config) => {
      authorization = config.headers.get("Authorization")?.toString();
      return createResponse(config, { ok: true });
    }) satisfies AxiosAdapter;

    await httpClient.get("/protected");

    expect(authorization).toBe("Bearer initial-access-token");
  });

  it("does not send an access token to public category, signup and password reset endpoints", async () => {
    authTokenStore.set(initialTokens);
    const authorizations: Array<string | undefined> = [];
    httpClient.defaults.adapter = (async (config) => {
      authorizations.push(config.headers.get("Authorization")?.toString());
      return createResponse(config, { ok: true });
    }) satisfies AxiosAdapter;

    await httpClient.get("/categories");
    await httpClient.post("/auth/signup/start", {});
    await httpClient.post("/auth/forgot-password/start", {});

    expect(authorizations).toEqual([undefined, undefined, undefined]);
  });

  it("refreshes once for concurrent 401 responses and retries with the new access token", async () => {
    authTokenStore.set(initialTokens);
    let protectedCalls = 0;
    let refreshCalls = 0;
    const retriedAuthorizations: string[] = [];

    httpClient.defaults.adapter = (async (config) => {
      if (config.url === "/auth/refresh") {
        refreshCalls += 1;
        expect(typeof config.data).toBe("string");
        if (typeof config.data === "string") {
          expect(JSON.parse(config.data)).toEqual({ refreshToken: initialTokens.refreshToken });
        }
        return createResponse(config, refreshedTokens);
      }

      protectedCalls += 1;
      if (protectedCalls <= 2) throw unauthorized(config);
      retriedAuthorizations.push(config.headers.get("Authorization")?.toString() ?? "");
      return createResponse(config, { ok: true });
    }) satisfies AxiosAdapter;

    await Promise.all([httpClient.get("/protected/one"), httpClient.get("/protected/two")]);

    expect(refreshCalls).toBe(1);
    expect(retriedAuthorizations).toEqual(["Bearer refreshed-access-token", "Bearer refreshed-access-token"]);
    expect(authTokenStore.getRefreshToken()).toBe(refreshedTokens.refreshToken);
  });

  it("clears tokens when refresh fails", async () => {
    authTokenStore.set(initialTokens);
    httpClient.defaults.adapter = (async (config) => {
      throw unauthorized(config);
    }) satisfies AxiosAdapter;

    await expect(httpClient.get("/protected")).rejects.toSatisfy(axios.isAxiosError);

    expect(authTokenStore.getAccessToken()).toBeNull();
    expect(authTokenStore.getRefreshToken()).toBeNull();
  });
});

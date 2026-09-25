import { beforeEach, describe, expect, it, vi } from "vitest";

const cookieGetMock = vi.hoisted(() => vi.fn());

vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({ get: cookieGetMock })),
}));

import { AUTH_COOKIE_NAMES } from "./auth-cookie-names";
import { createServerApiRequestInit } from "./server-api-request";

const cachePolicy = { revalidate: 300, tags: ["homepage"] } as const;

describe("createServerApiRequestInit", () => {
  beforeEach(() => cookieGetMock.mockReset());

  it("keeps the public Next cache policy when the access-token cookie is missing", async () => {
    cookieGetMock.mockReturnValue(undefined);

    await expect(createServerApiRequestInit(cachePolicy)).resolves.toEqual({
      next: { revalidate: 300, tags: ["homepage"] },
    });
    expect(cookieGetMock).toHaveBeenCalledWith(AUTH_COOKIE_NAMES.accessToken);
  });

  it("adds the bearer token and disables shared caching for an authenticated request", async () => {
    cookieGetMock.mockReturnValue({ value: encodeURIComponent("access.token") });

    await expect(createServerApiRequestInit(cachePolicy)).resolves.toEqual({
      headers: { Authorization: "Bearer access.token" },
      cache: "no-store",
    });
  });

  it("does not create an authorization header from a malformed cookie value", async () => {
    cookieGetMock.mockReturnValue({ value: "%0Ainvalid-token" });

    await expect(createServerApiRequestInit(cachePolicy)).resolves.toEqual({
      next: { revalidate: 300, tags: ["homepage"] },
    });
  });
});

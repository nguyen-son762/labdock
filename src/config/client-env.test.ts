import { describe, expect, it } from "vitest";

import { resolveApiBaseUrl } from "./client-env";

describe("resolveApiBaseUrl", () => {
  it("uses the Labdock UAT API when no override is configured", () => {
    expect(resolveApiBaseUrl(undefined)).toBe("https://uat-api-labdock.365studio.vn/api/public/v1");
  });

  it("normalizes trailing slashes", () => {
    expect(resolveApiBaseUrl("https://api.example.com/v1///")).toBe("https://api.example.com/v1");
    expect(resolveApiBaseUrl("/api/")).toBe("/api");
  });

  it.each(["not-a-url", "ftp://api.example.com", "//api.example.com", "/"])(
    "rejects an invalid API base URL: %s",
    (value) => {
      expect(() => resolveApiBaseUrl(value)).toThrow("API base URL must be an HTTP(S) URL or root-relative path");
    },
  );
});

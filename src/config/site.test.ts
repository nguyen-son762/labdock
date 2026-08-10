import { describe, expect, it } from "vitest";

import { resolveSiteUrl } from "./site";

describe("resolveSiteUrl", () => {
  it("normalizes a valid origin", () => {
    expect(resolveSiteUrl("https://labdock.example/", "production")).toBe("https://labdock.example");
  });

  it("uses localhost when a development URL is not configured", () => {
    expect(resolveSiteUrl(undefined, "development")).toBe("http://localhost:3000");
  });

  it.each([undefined, "not-a-url", "ftp://labdock.example"])("rejects an invalid production URL: %s", (value) => {
    expect(() => resolveSiteUrl(value, "production")).toThrow("A valid NEXT_PUBLIC_SITE_URL is required");
  });

  it("rejects a site URL with a path", () => {
    expect(() => resolveSiteUrl("https://labdock.example/store", "production")).toThrow(
      "must be an origin without a path",
    );
  });
});

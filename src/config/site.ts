import { z } from "zod";

const siteUrlSchema = z
  .string()
  .url()
  .regex(/^https?:\/\//, "Site URL must use HTTP or HTTPS.");

export function resolveSiteUrl(value: string | undefined, nodeEnv = process.env.NODE_ENV) {
  const parsedSiteUrl = siteUrlSchema.safeParse(value);

  if (parsedSiteUrl.success) {
    const normalizedUrl = parsedSiteUrl.data.replace(/\/+$/, "");

    if (new URL(normalizedUrl).origin !== normalizedUrl) {
      throw new Error("NEXT_PUBLIC_SITE_URL must be an origin without a path, query or hash.");
    }

    return normalizedUrl;
  }

  if (nodeEnv === "production") {
    throw new Error("A valid NEXT_PUBLIC_SITE_URL is required for production builds.");
  }

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Labdock",
  description: "The bio marketplace for verified laboratory equipment, chemicals, reagents and consumables.",
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
} as const;

import { z } from "zod";

const siteUrlSchema = z.string().url();
const parsedSiteUrl = siteUrlSchema.safeParse(process.env.NEXT_PUBLIC_SITE_URL);

export const siteConfig = {
  name: "Labdock",
  description: "The bio marketplace for verified laboratory equipment, chemicals, reagents and consumables.",
  url: parsedSiteUrl.success ? parsedSiteUrl.data : "http://localhost:3000",
} as const;

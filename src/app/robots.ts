import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getLocalizedPath } from "@/i18n/locale";
import { routing } from "@/i18n/routing";

const privatePaths = [
  "/cart",
  "/checkout",
  "/dashboard",
  "/forgot-password",
  "/login",
  "/orders",
  "/payment",
  "/profile",
  "/request-quote",
  "/rfqs",
  "/signup",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: routing.locales.flatMap((locale) => privatePaths.map((path) => getLocalizedPath(path, locale))),
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}

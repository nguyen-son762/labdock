import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://uat-api-labdock.365studio.vn/api/public/v1";
const apiUrl = /^https?:\/\//i.test(apiBaseUrl) ? new URL(apiBaseUrl) : null;

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: apiUrl
      ? [
          {
            protocol: apiUrl.protocol.slice(0, -1) as "http" | "https",
            hostname: apiUrl.hostname,
            pathname: "/media/**",
          },
        ]
      : [],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);

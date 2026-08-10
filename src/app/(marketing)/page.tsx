import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { HomeScreen } from "@/features/home";

export const metadata: Metadata = {
  title: "Laboratory Products & Procurement",
  description:
    "Source verified laboratory equipment, chemicals, reagents and consumables from trusted research suppliers.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Laboratory Products & Procurement",
    description:
      "Source verified laboratory equipment, chemicals, reagents and consumables from trusted research suppliers.",
    url: "/",
    images: [{ url: "/home/hero-bg.png", alt: "Laboratory products available from Labdock" }],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/auth/labdock-wordmark.svg`,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replaceAll("<", "\\u003c") }}
      />
      <HomeScreen />
    </>
  );
}

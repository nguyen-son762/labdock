import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { HomeScreen } from "@/features/home";

export const metadata: Metadata = {
  title: "Laboratory Products & Procurement",
  description:
    "Source verified laboratory equipment, chemicals, reagents and consumables from trusted research suppliers.",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
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

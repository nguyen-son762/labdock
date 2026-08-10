import type { Metadata } from "next";

import { AboutScreen } from "@/features/about";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Learn how Labdock simplifies scientific procurement for research institutions with verified suppliers, laboratory products and professional support.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About Labdock",
    description: "Simplifying scientific procurement and enhancing research efficiency across Southeast Asia.",
    url: "/about-us",
    type: "website",
  },
};

export default function AboutUsPage() {
  return <AboutScreen />;
}

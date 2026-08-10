import type { Metadata } from "next";

import { NewsListScreen } from "@/features/news";

export const metadata: Metadata = {
  title: "News",
  description:
    "Stay informed with the latest research breakthroughs, industry news, laboratory best practices and scientific events.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "News",
    description:
      "Research breakthroughs, industry news, laboratory best practices and upcoming scientific events from Labdock.",
    url: "/news",
    images: [{ url: "/news/news-header.png", alt: "Labdock news and scientific events" }],
  },
};

export default function NewsPage() {
  return <NewsListScreen />;
}

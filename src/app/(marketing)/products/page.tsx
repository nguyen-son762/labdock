import type { Metadata } from "next";

import { ProductListScreen } from "@/features/products";

export const metadata: Metadata = {
  title: "Laboratory Products",
  description:
    "Browse verified laboratory equipment, glassware and research supplies with fast delivery and bulk pricing.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Laboratory Products",
    description:
      "Browse verified laboratory equipment, glassware and research supplies with fast delivery and bulk pricing.",
    url: "/products",
  },
};

export default function ProductsPage() {
  return <ProductListScreen />;
}

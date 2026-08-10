import { Suspense } from "react";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ServiceGuarantees } from "@/components/shared/service-guarantees";

import { CatalogBanner } from "./catalog-banner";
import { CatalogWorkspace } from "./catalog-workspace";
import { CategoryStrip } from "./category-strip";
import { productGrid } from "../data/products-data";

export function ProductListScreen() {
  return (
    <div className="bg-[#f5f8fb]">
      <CatalogBanner />
      <div className="container py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "All categories" }]} />
        <div className="mt-5">
          <CategoryStrip />
        </div>
        <div className="mt-8">
          <Suspense
            fallback={
              <div className="min-h-[900px] animate-pulse rounded-2xl bg-white/60" aria-label="Loading products" />
            }
          >
            <CatalogWorkspace allProducts={productGrid} />
          </Suspense>
        </div>
      </div>
      <ServiceGuarantees />
    </div>
  );
}

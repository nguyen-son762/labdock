import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ServiceGuarantees } from "@/components/shared/service-guarantees";

import type { CatalogBrandOption, CatalogCategoryOption, Product } from "../products.types";
import type { ProductCatalogFilters } from "../schemas/product-catalog.schema";
import { CatalogBanner } from "./catalog-banner";
import { CatalogWorkspace } from "./catalog-workspace";
import { CategoryStrip } from "./category-strip";

type ProductListScreenProps = {
  products: readonly Product[];
  categories: readonly CatalogCategoryOption[];
  brands: readonly CatalogBrandOption[];
  filters: ProductCatalogFilters;
  page: number;
  pageSize: number;
  total: number;
  productsError: boolean;
  categoriesError: boolean;
  brandsError: boolean;
};

export function ProductListScreen({
  products,
  categories,
  brands,
  filters,
  page,
  pageSize,
  total,
  productsError,
  categoriesError,
  brandsError,
}: ProductListScreenProps) {
  return (
    <div className="bg-[#f5f8fb]">
      <CatalogBanner total={total} />
      <div className="container py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "All categories" }]} />
        <div className="mt-5">
          <CategoryStrip
            categories={categories.filter((category) => category.depth === 0)}
            selectedCategoryId={filters.categoryId}
          />
        </div>
        <div className="mt-8">
          <CatalogWorkspace
            products={products}
            categories={categories}
            brands={brands}
            filters={filters}
            page={page}
            pageSize={pageSize}
            total={total}
            productsError={productsError}
            categoriesError={categoriesError}
            brandsError={brandsError}
          />
        </div>
      </div>
      <ServiceGuarantees />
    </div>
  );
}

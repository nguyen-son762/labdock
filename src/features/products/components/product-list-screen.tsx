import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ServiceGuarantees } from "@/components/shared/service-guarantees";

import type { CatalogBrandOption, CatalogCategoryOption, Product } from "../products.types";
import type { ProductCatalogFilters } from "../schemas/product-catalog.schema";
import { getCatalogCategoriesWithCounts } from "../server";
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
  activeCategory?: CatalogCategoryOption & { children: readonly CatalogCategoryOption[] };
};

export async function ProductListScreen({
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
  activeCategory,
}: ProductListScreenProps) {
  const topLevelCategories = categories.filter((category) => category.depth === 0);
  const visibleCategories = await getCatalogCategoriesWithCounts(
    activeCategory ? activeCategory.children : topLevelCategories,
  );

  return (
    <div className="bg-white">
      <CatalogBanner total={total} />
      <div className="container max-w-[1312px] py-12">
        <Breadcrumbs
          items={
            activeCategory
              ? [
                  { label: "Home", href: "/" },
                  { label: "All categories", href: "/products" },
                  { label: activeCategory.name },
                ]
              : [{ label: "Home", href: "/" }, { label: "All categories" }]
          }
        />
        {activeCategory && !activeCategory.children.length ? (
          <h1 className="mt-6 text-2xl font-semibold text-[#051a50]">{activeCategory.name}</h1>
        ) : null}
        <div className="mt-6">
          <CategoryStrip
            categories={visibleCategories}
            selectedCategoryId={activeCategory ? undefined : filters.categoryId}
            title={activeCategory ? activeCategory.name : "All categories"}
            headingLevel={activeCategory ? "h1" : "h2"}
          />
        </div>
        <div className="mt-6">
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
            categoryPage={Boolean(activeCategory)}
          />
        </div>
      </div>
      <ServiceGuarantees />
    </div>
  );
}

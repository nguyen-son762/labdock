"use client";

import { useSearchParams } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";

import type { CatalogBrandOption, CatalogCategoryOption, Product } from "../products.types";
import type { ProductCatalogFilters } from "../schemas/product-catalog.schema";
import { CatalogFilters } from "./catalog-filters";
import { ProductCard } from "./product-card";
import { ProductPagination } from "./product-pagination";
import { QuoteCard } from "./quote-card";

type CatalogWorkspaceProps = {
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

export function CatalogWorkspace({
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
}: CatalogWorkspaceProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const hasFilters = Boolean(filters.brandId || filters.categoryId || filters.sort !== "featured");

  function buildHref(updates: Record<string, string | number | null>): string {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") params.delete(key);
      else params.set(key, String(value));
    });
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  }

  function updateParams(updates: Record<string, string | number | null>) {
    startTransition(() => router.replace(buildHref(updates), { scroll: false }));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[238px_minmax(0,1fr)]">
      <CatalogFilters
        categories={categories}
        brands={brands}
        filters={filters}
        disabled={isPending}
        categoriesError={categoriesError}
        brandsError={brandsError}
        onBrandChange={(brandId) => updateParams({ brandId, page: null })}
        onCategoryChange={(categoryId) => updateParams({ categoryId, page: null })}
        onClear={() => updateParams({ brandId: null, categoryId: null, sort: null, page: null })}
      />

      <section
        aria-labelledby="product-list-title"
        aria-busy={isPending}
        className={isPending ? "min-w-0 opacity-65 transition-opacity" : "min-w-0 transition-opacity"}
      >
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="product-list-title" className="text-xl font-semibold text-[#051a50]">
              Product listing
            </h2>
            <p className="mt-1 text-xs text-[#73798f]">
              Showing {products.length} of {total.toLocaleString("en-SG")} products
            </p>
          </div>
          <Select
            value={filters.sort}
            disabled={isPending || productsError}
            onValueChange={(sort) => updateParams({ sort: sort === "featured" ? null : sort, page: null })}
          >
            <SelectTrigger aria-label="Sort products" className="h-10 w-full bg-white sm:w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured products</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-desc">Price high to low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {productsError ? (
          <div
            role="alert"
            className="rounded-xl border border-[#fecdca] bg-[#fef3f2] p-8 text-center text-sm text-[#b42318]"
          >
            We could not load products. Please try again later.
          </div>
        ) : products.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            <QuoteCard />
            {products.slice(3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed bg-white p-12 text-center text-sm text-[#73798f]">
            <p>No products match the selected filters.</p>
            {hasFilters ? (
              <Button
                type="button"
                variant="ghost"
                disabled={isPending}
                onClick={() => updateParams({ brandId: null, categoryId: null, sort: null, page: null })}
                className="mt-3 text-[#164990]"
              >
                Clear filters
              </Button>
            ) : null}
          </div>
        )}

        {!productsError ? (
          <ProductPagination
            page={page}
            totalPages={totalPages}
            hrefForPage={(nextPage) => buildHref({ page: nextPage })}
          />
        ) : null}
      </section>
    </div>
  );
}

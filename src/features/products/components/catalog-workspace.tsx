"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
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
  categoryPage?: boolean;
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
  categoryPage = false,
}: CatalogWorkspaceProps) {
  const t = useTranslations("Catalog");
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

  function changeCategory(categoryId: string | null) {
    const selectedCategory = categories.find((category) => category.id === categoryId);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("categoryId");
    params.delete("page");
    const query = params.toString();
    const basePath = selectedCategory ? `/products/category/${selectedCategory.slug}` : "/products";
    startTransition(() => {
      router.push(query ? `${basePath}?${query}` : basePath);
    });
  }

  function clearFilters() {
    if (categoryPage) {
      startTransition(() => router.push("/products"));
      return;
    }
    updateParams({ brandId: null, categoryId: null, sort: null, page: null });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[238px_minmax(0,1fr)]">
      <CatalogFilters
        categories={categories}
        brands={brands}
        filters={filters}
        disabled={isPending}
        categoriesError={categoriesError}
        brandsError={brandsError}
        onBrandChange={(brandId) => updateParams({ brandId, page: null })}
        onCategoryChange={changeCategory}
        onClear={clearFilters}
      />

      <section
        aria-labelledby="product-list-title"
        aria-busy={isPending}
        className={isPending ? "min-w-0 opacity-65 transition-opacity" : "min-w-0 transition-opacity"}
      >
        <div className="mb-3 flex flex-col gap-3 sm:h-9 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="product-list-title" className="text-xl font-medium leading-[30px] text-[#0f3678]">
              {t("listing")}
            </h2>
          </div>
          <Select
            value={filters.sort === "featured" ? "" : filters.sort}
            disabled={isPending || productsError}
            onValueChange={(sort) => updateParams({ sort: sort === "featured" ? null : sort, page: null })}
          >
            <SelectTrigger
              aria-label={t("sortProducts")}
              className="h-10 w-full bg-white data-[placeholder]:text-[#b1bac8] sm:w-[170px]"
            >
              <SelectValue placeholder={t("sortBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">{t("nameAsc")}</SelectItem>
              <SelectItem value="price-desc">{t("priceDesc")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {productsError ? (
          <div
            role="alert"
            className="rounded-xl border border-[#fecdca] bg-[#fef3f2] p-8 text-center text-sm text-[#b42318]"
          >
            {t("loadError")}
          </div>
        ) : products.length ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} appearance="catalog" />
            ))}
            <QuoteCard />
            {products.slice(3).map((product) => (
              <ProductCard key={product.id} product={product} appearance="catalog" />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed bg-white p-12 text-center text-sm text-[#73798f]">
            <p>{t("noMatches")}</p>
            {hasFilters ? (
              <Button
                type="button"
                variant="ghost"
                disabled={isPending}
                onClick={clearFilters}
                className="mt-3 text-[#164990]"
              >
                {t("clearFilters")}
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

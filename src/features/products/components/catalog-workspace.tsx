"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";

import type { CatalogBrandOption, Product } from "../products.types";
import type { ProductCatalogFilters } from "../schemas/product-catalog.schema";
import { CatalogFilters } from "./catalog-filters";
import { ProductCard } from "./product-card";
import { ProductPagination } from "./product-pagination";
import { QuoteCard } from "./quote-card";

type CatalogWorkspaceProps = {
  products: readonly Product[];
  origins: readonly string[];
  brands: readonly CatalogBrandOption[];
  filters: ProductCatalogFilters;
  page: number;
  pageSize: number;
  total: number;
  productsError: boolean;
  originsError: boolean;
  brandsError: boolean;
  categoryPage?: boolean;
};

export function CatalogWorkspace({
  products,
  origins,
  brands,
  filters,
  page,
  pageSize,
  total,
  productsError,
  originsError,
  brandsError,
  categoryPage = false,
}: CatalogWorkspaceProps) {
  const t = useTranslations("Catalog");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const hasFilters = Boolean(
    filters.brandIds.length || filters.categoryId || filters.origins.length || filters.sort !== "featured",
  );

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

  function clearFilters() {
    if (categoryPage) {
      startTransition(() => router.push("/products"));
      return;
    }
    updateParams({ brandIds: null, brandId: null, categoryId: null, origins: null, sort: null, page: null });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[238px_minmax(0,1fr)]">
      <CatalogFilters
        origins={origins}
        brands={brands}
        filters={filters}
        disabled={isPending}
        originsError={originsError}
        brandsError={brandsError}
        onBrandChange={(brandIds) => updateParams({ brandIds: brandIds.join(","), brandId: null, page: null })}
        onOriginsChange={(origins) => updateParams({ origins: origins.join(","), page: null })}
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
              <ProductCard key={product.id} product={product} />
            ))}
            <QuoteCard />
            {products.slice(3).map((product) => (
              <ProductCard key={product.id} product={product} />
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

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getPublicBrands } from "@/features/brands/server";
import { getPublicCategories } from "@/features/categories/server";
import { parseProductCatalogFilters, ProductListScreen, type ProductCatalogSearchParams } from "@/features/products";
import { getProductCatalogPage } from "@/features/products/server";
import { flattenCatalogCategories } from "@/features/products/utils/flatten-catalog-categories";
import { getLocalizedAlternates, getLocalizedPath, isAppLocale } from "@/i18n/locale";

const PRODUCT_PAGE_SIZE = 20;

type ProductsPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<ProductCatalogSearchParams>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
  const t = await getTranslations("RouteMetadata");
  const description = t("productsDescription");

  return {
    title: t("products"),
    description,
    alternates: getLocalizedAlternates("/products", locale),
    openGraph: {
      title: t("products"),
      description,
      url: getLocalizedPath("/products", locale),
      locale: locale === "vi" ? "vi_VN" : "en_SG",
    },
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const filters = parseProductCatalogFilters(await searchParams);
  const [productsResult, categoriesResult, brandsResult] = await Promise.allSettled([
    getProductCatalogPage({
      page: filters.page,
      pageSize: PRODUCT_PAGE_SIZE,
      brandId: filters.brandId,
      categoryId: filters.categoryId,
      sort: filters.sort === "featured" ? undefined : filters.sort,
    }),
    getPublicCategories(),
    getPublicBrands(),
  ]);

  const productsPage =
    productsResult.status === "fulfilled"
      ? productsResult.value
      : { items: [], page: filters.page, pageSize: PRODUCT_PAGE_SIZE, total: 0 };
  const categories = categoriesResult.status === "fulfilled" ? flattenCatalogCategories(categoriesResult.value) : [];
  const brands =
    brandsResult.status === "fulfilled"
      ? brandsResult.value
          .map(({ id, name }) => ({ id, name }))
          .sort((left, right) => left.name.localeCompare(right.name))
      : [];

  return (
    <ProductListScreen
      products={productsPage.items}
      categories={categories}
      brands={brands}
      filters={filters}
      page={productsPage.page}
      pageSize={productsPage.pageSize}
      total={productsPage.total}
      productsError={productsResult.status === "rejected"}
      categoriesError={categoriesResult.status === "rejected"}
      brandsError={brandsResult.status === "rejected"}
    />
  );
}

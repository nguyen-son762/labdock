import type { Metadata } from "next";

import { getPublicBrands } from "@/features/brands/server";
import { type PublicCategoryTreeNode } from "@/features/categories";
import { getPublicCategories } from "@/features/categories/server";
import {
  parseProductCatalogFilters,
  ProductListScreen,
  type CatalogCategoryOption,
  type ProductCatalogSearchParams,
} from "@/features/products";
import { getProductCatalogPage } from "@/features/products/server";
import { getLocalizedAlternates, getLocalizedPath, isAppLocale } from "@/i18n/locale";

const PRODUCT_PAGE_SIZE = 20;

type ProductsPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<ProductCatalogSearchParams>;
};

function flattenCategories(nodes: readonly PublicCategoryTreeNode[], depth = 0): CatalogCategoryOption[] {
  return [...nodes]
    .sort((left, right) => left.sortOrder - right.sortOrder || left.name.localeCompare(right.name))
    .flatMap((category) => {
      const primaryMedia =
        category.media.find((media) => media.isPrimary) ??
        [...category.media].sort((left, right) => left.sortOrder - right.sortOrder)[0];

      return [
        {
          id: category.id,
          name: category.name,
          slug: category.slug,
          depth,
          imageUrl: primaryMedia?.url ?? null,
        },
        ...flattenCategories(category.children, depth + 1),
      ];
    });
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
  const description =
    "Browse verified laboratory equipment, glassware and research supplies with fast delivery and bulk pricing.";

  return {
    title: "Laboratory Products",
    description:
      "Browse verified laboratory equipment, glassware and research supplies with fast delivery and bulk pricing.",
    alternates: getLocalizedAlternates("/products", locale),
    openGraph: {
      title: "Laboratory Products",
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
  const categories = categoriesResult.status === "fulfilled" ? flattenCategories(categoriesResult.value) : [];
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

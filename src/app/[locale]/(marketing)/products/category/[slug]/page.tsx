import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { getPublicBrands } from "@/features/brands/server";
import { getPublicCategories } from "@/features/categories/server";
import type { PublicCategoryTreeNode } from "@/features/categories";
import {
  parseProductCatalogFilters,
  ProductListScreen,
  type CatalogCategoryOption,
  type ProductCatalogSearchParams,
} from "@/features/products";
import { getProductCatalogPage } from "@/features/products/server";
import { flattenCatalogCategories } from "@/features/products/utils/flatten-catalog-categories";
import { getLocalizedAlternates, getLocalizedPath, isAppLocale } from "@/i18n/locale";

const PRODUCT_PAGE_SIZE = 20;

type ProductCategoryPageProps = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<ProductCatalogSearchParams>;
};

function findCategory(nodes: readonly PublicCategoryTreeNode[], slug: string): PublicCategoryTreeNode | undefined {
  for (const node of nodes) {
    if (node.slug === slug) return node;
    const match = findCategory(node.children, slug);
    if (match) return match;
  }
}

async function getCategoryBySlug(slug: string) {
  return findCategory(await getPublicCategories(), slug);
}

export async function generateMetadata({ params }: Pick<ProductCategoryPageProps, "params">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isAppLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "RouteMetadata" });

  try {
    const category = await getCategoryBySlug(slug);
    if (!category) return { title: t("categoryNotFound") };

    return {
      title: `${category.name} | ${t("laboratoryProducts")}`,
      description: category.description ?? t("browseCategory", { category: category.name }),
      alternates: getLocalizedAlternates(`/products/category/${category.slug}`, locale),
      openGraph: {
        title: `${category.name} | ${t("laboratoryProducts")}`,
        description: category.description ?? t("browseCategory", { category: category.name }),
        url: getLocalizedPath(`/products/category/${category.slug}`, locale),
        locale: locale === "vi" ? "vi_VN" : "en_SG",
      },
    };
  } catch {
    return { title: t("productCategory") };
  }
}

export default async function ProductCategoryPage({ params, searchParams }: ProductCategoryPageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const categoryTree = await getPublicCategories();
  const category = findCategory(categoryTree, slug);
  if (!category) notFound();

  const filters = { ...parseProductCatalogFilters(query), categoryId: category.id };
  const [productsResult, brandsResult] = await Promise.allSettled([
    getProductCatalogPage({
      page: filters.page,
      pageSize: PRODUCT_PAGE_SIZE,
      brandId: filters.brandId,
      categoryId: category.id,
      sort: filters.sort === "featured" ? undefined : filters.sort,
    }),
    getPublicBrands(),
  ]);

  const productsPage =
    productsResult.status === "fulfilled"
      ? productsResult.value
      : { items: [], page: filters.page, pageSize: PRODUCT_PAGE_SIZE, total: 0 };
  const categories = flattenCatalogCategories(categoryTree);
  const categoryOption = flattenCatalogCategories([category])[0];
  if (!categoryOption) notFound();
  const children = flattenCatalogCategories(category.children, 1).filter((child) => child.depth === 1);
  const activeCategory: CatalogCategoryOption & { children: readonly CatalogCategoryOption[] } = {
    ...categoryOption,
    children,
  };
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
      categoriesError={false}
      brandsError={brandsResult.status === "rejected"}
      activeCategory={activeCategory}
    />
  );
}

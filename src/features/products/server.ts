import { clientEnv } from "@/config/client-env";

import { products } from "./data/products-data";
import type { Product } from "./products.types";
import { publicProductDetailSchema } from "./schemas/product-detail.schema";
import {
  publicProductsPageSchema,
  type GetPublicProductsParams,
  type PublicProductsPage,
} from "./schemas/product-list.schema";
import { mapPublicProduct } from "./utils/map-public-product";

export { products };

export type ProductCatalogPage = Omit<PublicProductsPage, "items"> & { items: Product[] };

export class ProductNotFoundError extends Error {
  constructor(slug: string) {
    super(`Product not found: ${slug}`);
    this.name = "ProductNotFoundError";
  }
}

function createProductsQuery(params: GetPublicProductsParams): string {
  const query = new URLSearchParams({
    page: String(params.page),
    pageSize: String(params.pageSize),
  });

  if (params.brandId) query.set("brandId", params.brandId);
  if (params.categoryId) query.set("categoryId", params.categoryId);
  if (params.sort) query.set("sort", params.sort);
  if (params.isNew !== undefined) query.set("isNew", String(params.isNew));
  if (params.isOutstanding !== undefined) query.set("IsOutstanding", String(params.isOutstanding));

  return query.toString();
}

function getProductsCacheTag(params: GetPublicProductsParams): string {
  if (params.isOutstanding) return "products:outstanding";
  if (params.isNew) return "products:new";
  return "products:all";
}

export async function getPublicProducts(params: GetPublicProductsParams): Promise<PublicProductsPage> {
  const response = await fetch(`${clientEnv.NEXT_PUBLIC_API_BASE_URL}/products?${createProductsQuery(params)}`, {
    next: { revalidate: 300, tags: ["products", getProductsCacheTag(params)] },
  });

  if (!response.ok) {
    throw new Error(`Unable to load products (${response.status}).`);
  }

  return publicProductsPageSchema.parse(await response.json());
}

export async function getProductCatalogPage(params: GetPublicProductsParams): Promise<ProductCatalogPage> {
  const page = await getPublicProducts(params);
  return { ...page, items: page.items.map(mapPublicProduct) };
}

export async function getPublicProductBySlug(slug: string): Promise<Product> {
  const response = await fetch(`${clientEnv.NEXT_PUBLIC_API_BASE_URL}/products/${encodeURIComponent(slug)}`, {
    next: { revalidate: 300, tags: ["products", `product:${slug}`] },
  });

  if (response.status === 404) throw new ProductNotFoundError(slug);
  if (!response.ok) throw new Error(`Unable to load product (${response.status}).`);

  return publicProductDetailSchema.parse(await response.json());
}

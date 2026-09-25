import { clientEnv } from "@/config/client-env";
import type { Brand } from "@/features/brands";
import { mapPublicBrand } from "@/features/brands/utils/map-public-brand";
import type { Product } from "@/features/products/products.types";
import { mapPublicProduct } from "@/features/products/utils/map-public-product";
import { createServerApiRequestInit } from "@/lib/server-api-request";

import type { HomeBanner, HomeCategory, Testimonial } from "./home.types";
import { publicHomepageSchema, type PublicHomepage } from "./schemas/homepage.schema";

export type HomePageData = {
  banners: HomeBanner[];
  topBrands: Brand[];
  topCategories: HomeCategory[];
  outstandingProducts: Product[];
  newestProducts: Product[];
  personalizedProducts: Product[];
  testimonials: Testimonial[];
};

const emptyHomePageData: HomePageData = {
  banners: [],
  topBrands: [],
  topCategories: [],
  outstandingProducts: [],
  newestProducts: [],
  personalizedProducts: [],
  testimonials: [],
};

function resolvePublicAssetUrl(assetPath: string): string {
  if (/^https?:\/\//i.test(assetPath)) return assetPath;

  const relativePath = assetPath.replace(/^\/+/, "");
  const mediaPath = relativePath.startsWith("public/") ? `media/${relativePath}` : relativePath;

  if (clientEnv.NEXT_PUBLIC_API_BASE_URL.startsWith("/")) return `/${mediaPath}`;

  return new URL(mediaPath, `${new URL(clientEnv.NEXT_PUBLIC_API_BASE_URL).origin}/`).toString();
}

function sortByOrder<T extends { sortOrder: number }>(items: readonly T[]): T[] {
  return [...items].sort((left, right) => left.sortOrder - right.sortOrder);
}

function mapHomepageData(homepage: PublicHomepage): HomePageData {
  const newestProducts = homepage.newestProducts.map(mapPublicProduct);
  const outstandingProducts = homepage.newestProducts.some((product) => product.isOutstanding)
    ? homepage.newestProducts.filter((product) => product.isOutstanding).map(mapPublicProduct)
    : newestProducts;

  return {
    banners: sortByOrder(homepage.banners).map((banner) => ({
      id: banner.id,
      imageUrl: resolvePublicAssetUrl(banner.imagePath),
      linkUrl: banner.linkUrl,
      title: banner.title,
    })),
    topBrands: homepage.topBrands.map(mapPublicBrand),
    topCategories: sortByOrder(homepage.topCategories),
    outstandingProducts,
    newestProducts,
    personalizedProducts: homepage.personalizedOffers.map(mapPublicProduct),
    testimonials: sortByOrder(homepage.testimonials),
  };
}

export async function getPublicHomepage(): Promise<PublicHomepage> {
  const response = await fetch(
    `${clientEnv.NEXT_PUBLIC_API_BASE_URL}/homepage`,
    await createServerApiRequestInit({ revalidate: 300, tags: ["homepage"] }),
  );

  if (!response.ok) {
    throw new Error(`Unable to load homepage (${response.status}).`);
  }

  return publicHomepageSchema.parse(await response.json());
}

export async function getHomePageData(): Promise<HomePageData> {
  try {
    return mapHomepageData(await getPublicHomepage());
  } catch {
    return emptyHomePageData;
  }
}

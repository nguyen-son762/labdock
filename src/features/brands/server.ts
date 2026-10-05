import { clientEnv } from "@/config/client-env";
import { createServerApiRequestInit } from "@/lib/server-api-request";

import type { Brand } from "./brand.types";
import { publicBrandsSchema, type PublicBrand } from "./schemas/brand.schema";
import { mapPublicBrand, type PublicBrandWithLogo } from "./utils/map-public-brand";

export async function getPublicBrands(): Promise<PublicBrand[]> {
  const response = await fetch(
    `${clientEnv.NEXT_PUBLIC_API_BASE_URL}/brands`,
    await createServerApiRequestInit({ revalidate: 300, tags: ["brands"] }),
  );
  if (!response.ok) {
    throw new Error(`Unable to load brands (${response.status}).`);
  }

  const payload: unknown = await response.json();

  return publicBrandsSchema.parse(payload);
}

export async function getTopBrands(): Promise<Brand[]> {
  return (await getPublicBrands())
    .filter((brand): brand is PublicBrandWithLogo => brand.isTopBrand && brand.logoPath !== null)
    .map(mapPublicBrand);
}

import { clientEnv } from "@/config/client-env";

import type { Brand } from "./brand.types";
import { publicBrandsSchema, type PublicBrand } from "./schemas/brand.schema";
import { mapPublicBrand } from "./utils/map-public-brand";

export async function getPublicBrands(): Promise<PublicBrand[]> {
  const response = await fetch(`${clientEnv.NEXT_PUBLIC_API_BASE_URL}/brands`, {
    next: { revalidate: 300, tags: ["brands"] },
  });

  if (!response.ok) {
    throw new Error(`Unable to load brands (${response.status}).`);
  }

  return publicBrandsSchema.parse(await response.json());
}

export async function getTopBrands(): Promise<Brand[]> {
  return (await getPublicBrands()).filter((brand) => brand.isTopBrand).map(mapPublicBrand);
}

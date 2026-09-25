import { clientEnv } from "@/config/client-env";
import { createServerApiRequestInit } from "@/lib/server-api-request";

import { publicCategoryTreeSchema, type PublicCategoryTreeNode } from "./schemas/category.schema";

export async function getPublicCategories(): Promise<PublicCategoryTreeNode[]> {
  const response = await fetch(
    `${clientEnv.NEXT_PUBLIC_API_BASE_URL}/categories`,
    await createServerApiRequestInit({ revalidate: 300, tags: ["categories"] }),
  );

  if (!response.ok) {
    throw new Error(`Unable to load categories (${response.status}).`);
  }

  return publicCategoryTreeSchema.parse(await response.json());
}

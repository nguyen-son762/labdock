import { z } from "zod";

const guidPattern = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;

function firstSearchParam(value: unknown): unknown {
  return Array.isArray(value) ? value[0] : value;
}

const optionalGuidSearchParam = z.preprocess(
  firstSearchParam,
  z.string().regex(guidPattern).optional().catch(undefined),
);

export const productCatalogFiltersSchema = z
  .object({
    page: z.preprocess(firstSearchParam, z.coerce.number().int().positive().max(100_000).catch(1)),
    brandId: optionalGuidSearchParam,
    brandIds: z.preprocess(
      firstSearchParam,
      z
        .string()
        .optional()
        .transform((value) => [
          ...new Set(
            (value ?? "")
              .split(",")
              .map((id) => id.trim())
              .filter((id) => guidPattern.test(id)),
          ),
        ]),
    ),
    categoryId: optionalGuidSearchParam,
    origins: z.preprocess(
      firstSearchParam,
      z
        .string()
        .optional()
        .transform((value) => [
          ...new Set(
            (value ?? "")
              .split(",")
              .map((origin) => origin.trim())
              .filter(Boolean),
          ),
        ]),
    ),
    sort: z.preprocess(firstSearchParam, z.enum(["featured", "name", "price-desc"]).catch("featured")),
  })
  .transform(({ brandId, brandIds, ...filters }) => ({
    ...filters,
    brandIds: brandIds.length ? brandIds : brandId ? [brandId] : [],
  }));

export type ProductCatalogFilters = z.infer<typeof productCatalogFiltersSchema>;
export type ProductCatalogSearchParams = Record<string, string | string[] | undefined>;

export function parseProductCatalogFilters(searchParams: ProductCatalogSearchParams): ProductCatalogFilters {
  return productCatalogFiltersSchema.parse(searchParams);
}

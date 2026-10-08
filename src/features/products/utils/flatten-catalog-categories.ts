import type { CatalogCategoryOption } from "../products.types";

type CategoryNode = {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  productCount?: number;
  media: readonly { isPrimary: boolean; sortOrder: number; url: string }[];
  children: readonly CategoryNode[];
};

export function flattenCatalogCategories(nodes: readonly CategoryNode[], depth = 0): CatalogCategoryOption[] {
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
          productCount: category.productCount,
        },
        ...flattenCatalogCategories(category.children, depth + 1),
      ];
    });
}

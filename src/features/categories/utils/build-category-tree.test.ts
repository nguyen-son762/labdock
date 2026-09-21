import { describe, expect, it } from "vitest";

import type { Category } from "../schemas/category.schema";
import { buildCategoryTree } from "./build-category-tree";

function createCategory(
  id: string,
  name: string,
  parentId: string | null,
  overrides: Partial<Category> = {},
): Category {
  return {
    id,
    parentId,
    name,
    description: null,
    level: parentId ? 2 : 1,
    slug: name.toLowerCase().replaceAll(" ", "-"),
    isActive: true,
    sortOrder: 0,
    media: [],
    productCount: 0,
    updatedAt: "2026-09-03T08:11:36.121352+00:00",
    updatedByUserId: null,
    updatedByName: null,
    ...overrides,
  };
}

describe("buildCategoryTree", () => {
  it("maps unordered categories into an arbitrarily deep parent-child tree", () => {
    const root = createCategory("root", "Root", null);
    const child = createCategory("child", "Child", root.id);
    const grandchild = createCategory("grandchild", "Grandchild", child.id, { level: 3 });

    const result = buildCategoryTree([grandchild, child, root]);

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe(root.id);
    expect(result[0]?.children[0]?.id).toBe(child.id);
    expect(result[0]?.children[0]?.children[0]?.id).toBe(grandchild.id);
  });

  it("sorts every level and promotes active children whose parent is inactive", () => {
    const inactiveParent = createCategory("inactive", "Inactive", null, { isActive: false });
    const promotedChild = createCategory("promoted", "Promoted", inactiveParent.id, { sortOrder: 2 });
    const firstRoot = createCategory("first", "First", null, { sortOrder: 1 });

    const result = buildCategoryTree([promotedChild, inactiveParent, firstRoot]);

    expect(result.map((category) => category.id)).toEqual([firstRoot.id, promotedChild.id]);
  });

  it("keeps cyclic categories reachable as roots instead of creating a recursive structure", () => {
    const first = createCategory("first", "First", "second");
    const second = createCategory("second", "Second", "first");

    const result = buildCategoryTree([first, second]);

    expect(result.map((category) => category.id)).toEqual([first.id, second.id]);
    expect(result.every((category) => category.children.length === 0)).toBe(true);
  });
});

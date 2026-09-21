import type { Category, CategoryTreeNode } from "../schemas/category.schema";

function compareCategories(left: CategoryTreeNode, right: CategoryTreeNode): number {
  return left.sortOrder - right.sortOrder || left.name.localeCompare(right.name) || left.id.localeCompare(right.id);
}

function hasCircularParent(category: Category, categoriesById: ReadonlyMap<string, Category>): boolean {
  const visitedIds = new Set([category.id]);
  let parentId = category.parentId;

  while (parentId) {
    if (visitedIds.has(parentId)) return true;
    visitedIds.add(parentId);
    parentId = categoriesById.get(parentId)?.parentId ?? null;
  }

  return false;
}

function sortTree(nodes: CategoryTreeNode[]): CategoryTreeNode[] {
  nodes.sort(compareCategories);
  nodes.forEach((node) => sortTree(node.children));
  return nodes;
}

export function buildCategoryTree(categories: readonly Category[]): CategoryTreeNode[] {
  const visibleCategories = categories.filter((category) => category.isActive);
  const categoriesById = new Map(visibleCategories.map((category) => [category.id, category]));
  const nodesById = new Map<string, CategoryTreeNode>(
    visibleCategories.map((category): [string, CategoryTreeNode] => [category.id, { ...category, children: [] }]),
  );
  const roots: CategoryTreeNode[] = [];

  visibleCategories.forEach((category) => {
    const node = nodesById.get(category.id);
    if (!node) return;

    const parent = category.parentId ? nodesById.get(category.parentId) : undefined;
    if (!parent || hasCircularParent(category, categoriesById)) {
      roots.push(node);
      return;
    }

    parent.children.push(node);
  });

  return sortTree(roots);
}

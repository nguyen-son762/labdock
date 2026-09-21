import { z } from "zod";

const guidSchema = z.string().regex(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i, "Invalid identifier.");

const categoryMediaSchema = z.object({
  id: guidSchema,
  mediaId: guidSchema,
  relativePath: z.string().min(1),
  url: z.string().min(1),
  visibility: z.number().int(),
  contentType: z.string().min(1),
  sizeBytes: z.number().int().nonnegative(),
  sortOrder: z.number().int(),
  isPrimary: z.boolean(),
});

export const categorySchema = z.object({
  id: guidSchema,
  parentId: guidSchema.nullable(),
  name: z.string().min(1),
  description: z.string().nullable(),
  level: z.number().int().positive(),
  slug: z.string().min(1),
  isActive: z.boolean(),
  sortOrder: z.number().int(),
  media: z.array(categoryMediaSchema),
  productCount: z.number().int().nonnegative(),
  updatedAt: z.iso.datetime({ offset: true }),
  updatedByUserId: guidSchema.nullable(),
  updatedByName: z.string().nullable(),
});

export const categoriesSchema = z.array(categorySchema);

export type Category = z.infer<typeof categorySchema>;

export type CategoryTreeNode = Category & {
  children: CategoryTreeNode[];
};

const publicCategoryMediaSchema = z.object({
  id: guidSchema,
  url: z.string().min(1),
  contentType: z.string().min(1),
  sortOrder: z.number().int(),
  isPrimary: z.boolean(),
});

type PublicCategoryTreeNodeShape = {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  level: number;
  sortOrder: number;
  media: z.infer<typeof publicCategoryMediaSchema>[];
  children: PublicCategoryTreeNodeShape[];
};

export const publicCategoryTreeNodeSchema: z.ZodType<PublicCategoryTreeNodeShape> = z.lazy(() =>
  z.object({
    id: guidSchema,
    name: z.string().min(1),
    description: z.string().nullable(),
    slug: z.string().min(1),
    level: z.number().int().positive(),
    sortOrder: z.number().int(),
    media: z.array(publicCategoryMediaSchema),
    children: z.array(publicCategoryTreeNodeSchema),
  }),
);

export const publicCategoryTreeSchema = z.array(publicCategoryTreeNodeSchema);

export type PublicCategoryTreeNode = z.infer<typeof publicCategoryTreeNodeSchema>;

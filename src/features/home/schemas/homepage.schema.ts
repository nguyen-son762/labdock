import { publicBrandSchema } from "@/features/brands/schemas/brand.schema";
import { publicProductListItemSchema } from "@/features/products/schemas/product-list.schema";
import { z } from "zod";

const guidSchema = z.string().regex(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i, "Invalid identifier.");

const homepageBannerSchema = z.object({
  id: guidSchema,
  imagePath: z.string().min(1),
  linkUrl: z.string().min(1).nullable(),
  title: z.string().min(1).nullable(),
  sortOrder: z.number().int(),
});

const homepageCategorySchema = z.object({
  id: guidSchema,
  name: z.string().min(1),
  slug: z.string().min(1),
  sortOrder: z.number().int(),
});

const homepageTestimonialSchema = z.object({
  id: guidSchema,
  author: z.string().min(1),
  content: z.string().min(1),
  sortOrder: z.number().int(),
});

export const publicHomepageSchema = z.object({
  banners: z.array(homepageBannerSchema),
  topBrands: z.array(publicBrandSchema),
  topCategories: z.array(homepageCategorySchema),
  newestProducts: z.array(publicProductListItemSchema),
  personalizedOffers: z.array(publicProductListItemSchema),
  testimonials: z.array(homepageTestimonialSchema),
});

export type PublicHomepage = z.infer<typeof publicHomepageSchema>;

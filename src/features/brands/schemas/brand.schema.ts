import { z } from "zod";

const guidSchema = z.string().regex(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i, "Invalid identifier.");

export const publicBrandSchema = z.object({
  id: guidSchema,
  name: z.string().min(1),
  brandCode: z.string().min(1),
  country: z.string().min(1).nullable(),
  websiteUrl: z.string().min(1).nullable(),
  logoPath: z.string().min(1),
  isTopBrand: z.boolean(),
});

export const publicBrandsSchema = z.array(publicBrandSchema);

export type PublicBrand = z.infer<typeof publicBrandSchema>;

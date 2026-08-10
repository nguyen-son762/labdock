import { z } from "zod";

export const newsCategorySchema = z.enum(["News", "Events", "Company updates", "Features"]);

const articleSectionSchema = z.object({
  heading: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),
});

export const newsArticleSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  category: newsCategorySchema,
  publishedAt: z.iso.datetime(),
  image: z.string().startsWith("/"),
  heroImage: z.string().startsWith("/").optional(),
  introLines: z.array(z.string().min(1)).min(1),
  sections: z.array(articleSectionSchema),
  gallery: z.array(z.string().startsWith("/")),
});

export const newsArticlesSchema = z.array(newsArticleSchema).min(1);

export const eventSchema = z.object({
  title: z.string().min(1),
  month: z.string().min(3).max(3),
  day: z.string().regex(/^\d{2}$/),
  location: z.string().min(1),
});

export const eventsSchema = z.array(eventSchema);

export type NewsArticle = z.infer<typeof newsArticleSchema>;
export type NewsCategory = z.infer<typeof newsCategorySchema>;
export type NewsEvent = z.infer<typeof eventSchema>;

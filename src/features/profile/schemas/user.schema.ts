import { z } from "zod";

export const userRoleSchema = z.enum(["member", "manager", "admin"]);

export const currentUserSchema = z.object({
  id: z.string().min(1),
  fullName: z.string().min(1),
  email: z.string().email(),
  role: userRoleSchema,
  joinedAt: z.string().datetime(),
  lastActiveAt: z.string().datetime().nullable(),
});

export type CurrentUser = z.infer<typeof currentUserSchema>;

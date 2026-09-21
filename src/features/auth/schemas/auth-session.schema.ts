import { z } from "zod";

const authenticatedSessionSchema = z.object({
  authenticated: z.literal(true),
  expiresAt: z.iso.datetime({ offset: true }),
  mustChangePassword: z.boolean(),
});

const anonymousSessionSchema = z.object({ authenticated: z.literal(false) });

export const authSessionSchema = z.discriminatedUnion("authenticated", [
  authenticatedSessionSchema,
  anonymousSessionSchema,
]);

export type AuthSession = z.infer<typeof authSessionSchema>;

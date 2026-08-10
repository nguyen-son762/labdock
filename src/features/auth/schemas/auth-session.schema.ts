import { z } from "zod";

const authenticatedSessionSchema = z.object({ authenticated: z.literal(true) });

const anonymousSessionSchema = z.object({ authenticated: z.literal(false) });

export const authSessionSchema = z.discriminatedUnion("authenticated", [
  authenticatedSessionSchema,
  anonymousSessionSchema,
]);

export type AuthSession = z.infer<typeof authSessionSchema>;

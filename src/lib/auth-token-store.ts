import { z } from "zod";

export const authTokensSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  expiresAt: z.iso.datetime({ offset: true }),
  mustChangePassword: z.boolean(),
});

export type AuthTokens = z.infer<typeof authTokensSchema>;

let tokens: AuthTokens | null = null;
const clearListeners = new Set<() => void>();

export const authTokenStore = {
  set(input: unknown): AuthTokens {
    tokens = authTokensSchema.parse(input);
    return tokens;
  },

  clear(): void {
    const hadTokens = tokens !== null;
    tokens = null;
    if (hadTokens) clearListeners.forEach((listener) => listener());
  },

  getAccessToken(): string | null {
    return tokens?.accessToken ?? null;
  },

  getRefreshToken(): string | null {
    return tokens?.refreshToken ?? null;
  },

  getSessionMetadata(): Pick<AuthTokens, "expiresAt" | "mustChangePassword"> | null {
    if (!tokens) return null;
    return { expiresAt: tokens.expiresAt, mustChangePassword: tokens.mustChangePassword };
  },

  onClear(listener: () => void): () => void {
    clearListeners.add(listener);
    return () => clearListeners.delete(listener);
  },
};

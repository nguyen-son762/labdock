import { cookies } from "next/headers";

import { AUTH_COOKIE_NAMES } from "./auth-cookie-names";

type ServerApiCachePolicy = {
  revalidate: number;
  tags: readonly string[];
};

type NextServerRequestInit = RequestInit & {
  next?: {
    revalidate: number;
    tags: string[];
  };
};

async function getServerAccessToken(): Promise<string | null> {
  const rawToken = (await cookies()).get(AUTH_COOKIE_NAMES.accessToken)?.value;
  if (!rawToken) return null;

  try {
    const token = decodeURIComponent(rawToken);
    return /[\r\n]/.test(token) ? null : token;
  } catch {
    // Ignore malformed cookie encoding, but never swallow Next.js dynamic-rendering signals.
    return null;
  }
}

export async function createServerApiRequestInit(cachePolicy: ServerApiCachePolicy): Promise<NextServerRequestInit> {
  const accessToken = await getServerAccessToken();

  if (accessToken) {
    return {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    };
  }

  return {
    next: {
      revalidate: cachePolicy.revalidate,
      tags: [...cachePolicy.tags],
    },
  };
}

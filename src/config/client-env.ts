import { z } from "zod";

const DEFAULT_API_BASE_URL = "https://uat-api-labdock.365studio.vn/api/public/v1";

function isValidApiBaseUrl(value: string): boolean {
  if (/^\/(?!\/)/.test(value) && value !== "/") return true;
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

const apiBaseUrlSchema = z
  .string()
  .min(1)
  .refine(isValidApiBaseUrl, "API base URL must be an HTTP(S) URL or root-relative path.")
  .transform((value) => value.replace(/\/+$/, ""));

export function resolveApiBaseUrl(value: string | undefined): string {
  return apiBaseUrlSchema.parse(value ?? DEFAULT_API_BASE_URL);
}

export const clientEnv = {
  NEXT_PUBLIC_API_BASE_URL: resolveApiBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL),
} as const;

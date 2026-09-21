import { clientEnv } from "@/config/client-env";

import type { Brand } from "../brand.types";
import type { PublicBrand } from "../schemas/brand.schema";

function resolveLogoUrl(logoPath: string): string {
  if (/^https?:\/\//i.test(logoPath)) return logoPath;

  const relativePath = logoPath.replace(/^\/+/, "");
  const mediaPath = relativePath.startsWith("public/") ? `media/${relativePath}` : relativePath;

  if (clientEnv.NEXT_PUBLIC_API_BASE_URL.startsWith("/")) return `/${mediaPath}`;

  return new URL(mediaPath, `${new URL(clientEnv.NEXT_PUBLIC_API_BASE_URL).origin}/`).toString();
}

function resolveWebsiteUrl(websiteUrl: string | null): string | null {
  if (!websiteUrl) return null;

  try {
    const url = new URL(websiteUrl);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function mapPublicBrand(brand: PublicBrand): Brand {
  return {
    id: brand.id,
    name: brand.name,
    logoUrl: resolveLogoUrl(brand.logoPath),
    websiteUrl: resolveWebsiteUrl(brand.websiteUrl),
  };
}

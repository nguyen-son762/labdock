import { hasLocale } from "next-intl";

import { routing, type AppLocale } from "./routing";

export function isAppLocale(value: string): value is AppLocale {
  return hasLocale(routing.locales, value);
}

export function getLocalizedPath(path: string, locale: AppLocale) {
  const normalizedPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;

  return locale === routing.defaultLocale ? normalizedPath || "/" : `/${locale}${normalizedPath}`;
}

export function getLanguageAlternates(path: string) {
  return {
    en: getLocalizedPath(path, "en"),
    vi: getLocalizedPath(path, "vi"),
    "x-default": getLocalizedPath(path, routing.defaultLocale),
  };
}

export function getLocalizedAlternates(path: string, locale: AppLocale) {
  return {
    canonical: getLocalizedPath(path, locale),
    languages: getLanguageAlternates(path),
  };
}

"use client";

import { ShoppingCart } from "iconsax-reactjs";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { useCartQuery } from "../api/use-cart-query";

export function CompactCartLink() {
  const t = useTranslations("Header");
  const cartQuery = useCartQuery();
  const itemCount = cartQuery.data?.length ?? 0;

  return (
    <Link
      href="/cart"
      aria-label={t("cart")}
      className="relative flex size-10 items-center justify-center rounded-full bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <ShoppingCart className="size-5" variant="Bold" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-[#e57a00] text-[10px] font-semibold"
      >
        {itemCount}
      </span>
    </Link>
  );
}

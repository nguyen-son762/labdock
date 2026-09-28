import {
  ArrowRight,
  Box,
  Calendar,
  ClipboardText,
  Location,
  MessageText,
  MoneyChange,
  People,
  ReceiptItem,
  ShoppingCart,
  TruckFast,
  Verify,
} from "iconsax-reactjs";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/class-names";

import type { HomeBanner } from "../home.types";

const guarantees = [
  { key: "verified", icon: Verify, color: "bg-[#dff5eb] text-[#3eb584]" },
  { key: "certified", icon: Verify, color: "bg-[#dff5eb] text-[#3eb584]" },
  { key: "delivery", icon: TruckFast, color: "bg-[#dceeff] text-[#164990]" },
  { key: "pricing", icon: MoneyChange, color: "bg-[#fff0d2] text-[#e57a00]" },
] as const;

const quickActions = [
  { key: "product", icon: Box, href: "/#new-products", imageUrl: "/home/icon/lab_1.svg" },
  { key: "suppliers", icon: People, href: "/#research-leaders", imageUrl: "/home/icon/group.svg" },
  { key: "rfq", icon: ClipboardText, href: "/rfqs", imageUrl: "/home/icon/invoice.svg" },
  { key: "orders", icon: ShoppingCart, href: "/orders", imageUrl: "/home/icon/shopping-cart.svg" },
  { key: "chat", icon: MessageText, href: "/contact-us", imageUrl: "/home/icon/chat-box.svg" },
  { key: "news", icon: ReceiptItem, href: "/#news", imageUrl: "/home/icon/annotation.svg" },
] as const;

function PromoCard({ event = false }: { event?: boolean }) {
  const t = useTranslations("Home");

  return (
    <article className="relative min-h-[250px] overflow-hidden rounded-xl text-white lg:min-h-[300px]">
      <Image
        src={event ? "/home/event-promo.png" : "/home/hero-promo.png"}
        alt=""
        fill
        unoptimized
        priority
        sizes={event ? "(min-width: 1024px) 33vw, 100vw" : "(min-width: 1024px) 66vw, 100vw"}
        className="object-cover"
      />
      <div className="absolute inset-0  " />
      <div className="relative flex h-full min-h-[250px] max-w-lg flex-col justify-end p-6 lg:min-h-[300px]">
        <span className="mb-2 w-fit rounded bg-[#e57a00] px-1.5 py-0.5 text-[10px] font-semibold uppercase">
          {event ? t("upcomingEvent") : t("lowStock")}
        </span>
        <h2 className="max-w-md text-xl font-semibold leading-tight lg:text-2xl">
          {event ? t("eventPromo") : t("chemicalPromo")}
        </h2>
        {event ? (
          <p className="mt-3 flex flex-wrap gap-4 text-xs text-white/90">
            <span className="inline-flex items-center gap-1.5">
              <Location className="size-3.5" variant="Bold" aria-hidden="true" /> Singapore
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5" variant="Bold" aria-hidden="true" /> 6 Jun 2026
            </span>
          </p>
        ) : null}
        <Button asChild variant={event ? "default" : "brand"} className="mt-5 h-11 w-fit rounded-full px-5">
          <Link href={event ? "/contact-us" : "#new-products"}>
            {event ? t("register") : t("shopCollection")}
            <span className="flex size-7 items-center justify-center rounded-full bg-white/10">
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          </Link>
        </Button>
      </div>
    </article>
  );
}

function HomepageBannerCard({ banner }: { banner: HomeBanner }) {
  const content = (
    <article className="group relative min-h-[250px] overflow-hidden rounded-xl text-white lg:min-h-[300px]">
      <Image
        src={banner.imageUrl}
        alt=""
        fill
        unoptimized
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08265f]/90 via-[#08265f]/25 to-transparent" />
      {banner.title ? (
        <div className="relative flex min-h-[250px] items-end p-6 lg:min-h-[300px]">
          <h2 className="max-w-xl text-xl font-semibold leading-tight lg:text-2xl">{banner.title}</h2>
        </div>
      ) : null}
    </article>
  );

  if (!banner.linkUrl) return content;

  const linkClassName = "block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]";
  if (/^https?:\/\//i.test(banner.linkUrl)) {
    return (
      <a
        href={banner.linkUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={banner.title ?? "Homepage banner"}
        className={linkClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={banner.linkUrl} aria-label={banner.title ?? "Homepage banner"} className={linkClassName}>
      {content}
    </Link>
  );
}

export function HeroSection({ banners }: { banners: readonly HomeBanner[] }) {
  const t = useTranslations("Home");

  return (
    <section className="relative overflow-hidden bg-[#dcecff] pb-14" aria-labelledby="home-hero-title">
      <Image
        src="/home/hero-bg.png"
        alt=""
        fill
        unoptimized
        priority
        sizes="100vw"
        className="object-cover object-top opacity-45 mix-blend-multiply"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#d8e9ff]/35 via-[#dcecff]/65 to-[#f5f8fb]" />
      <div className="container relative pt-12 lg:pt-14">
        <div className="max-w-[820px]">
          <h1
            id="home-hero-title"
            className="max-w-[470px] text-4xl font-bold leading-[1.12] text-[#051a50] lg:text-[40px]"
          >
            {t("heroTitle")}
          </h1>
          <p className="mt-5 max-w-[460px] text-base leading-6 text-[#5e6375]">{t("heroDescription")}</p>
          <ul
            className="mt-7 inline-flex max-w-full flex-wrap items-center gap-x-5 gap-y-2 rounded-[28px] bg-white px-2.5 py-2 pr-5 shadow-[0_6px_24px_rgba(5,26,80,0.04)]"
            aria-label="Procurement guarantees"
          >
            {guarantees.map(({ key, icon: Icon, color }) => (
              <li key={key} className="flex min-h-8 items-center gap-2 whitespace-nowrap text-sm text-[#22293b]">
                <span className={`flex size-8 shrink-0 items-center justify-center rounded-full ${color}`}>
                  <Icon className="size-4" variant="Bold" aria-hidden="true" />
                </span>
                {t(`guarantees.${key}`)}
              </li>
            ))}
          </ul>
        </div>

        {banners.length ? (
          <div className={cn("mt-10 grid gap-5", banners.length > 1 ? "lg:grid-cols-2" : "lg:grid-cols-1")}>
            {banners.map((banner) => (
              <HomepageBannerCard key={banner.id} banner={banner} />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-5 lg:grid-cols-[2fr_1fr]">
            <PromoCard />
            <PromoCard event />
          </div>
        )}

        <nav aria-label="Quick actions" className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {quickActions.map(({ key, href, imageUrl }) => (
            <Link
              key={key}
              href={href}
              className="flex h-[72px] items-center justify-center gap-3 rounded-xl bg-white/90 px-4 font-semibold text-[#22293b] shadow-[0_8px_30px_rgba(5,26,80,0.05)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]"
            >
              <Image src={imageUrl} alt="" width={40} height={40} />
              {t(`quickActions.${key}`)}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}

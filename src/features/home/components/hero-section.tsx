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
import Link from "next/link";

import { Button } from "@/components/ui/button";

const guarantees = [
  { label: "Verified Lab Products", icon: Verify, color: "bg-[#dff5eb] text-[#3eb584]" },
  { label: "ISO Certified", icon: Verify, color: "bg-[#dff5eb] text-[#3eb584]" },
  { label: "Fast Delivery", icon: TruckFast, color: "bg-[#dceeff] text-[#164990]" },
  { label: "Bulk Pricing Available", icon: MoneyChange, color: "bg-[#fff0d2] text-[#e57a00]" },
] as const;

const quickActions = [
  { label: "Product", icon: Box, href: "#new-products" },
  { label: "Suppliers", icon: People, href: "#research-leaders" },
  { label: "RFQ", icon: ClipboardText, href: "/rfqs" },
  { label: "Orders", icon: ShoppingCart, href: "/orders" },
  { label: "Chat", icon: MessageText, href: "/contact-us" },
  { label: "News", icon: ReceiptItem, href: "#news" },
] as const;

function PromoCard({ event = false }: { event?: boolean }) {
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
          {event ? "Upcoming event" : "Low stock"}
        </span>
        <h2 className="max-w-md text-xl font-semibold leading-tight lg:text-2xl">
          {event ? "2025 Biotech Expo, iDNA Live Demonstration" : "High-Purity Chemicals for Uncompromising Research."}
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
            {event ? "Register Now" : "Shop the Collection"}
            <span className="flex size-7 items-center justify-center rounded-full bg-white/10">
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          </Link>
        </Button>
      </div>
    </article>
  );
}

export function HeroSection() {
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
        <div className="max-w-[610px]">
          <h1
            id="home-hero-title"
            className="max-w-[470px] text-4xl font-bold leading-[1.12] text-[#051a50] lg:text-[40px]"
          >
            Your Trusted Partner for Laboratory Procurement
          </h1>
          <p className="mt-5 max-w-[460px] text-base leading-6 text-[#5e6375]">
            Explore the new iDNA-Centrifuge series.
            <br /> Efficiency redefined for modern research.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Procurement guarantees">
            {guarantees.map(({ label, icon: Icon, color }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-full bg-white px-2 py-1.5 text-xs text-[#22293b]"
              >
                <span className={`flex size-6 items-center justify-center rounded-full ${color}`}>
                  <Icon className="size-3.5" variant="Bold" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[2fr_1fr]">
          <PromoCard />
          <PromoCard event />
        </div>

        <nav aria-label="Quick actions" className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {quickActions.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="flex h-[72px] items-center justify-center gap-3 rounded-xl bg-white/90 px-4 font-semibold text-[#22293b] shadow-[0_8px_30px_rgba(5,26,80,0.05)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#e8f3ff] text-[#1670aa]">
                <Icon className="size-6" variant="Bulk" aria-hidden="true" />
              </span>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}

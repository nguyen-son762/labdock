"use client";

import {
  ArrowDown,
  ArrowRight2,
  Box,
  Building,
  Call,
  ChemicalGlass,
  Health,
  Home,
  Menu,
  Microscope,
  ProfileCircle,
  SearchNormal1,
  Shop,
  ShoppingCart,
  Sms,
} from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/class-names";

const topLinks = [
  { label: "Home", icon: Home },
  { label: "About us", icon: Building },
  { label: "Contact us", icon: Call },
] as const;

const categories = [
  { label: "Chemicals & Reagents", icon: ChemicalGlass, slug: "chemicals-reagents" },
  { label: "Lab Equipment", icon: Microscope, slug: "lab-equipment" },
  { label: "Medical & Healthcare", icon: Health, slug: "medical-healthcare" },
  { label: "Lab Consumables", icon: Box, slug: "lab-consumables" },
] as const;

function CategoryPopover({ compact = false }: { compact?: boolean }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="brand"
          aria-label={compact ? "Open categories" : undefined}
          className={cn(
            "h-11 shrink-0 gap-2 shadow-none",
            compact ? "size-10 rounded-full p-0" : "w-[134px] rounded-l-full rounded-r-none px-4",
          )}
        >
          <Menu className="size-4" aria-hidden="true" />
          {compact ? null : <span>All Categories</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-[320px] overflow-hidden rounded-xl border border-[#d5d7da] bg-white p-2 text-[#101828] shadow-[0_12px_32px_rgba(5,26,80,0.16)]"
      >
        <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#868da5]">
          Shop by categories
        </p>
        <nav aria-label="Product categories" className="space-y-1">
          {categories.map(({ label, icon: Icon, slug }) => (
            <Button
              key={slug}
              asChild
              variant="ghost"
              className="h-11 w-full justify-start rounded-lg px-3 font-medium text-[#051a50] hover:bg-[#f5f7f8]"
            >
              <Link href={`/#category-${slug}`}>
                <Icon className="size-5 text-[#2f7ac6]" aria-hidden="true" />
                <span className="flex-1 text-left">{label}</span>
                <ArrowRight2 className="size-4 text-[#a3abbd]" aria-hidden="true" />
              </Link>
            </Button>
          ))}
        </nav>
      </PopoverContent>
    </Popover>
  );
}

function AccountSummary() {
  return (
    <Link
      href="/login"
      className="flex h-9 w-[120px] shrink-0 items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10">
        <ProfileCircle className="size-4" variant="Bold" aria-hidden="true" />
      </span>
      <span className="flex flex-col text-left leading-none">
        <span className="text-[13px] leading-[17px]">Sign in</span>
        <strong className="text-sm leading-[18px]">Account</strong>
      </span>
    </Link>
  );
}

function OrderSummary() {
  return (
    <Link
      href="/dashboard"
      className="flex h-9 w-[114px] shrink-0 items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10">
        <ShoppingCart className="size-4" variant="Bold" aria-hidden="true" />
        <span className="absolute -right-1 -top-0.5 flex size-4 items-center justify-center rounded-full bg-[#e57a00] text-[10px] font-semibold leading-none">
          2
        </span>
      </span>
      <span className="flex flex-col text-left leading-none">
        <span className="text-[13px] leading-[17px]">Orders</span>
        <strong className="whitespace-nowrap text-sm leading-[18px]">S$200.00</strong>
      </span>
    </Link>
  );
}

function SearchBox({ className }: { className?: string }) {
  return (
    <div role="search" className={cn("flex h-11 items-center overflow-hidden bg-[#f5f7f8] pl-4 pr-1.5", className)}>
      <Input
        aria-label="Search catalog"
        placeholder="Search by CAS/catalog/product name..."
        className="h-10 min-w-0 flex-1 border-0 bg-transparent px-0 text-sm text-[#051a50] shadow-none placeholder:text-[#a3abbd] focus-visible:ring-0! focus-visible:ring-offset-0 focus-visible:outline-none! focus-visible:shadow-none!"
      />
      <Button
        type="button"
        size="icon"
        variant="brand"
        aria-label="Search"
        className="size-8 shrink-0 p-0 shadow-[0_0_15px_rgba(229,122,0,0.5)]"
      >
        <SearchNormal1 className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}

export function MainHeader() {
  return (
    <header className="relative h-[110px] overflow-visible bg-[#16518f] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <Image src="/auth/header.png" alt="" fill priority sizes="100vw" className="object-cover" />
        <Image
          src="/auth/pattern.png"
          alt=""
          width={515}
          height={364}
          className="absolute right-0 top-0 h-[364px] w-[515px] opacity-50 mix-blend-lighten"
        />
        <Image
          src="/auth/pattern.png"
          alt=""
          width={515}
          height={364}
          className="absolute left-0 top-1/2 h-[364px] w-[515px] -translate-y-1/2 rotate-180 opacity-80 mix-blend-lighten"
        />
      </div>

      <div className="relative z-10 mx-auto h-full max-w-[1440px]">
        <div className="flex h-9 items-center justify-between border-b border-white/10 px-5 text-[13px] font-medium sm:px-10 xl:px-20">
          <nav aria-label="Secondary navigation" className="flex items-center gap-4 sm:gap-6">
            {topLinks.map(({ label, icon: Icon }) => (
              <Link
                key={label}
                href={label === "Home" ? "/" : `/#${label.toLowerCase().replaceAll(" ", "-")}`}
                className="inline-flex h-5 items-center gap-2 transition-opacity hover:opacity-80"
              >
                <Icon className="size-4" aria-hidden="true" />
                <span className={cn(label !== "Home" && "hidden sm:inline")}>{label}</span>
              </Link>
            ))}
          </nav>
          <div className="hidden h-5 items-center sm:flex">
            <span className="inline-flex items-center gap-1.5">
              <Sms className="size-3.5" variant="Bold" aria-hidden="true" />
              info@i-dna.sg
            </span>
            <span className="mx-5 h-5 w-px bg-white/20" aria-hidden="true" />
            <button type="button" className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80">
              English <ArrowDown className="size-3.5" aria-hidden="true" />
            </button>
            <button type="button" className="ml-5 inline-flex items-center gap-1.5 transition-opacity hover:opacity-80">
              <span aria-hidden="true">🇸🇬</span> SGD <ArrowDown className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex h-[74px] items-center px-5 sm:px-10 xl:px-20">
          <Link
            href="/"
            aria-label="Labdock home"
            className="flex h-[50px] w-[185px] shrink-0 items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Image
              src="/auth/company-logo.png"
              alt=""
              width={56}
              height={50}
              className="h-[50px] w-[56px] object-cover object-bottom"
            />
            <Image
              src="/auth/labdock-wordmark.svg"
              alt="Labdock"
              width={121}
              height={30}
              className="h-[30px] w-[121px]"
            />
          </Link>

          <div className="ml-[71px] hidden h-11 w-[485px] shrink-0 items-stretch gap-px xl:flex">
            <CategoryPopover />
            <SearchBox className="w-[350px] rounded-r-full" />
          </div>

          <Button
            variant="brand"
            className="ml-[78px] hidden h-11 shrink-0 justify-start rounded-full py-1.5 pl-1.5 pr-4 shadow-[0_0_25px_rgba(239,163,59,0.3)] xl:flex"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#efa33b] shadow-[0_0_15px_rgba(229,122,0,0.5)]">
              <Shop className="size-4" aria-hidden="true" />
            </span>
            <span className="flex flex-col items-start gap-px text-left leading-none">
              <strong className="text-[13px] leading-[16px]">Sell on Labdock</strong>
              <span className="text-xs font-normal leading-[15px]">Become distributor partner</span>
            </span>
          </Button>

          <div className="ml-2.5 hidden items-center gap-2 xl:flex">
            <AccountSummary />
            <OrderSummary />
          </div>

          <div className="ml-auto flex min-w-0 items-center gap-2 xl:hidden">
            <SearchBox className="hidden w-[min(42vw,420px)] rounded-full lg:flex" />
            <CategoryPopover compact />
            <Link
              href="/login"
              aria-label="Sign in"
              className="flex size-10 items-center justify-center rounded-full bg-white/10"
            >
              <ProfileCircle className="size-5" variant="Bold" aria-hidden="true" />
            </Link>
            <Link
              href="/dashboard"
              aria-label="Orders"
              className="relative flex size-10 items-center justify-center rounded-full bg-white/10"
            >
              <ShoppingCart className="size-5" variant="Bold" aria-hidden="true" />
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-[#e57a00] text-[10px] font-semibold">
                2
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

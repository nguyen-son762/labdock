"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import type { CatalogBrandOption } from "../products.types";
import type { ProductCatalogFilters } from "../schemas/product-catalog.schema";
import { CatalogOriginFilter } from "./catalog-origin-filter";

type FilterOption = {
  id: string;
  name: string;
};

type FilterGroupProps = {
  id: string;
  title: string;
  searchPlaceholder: string;
  options: readonly FilterOption[];
  selectedIds: readonly string[];
  disabled: boolean;
  hasError: boolean;
  onChange: (values: string[]) => void;
};

function FilterGroup({
  id,
  title,
  searchPlaceholder,
  options,
  selectedIds,
  disabled,
  hasError,
  onChange,
}: FilterGroupProps) {
  const t = useTranslations("Catalog");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const matchingOptions = options.filter((option) => option.name.toLowerCase().includes(query.trim().toLowerCase()));
  const visibleOptions = expanded || query.trim() ? matchingOptions : matchingOptions.slice(0, 5);

  return (
    <fieldset className="min-w-0 border-b border-[#ecf0f3] pb-4">
      <legend className="w-full">
        <Button
          type="button"
          variant="ghost"
          aria-expanded={isOpen}
          aria-controls={`${id}-content`}
          onClick={() => setIsOpen((open) => !open)}
          className="h-auto w-full justify-between rounded-none py-1.5 pl-1 pr-0 text-sm font-medium leading-5 text-[#2e3038] hover:bg-transparent hover:text-[#2e3038]"
        >
          {title}
          <Image
            src="/products/filters/chevron-up.svg"
            alt=""
            width={16}
            height={16}
            aria-hidden="true"
            className={isOpen ? undefined : "rotate-180"}
          />
        </Button>
      </legend>
      <div id={`${id}-content`} hidden={!isOpen}>
        <div className="relative mt-1">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label={searchPlaceholder}
            placeholder={searchPlaceholder}
            disabled={disabled || hasError}
            className="h-10 rounded-sm border-[#dde2e8] bg-white pl-3.5 pr-10 text-sm placeholder:text-[#b1bac8] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <Image
            src="/products/filters/search.svg"
            alt=""
            width={16}
            height={16}
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
          />
        </div>

        {hasError ? (
          <p role="status" className="mt-3 text-xs text-[#b42318]">
            {t("unableBrands")}
          </p>
        ) : (
          <div id={`${id}-options`} className="mt-1 max-h-64 space-y-0.5 overflow-y-auto">
            {visibleOptions.map((option) => {
              const optionId = `${id}-${option.id}`;
              return (
                <div key={option.id} className="flex min-h-8 items-center gap-2 pl-1">
                  <Checkbox
                    id={optionId}
                    checked={selectedIds.includes(option.id)}
                    disabled={disabled}
                    className="border-[#c8d0d9] shadow-none data-[state=checked]:border-[#596ab7] data-[state=checked]:bg-[#f2f7fd]"
                    onCheckedChange={(checked) =>
                      onChange(
                        checked === true
                          ? [...selectedIds, option.id]
                          : selectedIds.filter((selected) => selected !== option.id),
                      )
                    }
                  />
                  <Label
                    htmlFor={optionId}
                    className="min-w-0 flex-1 cursor-pointer break-words py-1.5 text-sm font-medium leading-5 text-[#2e3038]"
                    title={option.name}
                  >
                    {option.name}
                  </Label>
                </div>
              );
            })}
            {visibleOptions.length === 0 ? <p className="text-xs text-[#73798f]">{t("noMatchingBrands")}</p> : null}
          </div>
        )}
        {!hasError && !query.trim() && matchingOptions.length > 5 ? (
          <div className="mt-2 flex justify-center">
            <Button
              type="button"
              variant="ghost"
              disabled={disabled}
              aria-expanded={expanded}
              aria-controls={`${id}-options`}
              onClick={() => setExpanded((value) => !value)}
              className="h-auto w-fit gap-2 rounded-none p-0 text-sm font-semibold leading-5 text-[#1f5fa8] shadow-none hover:bg-transparent hover:text-[#1f5fa8] hover:underline"
            >
              {expanded ? t("seeLess") : t("seeMoreBrands", { count: matchingOptions.length - 5 })}
              <Image
                src="/products/filters/arrow-down.svg"
                alt=""
                width={16}
                height={16}
                aria-hidden="true"
                className={expanded ? "rotate-180" : undefined}
              />
            </Button>
          </div>
        ) : null}
      </div>
    </fieldset>
  );
}

type CatalogFiltersProps = {
  origins: readonly string[];
  brands: readonly CatalogBrandOption[];
  filters: ProductCatalogFilters;
  disabled: boolean;
  originsError: boolean;
  brandsError: boolean;
  onBrandChange: (brandIds: string[]) => void;
  onOriginsChange: (origins: string[]) => void;
  onClear: () => void;
};

export function CatalogFilters({
  origins,
  brands,
  filters,
  disabled,
  originsError,
  brandsError,
  onBrandChange,
  onOriginsChange,
  onClear,
}: CatalogFiltersProps) {
  const t = useTranslations("Catalog");
  const hasFilters = Boolean(
    filters.brandIds.length || filters.categoryId || filters.origins.length || filters.sort !== "featured",
  );

  return (
    <aside
      aria-label={t("productFilters")}
      className="min-w-0 rounded-xl bg-white p-4 lg:rounded-none lg:bg-transparent lg:p-0"
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="min-w-0 flex-1 border-b border-[#ECF0F3] pb-2 text-base font-semibold text-[#051a50]">
          {t("moreFilters")}
        </h2>
        {hasFilters ? (
          <Button
            type="button"
            variant="ghost"
            disabled={disabled}
            onClick={onClear}
            className="h-auto p-0 text-xs font-medium text-[#2f7bc4] hover:bg-transparent"
          >
            {t("clear")}
          </Button>
        ) : null}
      </div>
      <div className="space-y-4">
        <FilterGroup
          id="brand-filter"
          title={t("brands")}
          searchPlaceholder={t("searchBrands")}
          options={brands}
          selectedIds={filters.brandIds}
          disabled={disabled}
          hasError={brandsError}
          onChange={onBrandChange}
        />
        <CatalogOriginFilter
          origins={origins}
          selectedOrigins={filters.origins}
          disabled={disabled}
          hasError={originsError}
          onChange={onOriginsChange}
        />
      </div>
    </aside>
  );
}

"use client";

import { ArrowUp, SearchNormal1 } from "iconsax-reactjs";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import type { CatalogBrandOption, CatalogCategoryOption } from "../products.types";
import type { ProductCatalogFilters } from "../schemas/product-catalog.schema";

type FilterOption = {
  id: string;
  name: string;
  depth?: number;
};

type FilterGroupProps = {
  id: string;
  title: string;
  searchPlaceholder: string;
  options: readonly FilterOption[];
  selectedId?: string;
  disabled: boolean;
  hasError: boolean;
  onChange: (value: string | null) => void;
};

function FilterGroup({
  id,
  title,
  searchPlaceholder,
  options,
  selectedId,
  disabled,
  hasError,
  onChange,
}: FilterGroupProps) {
  const [query, setQuery] = useState("");
  const visibleOptions = options.filter((option) => option.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <fieldset className="border-b border-[#e5e9ef] pb-5">
      <legend className="flex w-full items-center justify-between py-2 text-sm font-semibold text-[#051a50]">
        {title} <ArrowUp className="size-4" aria-hidden="true" />
      </legend>
      <div className="relative mt-1">
        <SearchNormal1
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#a3abbd]"
          aria-hidden="true"
        />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label={searchPlaceholder}
          placeholder={searchPlaceholder}
          disabled={disabled || hasError}
          className="h-10 bg-white pl-9 text-xs"
        />
      </div>

      {hasError ? (
        <p role="status" className="mt-3 text-xs text-[#b42318]">
          Unable to load {title.toLowerCase()}.
        </p>
      ) : (
        <RadioGroup
          value={selectedId ?? "all"}
          onValueChange={(value) => onChange(value === "all" ? null : value)}
          disabled={disabled}
          aria-label={`Filter by ${title.toLowerCase()}`}
          className="mt-3 max-h-64 gap-2.5 overflow-y-auto pr-1"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem id={`${id}-all`} value="all" />
            <Label htmlFor={`${id}-all`} className="cursor-pointer text-xs font-normal text-[#303647]">
              All {title.toLowerCase()}
            </Label>
          </div>
          {visibleOptions.map((option) => {
            const optionId = `${id}-${option.id}`;
            return (
              <div key={option.id} className="flex items-center gap-2">
                <RadioGroupItem id={optionId} value={option.id} />
                <Label
                  htmlFor={optionId}
                  className="min-w-0 flex-1 cursor-pointer truncate text-xs font-normal text-[#303647]"
                  style={{ paddingLeft: `${(option.depth ?? 0) * 12}px` }}
                  title={option.name}
                >
                  {option.name}
                </Label>
              </div>
            );
          })}
          {visibleOptions.length === 0 ? (
            <p className="text-xs text-[#73798f]">No matching {title.toLowerCase()}.</p>
          ) : null}
        </RadioGroup>
      )}
    </fieldset>
  );
}

type CatalogFiltersProps = {
  categories: readonly CatalogCategoryOption[];
  brands: readonly CatalogBrandOption[];
  filters: ProductCatalogFilters;
  disabled: boolean;
  categoriesError: boolean;
  brandsError: boolean;
  onBrandChange: (brandId: string | null) => void;
  onCategoryChange: (categoryId: string | null) => void;
  onClear: () => void;
};

export function CatalogFilters({
  categories,
  brands,
  filters,
  disabled,
  categoriesError,
  brandsError,
  onBrandChange,
  onCategoryChange,
  onClear,
}: CatalogFiltersProps) {
  const hasFilters = Boolean(filters.brandId || filters.categoryId || filters.sort !== "featured");

  return (
    <aside aria-label="Product filters" className="rounded-xl bg-white p-4 lg:rounded-none lg:bg-transparent lg:p-0">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-[#051a50]">More filter</h2>
        {hasFilters ? (
          <Button
            type="button"
            variant="ghost"
            disabled={disabled}
            onClick={onClear}
            className="h-auto p-0 text-xs font-medium text-[#2f7bc4] hover:bg-transparent"
          >
            Clear
          </Button>
        ) : null}
      </div>
      <div className="space-y-4">
        <FilterGroup
          id="brand-filter"
          title="Brands"
          searchPlaceholder="Search brands"
          options={brands}
          selectedId={filters.brandId}
          disabled={disabled}
          hasError={brandsError}
          onChange={onBrandChange}
        />
        <FilterGroup
          id="category-filter"
          title="Categories"
          searchPlaceholder="Search categories"
          options={categories}
          selectedId={filters.categoryId}
          disabled={disabled}
          hasError={categoriesError}
          onChange={onCategoryChange}
        />
      </div>
    </aside>
  );
}

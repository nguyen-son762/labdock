"use client";

import { ArrowLeft, ArrowRight, ArrowUp, SearchNormal1 } from "iconsax-reactjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import type { Product } from "../products.types";
import { ProductCard } from "./product-card";
import { QuoteCard } from "./quote-card";

const brandOptions = ["Medisafe", "BIO-RAD", "Sartorius", "Heidolph", "Charles River Laboratories"];
const originOptions = ["Singapore", "Germany", "Italy", "Japan", "Vietnam"];

type FilterGroupProps = {
  title: string;
  searchPlaceholder: string;
  options: string[];
  selected: string[];
  onChange: (value: string, checked: boolean) => void;
};

function FilterGroup({ title, searchPlaceholder, options, selected, onChange }: FilterGroupProps) {
  const [query, setQuery] = useState("");
  const visibleOptions = options.filter((option) => option.toLowerCase().includes(query.toLowerCase()));

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
          placeholder={searchPlaceholder}
          className="h-10 bg-white pl-9 text-xs"
        />
      </div>
      <div className="mt-3 space-y-2.5">
        {visibleOptions.map((option, index) => {
          const id = `${title}-${option}`.toLowerCase().replaceAll(" ", "-");
          return (
            <div key={option} className="flex items-center gap-2">
              <Checkbox
                id={id}
                checked={selected.includes(option)}
                onCheckedChange={(checked) => onChange(option, checked === true)}
              />
              <Label htmlFor={id} className="min-w-0 flex-1 cursor-pointer truncate text-xs font-normal text-[#303647]">
                {option}
              </Label>
              <span className="text-[10px] text-[#a3abbd]">{123 - index * 7}</span>
            </div>
          );
        })}
      </div>
      <Button
        type="button"
        variant="ghost"
        className="mt-2 h-auto p-0 text-xs font-medium text-[#2f7bc4] hover:bg-transparent"
      >
        See more
      </Button>
    </fieldset>
  );
}

function Pagination() {
  return (
    <nav aria-label="Product pagination" className="mt-8 flex flex-wrap items-center justify-center gap-1">
      <Button type="button" variant="ghost" size="sm" className="text-[#5e6375]">
        <ArrowLeft className="size-4" aria-hidden="true" /> Previous
      </Button>
      {[1, 2, 3].map((page) => (
        <Button
          key={page}
          type="button"
          variant={page === 1 ? "default" : "ghost"}
          size="icon"
          aria-current={page === 1 ? "page" : undefined}
          className="size-8 rounded-full"
        >
          {page}
        </Button>
      ))}
      <span className="px-1 text-[#868da5]">…</span>
      {[8, 9, 10].map((page) => (
        <Button key={page} type="button" variant="ghost" size="icon" className="size-8 rounded-full">
          {page}
        </Button>
      ))}
      <Button type="button" variant="ghost" size="sm" className="text-[#5e6375]">
        Next <ArrowRight className="size-4" aria-hidden="true" />
      </Button>
    </nav>
  );
}

export function CatalogWorkspace({ allProducts }: { allProducts: Product[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedBrands = searchParams.getAll("brand");
  const selectedOrigins = searchParams.getAll("origin");
  const sort = searchParams.get("sort") ?? "featured";

  function updateFilter(key: "brand" | "origin", value: string, checked: boolean) {
    const next = new URLSearchParams(searchParams.toString());
    const values = next.getAll(key).filter((item) => item !== value);
    next.delete(key);
    [...values, ...(checked ? [value] : [])].forEach((item) => next.append(key, item));
    router.replace(`/products?${next.toString()}`, { scroll: false });
  }

  const products = useMemo(() => {
    const filtered = allProducts.filter(
      (product) =>
        (!selectedBrands.length || selectedBrands.includes(product.brand)) &&
        (!selectedOrigins.length || selectedOrigins.includes(product.origin)),
    );
    if (sort === "name") return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "price-desc") return [...filtered].sort((a, b) => b.price.localeCompare(a.price));
    return filtered;
  }, [allProducts, selectedBrands, selectedOrigins, sort]);

  return (
    <div className="grid gap-8 lg:grid-cols-[238px_minmax(0,1fr)]">
      <aside aria-label="Product filters" className="rounded-xl bg-white p-4 lg:rounded-none lg:bg-transparent lg:p-0">
        <h2 className="mb-2 text-xl font-semibold text-[#051a50]">More filter</h2>
        <div className="space-y-4">
          <FilterGroup
            title="Brands"
            searchPlaceholder="Search brands"
            options={brandOptions}
            selected={selectedBrands}
            onChange={(value, checked) => updateFilter("brand", value, checked)}
          />
          <FilterGroup
            title="Origin"
            searchPlaceholder="Search origin"
            options={originOptions}
            selected={selectedOrigins}
            onChange={(value, checked) => updateFilter("origin", value, checked)}
          />
        </div>
      </aside>

      <section aria-labelledby="product-list-title" className="min-w-0">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="product-list-title" className="text-xl font-semibold text-[#051a50]">
              Product listing
            </h2>
            <p className="mt-1 text-xs text-[#73798f]">Showing {products.length} products</p>
          </div>
          <Select
            value={sort}
            onValueChange={(value) => {
              const next = new URLSearchParams(searchParams.toString());
              next.set("sort", value);
              router.replace(`/products?${next.toString()}`, { scroll: false });
            }}
          >
            <SelectTrigger aria-label="Sort products" className="h-10 w-full bg-white sm:w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured products</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-desc">Price high to low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {products.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
            {products.slice(0, 3).map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} />
            ))}
            <QuoteCard />
            {products.slice(3).map((product, index) => (
              <ProductCard key={`${product.id}-${index + 3}`} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed bg-white p-12 text-center text-sm text-[#73798f]">
            No products match the selected filters.
          </div>
        )}
        <Pagination />
      </section>
    </div>
  );
}

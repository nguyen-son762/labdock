"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/class-names";

import type { Product } from "../products.types";

const tabs = ["Description", "Specifications", "References"] as const;
type Tab = (typeof tabs)[number];

export function ProductInformation({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<Tab>("Specifications");

  return (
    <section
      className="overflow-hidden rounded-xl border border-[#e3e8ee] bg-white"
      aria-labelledby="product-information-title"
    >
      <h2 id="product-information-title" className="sr-only">
        Product information
      </h2>
      <div className="flex overflow-x-auto border-b border-[#e5e9ef] px-4">
        {tabs.map((tab) => (
          <Button
            key={tab}
            type="button"
            variant="ghost"
            aria-pressed={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "relative h-12 shrink-0 rounded-none px-5 text-xs text-[#73798f] hover:bg-transparent hover:text-[#164990]",
              activeTab === tab &&
                "text-[#164990] after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-[#2f7bc4]",
            )}
          >
            {tab}
          </Button>
        ))}
      </div>
      <div className="p-5">
        {activeTab === "Description" ? <p className="text-sm leading-6 text-[#5e6375]">{product.description}</p> : null}
        {activeTab === "Specifications" ? (
          <dl className="overflow-hidden rounded-lg border border-[#e5e9ef]">
            {product.specifications.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "grid grid-cols-2 gap-4 px-4 py-3 text-xs",
                  index % 2 === 0 ? "bg-[#f8fafc]" : "bg-white",
                )}
              >
                <dt className="font-medium text-[#5e6375]">{item.label}</dt>
                <dd className="text-[#051a50]">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {activeTab === "References" ? (
          <p className="text-sm leading-6 text-[#5e6375]">
            Technical data sheet, certificate of analysis and safety documentation are available on request.
          </p>
        ) : null}
      </div>
    </section>
  );
}

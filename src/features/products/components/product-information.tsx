"use client";

import { DocumentDownload } from "iconsax-reactjs";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/class-names";

import type { Product } from "../products.types";
import { resolveProductMediaUrl } from "../utils/product-display";

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
                key={`${item.name}-${item.value}`}
                className={cn(
                  "grid grid-cols-2 gap-4 px-4 py-3 text-xs",
                  index % 2 === 0 ? "bg-[#f8fafc]" : "bg-white",
                )}
              >
                <dt className="font-medium text-[#5e6375]">{item.name}</dt>
                <dd className="text-[#051a50]">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {activeTab === "References" ? (
          product.documents.length ? (
            <ul className="space-y-2">
              {[...product.documents]
                .sort((left, right) => left.sortOrder - right.sortOrder)
                .map((document) => (
                  <li key={document.id}>
                    <a
                      href={resolveProductMediaUrl(document.url)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-[#e5e9ef] px-4 py-3 text-sm font-medium text-[#164990] transition-colors hover:bg-[#f3f8fc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]"
                    >
                      <DocumentDownload className="size-5 shrink-0" aria-hidden="true" />
                      <span className="min-w-0 flex-1 truncate">{document.displayName}</span>
                      <span className="text-xs font-normal text-[#73798f]">
                        {(document.sizeBytes / 1024).toLocaleString("en-SG", { maximumFractionDigits: 1 })} KB
                      </span>
                    </a>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-sm leading-6 text-[#5e6375]">No product documents are available.</p>
          )
        ) : null}
      </div>
    </section>
  );
}

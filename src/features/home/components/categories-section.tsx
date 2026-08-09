import {
  Activity,
  Box,
  BucketCircle,
  ChemicalGlass,
  Drop,
  Filter,
  Hierarchy3,
  Like1,
  Microscope,
  RulerPen,
  Setting2,
  StatusUp,
  Verify,
} from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";

import { categoryNames } from "../data/home-data";

const categoryIcons = [
  Hierarchy3,
  Activity,
  Setting2,
  Drop,
  ChemicalGlass,
  RulerPen,
  Box,
  Filter,
  BucketCircle,
  Microscope,
  Box,
  Hierarchy3,
] as const;

export function CategoriesSection() {
  return (
    <section className="bg-[#f5f8fb] py-12" aria-labelledby="top-categories-title">
      <div className="container">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-[#ef8704] via-[#f6ad4b] to-white p-4 lg:p-5">
          <div className="mb-5 flex items-center gap-2 text-white">
            <Like1 className="size-7" variant="Bold" aria-hidden="true" />
            <h2 id="top-categories-title" className="text-2xl font-semibold">
              Top Categories
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {categoryNames.map(([name, count], index) => {
                const Icon = categoryIcons[index];
                return (
                  <Link
                    key={name}
                    id={`category-${name.toLowerCase().replaceAll(" ", "-")}`}
                    href={`/categories/${name.toLowerCase().replaceAll(" ", "-")}`}
                    className="relative flex min-h-[92px] items-center gap-3 rounded-lg bg-white/90 p-3 text-[#051a50] shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]"
                  >
                    {Icon ? (
                      <Icon className="size-8 shrink-0 text-[#1572ad]" variant="Bulk" aria-hidden="true" />
                    ) : null}
                    <span>
                      <strong className="block text-sm leading-5">{name}</strong>
                      <small className="text-xs text-[#73798f]">{count}</small>
                    </span>
                    {index < 4 ? (
                      <span className="absolute right-0 top-0 inline-flex items-center gap-1 rounded-bl bg-[#e57a00] px-1.5 py-0.5 text-[9px] text-white">
                        <StatusUp className="size-2.5" aria-hidden="true" /> {index < 2 ? "Best Seller" : "Trending"}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
            <aside className="relative min-h-[360px] overflow-hidden rounded-xl bg-[#08265f] p-5 text-white lg:min-h-0">
              <Image
                src="/home/category-promo.png"
                alt="Microscope and laboratory glassware"
                fill
                sizes="320px"
                className="object-cover object-center opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#08265f]/80 via-transparent to-[#08265f]/15" />
              <div className="relative">
                <p className="text-4xl font-bold">10,000+</p>
                <p className="mt-1 text-lg">Verified Lab Products</p>
                <div className="mt-4 flex flex-wrap gap-2 text-[10px] text-[#164990]">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1">
                    <Verify className="size-3 text-[#3eb584]" variant="Bold" aria-hidden="true" /> ISO Certified
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1">
                    <Verify className="size-3 text-[#3eb584]" variant="Bold" aria-hidden="true" /> COA / SDS Available
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

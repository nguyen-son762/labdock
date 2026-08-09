import { ArrowRight, StatusUp } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const promos = [
  {
    badge: "Sale off 15%",
    title: "Advanced Laboratory Equipment",
    description: "Upgrade your facility with high-performance instruments and professional after-sales support.",
    image: "/home/editorial-equipment.png",
    action: "Request a Quote",
  },
  {
    badge: "Trending",
    title: "High-Purity Chemicals & Reagents",
    description:
      "Access authentic molecular biology reagents and biotechnological solutions directly from trusted vendors.",
    image: "/home/editorial-chemicals.png",
    action: "Shop the Collection",
  },
  {
    badge: "Trending",
    title: "Premium Lab Consumables",
    description:
      "Stock up on essential glassware and plasticware designed to simplify scientific procurement & enhance efficiency.",
    image: "/home/editorial-consumables.png",
    action: "Shop the Collection",
  },
] as const;

export function EditorialSection() {
  return (
    <section id="news" className="bg-[#f5f8fb] py-12" aria-label="Featured laboratory collections">
      <div className="container grid gap-5 lg:grid-cols-3">
        {promos.map((promo, index) => (
          <article key={promo.title} className="relative min-h-[300px] overflow-hidden rounded-xl text-white">
            <Image
              src={promo.image}
              alt=""
              fill
              unoptimized
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08265f]/95 via-[#0b3472]/45 to-transparent" />
            <div className="relative flex min-h-[300px] flex-col justify-end p-5">
              <span
                className={`mb-2 inline-flex w-fit items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
                  index === 0 ? "bg-[#dc2626]" : "bg-[#32b77f]"
                }`}
              >
                <StatusUp className="size-3" variant="Bold" aria-hidden="true" /> {promo.badge}
              </span>
              <h2 className="text-xl font-semibold">{promo.title}</h2>
              <p className="mt-2 min-h-10 text-xs leading-5 text-white/90">{promo.description}</p>
              <Button asChild variant="brand" className="mt-5 h-11 w-fit rounded-full px-5">
                <Link href="#new-products">
                  {promo.action}
                  <span className="flex size-7 items-center justify-center rounded-full bg-white/15">
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

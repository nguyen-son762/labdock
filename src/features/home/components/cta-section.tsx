import { ArrowRight } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const cards = [
  {
    title: "Advanced Laboratory Equipment",
    description: "Upgrade your facility with high-performance instruments and professional after-sales support.",
    action: "Shop the Collection",
    image: "/home/cta-equipment.png",
    tone: "from-[#154b93] to-[#2f7bc4]",
    href: "#new-products",
  },
  {
    title: "Become an Distributor Partner",
    description: "List your catalog on the most efficient bio-marketplace and reach high-intent buyers.",
    action: "Sell on Labdock",
    image: "/home/cta-partner.png",
    tone: "from-[#eb6e77] to-[#f39a13]",
    href: "#contact-us",
  },
] as const;

export function CtaSection() {
  return (
    <section className="bg-[#f5f8fb] py-16" aria-label="Explore Labdock opportunities">
      <div className="container grid gap-5 lg:grid-cols-2">
        {cards.map((card) => (
          <article
            key={card.title}
            className={`relative min-h-[300px] overflow-hidden rounded-2xl bg-gradient-to-r ${card.tone}`}
          >
            <div className="absolute right-0 top-0 h-full w-[55%]">
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-contain object-bottom"
              />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(255,255,255,0.15),transparent_35%)]" />
            <div className="relative flex min-h-[300px] max-w-[60%] flex-col justify-center p-6 text-white">
              <h2 className="text-2xl font-semibold leading-tight">{card.title}</h2>
              <p className="mt-3 text-xs leading-5 text-white/90">{card.description}</p>
              <Button
                asChild
                variant={card.action === "Sell on Labdock" ? "default" : "brand"}
                className="mt-5 h-11 w-fit rounded-full px-5"
              >
                <Link href={card.href}>
                  {card.action}
                  <span className="flex size-7 items-center justify-center rounded-full bg-white/10">
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

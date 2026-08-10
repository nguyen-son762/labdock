import { ArrowRight, StatusUp } from "iconsax-reactjs";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const promos = [
  {
    key: "equipment",
    image: "/home/editorial-equipment.png",
  },
  {
    key: "chemicals",
    image: "/home/editorial-chemicals.png",
  },
  {
    key: "consumables",
    image: "/home/editorial-consumables.png",
  },
] as const;

export function EditorialSection() {
  const t = useTranslations("Home");

  return (
    <section id="news" className="bg-[#f5f8fb] py-12" aria-label="Featured laboratory collections">
      <div className="container grid gap-5 lg:grid-cols-3">
        {promos.map((promo, index) => (
          <article key={promo.key} className="relative min-h-[300px] overflow-hidden rounded-xl text-white">
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
                <StatusUp className="size-3" variant="Bold" aria-hidden="true" />
                {t(`editorial.${promo.key}.badge`)}
              </span>
              <h2 className="text-xl font-semibold">{t(`editorial.${promo.key}.title`)}</h2>
              <p className="mt-2 min-h-10 text-xs leading-5 text-white/90">{t(`editorial.${promo.key}.description`)}</p>
              <Button asChild variant="brand" className="mt-5 h-11 w-fit rounded-full px-5">
                <Link href="#new-products">
                  {t(`editorial.${promo.key}.action`)}
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

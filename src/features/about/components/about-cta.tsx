import { ArrowRight } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function AboutCta() {
  return (
    <section
      className="relative flex min-h-[153px] flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl px-5 text-center"
      aria-labelledby="about-cta-title"
    >
      <Image src="/about/about-cta-bg.png" alt="" fill sizes="1240px" className="object-cover" />
      <Image
        src="/auth/pattern.png"
        alt=""
        width={515}
        height={364}
        className="absolute -left-10 -top-[100px] h-[364px] w-[515px] rotate-180 opacity-50 mix-blend-lighten"
      />
      <Image
        src="/auth/pattern.png"
        alt=""
        width={515}
        height={364}
        className="absolute -top-7 right-0 h-[364px] w-[515px] opacity-50 mix-blend-lighten"
      />
      <h2 id="about-cta-title" className="relative text-2xl font-semibold leading-tight text-white sm:text-[32px]">
        Powering 200+ research institutions across Southeast Asia
      </h2>
      <Button
        asChild
        variant="brand"
        className="relative h-14 rounded-full py-1.5 pl-[18px] pr-1.5 text-base font-normal"
      >
        <Link href="/products">
          Explore products
          <span className="flex size-11 items-center justify-center rounded-full bg-[#efa33b]">
            <ArrowRight className="size-6" aria-hidden="true" />
          </span>
        </Link>
      </Button>
    </section>
  );
}

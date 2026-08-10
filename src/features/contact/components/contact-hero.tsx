import Image from "next/image";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export function ContactHero() {
  return (
    <section className="relative flex h-[193px] items-center justify-center overflow-hidden px-5 text-center">
      <Image
        src="/contact/contact-hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="relative flex max-w-[472px] flex-col items-center">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact us" }]} />
        <h1 className="mt-3 text-[32px] font-semibold leading-none text-[#0f3678]">Contact us</h1>
        <p className="mt-4 text-sm leading-5 text-[#051a50]">
          Have questions about our equipment, need a custom quote, or require technical support? We&apos;re here to
          help.
        </p>
      </div>
    </section>
  );
}

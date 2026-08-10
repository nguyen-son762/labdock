import Image from "next/image";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export function NewsHero() {
  return (
    <section className="relative isolate min-h-[197px] overflow-hidden px-5 py-8 sm:px-10">
      <Image
        src="/news/news-header.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div className="mx-auto flex max-w-[472px] flex-col items-center gap-4 text-center">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "News" }]} />
        <div className="space-y-3">
          <h1 className="text-[32px] font-semibold leading-none text-[#0f3678]">News</h1>
          <p className="text-sm leading-5 text-[#051a50]">
            Stay informed with the latest research breakthroughs, industry news, best lab practices, and upcoming
            scientific events.
          </p>
        </div>
      </div>
    </section>
  );
}

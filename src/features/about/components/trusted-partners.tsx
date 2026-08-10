import Image from "next/image";

import { partnerPlaceholders } from "../about.data";

export function TrustedPartners() {
  return (
    <section className="rounded-lg bg-white p-4" aria-labelledby="trusted-partners-title">
      <h2 id="trusted-partners-title" className="text-[28px] font-semibold leading-tight text-[#0f3678] sm:text-[32px]">
        Trusted by leading research institutions
      </h2>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {partnerPlaceholders.map((partner) => (
          <li
            key={partner.id}
            className="flex h-[94px] min-w-0 items-center justify-center rounded border border-[#e9eaeb] bg-white px-2"
          >
            <Image src="/about/medicore-mark.svg" alt="" width={32} height={32} className="size-8 shrink-0" />
            <span className="whitespace-nowrap text-sm font-semibold text-[#051a50] sm:text-base">{partner.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

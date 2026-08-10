import { ArrowRight, DocumentText, Verify } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function QuoteCard() {
  return (
    <aside className="relative col-span-2 min-h-[382px] overflow-hidden rounded-lg bg-gradient-to-br from-[#174d91] to-[#72b1de] p-5 text-white">
      <Image
        src="/home/editorial-equipment.png"
        alt="Laboratory equipment"
        fill
        unoptimized
        sizes="400px"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#123f82]/95 via-[#174d91]/85 to-[#2f7bc4]/40" />
      <div className="relative flex h-full flex-col justify-center">
        <DocumentText className="size-9 text-[#f3a132]" variant="Bulk" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-semibold">Need a quote?</h2>
        <p className="mt-2 max-w-[270px] text-sm text-white/85">
          Get custom pricing for bulk orders and recurring laboratory purchases.
        </p>
        <Button asChild variant="brand" className="mt-6 w-fit px-5 shadow-none">
          <Link href="/contact-us?type=quote">
            Request a Quote <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
        <div className="mt-6 flex flex-wrap gap-2 text-[10px]">
          {["ISO Certified", "COA-SDS Available"].map((label) => (
            <span key={label} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1">
              <Verify className="size-3 text-[#85d5bb]" variant="Bold" aria-hidden="true" /> {label}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}

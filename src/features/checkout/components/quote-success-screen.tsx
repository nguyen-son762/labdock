import { TickCircle } from "iconsax-reactjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function QuoteSuccessScreen() {
  return (
    <section
      className="flex min-h-[490px] items-center justify-center bg-cover bg-center px-5 py-14 text-center"
      style={{ backgroundImage: "url('/checkout/success-background.png')" }}
    >
      <div className="flex max-w-2xl flex-col items-center">
        <TickCircle className="size-16 text-[#2474ca]" variant="Bold" aria-hidden="true" />
        <h1 className="mt-5 text-3xl font-semibold text-[#051a50]">Your RFQ was successfully submitted!</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#73798f]">
          Thank you for your request. Our team is reviewing your requirements and will respond with a quotation within
          2–3 business days. If you have additional details to share, feel free to contact us.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button
            asChild
            variant="outline"
            className="h-11 min-w-40 rounded-full border-[#2474ca] text-[#164990] hover:bg-[#eef6ff] hover:text-[#164990]"
          >
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="brand" className="h-11 min-w-44 px-7 shadow-none">
            <Link href="/products">Continue shopping</Link>
          </Button>
        </div>
        <Link
          href="/rfqs"
          className="mt-5 rounded text-sm font-semibold text-[#164990] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]"
        >
          View submitted RFQs
        </Link>
      </div>
    </section>
  );
}

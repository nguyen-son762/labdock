import { ShoppingBag } from "iconsax-reactjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function EmptyCartScreen() {
  return (
    <section
      className="flex min-h-[490px] items-center justify-center bg-cover bg-center px-5 py-16 text-center"
      style={{ backgroundImage: "url('/checkout/success-background.png')" }}
    >
      <div className="flex max-w-md flex-col items-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-[#fff3e0] text-[#e57a00]">
          <ShoppingBag className="size-9" aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-3xl font-semibold text-[#051a50]">Your cart is empty</h1>
        <p className="mt-3 text-sm text-[#73798f]">Add some products to get started!</p>
        <Button asChild variant="brand" className="mt-6 h-11 min-w-48 px-7 shadow-none">
          <Link href="/products">Start to shop now</Link>
        </Button>
      </div>
    </section>
  );
}

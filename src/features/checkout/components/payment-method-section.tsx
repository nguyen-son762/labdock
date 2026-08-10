import { Bank } from "iconsax-reactjs";
import Image from "next/image";
import type { UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/class-names";

import type { CheckoutFormValues } from "../schemas/checkout.schema";

const methods = [
  { value: "paynow", title: "PayNow QR Code", description: "Scan QR code with your banking app" },
  { value: "bank-transfer", title: "Bank transfer", description: "Secure payment via Stripe" },
] as const;

export function PaymentMethodSection({ form }: { form: UseFormReturn<CheckoutFormValues> }) {
  return (
    <section className="rounded-xl border border-[#dde2e8] bg-white p-4">
      <FormField
        control={form.control}
        name="paymentMethod"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-2xl font-semibold text-[#051a50]">Payment method</FormLabel>
            <FormControl>
              <RadioGroup value={field.value} onValueChange={field.onChange} className="mt-5 gap-3">
                {methods.map((method) => (
                  <label
                    key={method.value}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors",
                      field.value === method.value
                        ? "border-[#ecf0f3] bg-[#f5f7f8]"
                        : "border-[#ecf0f3] bg-white hover:bg-[#fafcfd]",
                    )}
                  >
                    <RadioGroupItem value={method.value} aria-label={method.title} />
                    <span className="min-w-0 flex-1">
                      <strong className="block text-sm text-[#051a50]">{method.title}</strong>
                      <span className="block text-xs text-[#73798f]">{method.description}</span>
                    </span>
                    {method.value === "paynow" ? (
                      <span className="relative size-8 overflow-hidden rounded border bg-white">
                        <Image
                          src="/checkout/paynow-logo.svg"
                          alt="PayNow"
                          fill
                          sizes="32px"
                          className="object-contain p-0.5"
                        />
                      </span>
                    ) : (
                      <Bank className="size-6 text-[#164990]" aria-hidden="true" />
                    )}
                  </label>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
}

import type { UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";

import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import type { CheckoutFormValues } from "../schemas/checkout.schema";

export function BillingSection({ form }: { form: UseFormReturn<CheckoutFormValues> }) {
  const t = useTranslations("Checkout");
  const sameAsDelivery = form.watch("billingSameAsDelivery");

  return (
    <section className="rounded-xl border border-[#dde2e8] bg-white p-4" aria-labelledby="billing-address-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="billing-address-title" className="text-2xl font-semibold text-[#051a50]">
          {t("billingAddress")}
        </h2>
        <FormField
          control={form.control}
          name="billingSameAsDelivery"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="cursor-pointer font-normal">{t("sameAsDelivery")}</FormLabel>
            </FormItem>
          )}
        />
      </div>
      {!sameAsDelivery ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-[2fr_1fr]">
          <FormField
            control={form.control}
            name="billingAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("billingAddress")} *</FormLabel>
                <FormControl>
                  <Input autoComplete="billing street-address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billingPostalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("postalCode")} *</FormLabel>
                <FormControl>
                  <Input inputMode="numeric" autoComplete="billing postal-code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ) : null}
    </section>
  );
}

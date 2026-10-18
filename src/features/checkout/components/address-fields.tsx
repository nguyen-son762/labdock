import type { UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";

import { CountrySelect } from "@/components/shared/country-select";
import { getCountryCallingCode } from "@/constants/country-options";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { getNationalPhone } from "../utils/national-phone";
import type { CheckoutFormValues } from "../schemas/checkout.schema";
import { CountryCallingCodePicker } from "./country-calling-code-picker";

export function DeliveryAddressFields({ form }: { form: UseFormReturn<CheckoutFormValues> }) {
  const t = useTranslations("Checkout");
  const country = form.watch("country");
  const callingCode = getCountryCallingCode(country);
  const changeCountry = (nextCountry: string) => {
    const previousCallingCode = getCountryCallingCode(form.getValues("country"));
    const nextCallingCode = getCountryCallingCode(nextCountry);
    const nationalNumber = getNationalPhone(form.getValues("phone"), previousCallingCode);

    form.setValue("country", nextCountry, { shouldDirty: true, shouldValidate: true });
    form.setValue("phone", [nextCallingCode, nationalNumber].filter(Boolean).join(" "), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <section className="rounded-xl border border-[#dde2e8] bg-white p-4" aria-labelledby="delivery-address-title">
      <h2 id="delivery-address-title" className="text-2xl font-semibold text-[#051a50]">
        {t("deliveryAddress")}
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t("fullName")} *</FormLabel>
              <FormControl>
                <Input autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("emailAddress")} <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="min-w-0">
              <FormLabel>
                {t("phoneNumber")} <span className="text-destructive">*</span>
              </FormLabel>
              <div className="flex h-11 min-w-0 overflow-hidden rounded-md border border-input shadow-sm transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <CountryCallingCodePicker value={country} onChange={changeCountry} />
                <FormControl>
                  <Input
                    name={field.name}
                    ref={field.ref}
                    inputMode="tel"
                    autoComplete="tel-national"
                    value={getNationalPhone(field.value, callingCode)}
                    onBlur={field.onBlur}
                    onChange={(event) => {
                      const nationalNumber = event.currentTarget.value;
                      field.onChange([callingCode, nationalNumber].filter(Boolean).join(" "));
                    }}
                    className="h-full w-0 min-w-0 flex-1 rounded-none border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t("company")}</FormLabel>
              <FormControl>
                <Input autoComplete="organization" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>
                {t("address")} <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input autoComplete="street-address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("postalCode")} <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input inputMode="numeric" autoComplete="postal-code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("country")} <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <CountrySelect {...field} onValueChange={changeCountry} placeholder={t("selectCountry")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </section>
  );
}

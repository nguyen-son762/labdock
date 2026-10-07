"use client";

import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import type { ContactFormValues } from "../schemas/contact.schema";

type TextFieldName = "fullName" | "email" | "company";

const contactFields: Array<{
  name: TextFieldName;
  label: "fullName" | "email" | "company";
  placeholder: "enterFullName" | "enterEmail" | "enterCompany";
  required?: boolean;
  type?: "email";
}> = [
  { name: "fullName", label: "fullName", placeholder: "enterFullName", required: true },
  { name: "email", label: "email", placeholder: "enterEmail", required: true, type: "email" },
  { name: "company", label: "company", placeholder: "enterCompany" },
];

function RequiredMark() {
  return <span className="text-[#d92d20]">*</span>;
}

export function ContactInfoFields() {
  const t = useTranslations("Contact");
  const form = useFormContext<ContactFormValues>();

  const renderField = (name: TextFieldName) => {
    const config = contactFields.find((item) => item.name === name);
    if (!config) return null;
    return (
      <FormField
        key={name}
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="space-y-1.5">
            <FormLabel className="text-xs text-[#051a50]">
              {t(config.label)} {config.required ? <RequiredMark /> : null}
            </FormLabel>
            <FormControl>
              <Input
                type={config.type ?? "text"}
                placeholder={t(config.placeholder)}
                autoComplete={name === "fullName" ? "name" : name === "email" ? "email" : "organization"}
                className="h-11 border-[#d5dce5] bg-white"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    );
  };

  return (
    <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
      {renderField("fullName")}
      {renderField("email")}
      <div className="space-y-1.5">
        <Label htmlFor="contact-phone" className="text-xs text-[#051a50]">
          {t("phone")} <RequiredMark />
        </Label>
        <div className="grid grid-cols-[74px_1fr]">
          <FormField
            control={form.control}
            name="phoneCountry"
            render={({ field }) => (
              <FormItem>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger
                      aria-label={t("phoneCountryCode")}
                      className="h-11 rounded-r-none border-[#d5dce5] bg-white px-2"
                    >
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    <SelectItem value="65">+65</SelectItem>
                    <SelectItem value="60">+60</SelectItem>
                    <SelectItem value="84">+84</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="contact-phone"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder={t("enterPhone")}
                    className="h-11 rounded-l-none border-[#d5dce5] bg-white"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {form.formState.errors.phoneCountry?.message || form.formState.errors.phone?.message ? (
          <p role="alert" className="text-xs font-medium text-destructive">
            {form.formState.errors.phoneCountry?.message ?? form.formState.errors.phone?.message}
          </p>
        ) : null}
      </div>
      {renderField("company")}
    </div>
  );
}

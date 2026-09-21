import { Control } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/class-names";

import callingCodeData from "../data/calling-codes.json";
import countryData from "../data/countries.json";
import { type SignupValues } from "../schemas/signup.schema";

export const inputClassName =
  "h-[42px] rounded-lg border-[#d5d7da] px-3.5 py-2.5 text-base shadow-[0_1px_2px_rgba(10,13,18,0.05)]";
export const countries = countryData.map(({ code, name }) => ({ value: code, label: name }));
export const callingCodes = [...new Set(callingCodeData.map(({ dialCode }) => dialCode))].map((dialCode) => ({
  value: dialCode,
  label: dialCode,
}));

export function Field({
  name,
  label,
  placeholder,
  control,
  required = false,
  className,
}: {
  name: "company" | "fullName" | "email" | "region" | "address";
  label: string;
  placeholder: string;
  control: Control<SignupValues>;
  required?: boolean;
  className?: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label} {required ? <span className="text-destructive">*</span> : null}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              autoComplete={
                name === "email"
                  ? "email"
                  : name === "fullName"
                    ? "name"
                    : name === "address"
                      ? "street-address"
                      : name === "region"
                        ? "address-level1"
                        : "organization"
              }
              className={inputClassName}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function SelectField({
  name,
  label,
  placeholder,
  options,
  control,
  required = false,
}: {
  name: "country" | "region";
  label: string;
  placeholder: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  control: Control<SignupValues>;
  required?: boolean;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {required ? <span className="text-destructive">*</span> : null}
          </FormLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className={inputClassName}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function PhoneField({ control }: { control: Control<SignupValues> }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium leading-none">
        Phone no. <span className="text-destructive">*</span>
      </p>
      <div className="grid grid-cols-[88px_1fr] gap-2">
        <FormField
          control={control}
          name="phoneCode"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="sr-only">Calling code</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className={cn(inputClassName, "px-3 text-sm")}>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {callingCodes.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="sr-only">Phone number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="Enter phone number"
                  className={inputClassName}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

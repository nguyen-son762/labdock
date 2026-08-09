import { Control } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/class-names";

import { type SignupValues } from "../schemas/signup.schema";

export const inputClassName =
  "h-[42px] rounded-lg border-[#d5d7da] px-3.5 py-2.5 text-base shadow-[0_1px_2px_rgba(10,13,18,0.05)]";
export const countries = ["Singapore", "Malaysia", "Vietnam", "Indonesia"] as const;
export const regions = ["Central Region", "East Region", "North Region", "North-East Region", "West Region"] as const;
export const callingCodes = ["+65", "+60", "+84", "+62"] as const;

export function Field({
  name,
  label,
  placeholder,
  control,
  required = false,
  className,
}: {
  name: "company" | "fullName" | "email" | "address";
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
  options: readonly string[];
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
                <SelectItem key={option} value={option}>
                  {option}
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
                  {callingCodes.map((code) => (
                    <SelectItem key={code} value={code}>
                      {code}
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

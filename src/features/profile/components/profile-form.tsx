"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Refresh2, TickCircle } from "iconsax-reactjs";
import { useForm } from "react-hook-form";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getApiErrorMessage } from "@/lib/api-error";

import { useUpdateProfileMutation } from "../api/use-update-profile-mutation";
import { profileFormSchema, type ProfileFormValues } from "../schemas/profile-form.schema";
import type { CurrentUser } from "../schemas/user.schema";

type FieldName = Exclude<keyof ProfileFormValues, "country" | "billingSameAsDelivery">;

const fields: Array<{ name: FieldName; label: string; required?: boolean; wide?: boolean; type?: "email" | "tel" }> = [
  { name: "fullName", label: "Full name", required: true },
  { name: "phone", label: "Phone no.", required: true, type: "tel" },
  { name: "email", label: "Email address", required: true, wide: true, type: "email" },
  { name: "companyName", label: "Company name", required: true },
  { name: "companyPhone", label: "Company phone no.", type: "tel" },
  { name: "businessRegistrationNumber", label: "Business registration no.", wide: true },
  { name: "deliveryAddress", label: "Address", required: true, wide: true },
  { name: "postalCode", label: "Postal code", required: true },
];

function SectionTitle({ children }: { children: string }) {
  return <h3 className="col-span-full text-base font-semibold text-[#1f5fa8]">{children}</h3>;
}

function toFormValues(user: CurrentUser): ProfileFormValues {
  return {
    fullName: user.fullName,
    phone: user.phone,
    email: user.email,
    companyName: user.companyName,
    companyPhone: user.companyPhone,
    businessRegistrationNumber: user.businessRegistrationNumber,
    deliveryAddress: user.deliveryAddress,
    postalCode: user.postalCode,
    country: user.country,
    billingSameAsDelivery: user.billingSameAsDelivery,
  };
}

export function ProfileForm({ user, onCancel }: { user: CurrentUser; onCancel: () => void }) {
  const mutation = useUpdateProfileMutation();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: toFormValues(user),
  });

  function handleSubmit(values: ProfileFormValues) {
    mutation.mutate(values, { onSuccess: (updated) => form.reset(toFormValues(updated)) });
  }

  function renderField(name: FieldName) {
    const config = fields.find((item) => item.name === name);
    if (!config) return null;
    return (
      <FormField
        key={name}
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={config.wide ? "col-span-full space-y-1.5" : "space-y-1.5"}>
            <FormLabel className="text-xs text-[#051a50]">
              {config.label} {config.required ? <span className="text-red-600">*</span> : null}
            </FormLabel>
            <FormControl>
              <Input type={config.type ?? "text"} className="h-10 border-[#dde2e8] bg-white" {...field} />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    );
  }

  return (
    <Card className="overflow-hidden border-[#dde2e8] shadow-none">
      <div className="flex h-12 items-center border-b border-[#dde2e8] px-4">
        <h2 className="text-lg font-semibold text-[#1f5fa8]">Account information</h2>
      </div>
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-x-4 gap-y-5 p-4 sm:grid-cols-2">
            {mutation.isError ? (
              <div className="col-span-full">
                <Alert>{getApiErrorMessage(mutation.error)}</Alert>
              </div>
            ) : null}
            {mutation.isSuccess ? (
              <p
                role="status"
                className="col-span-full flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800"
              >
                <TickCircle className="size-4" aria-hidden="true" /> Profile updated.
              </p>
            ) : null}

            <SectionTitle>Personal details</SectionTitle>
            {renderField("fullName")}
            {renderField("phone")}
            {renderField("email")}

            <SectionTitle>Company details</SectionTitle>
            {renderField("companyName")}
            {renderField("companyPhone")}
            {renderField("businessRegistrationNumber")}

            <SectionTitle>Delivery address</SectionTitle>
            {renderField("deliveryAddress")}
            {renderField("postalCode")}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs text-[#051a50]">
                    Country <span className="text-red-600">*</span>
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="h-10 border-[#dde2e8] bg-white">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Singapore">Singapore</SelectItem>
                      <SelectItem value="Malaysia">Malaysia</SelectItem>
                      <SelectItem value="Vietnam">Vietnam</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <SectionTitle>Billing address</SectionTitle>
            <FormField
              control={form.control}
              name="billingSameAsDelivery"
              render={({ field }) => (
                <FormItem className="col-span-full flex items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="font-normal text-[#051a50]">Same as delivery address</FormLabel>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-3 border-t border-[#dde2e8] px-4 py-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full border-[#c8d0d9] font-normal"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button type="submit" variant="brand" size="sm" disabled={!form.formState.isDirty || mutation.isPending}>
              {mutation.isPending ? <Refresh2 className="size-4 animate-spin" aria-hidden="true" /> : null}
              {mutation.isPending ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}

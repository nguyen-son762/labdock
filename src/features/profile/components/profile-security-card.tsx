"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, Refresh2, TickCircle } from "iconsax-reactjs";
import { useForm } from "react-hook-form";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getApiErrorMessage } from "@/lib/api-error";

import { useChangePasswordMutation } from "../api/use-change-password-mutation";
import { passwordFormSchema, type PasswordFormValues } from "../schemas/profile-form.schema";

const passwordDefaults: PasswordFormValues = { currentPassword: "", newPassword: "", confirmPassword: "" };

export function ProfileSecurityCard({
  editing,
  onEdit,
  onCancel,
}: {
  editing: boolean;
  onEdit: () => void;
  onCancel: () => void;
}) {
  const mutation = useChangePasswordMutation();
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: passwordDefaults,
  });

  function handleCancel() {
    form.reset(passwordDefaults);
    mutation.reset();
    onCancel();
  }

  function handleSubmit(values: PasswordFormValues) {
    mutation.mutate(values, { onSuccess: () => form.reset(passwordDefaults) });
  }

  return (
    <Card className="h-fit overflow-hidden border-[#dde2e8] shadow-none">
      <div className="flex h-[50px] items-center justify-between border-b border-[#dde2e8] px-4">
        <h2 className="text-xl font-medium text-[#1f5fa8]">Security</h2>
        {!editing ? (
          <Button type="button" variant="ghost" className="h-8 px-0 font-normal text-[#164990]" onClick={onEdit}>
            <Edit2 className="size-5" aria-hidden="true" /> Change password
          </Button>
        ) : null}
      </div>
      {editing ? (
        <Form {...form}>
          <form className="space-y-4 p-4" noValidate onSubmit={form.handleSubmit(handleSubmit)}>
            {mutation.isError ? <Alert>{getApiErrorMessage(mutation.error)}</Alert> : null}
            {mutation.isSuccess ? (
              <p
                role="status"
                className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800"
              >
                <TickCircle className="size-4" aria-hidden="true" /> Password updated.
              </p>
            ) : null}
            {(["currentPassword", "newPassword", "confirmPassword"] as const).map((name) => {
              const labels = {
                currentPassword: "Current password",
                newPassword: "New password",
                confirmPassword: "Confirm password",
              };
              const placeholders = {
                currentPassword: "Enter current password",
                newPassword: "Enter new password",
                confirmPassword: "Enter password again",
              };
              return (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-xs text-[#051a50]">
                        {labels[name]} <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete={name === "currentPassword" ? "current-password" : "new-password"}
                          placeholder={placeholders[name]}
                          className="h-10 border-[#dde2e8] bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              );
            })}
            <div className="flex justify-end gap-3 pt-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full border-[#c8d0d9] font-normal"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button type="submit" variant="brand" size="sm" disabled={mutation.isPending}>
                {mutation.isPending ? <Refresh2 className="size-4 animate-spin" aria-hidden="true" /> : null}
                {mutation.isPending ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="grid grid-cols-2 gap-2 p-4 pt-6 text-sm text-[#051a50]">
          <span className="text-[13px] text-[#73798f]">Password</span>
          <span>••••••••</span>
          <span className="col-span-2">Last changed: 3 months ago</span>
        </div>
      )}
    </Card>
  );
}

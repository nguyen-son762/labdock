import Link from "next/link";
import type { UseFormReturn } from "react-hook-form";

import { ArrowLeft, ArrowRight, Refresh } from "iconsax-reactjs";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";

import type { useCompleteSignupMutation } from "../api/use-signup-mutation";
import type { PasswordValues } from "../schemas/signup.schema";
import { inputClassName } from "./signup-fields";

type SignupPasswordFormProps = {
  form: UseFormReturn<PasswordValues>;
  completeMutation: ReturnType<typeof useCompleteSignupMutation>;
  onSubmit: (values: PasswordValues) => void;
  errorMessage: (error: unknown) => string | null;
};

export function SignupPasswordForm({ form, completeMutation, onSubmit, errorMessage }: SignupPasswordFormProps) {
  return (
    <>
      <div className="w-full pt-8 sm:pt-10">
        <h2 className="text-[32px] font-semibold leading-[43px] text-[var(--auth-ink)]">Set your password</h2>
        <p className="mt-2 text-base leading-6 text-[#868da5]">Create a secure password for your Labdock account.</p>
      </div>
      {completeMutation.isSuccess ? (
        <div role="status" className="mt-6 rounded-xl border border-[#c8d0d9] bg-[#f5f7f8] p-5 text-sm text-[#164990]">
          Your account for {completeMutation.data.email} is ready. You can now log in.
        </div>
      ) : (
        <Form {...form}>
          <form className="space-y-4 pt-6" noValidate onSubmit={form.handleSubmit(onSubmit)}>
            {errorMessage(completeMutation.error) ? <Alert>{errorMessage(completeMutation.error)}</Alert> : null}
            {(["password", "confirmPassword"] as const).map((name) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {name === "password" ? "Password" : "Confirm password"}{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className={inputClassName}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button variant="brand" size="auth" type="submit" disabled={completeMutation.isPending}>
              {completeMutation.isPending ? (
                <Refresh className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <ArrowRight className="order-2 size-3.5" aria-hidden="true" />
              )}
              {completeMutation.isPending ? "Saving…" : "Create account"}
            </Button>
          </form>
        </Form>
      )}
      <Link
        href="/login"
        className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#164990] hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to log in
      </Link>
    </>
  );
}

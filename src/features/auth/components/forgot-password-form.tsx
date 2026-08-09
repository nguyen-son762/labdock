"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Refresh } from "iconsax-reactjs";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForgotPasswordMutation } from "../api/use-forgot-password-mutation";
import { forgotPasswordSchema, type ForgotPasswordValues } from "../schemas/forgot-password.schema";

export function ForgotPasswordForm() {
  const mutation = useForgotPasswordMutation();
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  return (
    <Form {...form}>
      <form
        className="space-y-4 pt-6 sm:pt-8"
        noValidate
        onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
      >
        {mutation.isError ? (
          <Alert>
            {mutation.error instanceof Error ? mutation.error.message : "Something went wrong. Please try again."}
          </Alert>
        ) : null}
        {mutation.isSuccess ? (
          <div className="rounded-xl border border-[#c8d0d9] bg-[#f5f7f8] p-4 text-sm leading-6 text-[#164990]">
            If an account exists for this email, we&apos;ve sent a password reset link.
          </div>
        ) : null}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email address <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Enter email address"
                  className="h-[42px] rounded-lg border-[var(--auth-input-border)] px-3.5 py-2.5 text-base shadow-[0_1px_2px_rgba(10,13,18,0.05)]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="brand" size="auth" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <Refresh className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight className="order-2 size-3.5" aria-hidden="true" />
          )}
          {mutation.isPending ? "Sending…" : "Send reset link"}
        </Button>
      </form>
      <Link
        href="/login"
        className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#164990] hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to log in
      </Link>
    </Form>
  );
}

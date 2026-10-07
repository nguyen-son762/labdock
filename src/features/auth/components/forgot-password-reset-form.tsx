import { ArrowLeft, ArrowRight, Refresh } from "iconsax-reactjs";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import type { useResetForgotPasswordMutation } from "../api/use-forgot-password-mutation";
import type { ForgotPasswordResetValues } from "../schemas/forgot-password.schema";
import { inputClassName } from "./signup-fields";

type ForgotPasswordResetFormProps = {
  form: UseFormReturn<ForgotPasswordResetValues>;
  resetMutation: ReturnType<typeof useResetForgotPasswordMutation>;
  completed: boolean;
  onSubmit: (values: ForgotPasswordResetValues) => void;
  errorMessage: (error: unknown) => string | null;
};

export function ForgotPasswordResetForm({
  form,
  resetMutation,
  completed,
  onSubmit,
  errorMessage,
}: ForgotPasswordResetFormProps) {
  const t = useTranslations("Auth");
  const mutationError = errorMessage(resetMutation.error);

  return (
    <>
      <div className="w-full pt-8 sm:pt-10">
        <h2 className="text-[32px] font-semibold leading-[43px] text-[var(--auth-ink)]">{t("newPassword")}</h2>
        <p className="mt-2 text-base leading-6 text-[#868da5]">
          {t("securePasswordDescription")}
        </p>
      </div>
      {completed ? (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 rounded-xl border border-[#c8d0d9] bg-[#f5f7f8] p-5 text-sm leading-6 text-[#164990]"
        >
          {t("resetSuccess")}
        </div>
      ) : (
        <Form {...form}>
          <form className="space-y-4 pt-6" noValidate onSubmit={form.handleSubmit(onSubmit)}>
            {mutationError ? <Alert>{mutationError}</Alert> : null}
            {(["newPassword", "confirmPassword"] as const).map((name) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {name === "newPassword" ? t("newPassword") : t("confirmNewPassword")}{" "}
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
            <Button variant="brand" size="auth" type="submit" disabled={resetMutation.isPending}>
              {resetMutation.isPending ? (
                <Refresh className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <ArrowRight className="order-2 size-3.5" aria-hidden="true" />
              )}
              {resetMutation.isPending ? t("resetting") : t("resetPassword")}
            </Button>
          </form>
        </Form>
      )}
      <Link
        href="/login"
        className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#164990] hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {t("backToLogin")}
      </Link>
    </>
  );
}

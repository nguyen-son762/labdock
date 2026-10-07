import Link from "next/link";
import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ArrowRight, Refresh } from "iconsax-reactjs";

import type { useSignupMutation } from "../api/use-signup-mutation";
import type { SignupValues } from "../schemas/signup.schema";
import { countries, Field, PhoneField, SelectField } from "./signup-fields";

type SignupAccountFormProps = {
  form: UseFormReturn<SignupValues>;
  signupMutation: ReturnType<typeof useSignupMutation>;
  onSubmit: (values: SignupValues) => void;
  errorMessage: (error: unknown) => string | null;
};

export function SignupAccountForm({ form, signupMutation, onSubmit, errorMessage }: SignupAccountFormProps) {
  const t = useTranslations("Auth");
  return (
    <>
      <div className="w-full pt-8 sm:pt-10">
        <h2 className="text-[32px] font-semibold leading-[43px] text-[var(--auth-ink)]">{t("signUp")}</h2>
        <p className="mt-2 text-base leading-6 text-[#868da5]">{t("signUpSubtitle")}</p>
      </div>
      <Form {...form}>
        <form
          className="grid grid-cols-1 gap-x-4 gap-y-5 pt-6 sm:grid-cols-2"
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {errorMessage(signupMutation.error) ? (
            <Alert className="sm:col-span-2">{errorMessage(signupMutation.error)}</Alert>
          ) : null}
          <Field
            name="company"
            label={t("companyName")}
            placeholder={t("enterCompanyName")}
            control={form.control}
            required
          />
          <Field
            name="fullName"
            label={t("fullName")}
            placeholder={t("enterFullName")}
            control={form.control}
            required
          />
          <Field
            name="email"
            label={t("emailAddress")}
            placeholder={t("enterEmailAddress")}
            control={form.control}
            required
          />
          <PhoneField control={form.control} />
          <SelectField
            name="country"
            label={t("country")}
            placeholder={t("selectPlease")}
            options={countries}
            control={form.control}
            required
          />
          <Field name="region" label={t("region")} placeholder={t("enterRegion")} control={form.control} required />
          <Field
            name="address"
            label={t("address")}
            placeholder={t("enterAddress")}
            control={form.control}
            required
            className="sm:col-span-2"
          />
          <Button
            variant="brand"
            size="auth"
            type="submit"
            disabled={signupMutation.isPending}
            className="mt-1 sm:col-span-2 sm:justify-self-start"
          >
            {signupMutation.isPending ? (
              <Refresh className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <ArrowRight className="order-2 size-3.5" aria-hidden="true" />
            )}
            {signupMutation.isPending ? t("sendingOtp") : t("sendOtp")}
          </Button>
        </form>
      </Form>
      <p className="mt-5 flex gap-1 text-sm text-[#868da5]">
        {t("alreadyHaveAccount")}{" "}
        <Link href="/login" className="font-medium text-[#164990] hover:underline">
          {t("logIn")}
        </Link>
      </p>
    </>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useSetSignupPasswordMutation, useSignupMutation, useVerifySignupMutation } from "../api/use-signup-mutation";
import {
  passwordSchema,
  signupSchema,
  verificationSchema,
  type PasswordValues,
  type SignupValues,
  type VerificationValues,
} from "../schemas/signup.schema";
import { AuthStepper } from "./auth-stepper";
import { SignupAccountForm } from "./signup-account-form";
import { SignupPasswordForm } from "./signup-password-form";
import { SignupVerificationForm } from "./signup-verification-form";

function errorMessage(error: unknown): string | null {
  return error instanceof Error ? error.message : error ? "Something went wrong. Please try again." : null;
}

export function SignupForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const signupMutation = useSignupMutation();
  const verifyMutation = useVerifySignupMutation();
  const passwordMutation = useSetSignupPasswordMutation();
  const accountForm = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      company: "",
      fullName: "",
      email: "",
      phoneCode: "+65",
      phone: "",
      country: "",
      region: "",
      address: "",
    },
  });
  const verificationForm = useForm<VerificationValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: { code: "" },
  });
  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  function submitAccount(values: SignupValues) {
    signupMutation.mutate(values, { onSuccess: () => setStep(2) });
  }

  function submitVerification(values: VerificationValues) {
    verifyMutation.mutate(values, { onSuccess: () => setStep(3) });
  }

  function submitPassword(values: PasswordValues) {
    passwordMutation.mutate(values);
  }

  if (step === 1) {
    return (
      <>
        <AuthStepper activeStep={1} />
        <SignupAccountForm
          form={accountForm}
          signupMutation={signupMutation}
          onSubmit={submitAccount}
          errorMessage={errorMessage}
        />
      </>
    );
  }

  if (step === 2) {
    return (
      <>
        <AuthStepper activeStep={2} />
        <SignupVerificationForm
          form={verificationForm}
          verifyMutation={verifyMutation}
          onSubmit={submitVerification}
          onBack={() => setStep(1)}
          errorMessage={errorMessage}
        />
      </>
    );
  }

  return (
    <>
      <AuthStepper activeStep={3} />
      <SignupPasswordForm
        form={passwordForm}
        passwordMutation={passwordMutation}
        onSubmit={submitPassword}
        errorMessage={errorMessage}
      />
    </>
  );
}

import { ArrowLeft, Refresh } from "iconsax-reactjs";
import type { ClipboardEvent, KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/class-names";

import type { useVerifySignupMutation } from "../api/use-signup-mutation";
import type { VerificationValues } from "../schemas/signup.schema";

type SignupVerificationFormProps = {
  form: UseFormReturn<VerificationValues>;
  verifyMutation: ReturnType<typeof useVerifySignupMutation>;
  onSubmit: (values: VerificationValues) => void;
  onBack: () => void;
  errorMessage: (error: unknown) => string | null;
};

export function SignupVerificationForm({
  form,
  verifyMutation,
  onSubmit,
  onBack,
  errorMessage,
}: SignupVerificationFormProps) {
  const [resendSeconds, setResendSeconds] = useState(59);
  const otpInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const interval = window.setInterval(() => setResendSeconds((seconds) => Math.max(0, seconds - 1)), 1000);
    return () => window.clearInterval(interval);
  }, []);

  function resetVerificationState() {
    verifyMutation.reset();
    form.clearErrors("code");
  }

  function setOtpValue(value: string, focusIndex?: number) {
    form.setValue("code", value.slice(0, 6), { shouldDirty: true, shouldValidate: value.length === 6 });
    resetVerificationState();
    if (focusIndex !== undefined) window.requestAnimationFrame(() => otpInputRefs.current[focusIndex]?.focus());
  }

  function changeOtpDigit(index: number, rawValue: string) {
    const incoming = rawValue.replace(/\D/g, "");
    const digits = form.getValues("code").padEnd(6, " ").split("");
    if (!incoming) {
      digits[index] = " ";
      setOtpValue(digits.join("").trimEnd());
      return;
    }
    incoming
      .slice(0, 6 - index)
      .split("")
      .forEach((digit, offset) => {
        digits[index + offset] = digit;
      });
    const nextIndex = Math.min(index + incoming.length, 5);
    setOtpValue(digits.join("").replaceAll(" ", ""), nextIndex);
  }

  function pasteOtp(event: ClipboardEvent<HTMLInputElement>, index: number) {
    event.preventDefault();
    changeOtpDigit(index, event.clipboardData.getData("text"));
  }

  function handleOtpKeyDown(event: KeyboardEvent<HTMLInputElement>, index: number, digit: string) {
    if (event.key === "Backspace" && !digit && index > 0) {
      event.preventDefault();
      const digits = form.getValues("code").split("");
      digits.splice(index - 1, 1);
      setOtpValue(digits.join(""), index - 1);
    }
    if (event.key === "ArrowLeft" && index > 0) otpInputRefs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < 5) otpInputRefs.current[index + 1]?.focus();
  }

  function resendCode() {
    form.reset({ code: "" });
    verifyMutation.reset();
    setResendSeconds(59);
    window.requestAnimationFrame(() => otpInputRefs.current[0]?.focus());
  }

  const code = form.watch("code");
  const verificationError = errorMessage(verifyMutation.error);
  const isExpired = verificationError?.toLowerCase().includes("expired") ?? false;
  const isIncorrect = verificationError?.toLowerCase().includes("incorrect") ?? false;
  const isKnownCodeError = isExpired || isIncorrect;

  return (
    <>
      <div className="w-full pt-8 sm:pt-10">
        <h2 className="text-[32px] font-semibold leading-[43px] text-[var(--auth-ink)]">Verify your email</h2>
        <p className="mt-2 text-base leading-6 text-[#868da5]">
          We’ve sent a 6-digit code to your registered email address
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-5 pt-6" noValidate onSubmit={form.handleSubmit(onSubmit)}>
          {verificationError && !isKnownCodeError ? <Alert>{verificationError}</Alert> : null}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => {
              const digits = Array.from({ length: 6 }, (_, index) => field.value[index] ?? "");
              return (
                <FormItem>
                  <FormLabel>Secure code</FormLabel>
                  <div className="flex items-center gap-2 sm:gap-3">
                    {digits.map((digit, index) => (
                      <div key={index} className="contents">
                        {index === 3 ? (
                          <span
                            className="mx-0.5 text-[40px] font-medium leading-none text-[#d6d6d6] sm:mx-1 sm:text-[60px]"
                            aria-hidden="true"
                          >
                            -
                          </span>
                        ) : null}
                        <Input
                          ref={(node) => {
                            otpInputRefs.current[index] = node;
                          }}
                          value={digit}
                          aria-label={`Secure code digit ${index + 1}`}
                          autoComplete={index === 0 ? "one-time-code" : "off"}
                          inputMode="numeric"
                          maxLength={1}
                          onBlur={field.onBlur}
                          onChange={(event) => changeOtpDigit(index, event.target.value)}
                          onKeyDown={(event) => handleOtpKeyDown(event, index, digit)}
                          onPaste={(event) => pasteOtp(event, index)}
                          className={cn(
                            "size-[44px] rounded-xl p-1 text-center text-[28px] font-medium leading-none tracking-[-0.48px] text-[#051a50] shadow-[0_1px_2px_rgba(10,13,18,0.05)] sm:size-16 sm:text-[38px] lg:size-20 lg:text-5xl",
                            isIncorrect && "border-2 border-[#f04438] focus-visible:ring-[#f04438]",
                            isExpired && "border-[1.5px] border-[#dc6803] opacity-45 focus-visible:ring-[#dc6803]",
                          )}
                        />
                      </div>
                    ))}
                  </div>
                  {isIncorrect ? (
                    <p className="text-sm font-medium text-[#f04438]">Incorrect code. Please try again.</p>
                  ) : null}
                  {isExpired ? <p className="text-sm font-medium text-[#dc6803]">Your code has expired.</p> : null}
                  {!isKnownCodeError ? <FormMessage /> : null}
                </FormItem>
              );
            }}
          />
          <div className="flex flex-wrap items-center gap-1 text-sm text-[#868da5]">
            {isExpired ? (
              <>
                <span>Code expired.</span>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={resendCode}
                  className="h-auto rounded-none p-0 font-medium text-[#2f7ac6] hover:bg-transparent hover:underline"
                >
                  Resend now
                </Button>
              </>
            ) : resendSeconds > 0 ? (
              <>
                <span>Didn’t receive the code?</span>
                <span className="font-medium text-[#051a50]">
                  Resend in 00:{String(resendSeconds).padStart(2, "0")}
                </span>
              </>
            ) : (
              <>
                <span>Didn’t receive the code?</span>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={resendCode}
                  className="h-auto rounded-none p-0 font-medium text-[#2f7ac6] hover:bg-transparent hover:underline"
                >
                  Resend now
                </Button>
              </>
            )}
          </div>
          <Button
            variant="brand"
            size="auth"
            type="submit"
            disabled={code.length !== 6 || verifyMutation.isPending || isKnownCodeError}
            className="w-[110px] disabled:bg-none disabled:bg-[#fdefca] disabled:opacity-100 disabled:shadow-none"
          >
            {verifyMutation.isPending ? <Refresh className="size-4 animate-spin" aria-hidden="true" /> : null}
            {verifyMutation.isPending ? "Checking…" : "Verify"}
          </Button>
        </form>
      </Form>
      <Button
        type="button"
        variant="ghost"
        className="mt-5 h-auto self-start p-0 text-sm font-medium text-[#164990] hover:bg-transparent hover:underline"
        onClick={onBack}
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to account details
      </Button>
    </>
  );
}

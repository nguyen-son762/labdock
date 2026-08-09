"use client";

import { TickCircle } from "iconsax-reactjs";

const steps = [
  ["Step 1", "Account details"],
  ["Step 2", "Verification"],
  ["Step 3", "Set password"],
] as const;

export function AuthStepper({ activeStep }: { activeStep: 1 | 2 | 3 }) {
  return (
    <div className="flex w-full items-start">
      {steps.map(([label, description], index) => {
        const step = (index + 1) as 1 | 2 | 3;
        const active = step === activeStep;
        const done = step < activeStep;

        return (
          <div key={label} className="flex min-w-0 flex-1 flex-col items-center text-center">
            <div className="flex h-4 w-full items-center">
              {index > 0 ? (
                <span className={`h-0.5 flex-1 ${done || active ? "bg-[#0f3678]" : "bg-[#c8d0d9]"}`} />
              ) : (
                <span className="flex-1" />
              )}
              <span className="flex size-4 shrink-0 items-center justify-center">
                {done || active ? (
                  <TickCircle variant="Bold" className="size-4 text-[#0f3678]" aria-hidden="true" />
                ) : (
                  <span className="size-4 rounded-full border-2 border-[#c8d0d9] bg-white" />
                )}
              </span>
              {index < steps.length - 1 ? (
                <span className={`h-0.5 flex-1 ${done ? "bg-[#0f3678]" : "bg-[#c8d0d9]"}`} />
              ) : (
                <span className="flex-1" />
              )}
            </div>
            <span className={`px-4 text-sm leading-5 ${active || done ? "text-[#0f3678]" : "text-[#868da5]"}`}>
              {label}
            </span>
            <span className={`text-[13px] leading-[1.2] ${active || done ? "text-[#0f3678]" : "text-[#868da5]"}`}>
              {description}
            </span>
          </div>
        );
      })}
    </div>
  );
}

import Image from "next/image";
import type { ReactNode } from "react";

type AuthShellProps = {
  children: ReactNode;
  heroTitle?: string;
  cardClassName?: string;
};

/** Shared Figma auth frame: orange visual panel + white form panel. */
export function AuthShell({ children, heroTitle = "Welcome back to LABDOCK", cardClassName }: AuthShellProps) {
  return (
    <main className="mx-auto grid min-h-[calc(100dvh-110px)] max-w-[1440px] grid-cols-1 gap-4 p-4 lg:h-[calc(100dvh-110px)] lg:max-h-[790px] lg:grid-cols-[minmax(0,0.55357fr)_minmax(0,1fr)]">
      <section className="relative hidden min-h-[520px] overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--brand-orange-start)] to-[var(--brand-orange-end)] lg:block">
        <div
          className="absolute left-0 top-[-37px] h-[364px] w-[515px] opacity-50 mix-blend-lighten"
          aria-hidden="true"
        >
          <Image src="/auth/pattern.png" alt="" fill sizes="515px" className="pointer-events-none object-cover" />
        </div>
        <div
          className="absolute right-0 top-[522px] h-[364px] w-[515px] opacity-50 mix-blend-lighten"
          aria-hidden="true"
        >
          <Image src="/auth/pattern.png" alt="" fill sizes="515px" className="pointer-events-none object-cover" />
        </div>
        <div className="absolute left-0 top-[112px] h-[520px] w-[480px] overflow-hidden">
          <Image
            src="/auth/researcher.png"
            alt=""
            fill
            priority
            sizes="480px"
            className="pointer-events-none object-cover object-[58%_center]"
          />
        </div>
        {heroTitle ? (
          <div className="relative z-10 flex h-[215px] items-center justify-center p-6">
            <h1 className="max-w-[343px] text-center text-[32px] font-semibold leading-tight text-white">
              {heroTitle}
            </h1>
          </div>
        ) : null}
      </section>

      <section
        className={`flex min-h-[520px] flex-col overflow-y-auto rounded-3xl bg-white p-6 sm:p-10 lg:p-14 ${cardClassName ?? ""}`}
      >
        {children}
      </section>
    </main>
  );
}

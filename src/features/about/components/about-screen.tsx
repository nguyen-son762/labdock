import Image from "next/image";

import { AboutCta } from "./about-cta";
import { AboutHero } from "./about-hero";
import { AboutNarrative } from "./about-narrative";
import { AboutValues } from "./about-values";
import { TrustedPartners } from "./trusted-partners";

export function AboutScreen() {
  return (
    <div className="bg-[#f9fcff]">
      <AboutHero />
      <div className="mx-auto w-[calc(100%_-_40px)] max-w-[1240px] pb-12 pt-8 sm:w-[calc(100%_-_64px)] xl:w-[calc(100%_-_80px)]">
        <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,638px)_minmax(0,552px)] xl:gap-[50px]">
          <div>
            <div className="relative aspect-[638/560] overflow-hidden rounded-3xl">
              <Image
                src="/about/about-laboratory.png"
                alt="Laboratory equipment and research facilities available through Labdock"
                fill
                priority
                sizes="(min-width: 1280px) 638px, calc(100vw - 40px)"
                className="object-cover"
              />
            </div>
            <div className="mt-6">
              <AboutNarrative />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="xl:min-h-[456px]">
              <AboutNarrative />
            </div>
            <AboutValues />
            <TrustedPartners />
          </div>
        </div>

        <div className="mt-12">
          <AboutCta />
        </div>
      </div>
    </div>
  );
}

import { aboutNarrative } from "../about.data";

export function AboutNarrative() {
  return (
    <div>
      <h2 className="text-[28px] font-semibold leading-[1.3125] text-[#0f3678] sm:text-[32px]">
        {aboutNarrative.heading}
      </h2>
      <div className="mt-3 text-base leading-6 text-[#2e3038]">
        {aboutNarrative.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

import type { Testimonial } from "../home.types";

export const categoryNames = [
  ["molecularBiology", 120, "molecular-biology-kits"],
  ["thermalControl", 122, "thermal-control"],
  ["cellCultureMedia", 114, "cell-culture-media-sera"],
  ["solvents", 124, "high-purity-solvents"],
  ["liquidHandling", 124, "liquid-handling"],
  ["cellCulturePlastics", 124, "cell-culture-plastics"],
  ["cryogenicStorage", 124, "cryogenic-storage"],
  ["filtration", 124, "filtration-products"],
  ["samplePreparation", 124, "sample-preparation"],
  ["analyticalInstruments", 124, "analytical-instruments"],
  ["ngsLibrary", 124, "ngs-library-prep"],
  ["genomeEditing", 124, "genome-editing"],
] as const;

export const testimonials: Testimonial[] = [
  { name: "Dr. Sarah Chen", role: "Research Director", company: "BIOGENIX", image: "/home/testimonial-1.png" },
  {
    name: "Mark Jensen",
    role: "Lab Manager",
    company: "NATIONAL UNIVERSITY SINGAPORE",
    image: "/home/testimonial-2.png",
  },
  {
    name: "Mark Jensen",
    role: "Lab Manager",
    company: "NATIONAL UNIVERSITY SINGAPORE",
    image: "/home/testimonial-3.png",
  },
  {
    name: "Mark Jensen",
    role: "Lab Manager",
    company: "NATIONAL UNIVERSITY SINGAPORE",
    image: "/home/testimonial-4.png",
  },
];

export const partnerNames = [
  "Stacked Lab",
  "Magnolia",
  "Powersurge",
  "Warpspeed",
  "Leapyear",
  "EasyTax",
  "45 Degrees°",
  "Acme Corp",
  "AlphaWave",
  "Biosynthesia",
  "Capsule",
  "Foresight",
] as const;

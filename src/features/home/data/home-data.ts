import type { Testimonial } from "../home.types";

export const categoryNames = [
  ["Molecular Biology Kits", "120 products"],
  ["Thermal Control", "122 products"],
  ["Cell Culture Media & Sera", "114 products"],
  ["High-Purity Solvents", "124 products"],
  ["Liquid Handling", "124 products"],
  ["Cell Culture Plastics", "124 products"],
  ["Cryogenic Storage", "124 products"],
  ["Filtration Products", "124 products"],
  ["Sample Preparation", "124 products"],
  ["Analytical Instruments", "124 products"],
  ["NGS Library Prep", "124 products"],
  ["Genome Editing", "124 products"],
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

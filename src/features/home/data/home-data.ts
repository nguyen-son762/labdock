import type { Product, Testimonial } from "../home.types";

export const products: Product[] = [
  {
    id: "round-bottom-flask",
    name: "Round Bottom Flask",
    image: "/home/product-flask-round.png",
    volume: "50ml",
    brand: "Medisafe",
    price: "$1,000.00",
    badge: "Best Seller",
  },
  {
    id: "round-bottom-flask-blue",
    name: "Round Bottom Flask",
    image: "/home/product-flask-blue.png",
    volume: "50ml",
    brand: "Medisafe",
    price: "$1,000.00",
    originalPrice: "$1,250.00",
    discount: "-25%",
  },
  {
    id: "flask-filter",
    name: "Flask Filter w/TUBE",
    image: "/home/product-filter.png",
    volume: "250ml",
    brand: "Medisafe",
    price: "$1,000.00",
    badge: "Out of stock",
  },
  {
    id: "volumetric-flask",
    name: "Flask Volumetric Cl-A Snapcap",
    image: "/home/product-volumetric.png",
    volume: "50ml",
    brand: "Medisafe",
    price: "$1,000.00",
  },
  {
    id: "spider-flask",
    name: "Heidolph Spider Flask with 5 Flasks, NS 24, 100mL",
    image: "/home/product-spider.png",
    volume: "50ml",
    brand: "Heidolph",
    price: "$1,000.00",
  },
  {
    id: "suction-flask",
    name: "Sartorius suction flask 2 glass",
    image: "/home/product-suction.png",
    volume: "50ml",
    brand: "Sartorius",
    price: "$1,000.00",
  },
];

export const productGrid = [...products, products[4], products[3], products[1], products[5], products[2], products[1]]
  .filter((product): product is Product => Boolean(product))
  .map((product, index) => ({ ...product, id: `${product.id}-${index}` }));

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

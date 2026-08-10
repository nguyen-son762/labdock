import type { Product } from "../products.types";

const productDefaults = {
  category: "Laboratory Equipment",
  origin: "Germany",
  currency: "SGD" as const,
};

export const products: Product[] = [
  {
    ...productDefaults,
    id: "round-bottom-flask",
    name: "Round Bottom Flask",
    image: "/home/product-flask-round.png",
    volume: "50ml",
    brand: "Medisafe",
    price: "$1,000.00",
    badge: "Best Seller",
    origin: "Singapore",
    catalogNumber: "BK-00120",
    description:
      "Medisafe 50 mL round-bottom flask BK-00120 for controlled heating, mixing and routine laboratory sample preparation.",
    specifications: [
      { label: "Capacity", value: "50 mL" },
      { label: "Flask form", value: "Round bottom" },
      { label: "Material", value: "Laboratory glass" },
      { label: "Catalog number", value: "BK-00120" },
    ],
  },
  {
    ...productDefaults,
    id: "round-bottom-flask-blue",
    name: "Round Bottom Flask",
    image: "/home/product-flask-blue.png",
    volume: "50ml",
    brand: "Medisafe",
    price: "$1,000.00",
    originalPrice: "$1,250.00",
    discount: "-25%",
    origin: "Singapore",
    catalogNumber: "BK-00121",
    description:
      "Medisafe round-bottom laboratory flask BK-00121 in a 50 mL format, supplied for repeatable small-volume research workflows.",
    specifications: [
      { label: "Capacity", value: "50 mL" },
      { label: "Flask form", value: "Round bottom" },
      { label: "Brand", value: "Medisafe" },
      { label: "Catalog number", value: "BK-00121" },
    ],
  },
  {
    ...productDefaults,
    id: "flask-filter",
    name: "Flask Filter w/TUBE",
    image: "/home/product-filter.png",
    volume: "250ml",
    brand: "BIO-RAD",
    price: "$1,000.00",
    badge: "Out of stock",
    catalogNumber: "BK-00122",
    description:
      "BIO-RAD 250 mL filter flask BK-00122 with tube connection for vacuum filtration and liquid-handling workflows.",
    specifications: [
      { label: "Capacity", value: "250 mL" },
      { label: "Connection", value: "Tube outlet" },
      { label: "Application", value: "Vacuum filtration" },
      { label: "Catalog number", value: "BK-00122" },
    ],
  },
  {
    ...productDefaults,
    id: "volumetric-flask",
    name: "Flask Volumetric Cl-A Snapcap",
    image: "/home/product-volumetric.png",
    volume: "50ml",
    brand: "Medisafe",
    price: "$1,000.00",
    origin: "Italy",
    catalogNumber: "BK-00124",
    description:
      "Medisafe Class A 50 mL volumetric flask BK-00124 with snap cap for accurate solution preparation and dilution.",
    specifications: [
      { label: "Capacity", value: "50 mL" },
      { label: "Accuracy class", value: "Class A" },
      { label: "Closure", value: "Snap cap" },
      { label: "Catalog number", value: "BK-00124" },
    ],
  },
  {
    ...productDefaults,
    id: "spider-flask",
    name: "Heidolph Spider Flask with 5 Flasks",
    image: "/products/spider-flask-main.png",
    gallery: [
      "/products/spider-flask-main.png",
      "/products/spider-flask-side.png",
      "/products/spider-flask-detail.png",
    ],
    volume: "50ml",
    brand: "BIO-RAD",
    price: "$1,000.00",
    originalPrice: "$1,250.00",
    discount: "-25%",
    catalogNumber: "BK-00123",
    casNumber: "1234-567",
    description:
      "Heidolph five-flask spider assembly BK-00123 for parallel evaporation and coordinated sample processing in laboratory systems.",
    specifications: [
      { label: "Configuration", value: "5 flasks" },
      { label: "Brand", value: "Heidolph" },
      { label: "Application", value: "Parallel evaporation" },
      { label: "Catalog number", value: "BK-00123" },
    ],
  },
  {
    ...productDefaults,
    id: "suction-flask",
    name: "Sartorius suction flask 2 glass",
    image: "/home/product-suction.png",
    volume: "50ml",
    brand: "Sartorius",
    price: "$1,000.00",
    origin: "Japan",
    catalogNumber: "BK-00125",
    description:
      "Sartorius 50 mL glass suction flask BK-00125 for compact vacuum-assisted filtration and sample preparation setups.",
    specifications: [
      { label: "Capacity", value: "50 mL" },
      { label: "Flask type", value: "Suction flask" },
      { label: "Material", value: "Laboratory glass" },
      { label: "Catalog number", value: "BK-00125" },
    ],
  },
];

const repeatedProducts = [products[4], products[3], products[1], products[5], products[2], products[1]];

export const productGrid = [...products, ...repeatedProducts].filter((product): product is Product => Boolean(product));

export const productCategories = [
  "Laboratory Rodent Animals",
  "Rodent Animal Housing System",
  "Aquatic Animal Housing Systems",
  "Workstations Rodent Animals",
  "Laboratory Animal Washing & Sterilization",
  "Equipment for Laboratory Animals",
  "Surgical Instruments",
  "Thermal Control",
  "Enrichment Solutions",
  "Bedding Systems",
] as const;

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

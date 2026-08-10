export type ProductSpecification = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  name: string;
  image: string;
  gallery?: string[];
  volume: string;
  brand: string;
  currency: "SGD";
  price: string;
  originalPrice?: string;
  badge?: "Best Seller" | "Out of stock";
  discount?: string;
  category: string;
  origin: string;
  catalogNumber: string;
  casNumber?: string;
  description: string;
  specifications: ProductSpecification[];
};

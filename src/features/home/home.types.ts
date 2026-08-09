export type Product = {
  id: string;
  name: string;
  image: string;
  volume: string;
  brand: string;
  price: string;
  originalPrice?: string;
  badge?: "Best Seller" | "Out of stock";
  discount?: string;
};

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  image: string;
};

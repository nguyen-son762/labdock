export type Testimonial = {
  id: string;
  author: string;
  content: string;
  sortOrder: number;
};

export type HomeBanner = {
  id: string;
  imageUrl: string;
  linkUrl: string | null;
  title: string | null;
};

export type HomeCategory = {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
};

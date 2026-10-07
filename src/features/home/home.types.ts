export type Testimonial = {
  id: string;
  authorName: string;
  authorSubtitle: string | null;
  profileImageUrl: string | null;
  content: string;
  rating: number;
  sortOrder: number;
};

export type HomeBanner = {
  id: string;
  type: "Left" | "Right";
  imageUrl: string;
  linkUrl: string | null;
  title: string | null;
  description: string | null;
  showDescription: boolean;
  buttonLabel: string | null;
  dateTime: string | null;
  location: string | null;
  badge: string | null;
};

export type HomeCategory = {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
};

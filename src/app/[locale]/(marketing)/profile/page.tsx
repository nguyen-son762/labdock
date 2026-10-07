import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ProfileScreen } from "@/features/profile";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("RouteMetadata");
  return { title: t("profile"), robots: { index: false, follow: false } };
}

export default function ProfilePage() {
  return <ProfileScreen />;
}

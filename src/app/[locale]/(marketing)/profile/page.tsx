import type { Metadata } from "next";

import { ProfileScreen } from "@/features/profile";

export const metadata: Metadata = {
  title: "My profiles",
  robots: { index: false, follow: false },
};

export default function ProfilePage() {
  return <ProfileScreen />;
}

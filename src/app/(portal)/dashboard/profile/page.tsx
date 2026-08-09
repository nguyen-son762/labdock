import type { Metadata } from "next";

import { ProfileScreen } from "@/features/profile";

export const metadata: Metadata = { title: "Hồ sơ" };

export default function ProfilePage() {
  return <ProfileScreen />;
}

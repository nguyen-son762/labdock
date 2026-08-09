"use client";

import { Logout } from "iconsax-reactjs";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useLogoutMutation } from "../api/use-logout-mutation";

export function LogoutButton() {
  const router = useRouter();
  const logoutMutation = useLogoutMutation();

  async function handleLogout(): Promise<void> {
    try {
      await logoutMutation.mutateAsync();
    } finally {
      router.replace("/login");
    }
  }

  return (
    <Button variant="ghost" onClick={handleLogout} disabled={logoutMutation.isPending}>
      <Logout className="size-4" aria-hidden="true" />
      {logoutMutation.isPending ? "Đang thoát…" : "Đăng xuất"}
    </Button>
  );
}

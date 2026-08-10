"use client";

import { MainHeader } from "@/components/layout/main-header";
import { useAuthSessionQuery } from "@/features/auth";
import { useCurrentUserQuery } from "@/features/profile";

export function AuthHeader() {
  const sessionQuery = useAuthSessionQuery();
  const currentUserQuery = useCurrentUserQuery(sessionQuery.data?.authenticated === true);
  const account = currentUserQuery.data
    ? { fullName: currentUserQuery.data.fullName, email: currentUserQuery.data.email }
    : undefined;

  return <MainHeader account={account} />;
}

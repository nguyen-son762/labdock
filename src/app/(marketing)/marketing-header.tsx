"use client";

import { MainHeader } from "@/components/layout/main-header";
import { useAuthSessionQuery } from "@/features/auth";
import { CartHeaderPopover } from "@/features/checkout";
import { useCurrentUserQuery } from "@/features/profile";

export function MarketingHeader() {
  const sessionQuery = useAuthSessionQuery();
  const currentUserQuery = useCurrentUserQuery(sessionQuery.data?.authenticated === true);
  const account = currentUserQuery.data
    ? { fullName: currentUserQuery.data.fullName, email: currentUserQuery.data.email }
    : undefined;

  return <MainHeader account={account} cartContent={<CartHeaderPopover />} />;
}

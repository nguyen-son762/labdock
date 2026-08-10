"use client";

import { useState } from "react";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useCurrentUserQuery } from "../api/use-current-user-query";
import { AccountErrorState } from "./account-error-state";
import { ProfileForm } from "./profile-form";
import { ProfileInfoPanel } from "./profile-info-panel";
import { ProfileSecurityCard } from "./profile-security-card";
import { ProfileSidebar } from "./profile-sidebar";

function ProfileLoading() {
  return (
    <div className="grid gap-4 lg:grid-cols-[266px_minmax(0,1fr)]" aria-label="Loading profile" aria-busy="true">
      <Card className="h-[286px] border-[#dde2e8] p-6 shadow-none">
        <Skeleton className="mx-auto size-24 rounded-full" />
        <Skeleton className="mx-auto mt-5 h-8 w-40" />
        <Skeleton className="mx-auto mt-3 h-9 w-48" />
      </Card>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_389px]">
        <Skeleton className="h-[676px] rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
      </div>
    </div>
  );
}

export function ProfileScreen() {
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const currentUserQuery = useCurrentUserQuery();

  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 pb-12 pt-6 sm:px-10 xl:px-[100px]">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "My profiles" }]} />
      <h1 className="mb-4 mt-3 text-[32px] font-semibold leading-none text-[#0f3678]">My profiles</h1>
      {currentUserQuery.isPending ? <ProfileLoading /> : null}
      {currentUserQuery.isError ? (
        <AccountErrorState error={currentUserQuery.error} onRetry={() => void currentUserQuery.refetch()} />
      ) : null}
      {currentUserQuery.data ? (
        <div className="grid items-start gap-4 lg:grid-cols-[266px_minmax(0,1fr)]">
          <ProfileSidebar user={currentUserQuery.data} />
          <div className="grid min-w-0 items-start gap-4 xl:grid-cols-[minmax(0,1fr)_389px]">
            {editingProfile ? (
              <ProfileForm user={currentUserQuery.data} onCancel={() => setEditingProfile(false)} />
            ) : (
              <ProfileInfoPanel user={currentUserQuery.data} onEdit={() => setEditingProfile(true)} />
            )}
            <ProfileSecurityCard
              editing={editingPassword}
              onEdit={() => setEditingPassword(true)}
              onCancel={() => setEditingPassword(false)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

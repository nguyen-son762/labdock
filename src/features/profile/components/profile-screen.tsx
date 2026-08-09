"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useCurrentUserQuery } from "../api/use-current-user-query";
import { AccountErrorState } from "./account-error-state";
import { ProfileForm } from "./profile-form";

export function ProfileScreen() {
  const currentUserQuery = useCurrentUserQuery();

  if (currentUserQuery.isPending) {
    return (
      <Card className="max-w-2xl shadow-none" aria-label="Đang tải hồ sơ" aria-busy="true">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-5">
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (currentUserQuery.isError) {
    return <AccountErrorState error={currentUserQuery.error} onRetry={() => void currentUserQuery.refetch()} />;
  }

  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm font-medium text-primary">Tài khoản</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Hồ sơ cá nhân</h1>
        <p className="mt-2 text-muted-foreground">Cập nhật thông tin hiển thị của bạn.</p>
      </div>
      <Card className="max-w-2xl shadow-none">
        <CardHeader>
          <CardTitle>Thông tin cơ bản</CardTitle>
          <CardDescription>Dữ liệu được đồng bộ an toàn với tài khoản hiện tại.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm user={currentUserQuery.data} />
        </CardContent>
      </Card>
    </div>
  );
}

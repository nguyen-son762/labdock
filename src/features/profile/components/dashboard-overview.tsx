"use client";

import { Calendar, Clock, ShieldTick } from "iconsax-reactjs";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useCurrentUserQuery } from "../api/use-current-user-query";
import { AccountErrorState } from "./account-error-state";
import { AccountLoadingState } from "./account-loading-state";

const dateFormatter = new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" });
const dateTimeFormatter = new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" });

const roleLabels = {
  member: "Thành viên",
  manager: "Quản lý",
  admin: "Quản trị viên",
} as const;

export function DashboardOverview() {
  const currentUserQuery = useCurrentUserQuery();

  if (currentUserQuery.isPending) {
    return <AccountLoadingState />;
  }

  if (currentUserQuery.isError) {
    return <AccountErrorState error={currentUserQuery.error} onRetry={() => void currentUserQuery.refetch()} />;
  }

  const user = currentUserQuery.data;
  const summaries = [
    { label: "Vai trò", value: roleLabels[user.role], icon: ShieldTick },
    { label: "Tham gia từ", value: dateFormatter.format(new Date(user.joinedAt)), icon: Calendar },
    {
      label: "Hoạt động gần nhất",
      value: user.lastActiveAt ? dateTimeFormatter.format(new Date(user.lastActiveAt)) : "Chưa có dữ liệu",
      icon: Clock,
    },
  ] as const;

  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm font-medium text-primary">Tổng quan tài khoản</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Xin chào, {user.fullName}</h1>
        <p className="mt-2 text-muted-foreground">Đây là trạng thái mới nhất của tài khoản Labdock của bạn.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {summaries.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="shadow-none">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardDescription>{label}</CardDescription>
              <Icon className="size-5 text-primary" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg">{value}</CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="overflow-hidden shadow-none">
        <div className="h-1 bg-gradient-to-r from-primary via-blue-400 to-cyan-400" />
        <CardHeader>
          <CardTitle>Tài khoản đã sẵn sàng</CardTitle>
          <CardDescription>Email xác thực: {user.email}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

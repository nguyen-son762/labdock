"use client";

import { Calendar, Clock, ShieldTick } from "iconsax-reactjs";
import { useLocale, useTranslations } from "next-intl";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useCurrentUserQuery } from "../api/use-current-user-query";
import { AccountErrorState } from "./account-error-state";
import { AccountLoadingState } from "./account-loading-state";

export function DashboardOverview() {
  const locale = useLocale();
  const t = useTranslations("Profile");
  const dateFormatter = new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-SG", { dateStyle: "long" });
  const dateTimeFormatter = new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-SG", { dateStyle: "medium", timeStyle: "short" });
  const currentUserQuery = useCurrentUserQuery();

  if (currentUserQuery.isPending) {
    return <AccountLoadingState />;
  }

  if (currentUserQuery.isError) {
    return <AccountErrorState error={currentUserQuery.error} onRetry={() => void currentUserQuery.refetch()} />;
  }

  const user = currentUserQuery.data;
  const summaries = [
    { label: t("role"), value: t(user.role), icon: ShieldTick },
    { label: t("joined"), value: dateFormatter.format(new Date(user.joinedAt)), icon: Calendar },
    {
      label: t("lastActive"),
      value: user.lastActiveAt ? dateTimeFormatter.format(new Date(user.lastActiveAt)) : t("noData"),
      icon: Clock,
    },
  ] as const;

  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm font-medium text-primary">{t("dashboardTitle")}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{t("dashboardGreeting", { name: user.fullName })}</h1>
        <p className="mt-2 text-muted-foreground">{t("dashboardDescription")}</p>
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
          <CardTitle>{t("accountReady")}</CardTitle>
          <CardDescription>{t("verifiedEmail", { email: user.email })}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

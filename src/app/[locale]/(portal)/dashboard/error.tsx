"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function DashboardError({ reset }: { reset: () => void }) {
  const t = useTranslations("Profile");
  return (
    <div className="max-w-xl space-y-4 py-10">
      <Alert>{t("dashboardError")}</Alert>
      <Button onClick={reset}>{t("reloadDashboard")}</Button>
    </div>
  );
}

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

export function AccountLoadingState() {
  const t = useTranslations("Profile");
  return (
    <div className="grid gap-5 md:grid-cols-3" aria-label={t("loadingAccount")} aria-busy="true">
      {[0, 1, 2].map((position) => (
        <Card key={position} className="shadow-none">
          <CardHeader>
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-36" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

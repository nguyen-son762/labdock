import { Edit2 } from "iconsax-reactjs";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { CurrentUser } from "../schemas/user.schema";

function Detail({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <dt className="text-[13px] leading-[18px] text-[#73798f]">{label}</dt>
      <dd className="mt-1 break-words text-sm leading-5 text-[#051a50]">{value}</dd>
    </div>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <h3 className="sm:col-span-2 text-base font-semibold text-[#1f5fa8]">{children}</h3>;
}

export function ProfileInfoPanel({ user, onEdit }: { user: CurrentUser; onEdit: () => void }) {
  const t = useTranslations("Profile");
  return (
    <Card className="overflow-hidden border-[#dde2e8] shadow-none">
      <div className="flex h-12 items-center justify-between border-b border-[#dde2e8] px-4">
        <h2 className="text-lg font-semibold text-[#1f5fa8]">{t("accountInfo")}</h2>
        <Button type="button" variant="ghost" className="h-8 px-1 font-normal text-[#164990]" onClick={onEdit}>
          <Edit2 className="size-5" aria-hidden="true" /> {t("edit")}
        </Button>
      </div>
      <dl className="grid gap-x-4 gap-y-5 p-4 sm:grid-cols-2 sm:p-6">
        <SectionTitle>{t("personalDetails")}</SectionTitle>
        <Detail label={t("fullName")} value={user.fullName} />
        <Detail label={t("phone")} value={user.phone} />
        <Detail label={t("email")} value={user.email} wide />

        <SectionTitle>{t("companyDetails")}</SectionTitle>
        <Detail label={t("companyName")} value={user.companyName} />
        <Detail label={t("companyPhone")} value={user.companyPhone} />
        <Detail label={t("businessRegistration")} value={user.businessRegistrationNumber} wide />

        <SectionTitle>{t("deliveryAddress")}</SectionTitle>
        <Detail label={t("address")} value={user.deliveryAddress} wide />
        <Detail label={t("postalCode")} value={user.postalCode} />
        <Detail label={t("country")} value={user.country} />

        <SectionTitle>{t("billingAddress")}</SectionTitle>
        <Detail label="" value={user.billingSameAsDelivery ? t("sameAsDelivery") : t("differentBilling")} wide />
      </dl>
    </Card>
  );
}

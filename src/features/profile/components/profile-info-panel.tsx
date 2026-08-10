import { Edit2 } from "iconsax-reactjs";

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
  return (
    <Card className="overflow-hidden border-[#dde2e8] shadow-none">
      <div className="flex h-12 items-center justify-between border-b border-[#dde2e8] px-4">
        <h2 className="text-lg font-semibold text-[#1f5fa8]">Account information</h2>
        <Button type="button" variant="ghost" className="h-8 px-1 font-normal text-[#164990]" onClick={onEdit}>
          <Edit2 className="size-5" aria-hidden="true" /> Edit
        </Button>
      </div>
      <dl className="grid gap-x-4 gap-y-5 p-4 sm:grid-cols-2 sm:p-6">
        <SectionTitle>Personal details</SectionTitle>
        <Detail label="Full name" value={user.fullName} />
        <Detail label="Phone no." value={user.phone} />
        <Detail label="Email address" value={user.email} wide />

        <SectionTitle>Company details</SectionTitle>
        <Detail label="Company name" value={user.companyName} />
        <Detail label="Company phone no." value={user.companyPhone} />
        <Detail label="Business registration no." value={user.businessRegistrationNumber} wide />

        <SectionTitle>Delivery address</SectionTitle>
        <Detail label="Address" value={user.deliveryAddress} wide />
        <Detail label="Postal code" value={user.postalCode} />
        <Detail label="Country" value={user.country} />

        <SectionTitle>Billing address</SectionTitle>
        <Detail
          label=""
          value={user.billingSameAsDelivery ? "Same as delivery address" : "Use a different billing address"}
          wide
        />
      </dl>
    </Card>
  );
}

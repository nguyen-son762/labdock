"use client";

import Link from "next/link";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getApiErrorMessage } from "@/lib/api-error";

import { useRfqDetailQuery } from "../api/use-rfq-detail-query";
import { RfqItemsCard } from "./rfq-items-card";
import { RfqStatusBadge } from "./rfq-status-badge";

export function RfqDetailScreen({ rfqId }: { rfqId: string }) {
  const rfqQuery = useRfqDetailQuery(rfqId);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 pb-12 pt-6 sm:px-10 xl:px-[100px]">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "My RFQs", href: "/rfqs" }, { label: `#${rfqId}` }]}
      />
      {rfqQuery.isPending ? (
        <div className="mt-4 space-y-4" aria-label="Loading RFQ details" aria-busy="true">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-[430px] rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
        </div>
      ) : null}
      {rfqQuery.isError ? (
        <div className="mt-5 space-y-4">
          <Alert>{getApiErrorMessage(rfqQuery.error)}</Alert>
          <Button asChild variant="outline">
            <Link href="/rfqs">Back to RFQs</Link>
          </Button>
        </div>
      ) : null}
      {rfqQuery.data ? (
        <div className="mt-3 space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-[32px] font-semibold leading-none text-[#0f3678]">#{rfqQuery.data.id}</h1>
            <RfqStatusBadge status={rfqQuery.data.status} />
          </div>
          <RfqItemsCard rfq={rfqQuery.data} />
          <Card className="overflow-hidden border-[#dde2e8] shadow-none">
            <h2 className="flex h-12 items-center border-b border-[#dde2e8] px-4 text-lg font-semibold text-[#1f5fa8]">
              Your inquiry message
            </h2>
            <p className="px-4 py-5 text-sm leading-6 text-[#051a50]">{rfqQuery.data.inquiryMessage}</p>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

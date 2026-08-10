import type { Metadata } from "next";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { RfqsScreen } from "@/features/rfqs";

export const metadata: Metadata = { title: "My RFQs", robots: { index: false, follow: false } };

export default function RfqsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1240px] px-5 py-8">
          <Skeleton className="h-[600px] rounded-xl" />
        </div>
      }
    >
      <RfqsScreen />
    </Suspense>
  );
}

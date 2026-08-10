import type { Metadata } from "next";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { OrdersScreen } from "@/features/orders";

export const metadata: Metadata = { title: "My orders", robots: { index: false, follow: false } };

export default function OrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1240px] px-5 py-8">
          <Skeleton className="h-[600px] rounded-xl" />
        </div>
      }
    >
      <OrdersScreen />
    </Suspense>
  );
}

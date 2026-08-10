import type { Metadata } from "next";

import { RfqDetailScreen } from "@/features/rfqs";

type RfqDetailPageProps = { params: Promise<{ rfqId: string }> };

export const metadata: Metadata = { title: "RFQ details", robots: { index: false, follow: false } };

export default async function RfqDetailPage({ params }: RfqDetailPageProps) {
  const { rfqId } = await params;
  return <RfqDetailScreen rfqId={rfqId.toUpperCase()} />;
}

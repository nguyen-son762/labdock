import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { RfqDetailScreen } from "@/features/rfqs";

type RfqDetailPageProps = { params: Promise<{ rfqId: string }> };

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("RouteMetadata");
  return { title: t("rfqDetails"), robots: { index: false, follow: false } };
}

export default async function RfqDetailPage({ params }: RfqDetailPageProps) {
  const { rfqId } = await params;
  return <RfqDetailScreen rfqId={rfqId.toUpperCase()} />;
}

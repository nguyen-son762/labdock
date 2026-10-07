import { ArrowRight } from "iconsax-reactjs";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { RfqSummary } from "../schemas/rfq.schema";
import { formatRfqDate } from "../utils/rfq-formatters";
import { RfqStatusBadge } from "./rfq-status-badge";

export function RfqsTable({
  rfqs,
  total,
  page,
  pageSize,
  onPageChange,
}: {
  rfqs: RfqSummary[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) {
  const t = useTranslations("Rfqs");
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min((page - 1) * pageSize + rfqs.length, total);

  if (rfqs.length === 0) return null;

  return (
    <section className="overflow-hidden rounded-xl border border-[#dde2e8] bg-white" aria-label={t("tableLabel")}>
      <div className="hidden lg:block">
        <Table>
          <TableHeader className="bg-[#ecf0f3]">
            <TableRow className="hover:bg-[#ecf0f3]">
              <TableHead>{t("number")}</TableHead>
              <TableHead>{t("dateSubmitted")}</TableHead>
              <TableHead>{t("lastUpdated")}</TableHead>
              <TableHead>{t("source")}</TableHead>
              <TableHead>{t("supplier")}</TableHead>
              <TableHead>{t("status")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rfqs.map((rfq) => (
              <TableRow key={rfq.id} className="h-[50px] hover:bg-[#f9fcff]">
                <TableCell className="px-6 py-2">
                  <Link
                    href={`/rfqs/${rfq.id}`}
                    className="font-medium text-[#164990] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]"
                  >
                    #{rfq.rfqNumber}
                  </Link>
                </TableCell>
                <TableCell className="px-6 py-2 text-[#051a50]">{formatRfqDate(rfq.createdAt)}</TableCell>
                <TableCell className="px-6 py-2 text-[#051a50]">{formatRfqDate(rfq.updatedAt)}</TableCell>
                <TableCell className="px-6 py-2 text-[#051a50]">{rfq.source}</TableCell>
                <TableCell
                  className="max-w-40 truncate px-6 py-2 font-mono text-xs text-[#73798f]"
                  title={rfq.supplierId}
                >
                  {rfq.supplierId}
                </TableCell>
                <TableCell className="px-6 py-2">
                  <RfqStatusBadge status={rfq.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="divide-y divide-[#dde2e8] lg:hidden">
        {rfqs.map((rfq) => (
          <article key={rfq.id} className="space-y-3 p-4">
            <div className="flex items-center justify-between gap-3">
              <Link href={`/rfqs/${rfq.id}`} className="font-semibold text-[#164990]">
                #{rfq.rfqNumber}
              </Link>
              <RfqStatusBadge status={rfq.status} />
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-[#73798f]">{t("dateSubmitted")}</dt>
                <dd className="text-[#051a50]">{formatRfqDate(rfq.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#73798f]">{t("lastUpdated")}</dt>
                <dd className="text-[#051a50]">{formatRfqDate(rfq.updatedAt)}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#73798f]">{t("source")}</dt>
                <dd className="text-[#051a50]">{rfq.source}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-xs text-[#73798f]">{t("supplier")}</dt>
                <dd className="truncate font-mono text-xs text-[#051a50]" title={rfq.supplierId}>
                  {rfq.supplierId}
                </dd>
              </div>
            </dl>
            <Button asChild variant="ghost" className="h-8 w-full justify-end px-0 font-normal text-[#164990]">
              <Link href={`/rfqs/${rfq.id}`}>
                {t("viewDetails")} <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </article>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#dde2e8] px-6 py-3">
        <p className="text-sm text-[#73798f]">
          {t("showing", { start, end, total })}
        </p>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full border-[#dde2e8]"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            {t("previous")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full border-[#dde2e8]"
            disabled={page >= Math.ceil(total / pageSize)}
            onClick={() => onPageChange(page + 1)}
          >
            {t("next")}
          </Button>
        </div>
      </div>
    </section>
  );
}

import { ArrowRight } from "iconsax-reactjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { RfqSummary } from "../schemas/rfq.schema";
import { formatRfqCurrency, formatRfqDate } from "../utils/rfq-formatters";
import { RfqStatusBadge } from "./rfq-status-badge";

const PAGE_SIZE = 10;

export function RfqsTable({
  rfqs,
  total,
  page,
  onPageChange,
}: {
  rfqs: RfqSummary[];
  total: number;
  page: number;
  onPageChange: (page: number) => void;
}) {
  const start = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, total);

  if (rfqs.length === 0) return null;

  return (
    <section className="overflow-hidden rounded-xl border border-[#dde2e8] bg-white" aria-label="RFQs">
      <div className="hidden lg:block">
        <Table>
          <TableHeader className="bg-[#ecf0f3]">
            <TableRow className="hover:bg-[#ecf0f3]">
              <TableHead>RFQ No.</TableHead>
              <TableHead>Date submitted</TableHead>
              <TableHead>Total products</TableHead>
              <TableHead>Total est. value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Valid until</TableHead>
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
                    #{rfq.id}
                  </Link>
                </TableCell>
                <TableCell className="px-6 py-2 text-[#051a50]">{formatRfqDate(rfq.submittedAt)}</TableCell>
                <TableCell className="px-6 py-2 text-[#051a50]">{rfq.totalProducts}</TableCell>
                <TableCell className="px-6 py-2 text-[#051a50]">{formatRfqCurrency(rfq.estimatedValue)}</TableCell>
                <TableCell className="px-6 py-2">
                  <RfqStatusBadge status={rfq.status} />
                </TableCell>
                <TableCell className="px-6 py-2 text-[#051a50]">
                  {rfq.validUntil ? formatRfqDate(rfq.validUntil) : "-"}
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
                #{rfq.id}
              </Link>
              <RfqStatusBadge status={rfq.status} />
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-[#73798f]">Date submitted</dt>
                <dd className="text-[#051a50]">{formatRfqDate(rfq.submittedAt)}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#73798f]">Total products</dt>
                <dd className="text-[#051a50]">{rfq.totalProducts}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#73798f]">Estimated value</dt>
                <dd className="font-semibold text-[#051a50]">{formatRfqCurrency(rfq.estimatedValue)}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#73798f]">Valid until</dt>
                <dd className="text-[#051a50]">{rfq.validUntil ? formatRfqDate(rfq.validUntil) : "-"}</dd>
              </div>
            </dl>
            <Button asChild variant="ghost" className="h-8 w-full justify-end px-0 font-normal text-[#164990]">
              <Link href={`/rfqs/${rfq.id}`}>
                View details <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </article>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#dde2e8] px-6 py-3">
        <p className="text-sm text-[#73798f]">
          Showing {start}–{end} of {total}
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
            Previous
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full border-[#dde2e8]"
            disabled={end >= total}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}

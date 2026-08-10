import { ArrowRight } from "iconsax-reactjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { OrderSummary } from "../schemas/order.schema";
import { formatCurrency, formatOrderDate } from "../utils/order-formatters";
import { OrderStatusBadge } from "./order-status-badge";

const PAGE_SIZE = 10;

export function OrdersTable({
  orders,
  total,
  page,
  onPageChange,
}: {
  orders: OrderSummary[];
  total: number;
  page: number;
  onPageChange: (page: number) => void;
}) {
  const start = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, total);

  if (orders.length === 0) return null;

  return (
    <section className="overflow-hidden rounded-xl border border-[#dde2e8] bg-white" aria-label="Orders">
      <div className="hidden md:block">
        <Table>
          <TableHeader className="bg-[#ecf0f3]">
            <TableRow className="hover:bg-[#ecf0f3]">
              <TableHead>Order no.</TableHead>
              <TableHead>Order date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="h-[50px] hover:bg-[#f9fcff]">
                <TableCell className="px-6 py-2">
                  <Link
                    href={`/orders/${order.id}`}
                    className="font-medium text-[#164990] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]"
                  >
                    #{order.id}
                  </Link>
                </TableCell>
                <TableCell className="px-6 py-2 text-[#051a50]">{formatOrderDate(order.orderedAt)}</TableCell>
                <TableCell className="px-6 py-2">
                  <OrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell className="px-6 py-2 text-[#051a50]">{formatCurrency(order.total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="divide-y divide-[#dde2e8] md:hidden">
        {orders.map((order) => (
          <article key={order.id} className="space-y-3 p-4">
            <div className="flex items-center justify-between gap-3">
              <Link href={`/orders/${order.id}`} className="font-semibold text-[#164990]">
                #{order.id}
              </Link>
              <OrderStatusBadge status={order.status} />
            </div>
            <div className="flex items-end justify-between gap-3 text-sm">
              <div>
                <p className="text-xs text-[#73798f]">Order date</p>
                <p className="text-[#051a50]">{formatOrderDate(order.orderedAt)}</p>
              </div>
              <strong className="text-[#051a50]">{formatCurrency(order.total)}</strong>
            </div>
            <Button asChild variant="ghost" className="h-8 w-full justify-end px-0 font-normal text-[#164990]">
              <Link href={`/orders/${order.id}`}>
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

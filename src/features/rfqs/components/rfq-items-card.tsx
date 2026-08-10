import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { RfqDetail } from "../schemas/rfq.schema";
import { formatRfqCurrency, formatRfqDate } from "../utils/rfq-formatters";

function ProductIdentity({ item }: { item: RfqDetail["items"][number] }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="relative size-10 shrink-0 overflow-hidden rounded bg-white">
        <Image src={item.image} alt="" fill unoptimized sizes="40px" className="object-cover" />
      </span>
      <span className="min-w-0">
        <strong className="line-clamp-2 block text-sm font-medium text-[#051a50]">{item.name}</strong>
        <span className="block text-[13px] text-[#73798f]">Category no.: {item.catalogNumber}</span>
      </span>
    </div>
  );
}

export function RfqItemsCard({ rfq }: { rfq: RfqDetail }) {
  return (
    <Card className="overflow-hidden border-[#dde2e8] shadow-none">
      <div className="flex min-h-12 flex-wrap items-center gap-2 border-b border-[#dde2e8] px-4 text-sm">
        <h2 className="text-lg font-semibold text-[#1f5fa8]">RFQ no.: #{rfq.id}</h2>
        <span className="text-[#73798f]">Date submitted: {formatRfqDate(rfq.submittedAt)}</span>
      </div>
      <div className="p-4">
        <div className="hidden lg:block">
          <Table>
            <TableHeader className="bg-[#ecf0f3]">
              <TableRow className="hover:bg-[#ecf0f3]">
                <TableHead className="w-[36%]">Product</TableHead>
                <TableHead>Unit price</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Requested qty.</TableHead>
                <TableHead>Quoted unit price</TableHead>
                <TableHead>Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rfq.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-6 py-2">
                    <ProductIdentity item={item} />
                  </TableCell>
                  <TableCell className="px-6 py-2">{formatRfqCurrency(item.unitPrice)}</TableCell>
                  <TableCell className="px-6 py-2">{item.size}</TableCell>
                  <TableCell className="px-6 py-2">{item.requestedQuantity}</TableCell>
                  <TableCell className="px-6 py-2">{formatRfqCurrency(item.quotedUnitPrice)}</TableCell>
                  <TableCell className="px-6 py-2">{formatRfqCurrency(item.subtotal)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="divide-y divide-[#dde2e8] lg:hidden">
          {rfq.items.map((item) => (
            <article key={item.id} className="space-y-3 py-4">
              <ProductIdentity item={item} />
              <dl className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <dt className="text-xs text-[#73798f]">Unit price</dt>
                  <dd>{formatRfqCurrency(item.unitPrice)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#73798f]">Size</dt>
                  <dd>{item.size}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#73798f]">Requested qty.</dt>
                  <dd>{item.requestedQuantity}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#73798f]">Quoted unit price</dt>
                  <dd>{formatRfqCurrency(item.quotedUnitPrice)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#73798f]">Subtotal</dt>
                  <dd>{formatRfqCurrency(item.subtotal)}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
        <dl className="mt-4 space-y-2 rounded-xl bg-[#f5f7f8] p-4 text-sm text-[#73798f]">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-semibold text-[#051a50]">{formatRfqCurrency(rfq.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Delivery fee</dt>
            <dd className="font-semibold text-[#051a50]">
              {rfq.deliveryFee === 0 ? "Free" : formatRfqCurrency(rfq.deliveryFee)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt>Tax</dt>
            <dd className="font-semibold text-[#051a50]">{formatRfqCurrency(rfq.tax)}</dd>
          </div>
          <div className="flex justify-between border-t border-[#dde2e8] pt-3 text-2xl text-[#051a50]">
            <dt>Total</dt>
            <dd className="font-semibold text-[#1f5fa8]">{formatRfqCurrency(rfq.estimatedValue)}</dd>
          </div>
        </dl>
      </div>
    </Card>
  );
}

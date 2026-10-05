import { Gallery } from "iconsax-reactjs";

import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { OrderDetail } from "../schemas/order.schema";
import { formatCurrency } from "../utils/order-formatters";

function ProductIdentity({ item }: { item: OrderDetail["invoice"]["lines"][number] }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded border border-[#dde2e8] bg-[#f5f7f8]">
        <Gallery className="size-5 text-[#a3abbd]" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <strong className="line-clamp-2 block text-sm font-medium text-[#051a50]">{item.productName}</strong>
        <span className="block text-[13px] text-[#73798f]">SKU: {item.sku}</span>
      </span>
    </div>
  );
}

export function OrderItemsCard({ order }: { order: OrderDetail }) {
  return (
    <Card className="overflow-hidden border-[#dde2e8] shadow-none">
      <h2 className="border-b border-[#dde2e8] px-4 py-3 text-lg font-semibold text-[#1f5fa8]">Items ordered</h2>
      <div className="p-4">
        {order.invoice.lines.length ? (
          <>
            <div className="hidden md:block">
              <Table>
                <TableHeader className="bg-[#ecf0f3]">
                  <TableRow className="hover:bg-[#ecf0f3]">
                    <TableHead className="w-[42%]">Product</TableHead>
                    <TableHead>Unit price</TableHead>
                    <TableHead>Qty.</TableHead>
                    <TableHead>Line total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.invoice.lines.map((item, index) => (
                    <TableRow key={`${item.sku}-${index}`}>
                      <TableCell className="px-6 py-2">
                        <ProductIdentity item={item} />
                      </TableCell>
                      <TableCell className="px-6 py-2">{formatCurrency(item.unitPrice, order.currency)}</TableCell>
                      <TableCell className="px-6 py-2">{item.quantity}</TableCell>
                      <TableCell className="px-6 py-2">{formatCurrency(item.lineTotal, order.currency)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="divide-y divide-[#dde2e8] md:hidden">
              {order.invoice.lines.map((item, index) => (
                <article key={`${item.sku}-${index}`} className="space-y-3 py-4">
                  <ProductIdentity item={item} />
                  <dl className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <dt className="text-xs text-[#73798f]">Unit price</dt>
                      <dd>{formatCurrency(item.unitPrice, order.currency)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#73798f]">Qty.</dt>
                      <dd>{item.quantity}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#73798f]">Line total</dt>
                      <dd>{formatCurrency(item.lineTotal, order.currency)}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p className="py-8 text-center text-sm text-[#73798f]">No invoice lines are available for this order.</p>
        )}

        <dl className="mt-4 space-y-2 rounded-xl bg-[#f5f7f8] p-4 text-sm text-[#73798f]">
          <Amount label="Subtotal" value={order.subtotal} currency={order.currency} />
          <Amount label="Shipping fee" value={order.shippingFee} currency={order.currency} />
          <Amount label="Additional fees" value={order.additionalFeeTotal} currency={order.currency} />
          <Amount label="Platform fee" value={order.platformFee} currency={order.currency} />
          <Amount label="Tax" value={order.tax} currency={order.currency} />
          <div className="flex justify-between border-t border-[#dde2e8] pt-3 text-xl text-[#051a50]">
            <dt>Total</dt>
            <dd className="font-semibold text-[#1f5fa8]">{formatCurrency(order.total, order.currency)}</dd>
          </div>
        </dl>
      </div>
    </Card>
  );
}

function Amount({ label, value, currency }: { label: string; value: number; currency: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt>{label}</dt>
      <dd className="font-semibold text-[#051a50]">{formatCurrency(value, currency)}</dd>
    </div>
  );
}

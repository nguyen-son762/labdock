import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { OrderDetail } from "../schemas/order.schema";
import { formatCurrency } from "../utils/order-formatters";

function ProductIdentity({ item }: { item: OrderDetail["items"][number] }) {
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

export function OrderItemsCard({ order }: { order: OrderDetail }) {
  return (
    <Card className="overflow-hidden border-[#dde2e8] shadow-none">
      <h2 className="border-b border-[#dde2e8] px-4 py-3 text-lg font-semibold text-[#1f5fa8]">Item ordered</h2>
      <div className="p-4">
        <div className="hidden md:block">
          <Table>
            <TableHeader className="bg-[#ecf0f3]">
              <TableRow className="hover:bg-[#ecf0f3]">
                <TableHead className="w-[36%]">Product</TableHead>
                <TableHead>Unit price</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Qty.</TableHead>
                <TableHead>Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-6 py-2">
                    <ProductIdentity item={item} />
                  </TableCell>
                  <TableCell className="px-6 py-2">{formatCurrency(item.unitPrice)}</TableCell>
                  <TableCell className="px-6 py-2">{item.size}</TableCell>
                  <TableCell className="px-6 py-2">{item.quantity}</TableCell>
                  <TableCell className="px-6 py-2">{formatCurrency(item.subtotal)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="divide-y divide-[#dde2e8] md:hidden">
          {order.items.map((item) => (
            <article key={item.id} className="space-y-3 py-4">
              <ProductIdentity item={item} />
              <dl className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <dt className="text-xs text-[#73798f]">Unit price</dt>
                  <dd>{formatCurrency(item.unitPrice)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#73798f]">Size</dt>
                  <dd>{item.size}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#73798f]">Qty.</dt>
                  <dd>{item.quantity}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#73798f]">Subtotal</dt>
                  <dd>{formatCurrency(item.subtotal)}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
        <dl className="mt-4 space-y-2 rounded-xl bg-[#f5f7f8] p-4 text-sm text-[#73798f]">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-semibold text-[#051a50]">{formatCurrency(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Delivery fee</dt>
            <dd className="font-semibold text-[#051a50]">
              {order.deliveryFee === 0 ? "Free" : formatCurrency(order.deliveryFee)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt>Tax</dt>
            <dd className="font-semibold text-[#051a50]">{formatCurrency(order.tax)}</dd>
          </div>
          <div className="flex justify-between border-t border-[#dde2e8] pt-3 text-2xl text-[#051a50]">
            <dt>Total</dt>
            <dd className="font-semibold text-[#1f5fa8]">{formatCurrency(order.total)}</dd>
          </div>
        </dl>
      </div>
    </Card>
  );
}

import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { RfqDetail } from "../schemas/rfq.schema";
import { formatRfqDate } from "../utils/rfq-formatters";

export function RfqItemsCard({ rfq }: { rfq: RfqDetail }) {
  const t = useTranslations("Rfqs");
  return (
    <Card className="overflow-hidden border-[#dde2e8] shadow-none">
      <div className="flex min-h-12 flex-wrap items-center justify-between gap-2 border-b border-[#dde2e8] px-4 py-3">
        <h2 className="text-lg font-semibold text-[#1f5fa8]">{t("requestedItems", { count: rfq.items.length })}</h2>
        <span className="text-sm text-[#73798f]">{t("created", { date: formatRfqDate(rfq.createdAt) })}</span>
      </div>
      <div className="p-4">
        {rfq.items.length ? (
          <>
            <div className="hidden md:block">
              <Table>
                <TableHeader className="bg-[#ecf0f3]">
                  <TableRow className="hover:bg-[#ecf0f3]">
                    <TableHead>{t("item")}</TableHead>
                    <TableHead>{t("variantId")}</TableHead>
                    <TableHead>{t("quantity")}</TableHead>
                    <TableHead>{t("specificationNote")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rfq.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="px-6 py-3 font-mono text-xs text-[#73798f]">{item.id}</TableCell>
                      <TableCell className="max-w-56 break-all px-6 py-3 font-mono text-xs text-[#051a50]">
                        {item.variantId}
                      </TableCell>
                      <TableCell className="px-6 py-3 font-medium text-[#051a50]">{item.quantity}</TableCell>
                      <TableCell className="max-w-md whitespace-pre-wrap px-6 py-3 text-[#051a50]">
                        {item.specNote || "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="divide-y divide-[#dde2e8] md:hidden">
              {rfq.items.map((item, index) => (
                <article key={item.id} className="space-y-3 py-4 first:pt-0 last:pb-0">
                  <p className="font-medium text-[#051a50]">Item {index + 1}</p>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between gap-3">
                      <dt className="shrink-0 text-[#73798f]">{t("variantId")}</dt>
                      <dd className="break-all text-right font-mono text-xs text-[#051a50]">{item.variantId}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-[#73798f]">{t("quantity")}</dt>
                      <dd className="font-medium text-[#051a50]">{item.quantity}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-[#73798f]">{t("specification")}</dt>
                      <dd className="whitespace-pre-wrap text-right text-[#051a50]">{item.specNote || "—"}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p className="py-8 text-center text-sm text-[#73798f]">{t("noItems")}</p>
        )}
      </div>
    </Card>
  );
}

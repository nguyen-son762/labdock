"use client";

import { Copy, TickCircle } from "iconsax-reactjs";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import type { OrderDetail } from "../schemas/order.schema";
import { formatOrderDate } from "../utils/order-formatters";

export function OrderTracking({ tracking }: { tracking: OrderDetail["tracking"] }) {
  const [copied, setCopied] = useState(false);
  const steps = [
    { label: "Order confirmed", date: formatOrderDate(tracking.confirmedAt), state: "complete" },
    { label: "Awaiting shipment", date: formatOrderDate(tracking.awaitingAt), state: "complete" },
    { label: "Shipped", date: formatOrderDate(tracking.shippedAt), state: "active" },
    { label: "Delivered", date: `Est. ${formatOrderDate(tracking.estimatedDeliveryAt)}`, state: "pending" },
  ] as const;

  async function copyTrackingNumber() {
    try {
      await navigator.clipboard.writeText(tracking.number);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      className="overflow-hidden rounded-xl bg-gradient-to-r from-[#efa33b] to-[#e57a00] pt-1"
      aria-labelledby="tracking-title"
    >
      <h2 id="tracking-title" className="px-6 py-1 text-lg font-semibold text-white">
        Delivery tracking
      </h2>
      <div className="rounded-[11px] border border-[#dde2e8] bg-white px-3 py-6">
        <ol className="relative grid grid-cols-4">
          <span className="absolute left-[12.5%] right-[12.5%] top-[7px] h-0.5 bg-[#c8d0d9]" aria-hidden="true" />
          <span className="absolute left-[12.5%] top-[7px] h-0.5 w-1/2 bg-[#0f3678]" aria-hidden="true" />
          {steps.map((step) => (
            <li key={step.label} className="relative flex min-w-0 flex-col items-center px-1 text-center">
              {step.state === "complete" ? (
                <TickCircle className="z-10 size-4 bg-white text-[#0f3678]" variant="Bold" aria-hidden="true" />
              ) : (
                <span
                  className={
                    step.state === "active"
                      ? "z-10 size-4 rounded-full border-4 border-[#1f5fa8] bg-white"
                      : "z-10 mt-1 size-2 rounded-full bg-[#b1bac8] ring-4 ring-white"
                  }
                  aria-hidden="true"
                />
              )}
              <span
                className={
                  step.state === "active"
                    ? "mt-1 text-xs text-[#1f5fa8] sm:text-sm"
                    : "mt-1 text-xs text-[#051a50] sm:text-sm"
                }
              >
                {step.label}
              </span>
              <span
                className={
                  step.state === "active"
                    ? "text-[10px] text-[#1f5fa8] sm:text-[13px]"
                    : "text-[10px] text-[#73798f] sm:text-[13px]"
                }
              >
                {step.date}
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-1 rounded-lg bg-[#f5f7f8] px-3 py-1 text-xs text-[#051a50] sm:text-sm">
          <span>Tracking no.:</span>
          <strong>{tracking.number}</strong>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-6"
            aria-label="Copy tracking number"
            onClick={() => void copyTrackingNumber()}
          >
            <Copy className="size-4" aria-hidden="true" />
          </Button>
          <span aria-hidden="true">•</span>
          <span>Carrier: {tracking.carrier}</span>
          {copied ? (
            <span role="status" className="sr-only">
              Tracking number copied
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}

import { rfqDetailSchema, rfqSummarySchema } from "../schemas/rfq.schema";

const rfqRows = [
  { number: 18, products: 101, value: 4539.85, status: "quoted", validUntil: "2026-01-15" },
  { number: 17, products: 1, value: 3000, status: "quoted", validUntil: "2026-01-15" },
  { number: 16, products: 1, value: 3000, status: "pending", validUntil: null },
  { number: 15, products: 100, value: 1000, status: "pending", validUntil: null },
  { number: 14, products: 1, value: 3000, status: "pending", validUntil: null },
  { number: 13, products: 1, value: 3000, status: "pending", validUntil: null },
  { number: 12, products: 1, value: 3000, status: "pending", validUntil: null },
  { number: 11, products: 1, value: 3000, status: "declined", validUntil: null },
  { number: 10, products: 1, value: 3000, status: "accepted", validUntil: null },
  { number: 9, products: 1, value: 3000, status: "expired", validUntil: "2026-01-01" },
] as const;

export const mockRfqs = rfqRows.map((rfq) =>
  rfqSummarySchema.parse({
    id: `RFQ-${String(rfq.number).padStart(4, "0")}`,
    submittedAt: "2026-01-01T08:00:00.000Z",
    totalProducts: rfq.products,
    estimatedValue: rfq.value,
    status: rfq.status,
    validUntil: rfq.validUntil ? `${rfq.validUntil}T08:00:00.000Z` : null,
  }),
);

export const mockRfqDetail = rfqDetailSchema.parse({
  ...mockRfqs[0],
  items: [
    {
      id: "beaker",
      name: "Beakers, Griffin, Low Form, with spout",
      catalogNumber: "9000000001",
      image: "/checkout/cart-beaker.png",
      unitPrice: 35,
      size: "Standard 5mL",
      requestedQuantity: 100,
      quotedUnitPrice: 33.25,
      subtotal: 3325,
    },
    {
      id: "microscope",
      name: "Digital Laboratory Microscope with HD Camera",
      catalogNumber: "1000000001",
      image: "/orders/digital-microscope.png",
      unitPrice: 1200,
      size: "White",
      requestedQuantity: 1,
      quotedUnitPrice: 840,
      subtotal: 840,
    },
  ],
  subtotal: 4165,
  deliveryFee: 0,
  tax: 374.85,
  inquiryMessage:
    "Require delivery by end of March. Interested in long-term supply arrangement if pricing is competitive.",
});

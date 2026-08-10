import { orderDetailSchema, orderSummarySchema } from "../schemas/order.schema";

const statuses = [
  "shipped",
  "shipped",
  "awaiting-shipment",
  "awaiting-shipment",
  "awaiting-shipment",
  "cancelled",
  "cancelled",
  "delivered",
  "delivered",
  "delivered",
] as const;

const orderNumbers = [3000, 3001, 3002, 3003, 3004, 2999, 2998, 2997, 2996, 2995] as const;

export const mockOrders = orderNumbers.map((number, index) =>
  orderSummarySchema.parse({
    id: `OR-${number}`,
    orderedAt: `2026-01-${String(10 - index).padStart(2, "0")}T08:00:00.000Z`,
    status: statuses[index],
    total: index === 0 ? 4905 : 1000,
  }),
);

export const mockOrderDetail = orderDetailSchema.parse({
  ...mockOrders[0],
  items: [
    {
      id: "beaker",
      name: "Beakers, Griffin, Low Form, with spout",
      catalogNumber: "9000000001",
      image: "/checkout/cart-beaker.png",
      unitPrice: 35,
      size: "Standard 5mL",
      quantity: 100,
      subtotal: 3500,
    },
    {
      id: "microscope",
      name: "Digital Laboratory Microscope with HD Camera",
      catalogNumber: "1000000001",
      image: "/orders/digital-microscope.png",
      unitPrice: 1000,
      size: "White",
      quantity: 1,
      subtotal: 1000,
    },
  ],
  subtotal: 4500,
  deliveryFee: 0,
  tax: 405,
  tracking: {
    number: "SG192847364",
    carrier: "SingPost Express",
    confirmedAt: "2026-01-08T08:00:00.000Z",
    awaitingAt: "2026-01-09T08:00:00.000Z",
    shippedAt: "2026-01-10T08:00:00.000Z",
    estimatedDeliveryAt: "2026-03-10T08:00:00.000Z",
  },
  delivery: {
    name: "Sarah Chen",
    company: "Biogenix Pte Ltd",
    address: "745 Lor. 5 Toa Payoh, #03-03, The Lifeline Building, 319455, Singapore",
    phone: "+65 88009900",
  },
  payment: { cardLastFour: "4242", chargedAt: "2025-03-20T08:00:00.000Z", invoiceNumber: "INV-3041" },
});

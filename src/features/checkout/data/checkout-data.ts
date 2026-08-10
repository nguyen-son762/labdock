import type { CheckoutItem, OrderTotals } from "../checkout.types";

export const checkoutItems: CheckoutItem[] = [
  {
    id: "beaker-griffin",
    name: "Beakers, Griffin, Low Form, with spout",
    catalogNumber: "9000000001",
    image: "/checkout/cart-beaker.png",
    unitPrice: 35,
    quantity: 100,
    size: "Standard 5mL",
  },
  {
    id: "digital-microscope",
    name: "Digital Laboratory Microscope with HD Camera",
    catalogNumber: "1000000001",
    unitPrice: 1000,
    originalPrice: 1200,
    quantity: 1,
    size: "White",
  },
];

export function calculateOrderTotals(items: CheckoutItem[]): OrderTotals {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discount = items.reduce(
    (sum, item) => sum + Math.max(0, (item.originalPrice ?? item.unitPrice) - item.unitPrice) * item.quantity,
    0,
  );
  const delivery = 0;
  const tax = Math.round(subtotal * 0.09 * 100) / 100;

  return { subtotal, discount, delivery, tax, total: subtotal + delivery + tax };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD" }).format(value);
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft2 } from "iconsax-reactjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Alert } from "@/components/ui/alert";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";

import { useCartQuery } from "../api/use-cart-query";
import { useCreateCheckoutMutation } from "../api/use-create-checkout-mutation";
import { calculateOrderTotals } from "../data/checkout-data";
import { checkoutSchema, type CheckoutFormValues } from "../schemas/checkout.schema";
import { DeliveryAddressFields } from "./address-fields";
import { BillingSection } from "./billing-section";
import { CheckoutItems } from "./checkout-items";
import { OrderSummary } from "./order-summary";
import { PaymentMethodSection } from "./payment-method-section";
import { EmptyCartScreen } from "./empty-cart-screen";

export function CheckoutScreen({ initialItemIds }: { initialItemIds?: string[] }) {
  const router = useRouter();
  const cartQuery = useCartQuery();
  const checkoutMutation = useCreateCheckoutMutation();
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "Sarah Chen",
      email: "sarah_chen@biogenix.com.sg",
      phone: "+65 88009900",
      companyName: "Biogenix Pte Ltd",
      address: "745 Lor. 5 Toa Payoh, #03-03, The Lifeline Building",
      postalCode: "319455",
      country: "Singapore",
      billingSameAsDelivery: true,
      billingAddress: "",
      billingPostalCode: "",
      paymentMethod: "paynow",
    },
  });
  const cartItems = cartQuery.data ?? [];
  const items = initialItemIds?.length ? cartItems.filter((item) => initialItemIds.includes(item.id)) : cartItems;
  const orderTotals = calculateOrderTotals(items);

  function handleCheckout(values: CheckoutFormValues): void {
    if (checkoutMutation.isPending) return;
    checkoutMutation.mutate(
      { checkout: values, items, idempotencyKey: crypto.randomUUID() },
      {
        onSuccess: (session) => {
          const query = new URLSearchParams({
            method: values.paymentMethod,
            reference: session.paymentReference,
            amount: String(session.amount),
          });
          router.push(`/payment?${query.toString()}`);
        },
      },
    );
  }

  if (cartQuery.isPending) {
    return (
      <div className="container min-h-[675px] py-10">
        <Skeleton className="h-[560px] w-full rounded-xl" />
      </div>
    );
  }

  if (cartQuery.isSuccess && items.length === 0) return <EmptyCartScreen />;

  return (
    <div className="bg-[#f5f8fb] py-10">
      <div className="container">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Shopping cart", href: "/cart" }, { label: "Checkout" }]}
        />
        <h1 className="mt-3 text-3xl font-semibold text-[#164990]">Checkout</h1>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 rounded text-xs text-[#164990] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]"
        >
          <ArrowLeft2 className="size-4" aria-hidden="true" /> Back to product listing
        </Link>
        <Form {...form}>
          <form
            id="checkout-form"
            noValidate
            onSubmit={form.handleSubmit(handleCheckout)}
            className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,0.95fr)]"
          >
            <div className="space-y-4">
              {checkoutMutation.isError ? (
                <Alert>We could not prepare your payment. Please review the details and try again.</Alert>
              ) : null}
              {cartQuery.isError ? (
                <Alert>We could not load your cart. Please return to cart and try again.</Alert>
              ) : null}
              <CheckoutItems items={items} />
              <DeliveryAddressFields form={form} />
              <BillingSection form={form} />
              <PaymentMethodSection form={form} />
            </div>
            <OrderSummary totals={orderTotals} pending={checkoutMutation.isPending} />
          </form>
        </Form>
      </div>
    </div>
  );
}

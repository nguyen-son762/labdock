"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, TickCircle } from "iconsax-reactjs";
import { useForm } from "react-hook-form";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import { useSubmitContactMutation } from "../api/use-submit-contact-mutation";
import { contactFormSchema, type ContactFormValues, type InquiryType } from "../schemas/contact.schema";
import { ContactInfoFields } from "./contact-info-fields";
import { QuoteProductsTable } from "./quote-products-table";

const blankProduct = { productName: "", brand: "", quantity: "", budgetRange: "" };

function createDefaultValues(inquiryType: InquiryType): ContactFormValues {
  return {
    inquiryType,
    fullName: "",
    email: "",
    phoneCountry: "65",
    phone: "",
    company: "",
    subject: "",
    message: "",
    products: [blankProduct],
  };
}

export function ContactForm({ initialType }: { initialType: InquiryType }) {
  const mutation = useSubmitContactMutation();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: createDefaultValues(initialType),
  });
  const inquiryType = form.watch("inquiryType");

  const handleSubmit = (values: ContactFormValues) => {
    if (mutation.isPending) return;
    mutation.mutate(
      { contact: values, idempotencyKey: crypto.randomUUID() },
      { onSuccess: () => form.reset(createDefaultValues(values.inquiryType)) },
    );
  };

  return (
    <section className="bg-[#f9fcff] px-4 py-8 sm:px-5">
      <div className="mx-auto max-w-[1240px] rounded-xl bg-white p-5 sm:p-6">
        <h2 className="text-2xl font-semibold leading-[42px] text-[#0f3678] sm:text-[32px]">
          What can we help you with?
        </h2>
        <Form {...form}>
          <form noValidate onSubmit={form.handleSubmit(handleSubmit)} className="mt-2 space-y-4">
            <FormField
              control={form.control}
              name="inquiryType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={(value: InquiryType) => {
                        field.onChange(value);
                        form.clearErrors();
                        mutation.reset();
                      }}
                      className="flex flex-wrap gap-x-8 gap-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="general" id="general-inquiry" className="size-4" />
                        <Label htmlFor="general-inquiry" className="cursor-pointer text-xs font-normal text-[#051a50]">
                          General inquiry
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="quote" id="request-a-quote" className="size-4" />
                        <Label htmlFor="request-a-quote" className="cursor-pointer text-xs font-normal text-[#051a50]">
                          Request a quote
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mutation.isError ? <Alert>We could not submit your request. Please try again.</Alert> : null}
            {mutation.isSuccess ? (
              <p role="status" className="flex items-center gap-2 rounded-lg bg-[#ecfdf3] p-3 text-sm text-[#027a48]">
                <TickCircle className="size-5" variant="Bold" aria-hidden="true" />
                Your request was submitted successfully. Reference: {mutation.data.reference}
              </p>
            ) : null}

            {inquiryType === "quote" ? <h3 className="text-base font-semibold text-[#1f5fa8]">Contact info</h3> : null}
            <ContactInfoFields />

            {inquiryType === "general" ? (
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-xs text-[#051a50]">Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter subject" className="h-11 border-[#d5dce5] bg-white" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            ) : (
              <QuoteProductsTable />
            )}

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs text-[#051a50]">
                    {inquiryType === "quote" ? "Inquiry message" : "Your message"}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={inquiryType === "quote" ? "Enter inquiry message..." : "Enter your message..."}
                      className="min-h-[104px] resize-y border-[#d5dce5] bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="brand"
              disabled={mutation.isPending}
              className="h-11 min-w-[122px] justify-between py-1.5 pl-5 pr-1.5 shadow-[0_8px_22px_rgba(239,163,59,0.28)]"
            >
              <span>{mutation.isPending ? "Submitting…" : "Submit"}</span>
              <span className="flex size-8 items-center justify-center rounded-full bg-[#efa33b]">
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}

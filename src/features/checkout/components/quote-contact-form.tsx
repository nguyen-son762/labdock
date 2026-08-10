"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { quoteContactSchema, type QuoteContactValues } from "../schemas/quote.schema";

type QuoteContactFormProps = {
  onSubmit: (values: QuoteContactValues) => void;
  pending: boolean;
  error?: string;
};

export function QuoteContactForm({ onSubmit, pending, error }: QuoteContactFormProps) {
  const form = useForm<QuoteContactValues>({
    resolver: zodResolver(quoteContactSchema),
    defaultValues: {
      fullName: "Sarah Chen",
      phoneCountry: "65",
      phone: "88009900",
      email: "sarah_chen@biogenix.com.sg",
      companyName: "Biogenix Pte Ltd",
      region: "Singapore",
    },
  });

  return (
    <aside className="rounded-xl border border-[#dde2e8] bg-white p-5" aria-labelledby="contact-information-title">
      <h2 id="contact-information-title" className="text-2xl font-semibold text-[#051a50]">
        Contact information
      </h2>
      <p className="mt-2 text-xs text-[#73798f]">Please fill in information to request for quote.</p>
      {error ? <Alert className="mt-4">{error}</Alert> : null}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="mt-5 space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name *</FormLabel>
                <FormControl>
                  <Input autoComplete="name" className="bg-white" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <fieldset>
            <legend className="mb-2 text-sm font-medium leading-none">Phone no. *</legend>
            <div className="grid grid-cols-[92px_1fr] gap-2">
              <FormField
                control={form.control}
                name="phoneCountry"
                render={({ field }) => (
                  <FormItem>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger aria-label="Phone country code" className="bg-white">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        <SelectItem value="65">+65</SelectItem>
                        <SelectItem value="84">+84</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        aria-label="Phone number"
                        inputMode="tel"
                        autoComplete="tel-national"
                        className="bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address *</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" className="bg-white" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company name</FormLabel>
                <FormControl>
                  <Input autoComplete="organization" className="bg-white" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    <SelectItem value="Singapore">Singapore</SelectItem>
                    <SelectItem value="Vietnam">Vietnam</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="brand" disabled={pending} className="h-11 w-full shadow-none">
            {pending ? "Submitting…" : "Submit request"}
          </Button>
          <Button
            asChild
            type="button"
            variant="outline"
            className="h-11 w-full rounded-full border-[#2474ca] text-[#164990] hover:bg-[#eef6ff] hover:text-[#164990]"
          >
            <Link href="/cart">Cancel</Link>
          </Button>
        </form>
      </Form>
    </aside>
  );
}

"use client";

import { Add, CloseCircle, TickCircle, Trash } from "iconsax-reactjs";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { ContactFormValues } from "../schemas/contact.schema";

const emptyProduct = { productName: "", brand: "", quantity: "", budgetRange: "" };
const brands = ["Medisafe", "BIO-RAD", "Sartorius", "Heidolph"] as const;

export function QuoteProductsTable() {
  const form = useFormContext<ContactFormValues>();
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "products" });

  return (
    <section aria-labelledby="products-of-interest-title">
      <h3 id="products-of-interest-title" className="mb-4 text-base font-semibold text-[#1f5fa8]">
        Product(s) of interest
      </h3>
      <div className="overflow-hidden rounded-xl border border-[#d5dce5] bg-white">
        <Table className="min-w-[900px] table-fixed">
          <TableHeader className="bg-[#f5f7f8]">
            <TableRow className="hover:bg-[#f5f7f8]">
              <TableHead className="w-[38%] px-3">Product name</TableHead>
              <TableHead className="w-[19%] px-3">Brand</TableHead>
              <TableHead className="w-[19%] px-3">Quantity</TableHead>
              <TableHead className="w-[19%] px-3">Budget range</TableHead>
              <TableHead className="w-[5%] px-3">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((product, index) => (
              <TableRow key={product.id} className="hover:bg-white">
                <TableCell className="p-2 align-top">
                  <div className="flex items-start gap-1.5">
                    <FormField
                      control={form.control}
                      name={`products.${index}.productName`}
                      render={({ field }) => (
                        <FormItem className="min-w-0 flex-1">
                          <FormControl>
                            <Input
                              placeholder="Enter product name"
                              className="h-[30px] border-[#7aa7e4] bg-white px-2 text-xs"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Confirm product ${index + 1}`}
                      className="size-[30px] text-[#12b76a] hover:bg-[#ecfdf3] hover:text-[#12b76a]"
                      onClick={() => form.clearErrors(`products.${index}.productName`)}
                    >
                      <TickCircle className="size-4" aria-hidden="true" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Clear product ${index + 1}`}
                      className="size-[30px] text-[#f04438] hover:bg-[#fef3f2] hover:text-[#f04438]"
                      onClick={() => form.setValue(`products.${index}.productName`, "", { shouldDirty: true })}
                    >
                      <CloseCircle className="size-4" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="p-2 align-top">
                  <FormField
                    control={form.control}
                    name={`products.${index}.brand`}
                    render={({ field }) => (
                      <FormItem>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger
                              aria-label={`Brand for product ${index + 1}`}
                              className="h-[30px] bg-white px-2 text-xs"
                            >
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white">
                            {brands.map((brand) => (
                              <SelectItem key={brand} value={brand}>
                                {brand}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="p-2 align-top">
                  <FormField
                    control={form.control}
                    name={`products.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <NumberInput
                            value={field.value}
                            valueIsNumericString
                            decimalScale={0}
                            allowNegative={false}
                            allowLeadingZeros={false}
                            inputMode="numeric"
                            placeholder="Enter quantity"
                            className="h-[30px] border-[#7aa7e4] bg-white px-2 text-xs"
                            onValueChange={({ value }) => field.onChange(value)}
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="p-2 align-top">
                  <FormField
                    control={form.control}
                    name={`products.${index}.budgetRange`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter budget range"
                            className="h-[30px] border-[#7aa7e4] bg-white px-2 text-xs"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="p-2 align-top">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove product ${index + 1}`}
                    onClick={() => remove(index)}
                    className="size-[30px] text-[#d92d20] hover:bg-[#fef3f2] hover:text-[#d92d20]"
                  >
                    <Trash className="size-4" aria-hidden="true" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="border-t border-[#e5e9ef] px-3 py-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={fields.length >= 5}
            onClick={() => append(emptyProduct)}
            className="h-7 px-0 text-xs font-normal text-[#164990] hover:bg-transparent hover:text-[#164990]"
          >
            <Add className="size-4" aria-hidden="true" /> Add another product
          </Button>
        </div>
      </div>
      {form.formState.errors.products?.root?.message ? (
        <p role="alert" className="mt-1 text-xs text-destructive">
          {form.formState.errors.products.root.message}
        </p>
      ) : null}
    </section>
  );
}

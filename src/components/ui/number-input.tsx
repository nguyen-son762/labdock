"use client";

import * as React from "react";
import { NumericFormat, type NumericFormatProps } from "react-number-format";

import { Input } from "@/components/ui/input";

export type NumberInputProps = Omit<NumericFormatProps, "customInput" | "getInputRef">;

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => (
  <NumericFormat {...props} customInput={Input} getInputRef={ref} />
));
NumberInput.displayName = "NumberInput";

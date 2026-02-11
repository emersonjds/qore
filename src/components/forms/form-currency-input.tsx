"use client";

import * as React from "react";
import { type Control, type FieldPath, type FieldValues } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui-shadcn/form";
import { cn } from "@/lib/utils";

interface FormCurrencyInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function parseCurrency(value: string): number {
  const cleaned = value.replace(/[^\d,.-]/g, "").replace(",", ".");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function FormCurrencyInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder = "R$ 0,00",
  description,
  disabled,
  className,
}: FormCurrencyInputProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const [displayValue, setDisplayValue] = React.useState(
          field.value ? formatCurrency(field.value) : ""
        );

        return (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  R$
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder={placeholder}
                  disabled={disabled}
                  className={cn(
                    "flex h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-10 pr-4 text-sm text-gray-800 shadow-theme-xs transition-colors placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 dark:border-gray-700 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
                  )}
                  value={displayValue}
                  onChange={(e) => {
                    setDisplayValue(e.target.value);
                  }}
                  onBlur={(e) => {
                    const numericValue = parseCurrency(e.target.value);
                    field.onChange(numericValue);
                    setDisplayValue(
                      numericValue > 0 ? formatCurrency(numericValue) : ""
                    );
                  }}
                />
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

"use client";

import { cn } from "@/lib/utils";
import type { Currency } from "@/services/currency-beacon";
import { Check, ChevronsUpDown } from "lucide-react";
import { type ComponentProps, type ReactNode, useState } from "react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type PopoverProps = ComponentProps<typeof Popover>;
export interface CurrencySelectProps
  extends Omit<PopoverProps, "children" | "open" | "onOpenChange"> {
  blacklistedCurrencies?: string[];
  currencies: Currency[];
  placeholder?: ReactNode;
  value: string | null;
  onCurrencyChange?(currencyCode: string): void;
}

export function CurrencySelect({
  blacklistedCurrencies = [],
  currencies,
  placeholder = "Select currency...",
  value,
  onCurrencyChange,
  ...rest
}: CurrencySelectProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const availableCurrencies =
    blacklistedCurrencies.length > 0
      ? currencies.filter(
          (currency) => !blacklistedCurrencies.includes(currency.short_code)
        )
      : currencies;
  const selectedCurrency = availableCurrencies.find(
    (currency) => currency.short_code === value
  );

  return (
    <Popover {...rest} open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          className="justify-between"
          variant="outline"
          role="combobox"
          aria-expanded={popoverOpen}
        >
          <span
            className={cn("w-[120px] overflow-hidden text-ellipsis", {
              [`text-muted-foreground`]: !selectedCurrency,
            })}
          >
            {selectedCurrency?.name ?? placeholder}
          </span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search currency..." className="h-9" />
          <CommandList>
            <CommandEmpty>No currencies found.</CommandEmpty>
            <CommandGroup>
              {availableCurrencies.map((currency) => (
                <CommandItem
                  key={currency.id}
                  value={currency.name}
                  onSelect={() => {
                    onCurrencyChange?.(currency.short_code);
                    setPopoverOpen(false);
                  }}
                >
                  {currency.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === currency.short_code
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default CurrencySelect;

"use client";

import { useCurrencyConversion } from "@/hooks/useCurrencyConversion";
import { Currency } from "@/services/currency-beacon";
import { ArrowDownUp } from "lucide-react";
import { ChangeEventHandler, useCallback, useState } from "react";
import CurrencySelect from "./CurrencySelect";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export interface ExchangeRateWidgetProps {
  currencies: Currency[];
}

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});

export function ExchangeRateWidget({ currencies }: ExchangeRateWidgetProps) {
  const [sourceCurrencySymbol, setSourceCurrencySymbol] = useState<
    string | null
  >(null);
  const [targetCurrencySymbol, setTargetCurrencySymbol] = useState<
    string | null
  >(null);
  const targetCurrency = currencies.find(
    (currency) => currency.short_code === targetCurrencySymbol
  );
  const [amount, setAmount] = useState("");
  const { data } = useCurrencyConversion(
    sourceCurrencySymbol,
    targetCurrencySymbol,
    amount
  );

  const handleAmountFieldChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((event) => {
    setAmount(event.target.value);
  }, []);

  const handleSwap = useCallback(() => {
    setSourceCurrencySymbol(targetCurrencySymbol);
    setTargetCurrencySymbol(sourceCurrencySymbol);
  }, [sourceCurrencySymbol, targetCurrencySymbol]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 justify-between">
        <CurrencySelect
          placeholder="From..."
          currencies={currencies}
          value={sourceCurrencySymbol}
          onCurrencyChange={setSourceCurrencySymbol}
        />
        <Input
          className="text-center"
          type="number"
          placeholder="Enter amount"
          onChange={handleAmountFieldChange}
        />
      </div>

      <div className="flex gap-2 items-center justify-between">
        <CurrencySelect
          placeholder="To..."
          currencies={currencies}
          blacklistedCurrencies={
            sourceCurrencySymbol ? [sourceCurrencySymbol] : undefined
          }
          value={targetCurrencySymbol}
          onCurrencyChange={setTargetCurrencySymbol}
        />
        <p className="text-sm text-center flex-1">
          {!!data &&
            data.value.toLocaleString("en-US", {
              maximumFractionDigits: targetCurrency?.precision,
            })}

          {amount === "" && "-"}
        </p>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        {data
          ? `As of ${dateFormatter.format(data.timestamp * 1000)}`
          : "Fill the form to convert between currencies"}
      </p>

      <Button variant="secondary" onClick={handleSwap}>
        Swap Direction
        <ArrowDownUp />
      </Button>
    </div>
  );
}

export default ExchangeRateWidget;

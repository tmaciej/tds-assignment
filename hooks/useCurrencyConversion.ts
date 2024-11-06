import { convert } from "@/services/currency-beacon";
import useSWR from "swr";

type Key = ["convert", string, string, number | string] | null;

export function useCurrencyConversion(
  sourceCurrencySymbol: string | null,
  targetCurrencySymbol: string | null,
  amount: number | string
) {
  const numericAmount =
    typeof amount === "number" ? amount : parseFloat(amount);

  const key: Key =
    sourceCurrencySymbol === null ||
    targetCurrencySymbol === null ||
    isNaN(numericAmount)
      ? null
      : ["convert", sourceCurrencySymbol, targetCurrencySymbol, amount];

  return useSWR(key, ([, from, to, amount]) => {
    return convert({
      from,
      to,
      amount,
    });
  });
}

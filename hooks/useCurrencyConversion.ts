import { convert } from "@/services/currency-beacon";
import useSWR from "swr";
import { useDebounce } from "use-debounce";

type Key = ["convert", string, string, number | string] | null;

export function useCurrencyConversion(
  sourceCurrencySymbol: string | null,
  targetCurrencySymbol: string | null,
  amount: number | string
) {
  const [debouncedAmount] = useDebounce(amount, 300);
  const numericAmount =
    typeof debouncedAmount === "number"
      ? debouncedAmount
      : parseFloat(debouncedAmount);

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

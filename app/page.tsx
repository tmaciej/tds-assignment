import ExchangeRateWidget from "@/components/ExchangeRateWidget";
import { getCurrencies } from "@/services/currency-beacon";

export default async function Page() {
  const currencies = await getCurrencies();

  return (
    <div className="self-center max-w-2xl flex-1 flex flex-col justify-center px-2">
      <h1 className="text-2xl text-center mb-4">Currency Converter</h1>
      <ExchangeRateWidget currencies={currencies} />
    </div>
  );
}

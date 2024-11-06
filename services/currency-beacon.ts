import axios from "axios";

interface ResponseMetadata {
  code: number;
  [key: string]: unknown;
}

export interface Currency {
  id: number;
  name: string;
  short_code: string;
  code: string;
  precision: number;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  decimal_mark: string;
  thousands_separator: string;
}

export interface CurrenciesResponse {
  meta: ResponseMetadata;
  response: Currency[];
}

interface ConversionInput {
  from: string;
  to: string;
  amount: string | number;
}

export interface ConversionData {
  from: string;
  to: string;
  amount: number;
  value: number;
  timestamp: number;
  date: string;
}

export interface ConversionReponse {
  meta: ResponseMetadata;
  response: ConversionData;
}

export const currencyBeaconClient = axios.create({
  baseURL: "https://api.currencybeacon.com/v1",
  params: {
    api_key: process.env.NEXT_PUBLIC_CURRENCY_BEACON_API_KEY,
  },
});

export async function getCurrencies(): Promise<Currency[]> {
  const response = await currencyBeaconClient.get<CurrenciesResponse>(
    "/currencies"
  );
  return response.data.response;
}

export async function convert(input: ConversionInput): Promise<ConversionData> {
  const response = await currencyBeaconClient.get<ConversionReponse>(
    "/convert",
    {
      params: input,
    }
  );

  return response.data.response;
}

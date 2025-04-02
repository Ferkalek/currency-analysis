import { TradingData } from "./trading-data";

export type CurrencyItem = {
  value: number;
  label: string;
};

export interface CurrencyData {
  basic: TradingData;
  currency: string;
  technical: string;
  summary: string;
  averages: string;
  lastUpdateTime: string;
}

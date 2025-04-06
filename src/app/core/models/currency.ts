import { TradingData } from './trading-data';

export interface CurrencyItem {
  label: string;
  code: number;
}

export interface CurrencyData {
  basic: TradingData;
  currency: string;
  technical: string;
  summary: string;
  averages: string;
  lastUpdateTime: string;
  isStrongBuy: boolean;
  isStrongSell: boolean;
}

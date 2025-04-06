export interface TradingData {
  summary: string;
  indicators: {
    summary: {
      value: string;
      [key: string]: any;
    };
    rsi?: { action: string; actionDefine: string };
    stoch?: { action: string; actionDefine: string };
    stochrsi?: { action: string; actionDefine: string };
    macd?: { action: string; actionDefine: string };
    adx?: { action: string; actionDefine: string };
    cci?: { action: string; actionDefine: string };
    [key: string]: any;
  };
  movingAverages: {
    summary: {
      value: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  lastUpdateTime: string;
  [key: string]: any;
}

import { TradingData } from "../models";

  /**
   * Перевіряє наявність ризиків для strong_buy/strong_sell сигналів.
   * Повертає:
   * - null, якщо ризиків немає.
   * - string з описом ризиків, якщо вони є.
   */
  export function checkTradeRisks(data: TradingData): string | null {
    const { summary, indicators, movingAverages } = data;

    const checkSignalIsStrong = (signal: 'Strong_Buy' | 'Strong_Sell'): boolean => {
      return summary === signal.toLowerCase() &&
      indicators.summary.value.includes(signal) &&
      movingAverages.summary.value.includes(signal);
    }
  
    // 1. Перевірка, чи всі 3 ключові показники - strong_buy/sell
    const isStrongBuySignal = checkSignalIsStrong("Strong_Buy");
  
    const isStrongSellSignal = checkSignalIsStrong("Strong_Sell");
  
    if (!isStrongBuySignal && !isStrongSellSignal) {
      // Не strong_buy/sell — ризики не аналізуємо
      return null;
    }
  
    const conflictingIndicators: string[] = [];
  
    // 2. Список індикаторів для перевірки на конфлікти
    const indicatorsToCheck = [
      { key: "rsi", name: "RSI" },
      { key: "stoch", name: "Stochastic" },
      { key: "stochrsi", name: "StochRSI" },
      { key: "macd", name: "MACD" },
      { key: "adx", name: "ADX" },
      { key: "cci", name: "CCI" },
    ];
  
    // 3. Перевірка кожного індикатора на конфлікт
    for (const { key, name } of indicatorsToCheck) {
      const indicator = indicators[key];
      if (!indicator) continue;
  
      const isIndicatorBuy = indicator.actionDefine.includes("_buy");
      const isIndicatorSell = indicator.actionDefine.includes("_sell");
  
      if (isStrongBuySignal && isIndicatorSell) {
        conflictingIndicators.push(`${name} (${indicator.action})`);
      } else if (!isStrongBuySignal && isIndicatorBuy) {
        conflictingIndicators.push(`${name} (${indicator.action})`);
      }
    }
  
    // 4. Перевірка на перекупленість/перепроданість
    const overboughtOversoldIndicators: string[] = [];
    if (isStrongBuySignal) {
      if (indicators.stochrsi?.action === "Overbought") {
        overboughtOversoldIndicators.push("StochRSI (Overbought)");
      }
      if (parseFloat(indicators.williamsR?.value || "0") > -20) {
        overboughtOversoldIndicators.push("Williams %R (Overbought)");
      }
    } else {
      if (indicators.stochrsi?.action === "Oversold") {
        overboughtOversoldIndicators.push("StochRSI (Oversold)");
      }
      if (parseFloat(indicators.williamsR?.value || "0") < -80) {
        overboughtOversoldIndicators.push("Williams %R (Oversold)");
      }
    }
  
    // 5. Формування результату
    if (conflictingIndicators.length === 0 && overboughtOversoldIndicators.length === 0) {
      return null; // Ідеальний сигнал
    }
  
    let riskMessage = "";
    if (conflictingIndicators.length > 0) {
      riskMessage += `Конфліктні індикатори: ${conflictingIndicators.join(", ")}. `;
    }
    if (overboughtOversoldIndicators.length > 0) {
      riskMessage += `Перекупленість/перепроданість: ${overboughtOversoldIndicators.join(", ")}. `;
    }
  
    return riskMessage.trim();
  }

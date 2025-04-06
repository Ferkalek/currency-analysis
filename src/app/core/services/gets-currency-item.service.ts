import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CurrencyData, CurrencyItem, TradingData } from '../models';
import { baseUrl, severity, StrongSeverity } from '../constants';
import { updateDateToLocalTime } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class GetsCurrencyService {
  constructor(private http: HttpClient) {}

  getCurrencies(
    currency: CurrencyItem,
    timeFrame: '1m' | '5m' = '1m',
  ): Observable<CurrencyData> {
    return this.http
      .get<TradingData>(`${baseUrl}${currency.code}/${timeFrame}`)
      .pipe(
        map((data: TradingData) => {
          const { indicators, summary, movingAverages, lastUpdateTime } = data;
          const technicalSeverity = severity[indicators.summary.value];
          const summarySeverity = severity[summary];
          const averagesSeverity = severity[movingAverages.summary.value];

          return {
            basic: { ...data },
            currency: currency.label,
            technical: technicalSeverity,
            summary: summarySeverity,
            averages: averagesSeverity,
            lastUpdateTime: lastUpdateTime
              ? updateDateToLocalTime(lastUpdateTime)
              : '',
            isStrongBuy:
              technicalSeverity === StrongSeverity.strongBuy &&
              summarySeverity === StrongSeverity.strongBuy &&
              averagesSeverity === StrongSeverity.strongBuy,
            isStrongSell:
              technicalSeverity === StrongSeverity.strongSell &&
              summarySeverity === StrongSeverity.strongSell &&
              averagesSeverity === StrongSeverity.strongSell,
          };
        }),
      );
  }
}

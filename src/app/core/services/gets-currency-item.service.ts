import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { StateService } from './state.service';
import { CurrencyData, CurrencyItem, TradingData } from '../models';
import { baseUrl, severity } from '../constants';
import { updateDateToLocalTime } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class GetsCurrencyService {
  constructor(private http: HttpClient, private state: StateService) {}

  getCurrencies(currency: CurrencyItem): Observable<CurrencyData> {
    return this.http
      .get<TradingData>(
        `${baseUrl}${currency.value}/${this.state.timeFrame$.value}`,
      )
      .pipe(
        map((data: TradingData) => {
          const { indicators, summary, movingAverages, lastUpdateTime } = data;
          return {
            basic: { ...data },
            currency: currency.label,
            technical: severity[indicators.summary.value],
            summary: severity[summary],
            averages: severity[movingAverages.summary.value],
            lastUpdateTime: updateDateToLocalTime(lastUpdateTime),
          };
        }),
      );
  }
}

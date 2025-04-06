import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { CurrencyData, CurrencyItem } from '@app/core/models';
import { GetsCurrencyService, StateService } from '@app/core/services';
import { checkTradeRisks } from '@app/core/utils';
import { ActivityComponent } from '../activity/activity.component';
import { CountdownComponent } from '../countdown/countdown.component';

@Component({
  selector: 'app-currency-details',
  standalone: true,
  imports: [
    ButtonModule,
    ProgressSpinnerModule,
    ActivityComponent,
    CountdownComponent,
    NgIf,
    NgClass,
    AsyncPipe,
  ],
  templateUrl: './currency-details.component.html',
  styleUrl: './currency-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block flex-1 align-self-baseline',
  },
})
export class CurrencyDetailsComponent implements OnInit, OnDestroy {
  @Input() isAllowFetchData = true;
  @Input() currency!: CurrencyItem;
  @Input() timeFrame: '1m' | '5m' = '1m';

  currencyData$ = new BehaviorSubject<CurrencyData | null>(null);
  isLoading$ = new BehaviorSubject<boolean>(true);
  tradeRisks$ = new BehaviorSubject<string>('');
  unsubscribe$ = new Subject<void>();

  constructor(
    private readonly getsCurrencyService: GetsCurrencyService,
    private readonly stateService: StateService,
  ) {}

  ngOnInit(): void {
    this.fetchCurrency();

    this.stateService.bulkRefresh$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (this.isAllowFetchData) {
          this.fetchCurrency();
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  fetchCurrency(): void {
    if (!this.currency) return;

    this.isLoading$.next(true);
    this.getsCurrencyService
      .getCurrencies(this.currency, this.timeFrame)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: data => {
          if (data && Object.keys(data).length) {
            this.currencyData$.next(data);
            this.tradeRisks$.next(checkTradeRisks(data.basic));
          }
        },
        error: error => {
          console.error('Error fetching currency data:', error);
        },
        complete: () => {
          this.isLoading$.next(false);
        },
      });
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { CurrencyData, CurrencyItem } from '@app/core/models';
import { GetsCurrencyService, StateService } from '@app/core/services';
import { StrongSeverity } from '@app/core/constants';
import { ActivityComponent } from '../activity/activity.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { checkTradeRisks } from '@app/core/utils';
import { CountdownComponent } from '../countdown/countdown.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency-item',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    ProgressSpinnerModule,
    CheckboxModule,
    AsyncPipe,
    ActivityComponent,
    CountdownComponent,
    NgIf,
    NgClass,
  ],
  templateUrl: './currency-item.component.html',
  styleUrl: './currency-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyItemComponent implements OnInit {
  @Input() currency!: CurrencyItem;

  currencyData$ = new BehaviorSubject<CurrencyData | null>(null);
  isLoading$ = new BehaviorSubject<boolean>(true);
  severity$ = new BehaviorSubject<StrongSeverity | null>(null);
  tradeRisks$ = new BehaviorSubject<string>('');
  isCopied$ = new BehaviorSubject<boolean>(false);

  strongSeverity = StrongSeverity;

  isChecked = false;

  constructor(
    private readonly getsCurrencyService: GetsCurrencyService,
    private readonly stateService: StateService,
  ) {}

  ngOnInit(): void {
    this.fetchCurrency();

    this.stateService.bulckRefresh$.subscribe(() => {
      if (!this.isChecked) {
        this.fetchCurrency();
      }
    });
  }

  fetchCurrency(): void {
    if (!this.currency) return;

    this.isLoading$.next(true);
    this.getsCurrencyService.getCurrencies(this.currency).subscribe({
      next: data => {
        if (data && Object.keys(data).length) {
          this.currencyData$.next(data);

          this.severity$.next(this.getSeverity(data));
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

  onCopy(text: string): void {
    const logErr = (err: any) =>
      console.error('Не вдалося скопіювати текст: ', err);
    const manageCopy = () => {
      this.isCopied$.next(true);
      setTimeout(() => this.isCopied$.next(false), 1500);
    };

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => manageCopy())
        .catch(err => logErr(err));
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();

      try {
        document.execCommand('copy');
        manageCopy();
      } catch (err) {
        logErr(err);
      }

      document.body.removeChild(textArea);
    }
  }

  getSeverity(data: CurrencyData): StrongSeverity | null {
    const { summary, technical, averages } = data;
    if (
      summary === StrongSeverity.strongBuy &&
      technical === StrongSeverity.strongBuy &&
      averages === StrongSeverity.strongBuy
    ) {
      return StrongSeverity.strongBuy;
    } else if (
      summary === StrongSeverity.strongSell &&
      technical === StrongSeverity.strongSell &&
      averages === StrongSeverity.strongSell
    ) {
      return StrongSeverity.strongSell;
    } else {
      return null;
    }
  }
}

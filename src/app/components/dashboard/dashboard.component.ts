import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { StateService } from '@app/core/services';
import { CurrencyItemComponent } from '../currency-item/currency-item.component';
import { currencyList } from '@app/core/constants';
import { CurrencyItem } from '@app/core/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    MultiSelectModule,
    ButtonModule,
    CurrencyItemComponent,
    NgForOf,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  currencyOptions: SelectItem[] = currencyList.map(i => ({
    label: i.label,
    value: { ...i },
  }));

  selectedCurrencies!: CurrencyItem[];

  constructor(private stateService: StateService) {}

  onBulkUpdate(): void {
    this.stateService.bulkRefresh$.next();
  }
}

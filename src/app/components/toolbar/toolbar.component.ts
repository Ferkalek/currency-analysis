import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { currencyList } from '@app/core/constants';
import { CurrencyItem } from '@app/core/models';
import { StateService } from '@app/core/services';
import { SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [FormsModule, MultiSelectModule, ButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  currencyOptions: SelectItem[] = currencyList;

  selectedCurrencies!: CurrencyItem[];

  constructor(private stateService: StateService) {}

  onBulckUpdate(): void {
    this.stateService.bulckRefresh$.next();
  }
}

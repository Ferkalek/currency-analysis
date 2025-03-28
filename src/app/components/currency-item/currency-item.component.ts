import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-currency-item',
  standalone: true,
  imports: [],
  templateUrl: './currency-item.component.html',
  styleUrl: './currency-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyItemComponent {

}

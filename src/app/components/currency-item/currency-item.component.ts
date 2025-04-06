import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';

import { CurrencyItem } from '@app/core/models';
import { CurrencyDetailsComponent } from '../currency-details/currency-details.component';

@Component({
  selector: 'app-currency-item',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputSwitchModule,
    AsyncPipe,
    CurrencyDetailsComponent,
  ],
  templateUrl: './currency-item.component.html',
  styleUrl: './currency-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyItemComponent {
  @Input() currency!: CurrencyItem;

  isCopied$ = new BehaviorSubject<boolean>(false);

  isChecked_1m = true;
  isChecked_5m = true;

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
}

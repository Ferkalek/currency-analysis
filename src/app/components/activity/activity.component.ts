import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { NgIf } from '@angular/common';
import { StrongSeverity } from '@app/core/constants';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [TagModule, NgIf],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityComponent {
  @Input() currencyAction: string;

  strongSeverity = StrongSeverity;
}

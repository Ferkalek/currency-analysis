import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { CurrencyItemComponent } from "../currency-item/currency-item.component";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [ToolbarComponent, CurrencyItemComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}

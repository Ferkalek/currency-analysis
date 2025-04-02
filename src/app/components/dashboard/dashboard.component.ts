import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { CurrencyItemComponent } from "../currency-item/currency-item.component";
import { currencyList } from "@app/core/constants";
import { CurrencyItem } from "@app/core/models";
import { NgForOf } from "@angular/common";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [ToolbarComponent, CurrencyItemComponent, NgForOf],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  currencies: CurrencyItem[] = currencyList;
}

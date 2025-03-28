import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, DashboardComponent],
  template: `
    <app-dashboard />

    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}

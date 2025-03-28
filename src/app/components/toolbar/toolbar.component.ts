import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-toolbar",
  standalone: true,
  imports: [ButtonModule],
  templateUrl: "./toolbar.component.html",
  styleUrl: "./toolbar.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  onBulckUpdate() {}
}

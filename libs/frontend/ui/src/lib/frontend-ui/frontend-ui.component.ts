import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pi-frontend-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './frontend-ui.component.html',
  styleUrls: ['./frontend-ui.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontendUiComponent {}

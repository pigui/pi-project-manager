import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pi-frontend-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './frontend-services.component.html',
  styleUrls: ['./frontend-services.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontendServicesComponent {}

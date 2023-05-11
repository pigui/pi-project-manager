import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

const STYLES = `w-4/12 h-3/6`;

@Component({
  selector: 'pi-public-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-card.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicCardComponent {
  @HostBinding('class') className = STYLES;
}

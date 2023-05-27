import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

const STYLES = `c-public-card`;

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

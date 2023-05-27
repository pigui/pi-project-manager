import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

const STYLES = 'c-button-field';

@Component({
  selector: 'pi-button-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-field.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonFieldComponent {
  @HostBinding('class') className = STYLES;
}

import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Signal,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
const STYLES = `c-column`;

@Component({
  selector: 'pi-column',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './column.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent {
  private styles: Signal<string> = signal(STYLES);
  @HostBinding('class') get className() {
    return this.styles();
  }
}

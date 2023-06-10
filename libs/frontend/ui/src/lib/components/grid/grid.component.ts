import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  Signal,
  ViewEncapsulation,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
const STYLES = `c-grid`;

export type ColumnsType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

@Component({
  selector: 'pi-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  private readonly _columns: WritableSignal<ColumnsType> = signal(2);
  @Input() set columns(data: ColumnsType) {
    if (data) {
      this._columns.set(data);
    }
  }
  private readonly styles: Signal<string> = signal(STYLES);
  @HostBinding('class') get className() {
    return computed(
      () =>
        `${this.styles()} ${
          this._columns() ? `grid-cols-${this._columns().toString()}` : ''
        }`
    )();
  }
}

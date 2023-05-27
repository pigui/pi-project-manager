import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
  WritableSignal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

const STYLES = 'c-full-loading';

@Component({
  selector: 'pi-full-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './full-loading.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullLoadingComponent {
  @HostBinding('class') className = STYLES;
  isLoading: WritableSignal<boolean> = signal(false);
  @Input() set loading(val) {
    this.isLoading.set(val);
  }
}

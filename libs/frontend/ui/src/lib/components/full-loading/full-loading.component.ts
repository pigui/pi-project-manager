import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Signal,
  ViewEncapsulation,
  WritableSignal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pi-full-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './full-loading.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullLoadingComponent {
  isLoading: WritableSignal<boolean> = signal(false);
  @Input() set loading(val) {
    this.isLoading.set(val);
  }
}

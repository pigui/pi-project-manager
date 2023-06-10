import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Signal,
  ViewEncapsulation,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

const STYLES = `c-form-label`;

@Component({
  selector: 'pi-form-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-label.component.html',
  styleUrls: ['./form-label.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormLabelComponent {
  private readonly styles: Signal<string> = signal(STYLES);
  private readonly isInvalid: WritableSignal<boolean> = signal(false);
  @HostBinding('class') get className() {
    return this.styles();
  }
  @HostBinding('class.invalid') get classNameInvalid() {
    return this.isInvalid();
  }

  setInvalid(invalid: boolean): void {
    this.isInvalid.set(invalid);
  }
}

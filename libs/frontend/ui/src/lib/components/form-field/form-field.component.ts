import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Signal,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

const STYLES = `w-full`;

@Component({
  selector: 'pi-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-field.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  private styles: Signal<string> = signal(STYLES);
  @HostBinding('class') get className() {
    return this.styles();
  }
}
